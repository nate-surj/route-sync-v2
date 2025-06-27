
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Vehicle {
  id: string;
  vehicle_id: string;
  registration_number: string;
  make: string;
  model: string;
  year: number;
  vehicle_type: string;
  operational_status: string;
  current_location: string;
}

export const useFleetData = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('fleet_vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching vehicles:', error);
        toast({
          title: "Error",
          description: "Failed to load fleet data. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setVehicles(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const refreshVehicles = useCallback(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return {
    vehicles,
    loading,
    refreshVehicles
  };
};
