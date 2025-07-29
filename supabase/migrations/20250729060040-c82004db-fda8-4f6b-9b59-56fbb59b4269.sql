-- Create storage bucket for quote PDFs
insert into storage.buckets (id, name, public) values ('quote-pdfs', 'quote-pdfs', false);

-- Create policies for quote PDFs storage
CREATE POLICY "Allow authenticated uploads to quote-pdfs" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'quote-pdfs' AND auth.role() = 'service_role');

CREATE POLICY "Allow authenticated reads from quote-pdfs" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'quote-pdfs' AND auth.role() = 'service_role');