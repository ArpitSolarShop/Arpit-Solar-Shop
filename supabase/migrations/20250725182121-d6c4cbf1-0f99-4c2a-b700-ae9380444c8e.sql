-- Add new columns to quotes table for referral information and product details
ALTER TABLE public.quotes 
ADD COLUMN referral_name TEXT,
ADD COLUMN referral_phone TEXT,
ADD COLUMN product_name TEXT,
ADD COLUMN product_category TEXT;