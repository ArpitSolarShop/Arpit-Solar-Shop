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
  // Create a proper PDF using basic PDF structure
  const content = `POWERING INDIA'S ROOFTOPS
AUTHORISED CHANNEL PARTNER
ARPIT SOLAR SHOP

Ho: Sh16/114/25-K-2, Sharvodaya Nagar, Kadipur Shivpur, Varanasi 221003
Contact: 9005770466 | E-mail: arpitsolarshop@gmail.com

=======================================

To: ${formData.name}                    Date: ${new Date().toLocaleDateString()}
Phone: ${formData.phone}
${formData.email ? `Email: ${formData.email}` : ''}
${formData.project_location ? `Location: ${formData.project_location}` : ''}

QUOTATION

Subject: Roof Top Power Plant for ${formData.power_demand_kw || '3'}-KW 1 ph, Make- ${formData.product_category || 'Solar'}

PARTICULARS                CAPACITY(KW)    RATE         AMOUNT
Cost of solar             ${formData.power_demand_kw || '3'}         2,15,000.00   2,15,000/-
power system
GST charged@13.8%                                      Included
                         Total 100% of Cost           2,15,000.00

Rs. (Two Lakh Fifty Thousand only)          Name: Arpit Solar Shop

Subsidy Applicable                           A/c: 28660200000614
1) State Government = Rs 30,000/-            Bank: Bank of Baroda Shivpur, Varanasi
2) Central Subsidy = Rs 78,000/-             IFSC: BARB0SHIVBS

Subsidy rate may change as per Government regulations at the time of Disbursal.

TERMS AND CONDITIONS:
1. 50% Advance Structure should be installed.
2. 50% Before delivery of ${formData.product_category || 'Solar'} kit.
3. Net meter fee will be charged to consumer's electricity bill directly by Discom.
4. Structure elevation Charges & Civil Material is in Consumer's Scope.
5. Name change, load increment new connection will be charged extra.
6. GST-Applicable- 12% on 70% (Supply) of base value & 18% on 30% (Service) of base value.
7. We will facilitate (Submit Documents etc.) for replacing Net Meter.
8. For synchronizing with Grid power, voltage range should be between 185V to 275V.
9. Jio Remote monitoring Service 5Years.
10. Include 12Month Cleaning Once in a Month.
11. Delivery: Within 4 weeks from confirmed order and payment.
12. Installation: To be completed within 45 days from date of confirmed Purchase Order.
13. AC wire will be provided up to 10m. Extra wire charged as per actual.
14. Earthing wire provided up to 30m. Extra wire charged as per actual.
15. Warranty: Solar Module: 25 Years, PCU: 5 Years from date of supply.

For Arpit Solar Shop
Ratnesh Mishra
(Authorized Signatory)

(Customer acceptance with sign)

Generated on: ${new Date().toLocaleString()}
`;

  // Create a basic PDF structure
  const pdfHeader = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length ${content.length + 100}
>>
stream
BT
/F1 12 Tf
50 750 Td
`;

  const pdfContent = content.split('\n').map((line, index) => 
    `(${line.replace(/[()\\]/g, '\\$&')}) Tj 0 -15 Td`
  ).join('\n');

  const pdfFooter = `
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000110 00000 n 
0000000252 00000 n 
0000000350 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
410
%%EOF`;

  const fullPdf = pdfHeader + pdfContent + pdfFooter;
  return new TextEncoder().encode(fullPdf);
}

async function sendWhatsAppPDF(phone: string, pdfUrl: string, formData: QuoteFormData): Promise<any> {
  const doubleTick_API_KEY = "key_o6Dp7MBLIwKlpKHlqcf4VaI8eGEyGkWfp76gluNY0gjjd3T5EuUblUNsbgqGMzj7LZhDfwbuoLbDxU8LTGehJW1m0sSDhqDvf2GAw4puBEAfInI5qV13rWPjpNPrvw812bitePsseEFcnJavcAOlVfqqg0bJoOA15DI06zDAhOhbXai7xW7LFWt0DdDpuby7kWHGc3pcsRrCqUGPDRvnjfSfBtlMcxwXzLJyi27Y6Mh4hfjcyU1bu1eZBmGo";
  
  // Clean phone number (remove any non-digit characters except +)
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  
  // Format message with Arpit Solar Shop branding
  const message = `🌞 *ARPIT SOLAR SHOP* 🌞
POWERING INDIA'S ROOFTOPS

Hi ${formData.name}! 👋

Thank you for your interest in ${formData.product_category || 'our'} solar solutions! 

📋 Your personalized solar quote is ready:
${formData.solution_classification ? `• Solution Type: ${formData.solution_classification}` : ''}
${formData.power_demand_kw ? `• Power Demand: ${formData.power_demand_kw} kW` : ''}
${formData.estimated_area_sqft ? `• Installation Area: ${formData.estimated_area_sqft} sq ft` : ''}

📄 Please find your detailed quotation attached. Our team will contact you within 24 hours to discuss the next steps.

📍 ARPIT SOLAR SHOP
Address: Sh16/114/25-K-2, Sharvodaya Nagar, Kadipur Shivpur, Varanasi 221003
📞 Contact: 9005770466
📧 Email: arpitsolarshop@gmail.com

Best regards,
Arpit Solar Shop Team ☀️`;

  try {
    // Send document via DoubleTick API - using correct endpoint
    const response = await fetch('https://api.doubletick.io/whatsapp/message/document', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${doubleTick_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: cleanPhone,
        document_url: pdfUrl,
        filename: `Arpit_Solar_Quote_${formData.name.replace(/\s+/g, '_')}.pdf`,
        caption: message
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('DoubleTick API error:', result);
      
      // Try alternative endpoint if first one fails
      const altResponse = await fetch('https://api.doubletick.io/whatsapp/message/send-document', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${doubleTick_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: cleanPhone,
          document_url: pdfUrl,
          filename: `Arpit_Solar_Quote_${formData.name.replace(/\s+/g, '_')}.pdf`,
          caption: message
        }),
      });

      const altResult = await altResponse.json();
      
      if (!altResponse.ok) {
        console.error('Alternative DoubleTick API also failed:', altResult);
        throw new Error(`DoubleTick API error: ${altResult.message || result.message || 'Unknown error'}`);
      }
      
      console.log('WhatsApp message sent successfully via alternative endpoint:', altResult);
      return altResult;
    }

    console.log('WhatsApp message sent successfully:', result);
    return result;
    
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
}