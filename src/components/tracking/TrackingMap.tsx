
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface TrackingMapProps {
  currentLocation: string;
  senderAddress: string;
  recipientAddress: string;
  trackingId: string;
}

const TrackingMap: React.FC<TrackingMapProps> = ({
  currentLocation,
  senderAddress,
  recipientAddress,
  trackingId
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapContainer.current) return;

      try {
        // Get Mapbox token from Supabase secrets
        const { data, error } = await supabase.functions.invoke('get-mapbox-token');
        
        if (error) {
          console.error('Error getting Mapbox token:', error);
          return;
        }

        mapboxgl.accessToken = data.token;

        // Initialize map centered on Kenya (general area)
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [37.9062, -0.0236], // Nairobi coordinates
          zoom: 6
        });

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Add markers for current location, sender, and recipient
        map.current.on('load', () => {
          // Current location marker (red)
          new mapboxgl.Marker({ color: '#ef4444' })
            .setLngLat([37.9062, -0.0236]) // This would be dynamic based on actual coordinates
            .setPopup(new mapboxgl.Popup().setHTML(`
              <div class="p-2">
                <h4 class="font-semibold">Current Location</h4>
                <p class="text-sm">${currentLocation}</p>
                <p class="text-xs text-gray-600">Tracking ID: ${trackingId}</p>
              </div>
            `))
            .addTo(map.current!);

          // Sender marker (green)
          new mapboxgl.Marker({ color: '#22c55e' })
            .setLngLat([36.8219, -1.2921]) // Example coordinates for sender
            .setPopup(new mapboxgl.Popup().setHTML(`
              <div class="p-2">
                <h4 class="font-semibold">Pickup Location</h4>
                <p class="text-sm">${senderAddress}</p>
              </div>
            `))
            .addTo(map.current!);

          // Recipient marker (blue)
          new mapboxgl.Marker({ color: '#3b82f6' })
            .setLngLat([39.6682, -4.0435]) // Example coordinates for recipient
            .setPopup(new mapboxgl.Popup().setHTML(`
              <div class="p-2">
                <h4 class="font-semibold">Delivery Location</h4>
                <p class="text-sm">${recipientAddress}</p>
              </div>
            `))
            .addTo(map.current!);
        });

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();

    return () => {
      map.current?.remove();
    };
  }, [currentLocation, senderAddress, recipientAddress, trackingId]);

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden border">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3 z-10">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-4 text-red-500" />
          <span className="text-sm font-medium">Live Tracking</span>
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Pickup Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Current Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Delivery Location</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingMap;
