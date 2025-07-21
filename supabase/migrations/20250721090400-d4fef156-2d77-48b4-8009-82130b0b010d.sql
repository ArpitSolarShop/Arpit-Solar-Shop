-- Enum Types for dropdowns
CREATE TYPE entity_type AS ENUM ('Individual', 'Enterprise');
CREATE TYPE solution_type AS ENUM ('Residential', 'Commercial', 'Commercial and industrial DG', 'BIPv', 'Utility-scale');
CREATE TYPE company_brand AS ENUM ('Reliance', 'Sakti', 'Tata');
CREATE TYPE quote_source AS ENUM ('Quote Form', 'AI Chatbot');

-- Products Table: For the main product catalog
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    brand company_brand NOT NULL,
    category TEXT NOT NULL, -- e.g., 'Solar Panels', 'Solar Inverter'
    description TEXT,
    image_url TEXT,
    specifications JSONB -- For storing technical details
);

-- Services Table
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    icon_key TEXT -- Key for an SVG icon component
);

-- Projects Table: For project highlights and gallery
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    location TEXT,
    category solution_type NOT NULL,
    cover_image_url TEXT,
    description TEXT
);

-- Project Images Table: For the full image gallery
CREATE TABLE project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT
);

-- Testimonials Table: For happy customer section
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    feedback TEXT NOT NULL,
    project_id UUID REFERENCES projects(id)
);

-- FAQs Table
CREATE TABLE faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL
);

-- Quotes Table: For both "Get Quote" form and AI Chatbot
CREATE TABLE quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    entity_type entity_type,
    solution_classification solution_type,
    estimated_area_sqft NUMERIC,
    monthly_bill NUMERIC,
    power_demand_kw NUMERIC,
    project_location TEXT,
    referral TEXT,
    source quote_source NOT NULL -- To track if it came from the form or chatbot
);

-- Service Requests Table: For existing customers
CREATE TABLE service_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer_id TEXT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    installed_company company_brand,
    solution_classification solution_type,
    installation_date DATE,
    problem_description TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access" ON products FOR SELECT USING (true);
CREATE POLICY "Public read access" ON services FOR SELECT USING (true);
CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON project_images FOR SELECT USING (true);
CREATE POLICY "Public read access" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read access" ON faqs FOR SELECT USING (true);

-- Allow public insert for form submissions
CREATE POLICY "Public insert access" ON quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access" ON service_requests FOR INSERT WITH CHECK (true);