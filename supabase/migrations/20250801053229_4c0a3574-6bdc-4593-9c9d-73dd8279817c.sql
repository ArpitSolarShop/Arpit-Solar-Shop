-- Add new columns to products table to support dynamic functionality
ALTER TABLE public.products 
ADD COLUMN is_published BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN product_type TEXT,
ADD COLUMN system_configurations JSONB,
ADD COLUMN pricing_data JSONB,
ADD COLUMN company_info JSONB,
ADD COLUMN sort_order INTEGER DEFAULT 0;

-- Create index for better query performance
CREATE INDEX idx_products_published ON public.products(is_published);
CREATE INDEX idx_products_type ON public.products(product_type);
CREATE INDEX idx_products_sort_order ON public.products(sort_order);

-- Update RLS policies to only show published products for public access
DROP POLICY IF EXISTS "Public read access" ON public.products;

CREATE POLICY "Public read published products" 
ON public.products 
FOR SELECT 
USING (is_published = true);

-- Admin policies remain the same for full access
-- Admins can see all products regardless of publish status