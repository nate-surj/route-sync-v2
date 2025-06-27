
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Shipment {
  id: string;
  shipment_id: string;
  origin: string;
  destination: string;
  departure_date: string;
  arrival_date: string;
  status: string;
  items: number;
  weight: string;
  vehicle: string;
}

export const useShipmentData = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchShipments = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('shipments')
        .select('*')
        .order('departure_date', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setShipments(data);
      }
    } catch (error) {
      console.error("Error fetching shipments:", error);
      toast({
        title: "Error fetching shipments",
        description: "There was a problem retrieving your shipment data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  const refreshShipments = useCallback(() => {
    fetchShipments();
  }, [fetchShipments]);

  return {
    shipments,
    isLoading,
    refreshShipments
  };
};
