-- Phase 1: Database Schema Updates for Admin Portal
-- Add missing columns to quotes table and ensure data integrity

-- Add new columns to capture all form data
ALTER TABLE public.quotes 
ADD COLUMN IF NOT EXISTS roof_area NUMERIC,
ADD COLUMN IF NOT EXISTS customer_type TEXT,
ADD COLUMN IF NOT EXISTS monthly_bill_range TEXT,
ADD COLUMN IF NOT EXISTS referral_source TEXT;

-- Ensure name and phone are NOT NULL (as requested)
ALTER TABLE public.quotes 
ALTER COLUMN name SET NOT NULL,
ALTER COLUMN phone SET NOT NULL;

-- Create index for better performance on admin queries
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON public.quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_source ON public.quotes(source);

-- Add comments for documentation
COMMENT ON COLUMN public.quotes.roof_area IS 'Roof area in square feet from chat widget';
COMMENT ON COLUMN public.quotes.customer_type IS 'Customer type: residential, commercial, industrial';
COMMENT ON COLUMN public.quotes.monthly_bill_range IS 'Monthly bill range for forms that use ranges instead of exact amounts';
COMMENT ON COLUMN public.quotes.referral_source IS 'Specific referral source tracking';