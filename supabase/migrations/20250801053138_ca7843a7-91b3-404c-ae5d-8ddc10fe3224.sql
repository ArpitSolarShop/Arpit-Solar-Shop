-- Enhance products table for dynamic product management
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS product_type TEXT,
ADD COLUMN IF NOT EXISTS system_configurations JSONB,
ADD COLUMN IF NOT EXISTS pricing_data JSONB,
ADD COLUMN IF NOT EXISTS company_info JSONB,
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_published ON public.products(is_published);
CREATE INDEX IF NOT EXISTS idx_products_brand_category ON public.products(brand, category);
CREATE INDEX IF NOT EXISTS idx_products_type ON public.products(product_type);

-- Update RLS policies to only show published products to public
DROP POLICY IF EXISTS "Public read access" ON public.products;

CREATE POLICY "Public read published products" 
ON public.products 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Admin can view all products" 
ON public.products 
FOR SELECT 
USING (true);

-- Create product_configurations table for dynamic BOQ/specs management
CREATE TABLE IF NOT EXISTS public.product_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  configuration_name TEXT NOT NULL,
  configuration_data JSONB NOT NULL,
  configuration_type TEXT NOT NULL, -- 'grid_tie', 'residential', 'commercial', etc.
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on product_configurations
ALTER TABLE public.product_configurations ENABLE ROW LEVEL SECURITY;

-- RLS policies for product_configurations
CREATE POLICY "Public read active configurations for published products" 
ON public.product_configurations 
FOR SELECT 
USING (
  is_active = true 
  AND EXISTS (
    SELECT 1 FROM public.products 
    WHERE products.id = product_configurations.product_id 
    AND products.is_published = true
  )
);

CREATE POLICY "Admin can manage all configurations" 
ON public.product_configurations 
FOR ALL 
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_product_configurations_updated_at
BEFORE UPDATE ON public.product_configurations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert existing hardcoded product data
-- Shakti Solar Products
INSERT INTO public.products (name, brand, category, description, product_type, is_published, system_configurations, company_info) VALUES
(
  'Shakti Solar Grid-Tie Systems',
  'Shakti Solar',
  'Solar Panels',
  'High-efficiency grid-tie solar systems for residential and commercial applications',
  'grid_tie_residential',
  true,
  '{"systemSizeLimit": 100, "workScope": "Supply Installation Testing and Commissioning of Grid-tied rooftop Solar PV Power Plant"}',
  '{"name": "Shakti Solar", "description": "Solar PV Modules"}'
),
(
  'Reliance Solar Grid-Tie Systems', 
  'Reliance',
  'Solar Panels',
  'Premium grid-tie solar systems with advanced technology',
  'grid_tie_residential',
  true,
  '{"systemSizeLimit": 100, "workScope": "Supply Installation Testing and Commissioning of Grid-tied rooftop Solar PV Power Plant"}',
  '{"name": "Reliance Solar", "description": "Solar PV Modules"}'
),
(
  'Reliance Commercial Solar Systems',
  'Reliance', 
  'Commercial Solar',
  'Large-scale commercial and industrial solar solutions',
  'commercial',
  true,
  '{"systemSizeLimit": 1000, "workScope": "Complete commercial solar installation and commissioning"}',
  '{"name": "Reliance Solar", "description": "Commercial Solar Solutions"}'
);

-- Add sample configuration data for Shakti Solar
DO $$
DECLARE
  shakti_product_id UUID;
BEGIN
  SELECT id INTO shakti_product_id FROM public.products WHERE name = 'Shakti Solar Grid-Tie Systems' LIMIT 1;
  
  IF shakti_product_id IS NOT NULL THEN
    INSERT INTO public.product_configurations (product_id, configuration_name, configuration_data, configuration_type) VALUES
    (
      shakti_product_id,
      'Grid-Tie System Configurations',
      '[
        {"slNo": 1, "systemSize": 1, "noOfModules": 3, "inverterCapacity": "1kW", "phase": "Single", "preGiElevatedWithGst": 85000, "preGiElevatedPrice": 85000},
        {"slNo": 2, "systemSize": 2, "noOfModules": 6, "inverterCapacity": "2kW", "phase": "Single", "preGiElevatedWithGst": 150000, "preGiElevatedPrice": 150000},
        {"slNo": 3, "systemSize": 3, "noOfModules": 9, "inverterCapacity": "3kW", "phase": "Single", "preGiElevatedWithGst": 210000, "preGiElevatedPrice": 210000}
      ]',
      'grid_tie'
    );
  END IF;
END $$;