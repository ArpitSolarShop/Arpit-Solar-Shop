-- Create admin access policies for quotes table
CREATE POLICY "Admins can view all quotes"
ON public.quotes
FOR SELECT
USING (true);

-- Create admin access policies for service_requests table  
CREATE POLICY "Admins can view all service_requests"
ON public.service_requests
FOR SELECT
USING (true);

-- Create admin access policies for CRUD operations on quotes
CREATE POLICY "Admins can update quotes"
ON public.quotes
FOR UPDATE
USING (true);

CREATE POLICY "Admins can delete quotes"
ON public.quotes
FOR DELETE
USING (true);

-- Create admin access policies for CRUD operations on service_requests
CREATE POLICY "Admins can update service_requests"
ON public.service_requests
FOR UPDATE
USING (true);

CREATE POLICY "Admins can delete service_requests"
ON public.service_requests
FOR DELETE
USING (true);