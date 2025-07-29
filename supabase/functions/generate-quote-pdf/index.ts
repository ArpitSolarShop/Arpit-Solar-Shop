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
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formData }: { formData: QuoteFormData } = await req.json();
    console.log('Received form data:', formData);

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Generate PDF content using simple HTML to PDF approach
    const pdfBuffer = await generateQuotePDF(formData);
    
    // Upload PDF to Supabase Storage
    const fileName = `quote-${formData.name.replace(/\s+/g, '-')}-${Date.now()}.pdf`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('quote-pdfs')
      .upload(fileName, pdfBuffer, {
        contentType: 'application/pdf',
        cacheControl: '3600'
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      throw new Error(`Failed to upload PDF: ${uploadError.message}`);
    }

    console.log('PDF uploaded successfully:', uploadData);

    // Generate signed URL for the PDF
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from('quote-pdfs')
      .createSignedUrl(fileName, 3600); // 1 hour expiry

    if (signedUrlError) {
      console.error('Signed URL error:', signedUrlError);
      throw new Error(`Failed to generate signed URL: ${signedUrlError.message}`);
    }

    console.log('Signed URL generated:', signedUrlData.signedUrl);

    // Send PDF via DoubleTick WhatsApp API
    const whatsappResult = await sendWhatsAppPDF(formData.phone, signedUrlData.signedUrl, formData);
    
    console.log('WhatsApp API result:', whatsappResult);

    return new Response(JSON.stringify({ 
      success: true, 
      pdfUrl: signedUrlData.signedUrl,
      whatsappStatus: whatsappResult 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in generate-quote-pdf function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function generateQuotePDF(formData: QuoteFormData): Promise<Uint8Array> {
  // Create a simple HTML content for the PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Solar Quote - ${formData.name}</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                margin: 40px; 
                line-height: 1.6;
                color: #333;
            }
            .header { 
                text-align: center; 
                border-bottom: 2px solid #2563eb; 
                padding-bottom: 20px; 
                margin-bottom: 30px;
            }
            .logo { 
                font-size: 24px; 
                font-weight: bold; 
                color: #2563eb;
                margin-bottom: 10px;
            }
            .title { 
                font-size: 28px; 
                color: #1e40af; 
                margin: 20px 0;
            }
            .section { 
                margin: 25px 0; 
                padding: 20px;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
            }
            .section-title { 
                font-size: 18px; 
                font-weight: bold; 
                color: #374151;
                margin-bottom: 15px;
                border-bottom: 1px solid #d1d5db;
                padding-bottom: 5px;
            }
            .field { 
                margin: 10px 0; 
                display: flex;
            }
            .field-label { 
                font-weight: bold; 
                width: 200px;
                color: #4b5563;
            }
            .field-value { 
                color: #111827;
            }
            .product-info {
                background-color: #f3f4f6;
                padding: 15px;
                border-radius: 6px;
                margin: 15px 0;
            }
            .footer {
                margin-top: 40px;
                text-align: center;
                font-size: 12px;
                color: #6b7280;
                border-top: 1px solid #e5e7eb;
                padding-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="logo">${formData.product_category || 'Solar'} Solutions</div>
            <h1 class="title">Solar Quote Request</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>

        <div class="section">
            <h2 class="section-title">Customer Information</h2>
            <div class="field">
                <div class="field-label">Name:</div>
                <div class="field-value">${formData.name}</div>
            </div>
            <div class="field">
                <div class="field-label">Phone:</div>
                <div class="field-value">${formData.phone}</div>
            </div>
            ${formData.email ? `
            <div class="field">
                <div class="field-label">Email:</div>
                <div class="field-value">${formData.email}</div>
            </div>
            ` : ''}
            ${formData.entity_type ? `
            <div class="field">
                <div class="field-label">Entity Type:</div>
                <div class="field-value">${formData.entity_type}</div>
            </div>
            ` : ''}
            ${formData.project_location ? `
            <div class="field">
                <div class="field-label">Project Location:</div>
                <div class="field-value">${formData.project_location}</div>
            </div>
            ` : ''}
        </div>

        ${formData.product_name ? `
        <div class="section">
            <h2 class="section-title">Product Information</h2>
            <div class="product-info">
                <div class="field">
                    <div class="field-label">Product:</div>
                    <div class="field-value">${formData.product_name}</div>
                </div>
                <div class="field">
                    <div class="field-label">Category:</div>
                    <div class="field-value">${formData.product_category}</div>
                </div>
            </div>
        </div>
        ` : ''}

        <div class="section">
            <h2 class="section-title">Project Specifications</h2>
            ${formData.solution_classification ? `
            <div class="field">
                <div class="field-label">Solution Type:</div>
                <div class="field-value">${formData.solution_classification}</div>
            </div>
            ` : ''}
            ${formData.estimated_area_sqft ? `
            <div class="field">
                <div class="field-label">Installation Area:</div>
                <div class="field-value">${formData.estimated_area_sqft} sq ft</div>
            </div>
            ` : ''}
            ${formData.monthly_bill ? `
            <div class="field">
                <div class="field-label">Monthly Electricity Bill:</div>
                <div class="field-value">₹${formData.monthly_bill}</div>
            </div>
            ` : ''}
            ${formData.power_demand_kw ? `
            <div class="field">
                <div class="field-label">Power Demand:</div>
                <div class="field-value">${formData.power_demand_kw} kW</div>
            </div>
            ` : ''}
        </div>

        ${formData.referral_name ? `
        <div class="section">
            <h2 class="section-title">Referral Information</h2>
            <div class="field">
                <div class="field-label">Referred By:</div>
                <div class="field-value">${formData.referral_name}</div>
            </div>
            ${formData.referral_phone ? `
            <div class="field">
                <div class="field-label">Referral Phone:</div>
                <div class="field-value">${formData.referral_phone}</div>
            </div>
            ` : ''}
        </div>
        ` : ''}

        <div class="footer">
            <p>This is an automated quote request. Our team will contact you within 24 hours.</p>
            <p>Thank you for choosing solar energy solutions!</p>
        </div>
    </body>
    </html>
  `;

  // Use Puppeteer to generate PDF from HTML
  try {
    // Import puppeteer for Deno
    const puppeteer = await import("https://deno.land/x/puppeteer@16.2.0/mod.ts");
    
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm'
      },
      printBackground: true
    });
    
    await browser.close();
    
    return new Uint8Array(pdfBuffer);
  } catch (puppeteerError) {
    console.warn('Puppeteer failed, falling back to simple text-based PDF:', puppeteerError);
    
    // Fallback: Create a simple text-based PDF using basic approach
    return createSimplePDF(formData);
  }
}

function createSimplePDF(formData: QuoteFormData): Uint8Array {
  // Create a very basic PDF-like structure (this is a simplified approach)
  const content = `
Solar Quote Request

Customer Information:
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || 'Not provided'}
Entity Type: ${formData.entity_type || 'Not specified'}
Project Location: ${formData.project_location || 'Not specified'}

Product Information:
Product: ${formData.product_name || 'Not specified'}
Category: ${formData.product_category || 'Not specified'}

Project Specifications:
Solution Type: ${formData.solution_classification || 'Not specified'}
Installation Area: ${formData.estimated_area_sqft ? formData.estimated_area_sqft + ' sq ft' : 'Not specified'}
Monthly Bill: ${formData.monthly_bill ? '₹' + formData.monthly_bill : 'Not specified'}
Power Demand: ${formData.power_demand_kw ? formData.power_demand_kw + ' kW' : 'Not specified'}

${formData.referral_name ? `
Referral Information:
Referred By: ${formData.referral_name}
Referral Phone: ${formData.referral_phone || 'Not provided'}
` : ''}

Generated on: ${new Date().toLocaleString()}

This is an automated quote request. Our team will contact you within 24 hours.
Thank you for choosing solar energy solutions!
  `;

  // Convert text to Uint8Array (this is a very basic approach)
  return new TextEncoder().encode(content);
}

async function sendWhatsAppPDF(phone: string, pdfUrl: string, formData: QuoteFormData): Promise<any> {
  const doubleTick_API_KEY = "key_o6Dp7MBLIwKlpKHlqcf4VaI8eGEyGkWfp76gluNY0gjjd3T5EuUblUNsbgqGMzj7LZhDfwbuoLbDxU8LTGehJW1m0sSDhqDvf2GAw4puBEAfInI5qV13rWPjpNPrvw812bitePsseEFcnJavcAOlVfqqg0bJoOA15DI06zDAhOhbXai7xW7LFWt0DdDpuby7kWHGc3pcsRrCqUGPDRvnjfSfBtlMcxwXzLJyi27Y6Mh4hfjcyU1bu1eZBmGo";
  
  // Clean phone number (remove any non-digit characters except +)
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  
  // Format message
  const message = `Hi ${formData.name}! 👋

Thank you for your interest in ${formData.product_category || 'our'} solar solutions! 

We've generated your personalized solar quote based on your requirements:
${formData.solution_classification ? `• Solution Type: ${formData.solution_classification}` : ''}
${formData.power_demand_kw ? `• Power Demand: ${formData.power_demand_kw} kW` : ''}
${formData.estimated_area_sqft ? `• Installation Area: ${formData.estimated_area_sqft} sq ft` : ''}

Please find your detailed quote document attached. Our team will contact you within 24 hours to discuss the next steps.

Best regards,
Solar Solutions Team ☀️`;

  try {
    // Send document via DoubleTick API
    const response = await fetch('https://api.doubletick.io/whatsapp/message/document', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${doubleTick_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: cleanPhone,
        message: message,
        document_url: pdfUrl,
        filename: `Solar_Quote_${formData.name.replace(/\s+/g, '_')}.pdf`,
        caption: `Solar Quote for ${formData.name}`
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('DoubleTick API error:', result);
      throw new Error(`DoubleTick API error: ${result.message || 'Unknown error'}`);
    }

    console.log('WhatsApp message sent successfully:', result);
    return result;
    
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
}