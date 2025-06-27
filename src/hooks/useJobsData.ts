
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface LogisticsJob {
  id: string;
  job_id: string;
  customer_name: string;
  pickup_address: string;
  delivery_address: string;
  pickup_date: string;
  pickup_time: string;
  delivery_date?: string;
  delivery_time?: string;
  package_type: string;
  weight_kg?: number;
  vehicle_type: string;
  status: string;
  payment_amount?: number;
  assigned_driver_id?: string;
  assigned_vehicle_id?: string;
  created_at: string;
}

export const useJobsData = () => {
  const [jobs, setJobs] = useState<LogisticsJob[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchJobs = useCallback(async () => {
    if (!user) {
      console.error('No authenticated user');
      toast({
        title: "Authentication Error",
        description: "You must be logged in to view jobs.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('logistics_jobs')
        .select('*')
        .eq('logistics_company_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching jobs:', error);
        toast({
          title: "Error",
          description: "Failed to load jobs. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setJobs(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const refreshJobs = useCallback(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs,
    loading,
    refreshJobs
  };
};
