
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { PostgrestError } from '@supabase/supabase-js';
import { startOfDay, endOfDay, formatISO, parseISO, format } from 'date-fns';

export type Delivery = Database['public']['Tables']['deliveries']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Notification = Database['public']['Tables']['notifications']['Row'];

export interface DriverDashboardData {
  todaysEarnings: number;
  deliveriesToday: { completed: number; total: number };
  nextDelivery: Delivery | null;
  recentActivity: Delivery[];
  availableJobs: Delivery[];
  safetyScore: number; // Placeholder for now
  onlineHours: number; // Placeholder for now
}

const getTodayDateRange = () => {
  const now = new Date();
  return {
    start: startOfDay(now).toISOString(),
    end: endOfDay(now).toISOString(),
  };
};

export const getDriverDashboardData = async (driverId: string): Promise<DriverDashboardData> => {
  const { start: todayStart, end: todayEnd } = getTodayDateRange();
  console.log(`Fetching dashboard data for driver ${driverId} for range: ${todayStart} to ${todayEnd}`);

  // 1. Today's Deliveries (scheduled for or picked up today) and Earnings
  const { data: deliveriesAssignedToday, error: deliveriesError } = await supabase
    .from('deliveries')
    .select('id, status, payment_amount, scheduled_pickup, actual_pickup, pickup_address, delivery_address, pickup_contact_name, delivery_contact_name, package_details, scheduled_delivery')
    .eq('assigned_to', driverId)
    .or(`scheduled_pickup.gte.${todayStart},actual_pickup.gte.${todayStart}`) // Pickup scheduled or happened today
    .or(`scheduled_pickup.lte.${todayEnd},actual_pickup.lte.${todayEnd}`);   // And ends today

  if (deliveriesError) {
    console.error('Error fetching today\'s deliveries:', deliveriesError);
    throw deliveriesError;
  }
  
  console.log("Fetched today's deliveries:", deliveriesAssignedToday);

  let todaysEarnings = 0;
  let completedToday = 0;
  const relevantDeliveriesToday = deliveriesAssignedToday?.filter(d => {
    const pickupTime = d.actual_pickup ? parseISO(d.actual_pickup) : (d.scheduled_pickup ? parseISO(d.scheduled_pickup) : null);
    return pickupTime && pickupTime >= startOfDay(new Date()) && pickupTime <= endOfDay(new Date());
  }) || [];
  
  const totalToday = relevantDeliveriesToday.length;

  relevantDeliveriesToday.forEach(d => {
    if (d.status === 'delivered' && d.payment_amount) {
      todaysEarnings += d.payment_amount;
      completedToday++;
    }
  });

  // 2. Next Delivery
  const { data: upcomingDeliveries, error: upcomingError } = await supabase
    .from('deliveries')
    .select('*')
    .eq('assigned_to', driverId)
    .in('status', ['assigned', 'in_transit'])
    .gte('scheduled_pickup', new Date().toISOString()) // Scheduled pickup is from now onwards
    .order('scheduled_pickup', { ascending: true })
    .limit(1);

  if (upcomingError) {
    console.error('Error fetching upcoming deliveries:', upcomingError);
    throw upcomingError;
  }
  const nextDelivery = upcomingDeliveries?.[0] || null;
  console.log("Fetched next delivery:", nextDelivery);

  // 3. Recent Activity
  const { data: recentActivity, error: recentActivityError } = await supabase
    .from('deliveries')
    .select('*')
    .eq('assigned_to', driverId)
    .in('status', ['delivered', 'cancelled'])
    .order('updated_at', { ascending: false })
    .limit(3);

  if (recentActivityError) {
    console.error('Error fetching recent activity:', recentActivityError);
    throw recentActivityError;
  }
  console.log("Fetched recent activity:", recentActivity);

  // 4. Available Jobs
  const { data: availableJobs, error: availableJobsError } = await supabase
    .from('deliveries')
    .select('*')
    .eq('status', 'pending') // Standard way to check for available jobs
    .order('created_at', { ascending: true })
    .limit(3);

  if (availableJobsError) {
    console.error('Error fetching available jobs:', availableJobsError);
    throw availableJobsError;
  }
  console.log("Fetched available jobs:", availableJobs);
  
  return {
    todaysEarnings,
    deliveriesToday: { completed: completedToday, total: totalToday },
    nextDelivery,
    recentActivity: recentActivity || [],
    availableJobs: availableJobs || [],
    safetyScore: 94, // Placeholder
    onlineHours: 6.5, // Placeholder
  };
};

export const getUnreadNotificationsCount = async (userId: string): Promise<number> => {
  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('is_read', false);

  if (error) {
    console.error('Error fetching unread notifications count:', error);
    throw error;
  }
  console.log("Unread notifications count:", count);
  return count || 0;
};

export const acceptJob = async (deliveryId: string, driverId: string): Promise<Delivery | null> => {
  console.log(`Driver ${driverId} accepting job ${deliveryId}`);
  const { data, error } = await supabase
    .from('deliveries')
    .update({ status: 'assigned', assigned_to: driverId })
    .eq('id', deliveryId)
    .eq('status', 'pending') // Make sure it's still available
    .select()
    .single();

  if (error) {
    console.error('Error accepting job:', error);
    throw error;
  }
  console.log("Job accepted successfully:", data);
  return data;
};
