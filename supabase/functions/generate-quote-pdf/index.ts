// Updated Deno serverless function with Reliance/Shakti PDF branching
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.52.0";

// Product data structures
const shaktiResidentialData = [
  { systemSize: "2.14 kWp", pricePerWatt: 45, monthlyGeneration: 270, paybackPeriod: 4.5, modules: 4, components: "4 x 535W Modules, 1 x 2kW Inverter, Mounting Structure, DC/AC Cables" },
  { systemSize: "3.21 kWp", pricePerWatt: 43, monthlyGeneration: 400, paybackPeriod: 4.2, modules: 6, components: "6 x 535W Modules, 1 x 3kW Inverter, Mounting Structure, DC/AC Cables" },
  { systemSize: "5.35 kWp", pricePerWatt: 41, monthlyGeneration: 670, paybackPeriod: 4.0, modules: 10, components: "10 x 535W Modules, 1 x 5kW Inverter, Mounting Structure, DC/AC Cables" },
  { systemSize: "10.70 kWp", pricePerWatt: 39, monthlyGeneration: 1340, paybackPeriod: 3.8, modules: 20, components: "20 x 535W Modules, 1 x 10kW Inverter, Mounting Structure, DC/AC Cables" }
];

const relianceResidentialData = [
  { systemSize: "2.14 kWp", pricePerWatt: 48, monthlyGeneration: 280, paybackPeriod: 4.2, modules: 4, components: "4 x 535W HJT Modules, 1 x 2kW Inverter, Mounting Structure, DC/AC Cables" },
  { systemSize: "3.21 kWp", pricePerWatt: 46, monthlyGeneration: 420, paybackPeriod: 4.0, modules: 6, components: "6 x 535W HJT Modules, 1 x 3kW Inverter, Mounting Structure, DC/AC Cables" },
  { systemSize: "5.35 kWp", pricePerWatt: 44, monthlyGeneration: 700, paybackPeriod: 3.8, modules: 10, components: "10 x 535W HJT Modules, 1 x 5kW Inverter, Mounting Structure, DC/AC Cables" },
  { systemSize: "10.70 kWp", pricePerWatt: 42, monthlyGeneration: 1400, paybackPeriod: 3.6, modules: 20, components: "20 x 535W HJT Modules, 1 x 10kW Inverter, Mounting Structure, DC/AC Cables" }
];

const relianceCommercialData = [
  { systemSize: "25 kWp", pricePerWatt: 38, monthlyGeneration: 3250, paybackPeriod: 3.5, modules: 47, components: "47 x 535W HJT Modules, 1 x 25kW Inverter, Mounting Structure, DC/AC Cables" },
  { systemSize: "50 kWp", pricePerWatt: 36, monthlyGeneration: 6500, paybackPeriod: 3.2, modules: 94, components: "94 x 535W HJT Modules, 2 x 25kW Inverters, Mounting Structure, DC/AC Cables" },
  { systemSize: "100 kWp", pricePerWatt: 34, monthlyGeneration: 13000, paybackPeriod: 3.0, modules: 187, components: "187 x 535W HJT Modules, 4 x 25kW Inverters, Mounting Structure, DC/AC Cables" }
];

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
    const browser = await puppeteer.default.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
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
  const productData = findProductData(formData, 'reliance');
  const totalPrice = productData ? Math.round(productData.pricePerWatt * parseFloat(productData.systemSize.replace(' kWp', ''))) : 'Contact for pricing';
  const annualSavings = productData ? Math.round(productData.monthlyGeneration * 12 * 8) : 'TBD';
  
  return `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 20px; background: #f8fafc; }
        .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
        .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
        .content { padding: 30px; }
        .section { margin-bottom: 25px; }
        .section h2 { color: #2563eb; font-size: 20px; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; }
        .field { margin: 12px 0; padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
        .field:last-child { border-bottom: none; }
        .field strong { color: #374151; display: inline-block; width: 180px; }
        .highlights { background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; }
        .price-box { background: #dcfce7; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
        .price-box .amount { font-size: 24px; font-weight: bold; color: #059669; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Reliance HJT Solar Quotation</h1>
          <p>Arpit Solar Shop - Authorized Channel Partner</p>
        </div>
        <div class="content">
          <div class="section">
            <h2>Customer Information</h2>
            <div class="field"><strong>Customer Name:</strong> ${formData.name}</div>
            <div class="field"><strong>Phone:</strong> ${formData.phone}</div>
            <div class="field"><strong>Email:</strong> ${formData.email || 'Not provided'}</div>
            <div class="field"><strong>Location:</strong> ${formData.project_location || 'TBD'}</div>
            <div class="field"><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
          </div>
          
          ${productData ? `
          <div class="section">
            <h2>System Specifications</h2>
            <div class="field"><strong>System Size:</strong> ${productData.systemSize}</div>
            <div class="field"><strong>Components:</strong> ${productData.components}</div>
            <div class="field"><strong>Technology:</strong> Reliance HJT (Heterojunction) Solar Modules</div>
            <div class="field"><strong>Warranty:</strong> 25 Years Performance + 12 Years Product</div>
          </div>
          
          <div class="price-box">
            <div>Estimated System Cost</div>
            <div class="amount">₹${totalPrice.toLocaleString()}</div>
            <div style="font-size: 14px; color: #6b7280; margin-top: 5px;">*Final pricing subject to site survey</div>
          </div>
          
          <div class="highlights">
            <h3 style="margin-top: 0; color: #2563eb;">Key Benefits</h3>
            <div class="field"><strong>Monthly Generation:</strong> ~${productData.monthlyGeneration} kWh</div>
            <div class="field"><strong>Annual Savings:</strong> ~₹${annualSavings.toLocaleString()}</div>
            <div class="field"><strong>Payback Period:</strong> ${productData.paybackPeriod} years</div>
            <div class="field"><strong>25-Year Savings:</strong> ~₹${Math.round(annualSavings * 25).toLocaleString()}</div>
          </div>
          ` : `
          <div class="section">
            <h2>System Details</h2>
            <div class="field"><strong>Product:</strong> ${formData.product_name || 'Reliance HJT Solar Solution'}</div>
            <div class="field"><strong>Power Demand:</strong> ${formData.power_demand_kw || 'TBD'} kW</div>
            <div class="field"><strong>Monthly Bill:</strong> ₹${formData.monthly_bill || 'TBD'}</div>
          </div>
          `}
          
          <div style="margin-top: 30px; padding: 20px; background: #f9fafb; border-radius: 8px; text-align: center; font-size: 14px; color: #6b7280;">
            <p><strong>Next Steps:</strong> Our technical team will contact you within 24 hours for a detailed site assessment and final quotation.</p>
            <p>Contact: +91 90445 55572 | Email: info@arpitsolarshop.com</p>
          </div>
        </div>
      </div>
    </body>
    </html>`;
}

function generateShaktiHTML(formData: QuoteFormData): string {
  const productData = findProductData(formData, 'shakti');
  const totalPrice = productData ? Math.round(productData.pricePerWatt * parseFloat(productData.systemSize.replace(' kWp', ''))) : 'Contact for pricing';
  const annualSavings = productData ? Math.round(productData.monthlyGeneration * 12 * 7.5) : 'TBD';
  
  return `<!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 20px; background: #f8fafc; }
        .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #16a085, #27ae60); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
        .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
        .content { padding: 30px; }
        .section { margin-bottom: 25px; }
        .section h2 { color: #16a085; font-size: 20px; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; }
        .field { margin: 12px 0; padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
        .field:last-child { border-bottom: none; }
        .field strong { color: #374151; display: inline-block; width: 180px; }
        .highlights { background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #16a085; }
        .price-box { background: #dcfce7; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
        .price-box .amount { font-size: 24px; font-weight: bold; color: #059669; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Shakti Solar Quotation</h1>
          <p>Arpit Solar Shop - Authorized Dealer</p>
        </div>
        <div class="content">
          <div class="section">
            <h2>Customer Information</h2>
            <div class="field"><strong>Customer Name:</strong> ${formData.name}</div>
            <div class="field"><strong>Phone:</strong> ${formData.phone}</div>
            <div class="field"><strong>Email:</strong> ${formData.email || 'Not provided'}</div>
            <div class="field"><strong>Location:</strong> ${formData.project_location || 'TBD'}</div>
            <div class="field"><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
          </div>
          
          ${productData ? `
          <div class="section">
            <h2>System Specifications</h2>
            <div class="field"><strong>System Size:</strong> ${productData.systemSize}</div>
            <div class="field"><strong>Components:</strong> ${productData.components}</div>
            <div class="field"><strong>Technology:</strong> Shakti Solar PERC Mono Crystalline Modules</div>
            <div class="field"><strong>Warranty:</strong> 25 Years Performance + 12 Years Product</div>
          </div>
          
          <div class="price-box">
            <div>Estimated System Cost</div>
            <div class="amount">₹${totalPrice.toLocaleString()}</div>
            <div style="font-size: 14px; color: #6b7280; margin-top: 5px;">*Final pricing subject to site survey</div>
          </div>
          
          <div class="highlights">
            <h3 style="margin-top: 0; color: #16a085;">Key Benefits</h3>
            <div class="field"><strong>Monthly Generation:</strong> ~${productData.monthlyGeneration} kWh</div>
            <div class="field"><strong>Annual Savings:</strong> ~₹${annualSavings.toLocaleString()}</div>
            <div class="field"><strong>Payback Period:</strong> ${productData.paybackPeriod} years</div>
            <div class="field"><strong>25-Year Savings:</strong> ~₹${Math.round(annualSavings * 25).toLocaleString()}</div>
          </div>
          ` : `
          <div class="section">
            <h2>System Details</h2>
            <div class="field"><strong>Product:</strong> ${formData.product_name || 'Shakti Solar Solution'}</div>
            <div class="field"><strong>Power Demand:</strong> ${formData.power_demand_kw || 'TBD'} kW</div>
            <div class="field"><strong>Monthly Bill:</strong> ₹${formData.monthly_bill || 'TBD'}</div>
          </div>
          `}
          
          <div style="margin-top: 30px; padding: 20px; background: #f9fafb; border-radius: 8px; text-align: center; font-size: 14px; color: #6b7280;">
            <p><strong>Next Steps:</strong> Our technical team will contact you within 24 hours for a detailed site assessment and final quotation.</p>
            <p>Contact: +91 90445 55572 | Email: info@arpitsolarshop.com</p>
          </div>
        </div>
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

// Helper function to find product data based on system size and category
function findProductData(formData: QuoteFormData, category: string) {
  if (!formData.product_name) return null;
  
  // Extract kWp from product name (e.g., "2.14 kWp Solar System - 4 Modules")
  const systemSizeMatch = formData.product_name.match(/(\d+\.?\d*)\s*kWp/i);
  if (!systemSizeMatch) return null;
  
  const systemSize = `${systemSizeMatch[1]} kWp`;
  
  if (category === 'reliance') {
    // Check commercial first if customer_type is commercial
    if (formData.customer_type === 'commercial') {
      const commercialMatch = relianceCommercialData.find(item => item.systemSize === systemSize);
      if (commercialMatch) return commercialMatch;
    }
    // Then check residential
    return relianceResidentialData.find(item => item.systemSize === systemSize);
  } else if (category === 'shakti') {
    return shaktiResidentialData.find(item => item.systemSize === systemSize);
  }
  
  return null;
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
  
  // Clean and format phone number properly
  let cleanPhone = phone.replace(/[^\d]/g, ''); // Remove all non-digits
  
  // Add country code if missing
  if (!cleanPhone.startsWith('91') && cleanPhone.length === 10) {
    cleanPhone = '91' + cleanPhone;
  }
  
  // Ensure it starts with + for international format
  if (!cleanPhone.startsWith('+')) {
    cleanPhone = '+' + cleanPhone;
  }
  
  console.log('Sending WhatsApp template to:', cleanPhone);
  console.log('Sending PDF document via WhatsApp with URL:', pdfUrl);

  // Generate filename from PDF URL - extract only the actual filename without query parameters
  const urlParts = pdfUrl.split('/');
  const lastPart = urlParts[urlParts.length - 1] || '';
  // Remove query parameters (everything after '?') to get clean filename
  const fileName = lastPart.split('?')[0] || `quote-${formData.name.replace(/\s+/g, '-')}-${Date.now()}.pdf`;

  // Send template message WITH document attachment using quotation_document template
  const payload = {
    messages: [{
      to: cleanPhone,
      content: {
        templateName: "quotation_document",
        language: "en",
        templateData: {
          header: {
            type: "DOCUMENT",
            mediaUrl: pdfUrl,
            filename: fileName
          },
          body: {
            placeholders: []
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