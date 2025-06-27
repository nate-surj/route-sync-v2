
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface TrackingData {
  id: string;
  tracking_id: string;
  sender_name: string;
  sender_phone: string;
  sender_address: string;
  recipient_name: string;
  recipient_phone: string;
  recipient_address: string;
  package_type: string;
  weight_kg: number;
  dimensions: string;
  special_instructions: string;
  current_status: string;
  current_location: string;
  estimated_delivery_date: string;
  estimated_delivery_time: string;
  proof_of_delivery_url: string;
  delivery_signature_url: string;
  package_condition: string;
  created_at: string;
}

interface TrackingUpdate {
  id: string;
  tracking_id: string;
  status: string;
  location: string;
  timestamp: string;
  notes: string;
}

export const useTrackingData = () => {
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [trackingUpdates, setTrackingUpdates] = useState<TrackingUpdate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchTrackingData = useCallback(async (trackingId: string) => {
    if (!trackingId.trim()) {
      setError('Please enter a tracking ID');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Fetch shipment data
      const { data: shipmentData, error: shipmentError } = await supabase
        .from('shipment_tracking')
        .select('*')
        .eq('tracking_id', trackingId.toUpperCase())
        .single();

      if (shipmentError) {
        console.error('Shipment error:', shipmentError);
        if (shipmentError.code === 'PGRST116') {
          setError('Tracking ID not found. Please check and try again.');
        } else {
          setError('Unable to fetch tracking information. Please try again.');
        }
        setTrackingData(null);
        setTrackingUpdates([]);
        return;
      }

      setTrackingData(shipmentData);

      // Fetch tracking updates
      const { data: updatesData, error: updatesError } = await supabase
        .from('tracking_updates')
        .select('*')
        .eq('tracking_id', trackingId.toUpperCase())
        .order('timestamp', { ascending: true });

      if (updatesError) {
        console.error('Updates error:', updatesError);
        setTrackingUpdates([]);
      } else {
        setTrackingUpdates(updatesData || []);
      }

      toast({
        title: "Tracking Information Retrieved",
        description: `Found shipment details for ${trackingId.toUpperCase()}`,
      });

    } catch (err) {
      console.error('Fetch error:', err);
      setError('An unexpected error occurred. Please try again.');
      setTrackingData(null);
      setTrackingUpdates([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const refreshTrackingData = useCallback((trackingId: string) => {
    if (trackingId) {
      fetchTrackingData(trackingId);
    }
  }, [fetchTrackingData]);

  return {
    trackingData,
    trackingUpdates,
    loading,
    error,
    fetchTrackingData,
    refreshTrackingData,
  };
};
