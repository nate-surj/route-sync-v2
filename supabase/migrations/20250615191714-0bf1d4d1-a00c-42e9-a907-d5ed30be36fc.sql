
-- Create a table for logistics jobs
CREATE TABLE public.logistics_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id TEXT NOT NULL UNIQUE,
  logistics_company_id UUID REFERENCES auth.users NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  pickup_address TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  pickup_date DATE NOT NULL,
  pickup_time TIME NOT NULL,
  delivery_date DATE,
  delivery_time TIME,
  package_type TEXT NOT NULL,
  weight_kg NUMERIC,
  dimensions_length NUMERIC,
  dimensions_width NUMERIC,
  dimensions_height NUMERIC,
  special_instructions TEXT,
  vehicle_type TEXT NOT NULL,
  assigned_driver_id UUID,
  assigned_vehicle_id UUID,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_amount NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create function to generate job IDs
CREATE OR REPLACE FUNCTION public.generate_job_id(company_user_id uuid)
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  company_initials TEXT;
  sequence_num INTEGER;
  new_job_id TEXT;
BEGIN
  -- Get company initials from profiles table
  SELECT COALESCE(
    UPPER(LEFT(company_name, 3)),
    'JOB'
  ) INTO company_initials
  FROM public.profiles 
  WHERE id = company_user_id;
  
  -- Get next sequence number for this company
  SELECT COALESCE(MAX(
    CAST(
      SUBSTRING(job_id FROM LENGTH(company_initials || '-J') + 1) 
      AS INTEGER
    )
  ), 0) + 1
  INTO sequence_num
  FROM public.logistics_jobs 
  WHERE logistics_company_id = company_user_id 
  AND job_id LIKE company_initials || '-J%';
  
  -- Generate the new job ID
  new_job_id := company_initials || '-J' || LPAD(sequence_num::TEXT, 3, '0');
  
  RETURN new_job_id;
END;
$$;

-- Create trigger function to auto-generate job IDs
CREATE OR REPLACE FUNCTION public.set_job_id()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.job_id IS NULL OR NEW.job_id = '' THEN
    NEW.job_id := generate_job_id(NEW.logistics_company_id);
  END IF;
  RETURN NEW;
END;
$$;

-- Create the trigger
CREATE TRIGGER set_job_id_trigger
  BEFORE INSERT ON public.logistics_jobs
  FOR EACH ROW
  EXECUTE FUNCTION set_job_id();

-- Add Row Level Security (RLS)
ALTER TABLE public.logistics_jobs ENABLE ROW LEVEL SECURITY;

-- Create policy that allows logistics companies to view their own jobs
CREATE POLICY "Logistics companies can view their own jobs" 
  ON public.logistics_jobs 
  FOR SELECT 
  USING (auth.uid() = logistics_company_id);

-- Create policy that allows logistics companies to create jobs
CREATE POLICY "Logistics companies can create jobs" 
  ON public.logistics_jobs 
  FOR INSERT 
  WITH CHECK (auth.uid() = logistics_company_id);

-- Create policy that allows logistics companies to update their own jobs
CREATE POLICY "Logistics companies can update their own jobs" 
  ON public.logistics_jobs 
  FOR UPDATE 
  USING (auth.uid() = logistics_company_id);

-- Create policy that allows logistics companies to delete their own jobs
CREATE POLICY "Logistics companies can delete their own jobs" 
  ON public.logistics_jobs 
  FOR DELETE 
  USING (auth.uid() = logistics_company_id);

-- Create trigger for updated_at
CREATE TRIGGER update_logistics_jobs_updated_at
  BEFORE UPDATE ON public.logistics_jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
