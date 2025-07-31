-- Create storage bucket for product assets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-assets', 'product-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for product assets
CREATE POLICY "Public access for product assets" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'product-assets');

CREATE POLICY "Admin can upload product assets" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'product-assets');

CREATE POLICY "Admin can update product assets" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'product-assets');

CREATE POLICY "Admin can delete product assets" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'product-assets');