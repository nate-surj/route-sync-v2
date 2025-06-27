
-- Create shipment_tracking table for real tracking functionality
CREATE TABLE public.shipment_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tracking_id TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES auth.users,
  sender_name TEXT NOT NULL,
  sender_phone TEXT NOT NULL,
  sender_address TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  recipient_phone TEXT NOT NULL,
  recipient_address TEXT NOT NULL,
  package_type TEXT NOT NULL,
  weight_kg NUMERIC,
  dimensions TEXT,
  special_instructions TEXT,
  current_status TEXT NOT NULL DEFAULT 'pending',
  current_location TEXT,
  estimated_delivery_date DATE,
  estimated_delivery_time TIME,
  proof_of_delivery_url TEXT,
  delivery_signature_url TEXT,
  package_condition TEXT DEFAULT 'good',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tracking_updates table for status history
CREATE TABLE public.tracking_updates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tracking_id TEXT NOT NULL REFERENCES public.shipment_tracking(tracking_id),
  status TEXT NOT NULL,
  location TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.shipment_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracking_updates ENABLE ROW LEVEL SECURITY;

-- Create policies for shipment_tracking (accessible by anyone with tracking ID)
CREATE POLICY "Anyone can view shipment with tracking ID" 
  ON public.shipment_tracking 
  FOR SELECT 
  USING (true);

-- Create policies for tracking_updates (accessible by anyone)
CREATE POLICY "Anyone can view tracking updates" 
  ON public.tracking_updates 
  FOR SELECT 
  USING (true);

-- Create policy that allows logistics companies to create/update shipments
CREATE POLICY "Logistics companies can manage shipments" 
  ON public.shipment_tracking 
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND user_type = 'logistics_company'
    )
  );

-- Create policy that allows logistics companies to create tracking updates
CREATE POLICY "Logistics companies can create tracking updates" 
  ON public.tracking_updates 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND user_type = 'logistics_company'
    )
  );

-- Create trigger for updated_at
CREATE TRIGGER update_shipment_tracking_updated_at
  BEFORE UPDATE ON public.shipment_tracking
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample tracking data
INSERT INTO public.shipment_tracking (
  tracking_id, sender_name, sender_phone, sender_address,
  recipient_name, recipient_phone, recipient_address,
  package_type, weight_kg, current_status, current_location,
  estimated_delivery_date, estimated_delivery_time,
  special_instructions, package_condition
) VALUES 
(
  'RSA-B045', 'ABC Electronics Ltd', '+254-700-123456', 'Industrial Area, Nairobi',
  'TechMart Mombasa', '+254-700-789012', 'Nyali Centre, Mombasa',
  'Electronics', 45.5, 'in_transit', 'Mtito Andei',
  CURRENT_DATE + INTERVAL '1 day', '17:45:00',
  'Handle with care - fragile electronics', 'good'
),
(
  'RSA-B046', 'FreshFarm Co-op', '+254-700-555123', 'Nakuru County',
  'City Market Nairobi', '+254-700-555789', 'City Market, Nairobi',
  'Agricultural Produce', 120.0, 'delivered', 'Nairobi',
  CURRENT_DATE - INTERVAL '1 day', '09:30:00',
  'Keep refrigerated', 'good'
);

-- Insert tracking updates for sample data
INSERT INTO public.tracking_updates (tracking_id, status, location, timestamp, notes) VALUES
('RSA-B045', 'Package picked up', 'Nairobi Depot', NOW() - INTERVAL '6 hours', 'Package collected from sender'),
('RSA-B045', 'In transit', 'Machakos', NOW() - INTERVAL '4 hours', 'En route to Mombasa'),
('RSA-B045', 'In transit', 'Mtito Andei', NOW() - INTERVAL '2 hours', 'Scheduled stop - continuing to destination'),
('RSA-B046', 'Package picked up', 'Nakuru', NOW() - INTERVAL '2 days', 'Fresh produce collected'),
('RSA-B046', 'In transit', 'Naivasha', NOW() - INTERVAL '1 day 6 hours', 'Temperature controlled transport'),
('RSA-B046', 'Delivered', 'Nairobi', NOW() - INTERVAL '1 day', 'Successfully delivered to City Market');
