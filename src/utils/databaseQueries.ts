
import { supabase } from "@/integrations/supabase/client";
import { handleAsyncError } from "./errorHandling";

export const fetchUserShipments = async () => {
  return handleAsyncError(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }, "Failed to load shipments");
};

export const fetchUserJobs = async () => {
  return handleAsyncError(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('customer_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }, "Failed to load jobs");
};

export const fetchAvailableJobs = async () => {
  return handleAsyncError(async () => {
    const { data, error } = await supabase
      .from('available_jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }, "Failed to load available jobs");
};

export const fetchUserFrequentRoutes = async () => {
  return handleAsyncError(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from('frequent_routes')
      .select('*')
      .eq('user_id', user.id)
      .order('usage_count', { ascending: false });

    if (error) throw error;
    return data || [];
  }, "Failed to load frequent routes");
};

export const createDelivery = async (deliveryData: any) => {
  return handleAsyncError(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from('deliveries')
      .insert({
        ...deliveryData,
        created_by: user.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }, "Failed to create delivery");
};

export const updateUserProfile = async (profileData: any) => {
  return handleAsyncError(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }, "Failed to update profile");
};

export const createDamageClaim = async (claimData: any) => {
  return handleAsyncError(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from('damage_claims')
      .insert({
        ...claimData,
        user_id: user.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }, "Failed to create damage claim");
};
