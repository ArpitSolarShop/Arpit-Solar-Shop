// Updated Deno serverless function with Reliance/Shakti PDF branching
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.52.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QuoteFormData {
  name: string;
  phone: string;
  email?: string;
  entity_type?: string;
  solution_classification?: string;
  estimated_area_sqft?: number;
  monthly_bill?: number;
  power_demand_kw?: number;
  project_location?: string;
  referral_name?: string;
  referral_phone?: string;
  product_name?: string;
  product_category?: string;
  customer_type?: string;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formData }: { formData: QuoteFormData } = await req.json();
    console.log('Received form data:', formData);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const pdfBuffer = await generateQuotePDF(formData);
    const fileName = `quote-${formData.name.replace(/\s+/g, '-')}-${Date.now()}.pdf`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('quote-pdfs')
      .upload(fileName, pdfBuffer, {
        contentType: 'application/pdf',
        cacheControl: '3600'
      });

    if (uploadError) throw new Error(`Failed to upload PDF: ${uploadError.message}`);

    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from('quote-pdfs')
      .createSignedUrl(fileName, 3600);

    if (signedUrlError) throw new Error(`Failed to generate signed URL: ${signedUrlError.message}`);

    console.log('PDF uploaded successfully, attempting to send via WhatsApp');
    const whatsappResult = await sendWhatsAppTemplate(formData.phone, signedUrlData.signedUrl, formData);

    return new Response(JSON.stringify({
      success: true,
      pdfUrl: signedUrlData.signedUrl,
      whatsappStatus: whatsappResult
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message, success: false }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function generateQuotePDF(formData: QuoteFormData): Promise<Uint8Array> {
  const category = formData.product_category?.toLowerCase() || '';
  let htmlContent = '';

  if (category.includes('reliance')) htmlContent = generateRelianceHTML(formData);
  else if (category.includes('shakti')) htmlContent = generateShaktiHTML(formData);
  else htmlContent = generateDefaultHTML(formData);

  try {
    const puppeteer = await import("https://deno.land/x/puppeteer@16.2.0/mod.ts");
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ 
      format: 'A4', 
      margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }, 
      printBackground: true 
    });
    await browser.close();
    return new Uint8Array(pdfBuffer);
  } catch (e) {
    console.warn('Puppeteer failed:', e);
    return createSimplePDF(formData);
  }
}

function generateRelianceHTML(formData: QuoteFormData): string {
  return `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
        .content { margin: 20px 0; }
        .field { margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Reliance HJT Solar Quotation</h1>
        <p>Arpit Solar Shop - Authorized Channel Partner</p>
      </div>
      <div class="content">
        <div class="field"><strong>Customer Name:</strong> ${formData.name}</div>
        <div class="field"><strong>Phone:</strong> ${formData.phone}</div>
        <div class="field"><strong>Product:</strong> ${formData.product_name || 'Reliance Solar Solution'}</div>
        <div class="field"><strong>Power Demand:</strong> ${formData.power_demand_kw || 'TBD'} kW</div>
        <div class="field"><strong>Location:</strong> ${formData.project_location || 'TBD'}</div>
        <div class="field"><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
      </div>
    </body>
    </html>`;
}

function generateShaktiHTML(formData: QuoteFormData): string {
  return `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; color: green; border-bottom: 2px solid green; padding-bottom: 10px; }
        .content { margin: 20px 0; }
        .field { margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Shakti Solar Quotation</h1>
        <p>Arpit Solar Shop - Authorized Dealer</p>
      </div>
      <div class="content">
        <div class="field"><strong>Customer Name:</strong> ${formData.name}</div>
        <div class="field"><strong>Phone:</strong> ${formData.phone}</div>
        <div class="field"><strong>Power Demand:</strong> ${formData.power_demand_kw || 'TBD'} kW</div>
        <div class="field"><strong>Location:</strong> ${formData.project_location || 'TBD'}</div>
        <div class="field"><strong>Monthly Bill:</strong> ₹${formData.monthly_bill || 'TBD'}</div>
        <div class="field"><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
      </div>
    </body>
    </html>`;
}

function generateDefaultHTML(formData: QuoteFormData): string {
  return `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
        .content { margin: 20px 0; }
        .field { margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Solar Quotation</h1>
        <p>Arpit Solar Shop</p>
      </div>
      <div class="content">
        <div class="field"><strong>Customer Name:</strong> ${formData.name}</div>
        <div class="field"><strong>Phone:</strong> ${formData.phone}</div>
        <div class="field"><strong>Product:</strong> ${formData.product_name || 'Solar Solution'}</div>
        <div class="field"><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
      </div>
    </body>
    </html>`;
}

function createSimplePDF(formData: QuoteFormData): Uint8Array {
  // Create a basic PDF structure for fallback
  const content = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 200 >>
stream
BT
/F1 12 Tf
50 750 Td
(QUOTATION) Tj
0 -20 Td
(Name: ${formData.name}) Tj
0 -20 Td
(Phone: ${formData.phone}) Tj
0 -20 Td
(Product: ${formData.product_name || 'Solar Solution'}) Tj
0 -20 Td
(Date: ${new Date().toLocaleDateString()}) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000110 00000 n 
0000000252 00000 n 
0000000504 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
561
%%EOF`;
  
  return new TextEncoder().encode(content);
}

async function sendWhatsAppTemplate(phone: string, pdfUrl: string, formData: QuoteFormData): Promise<any> {
  const API_KEY = "key_o6Dp7MBLIwKlpKHlqcf4VaI8eGEyGkWfp76gluNY0gjjd3T5EuUblUNsbgqGMzj7LZhDfwbuoLbDxU8LTGehJW1m0sSDhqDvf2GAw4puBEAfInI5qV13rWPjpNPrvw812bitePsseEFcnJavcAOlVfqqg0bJoOA15DI06zDAhOhbXai7xW7LFWt0DdDpuby7kWHGc3pcsRrCqUGPDRvnjfSfBtlMcxwXzLJyi27Y6Mh4hfjcyU1bu1eZBmGo";
  const SENDER_NUMBER = "+919044555572";
  
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  
  console.log('Sending WhatsApp template to:', cleanPhone);
  console.log('PDF URL:', pdfUrl);

  const payload = {
    messages: [{
      to: cleanPhone,
      from: SENDER_NUMBER,
      content: {
        templateName: "personalized_quotation_from_arpit_solar_shop_web_v2",
        language: "en",
        templateData: {
          header: {
            type: "DOCUMENT",
            mediaUrl: pdfUrl,
            filename: `Solar_Quote_${formData.name.replace(/\s+/g, '_')}.pdf`
          },
          body: {
            placeholders: [
              formData.name,
              formData.product_category || 'solar solution'
            ]
          }
        }
      }
    }]
  };

  console.log('Sending payload:', JSON.stringify(payload, null, 2));

  try {
    const response = await fetch('https://public.doubletick.io/whatsapp/message/template', {
      method: 'POST',
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log('DoubleTick API response status:', response.status);
    console.log('DoubleTick API response:', result);
    
    if (!response.ok) {
      throw new Error(`DoubleTick API error (${response.status}): ${result.message || response.statusText}`);
    }
    
    return result;
  } catch (error) {
    console.error('DoubleTick send error:', error);
    throw error;
  }
}