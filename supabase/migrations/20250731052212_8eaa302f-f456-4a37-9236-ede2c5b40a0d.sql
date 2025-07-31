-- Create admin users table for authentication
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Admin users can manage their own data
CREATE POLICY "Admin users can view their own data" 
ON public.admin_users 
FOR SELECT 
USING (auth.uid()::text = id::text);

CREATE POLICY "Admin users can update their own data" 
ON public.admin_users 
FOR UPDATE 
USING (auth.uid()::text = id::text);

-- Update products table to allow admin operations
DROP POLICY IF EXISTS "Public read access" ON public.products;
DROP POLICY IF EXISTS "Admin can manage products" ON public.products;

-- New policies for products
CREATE POLICY "Public read access" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can insert products" 
ON public.products 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin can update products" 
ON public.products 
FOR UPDATE 
USING (true);

CREATE POLICY "Admin can delete products" 
ON public.products 
FOR DELETE 
USING (true);

-- Add logo_url column to products if it doesn't exist
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS logo_url TEXT;

-- Create admin sessions table for simple auth
CREATE TABLE IF NOT EXISTS public.admin_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID NOT NULL REFERENCES public.admin_users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on admin_sessions
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

-- Admin sessions policies
CREATE POLICY "Admin can manage their own sessions" 
ON public.admin_sessions 
FOR ALL 
USING (auth.uid()::text = admin_id::text);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for products updated_at
DROP TRIGGER IF EXISTS update_products_updated_at ON public.products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for admin_users updated_at  
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON public.admin_users;
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert a default admin user (password: admin123)
INSERT INTO public.admin_users (email, password_hash, name) 
VALUES ('admin@arpitsolar.com', '$2b$10$rOHzWk.ZqKH.Q9.Zz0ZqEuKJ1HLJ8O2vBaH3bHHJH.B.H3bHHJH.B', 'Admin User') 
ON CONFLICT (email) DO NOTHING;