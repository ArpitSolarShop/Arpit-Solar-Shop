// // Updated Deno serverless function with Reliance/Shakti PDF branching and URL shortening
// import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2.52.0";

// // Product data structures
// const shaktiResidentialData = [
//   { systemSize: "2.14 kWp", pricePerWatt: 45, monthlyGeneration: 270, paybackPeriod: 4.5, modules: 4, components: "4 x 535W Modules, 1 x 2kW Inverter, Mounting Structure, DC/AC Cables" },
//   { systemSize: "3.21 kWp", pricePerWatt: 43, monthlyGeneration: 400, paybackPeriod: 4.2, modules: 6, components: "6 x 535W Modules, 1 x 3kW Inverter, Mounting Structure, DC/AC Cables" },
//   { systemSize: "5.35 kWp", pricePerWatt: 41, monthlyGeneration: 670, paybackPeriod: 4.0, modules: 10, components: "10 x 535W Modules, 1 x 5kW Inverter, Mounting Structure, DC/AC Cables" },
//   { systemSize: "10.70 kWp", pricePerWatt: 39, monthlyGeneration: 1340, paybackPeriod: 3.8, modules: 20, components: "20 x 535W Modules, 1 x 10kW Inverter, Mounting Structure, DC/AC Cables" }
// ];

// const relianceResidentialData = [
//   { systemSize: "2.14 kWp", pricePerWatt: 48, monthlyGeneration: 280, paybackPeriod: 4.2, modules: 4, components: "4 x 535W HJT Modules, 1 x 2kW Inverter, Mounting Structure, DC/AC Cables" },
//   { systemSize: "3.21 kWp", pricePerWatt: 46, monthlyGeneration: 420, paybackPeriod: 4.0, modules: 6, components: "6 x 535W HJT Modules, 1 x 3kW Inverter, Mounting Structure, DC/AC Cables" },
//   { systemSize: "5.35 kWp", pricePerWatt: 44, monthlyGeneration: 700, paybackPeriod: 3.8, modules: 10, components: "10 x 535W HJT Modules, 1 x 5kW Inverter, Mounting Structure, DC/AC Cables" },
//   { systemSize: "10.70 kWp", pricePerWatt: 42, monthlyGeneration: 1400, paybackPeriod: 3.6, modules: 20, components: "20 x 535W HJT Modules, 1 x 10kW Inverter, Mounting Structure, DC/AC Cables" }
// ];

// const relianceCommercialData = [
//   { systemSize: "25 kWp", pricePerWatt: 38, monthlyGeneration: 3250, paybackPeriod: 3.5, modules: 47, components: "47 x 535W HJT Modules, 1 x 25kW Inverter, Mounting Structure, DC/AC Cables" },
//   { systemSize: "50 kWp", pricePerWatt: 36, monthlyGeneration: 6500, paybackPeriod: 3.2, modules: 94, components: "94 x 535W HJT Modules, 2 x 25kW Inverters, Mounting Structure, DC/AC Cables" },
//   { systemSize: "100 kWp", pricePerWatt: 34, monthlyGeneration: 13000, paybackPeriod: 3.0, modules: 187, components: "187 x 535W HJT Modules, 4 x 25kW Inverters, Mounting Structure, DC/AC Cables" }
// ];

// const corsHeaders = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
// };

// interface QuoteFormData {
//   name: string;
//   phone: string;
//   email?: string;
//   entity_type?: string;
//   solution_classification?: string;
//   estimated_area_sqft?: number;
//   monthly_bill?: number;
//   power_demand_kw?: number;
//   project_location?: string;
//   referral_name?: string;
//   referral_phone?: string;
//   product_name?: string;
//   product_category?: string;
//   customer_type?: string;
// }

// serve(async (req: Request) => {
//   if (req.method === 'OPTIONS') {
//     return new Response(null, { headers: corsHeaders });
//   }

//   try {
//     const { formData }: { formData: QuoteFormData } = await req.json();
//     console.log('Received form data:', formData);

//     const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
//     const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
//     const supabase = createClient(supabaseUrl, supabaseServiceKey);

//     const pdfBuffer = await generateQuotePDF(formData);
//     const fileName = `quote-${formData.name.replace(/\s+/g, '-')}-${Date.now()}.pdf`;

//     const { data: uploadData, error: uploadError } = await supabase.storage
//       .from('quote-pdfs')
//       .upload(fileName, pdfBuffer, {
//         contentType: 'application/pdf',
//         cacheControl: '3600'
//       });

//     if (uploadError) throw new Error(`Failed to upload PDF: ${uploadError.message}`);

//     const { data: signedUrlData, error: signedUrlError } = await supabase.storage
//       .from('quote-pdfs')
//       .createSignedUrl(fileName, 3600);

//     if (signedUrlError) throw new Error(`Failed to generate signed URL: ${signedUrlError.message}`);

//     console.log('PDF uploaded successfully, attempting to send via WhatsApp');
//     // Pass fileName and formData to sendWhatsAppTemplate for URL shortening logic
//     const whatsappResult = await sendWhatsAppTemplate(formData.phone, signedUrlData.signedUrl, fileName, formData);

//     return new Response(JSON.stringify({
//       success: true,
//       pdfUrl: signedUrlData.signedUrl,
//       whatsappStatus: whatsappResult
//     }), {
//       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//     });

//   } catch (error: any) {
//     console.error('Error:', error);
//     return new Response(JSON.stringify({ error: error.message, success: false }), {
//       status: 500,
//       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//     });
//   }
// });

// async function generateQuotePDF(formData: QuoteFormData): Promise<Uint8Array> {
//   const category = formData.product_category?.toLowerCase() || '';
//   let htmlContent = '';

//   if (category.includes('reliance')) htmlContent = generateRelianceHTML(formData);
//   else if (category.includes('shakti')) htmlContent = generateShaktiHTML(formData);
//   else htmlContent = generateDefaultHTML(formData);

//   try {
//     const puppeteer = await import("https://deno.land/x/puppeteer@16.2.0/mod.ts");
//     const browser = await puppeteer.default.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
//     const page = await browser.newPage();
//     await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
//     const pdfBuffer = await page.pdf({
//       format: 'A4',
//       margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
//       printBackground: true
//     });
//     await browser.close();
//     return new Uint8Array(pdfBuffer);
//   } catch (e) {
//     console.warn('Puppeteer failed:', e);
//     return createSimplePDF(formData);
//   }
// }

// function generateRelianceHTML(formData: QuoteFormData): string {
//   const productData = findProductData(formData, 'reliance');
//   const totalPrice = productData ? Math.round(productData.pricePerWatt * parseFloat(productData.systemSize.replace(' kWp', ''))) : 'Contact for pricing';
//   const annualSavings = productData ? Math.round(productData.monthlyGeneration * 12 * 8) : 'TBD';

//   return `<!DOCTYPE html>
//     <html>
//     <head>
//       <style>
//         body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 20px; background: #f8fafc; }
//         .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
//         .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px; text-align: center; }
//         .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
//         .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
//         .content { padding: 30px; }
//         .section { margin-bottom: 25px; }
//         .section h2 { color: #2563eb; font-size: 20px; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; }
//         .field { margin: 12px 0; padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
//         .field:last-child { border-bottom: none; }
//         .field strong { color: #374151; display: inline-block; width: 180px; }
//         .highlights { background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; }
//         .price-box { background: #dcfce7; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
//         .price-box .amount { font-size: 24px; font-weight: bold; color: #059669; }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="header">
//           <h1>Reliance HJT Solar Quotation</h1>
//           <p>Arpit Solar Shop - Authorized Channel Partner</p>
//         </div>
//         <div class="content">
//           <div class="section">
//             <h2>Customer Information</h2>
//             <div class="field"><strong>Customer Name:</strong> ${formData.name}</div>
//             <div class="field"><strong>Phone:</strong> ${formData.phone}</div>
//             <div class="field"><strong>Email:</strong> ${formData.email || 'Not provided'}</div>
//             <div class="field"><strong>Location:</strong> ${formData.project_location || 'TBD'}</div>
//             <div class="field"><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
//           </div>

//           ${productData ? `
//           <div class="section">
//             <h2>System Specifications</h2>
//             <div class="field"><strong>System Size:</strong> ${productData.systemSize}</div>
//             <div class="field"><strong>Components:</strong> ${productData.components}</div>
//             <div class="field"><strong>Technology:</strong> Reliance HJT (Heterojunction) Solar Modules</div>
//             <div class="field"><strong>Warranty:</strong> 25 Years Performance + 12 Years Product</div>
//           </div>

//           <div class="price-box">
//             <div>Estimated System Cost</div>
//             <div class="amount">₹${totalPrice.toLocaleString()}</div>
//             <div style="font-size: 14px; color: #6b7280; margin-top: 5px;">*Final pricing subject to site survey</div>
//           </div>

//           <div class="highlights">
//             <h3 style="margin-top: 0; color: #2563eb;">Key Benefits</h3>
//             <div class="field"><strong>Monthly Generation:</strong> ~${productData.monthlyGeneration} kWh</div>
//             <div class="field"><strong>Annual Savings:</strong> ~₹${annualSavings.toLocaleString()}</div>
//             <div class="field"><strong>Payback Period:</strong> ${productData.paybackPeriod} years</div>
//             <div class="field"><strong>25-Year Savings:</strong> ~₹${Math.round(annualSavings * 25).toLocaleString()}</div>
//           </div>
//           ` : `
//           <div class="section">
//             <h2>System Details</h2>
//             <div class="field"><strong>Product:</strong> ${formData.product_name || 'Reliance HJT Solar Solution'}</div>
//             <div class="field"><strong>Power Demand:</strong> ${formData.power_demand_kw || 'TBD'} kW</div>
//             <div class="field"><strong>Monthly Bill:</strong> ₹${formData.monthly_bill || 'TBD'}</div>
//           </div>
//           `}

//           <div style="margin-top: 30px; padding: 20px; background: #f9fafb; border-radius: 8px; text-align: center; font-size: 14px; color: #6b7280;">
//             <p><strong>Next Steps:</strong> Our technical team will contact you within 24 hours for a detailed site assessment and final quotation.</p>
//             <p>Contact: +91 90445 55572 | Email: info@arpitsolarshop.com</p>
//           </div>
//         </div>
//       </div>
//     </body>
//     </html>`;
// }

// function generateShaktiHTML(formData: QuoteFormData): string {
//   const productData = findProductData(formData, 'shakti');
//   const totalPrice = productData ? Math.round(productData.pricePerWatt * parseFloat(productData.systemSize.replace(' kWp', ''))) : 'Contact for pricing';
//   const annualSavings = productData ? Math.round(productData.monthlyGeneration * 12 * 7.5) : 'TBD';

//   return `<!DOCTYPE html>
//     <html>
//     <head>
//       <style>
//         body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 20px; background: #f8fafc; }
//         .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
//         .header { background: linear-gradient(135deg, #16a085, #27ae60); color: white; padding: 30px; text-align: center; }
//         .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
//         .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
//         .content { padding: 30px; }
//         .section { margin-bottom: 25px; }
//         .section h2 { color: #16a085; font-size: 20px; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; }
//         .field { margin: 12px 0; padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
//         .field:last-child { border-bottom: none; }
//         .field strong { color: #374151; display: inline-block; width: 180px; }
//         .highlights { background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #16a085; }
//         .price-box { background: #dcfce7; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
//         .price-box .amount { font-size: 24px; font-weight: bold; color: #059669; }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="header">
//           <h1>Shakti Solar Quotation</h1>
//           <p>Arpit Solar Shop - Authorized Dealer</p>
//         </div>
//         <div class="content">
//           <div class="section">
//             <h2>Customer Information</h2>
//             <div class="field"><strong>Customer Name:</strong> ${formData.name}</div>
//             <div class="field"><strong>Phone:</strong> ${formData.phone}</div>
//             <div class="field"><strong>Email:</strong> ${formData.email || 'Not provided'}</div>
//             <div class="field"><strong>Location:</strong> ${formData.project_location || 'TBD'}</div>
//             <div class="field"><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
//           </div>

//           ${productData ? `
//           <div class="section">
//             <h2>System Specifications</h2>
//             <div class="field"><strong>System Size:</strong> ${productData.systemSize}</div>
//             <div class="field"><strong>Components:</strong> ${productData.components}</div>
//             <div class="field"><strong>Technology:</strong> Shakti Solar PERC Mono Crystalline Modules</div>
//             <div class="field"><strong>Warranty:</strong> 25 Years Performance + 12 Years Product</div>
//           </div>

//           <div class="price-box">
//             <div>Estimated System Cost</div>
//             <div class="amount">₹${totalPrice.toLocaleString()}</div>
//             <div style="font-size: 14px; color: #6b7280; margin-top: 5px;">*Final pricing subject to site survey</div>
//           </div>

//           <div class="highlights">
//             <h3 style="margin-top: 0; color: #16a085;">Key Benefits</h3>
//             <div class="field"><strong>Monthly Generation:</strong> ~${productData.monthlyGeneration} kWh</div>
//             <div class="field"><strong>Annual Savings:</strong> ~₹${annualSavings.toLocaleString()}</div>
//             <div class="field"><strong>Payback Period:</strong> ${productData.paybackPeriod} years</div>
//             <div class="field"><strong>25-Year Savings:</strong> ~₹${Math.round(annualSavings * 25).toLocaleString()}</div>
//           </div>
//           ` : `
//           <div class="section">
//             <h2>System Details</h2>
//             <div class="field"><strong>Product:</strong> ${formData.product_name || 'Shakti Solar Solution'}</div>
//             <div class="field"><strong>Power Demand:</strong> ${formData.power_demand_kw || 'TBD'} kW</div>
//             <div class="field"><strong>Monthly Bill:</strong> ₹${formData.monthly_bill || 'TBD'}</div>
//           </div>
//           `}

//           <div style="margin-top: 30px; padding: 20px; background: #f9fafb; border-radius: 8px; text-align: center; font-size: 14px; color: #6b7280;">
//             <p><strong>Next Steps:</strong> Our technical team will contact you within 24 hours for a detailed site assessment and final quotation.</p>
//             <p>Contact: +91 90445 55572 | Email: info@arpitsolarshop.com</p>
//           </div>
//         </div>
//       </div>
//     </body>
//     </html>`;
// }

// function generateDefaultHTML(formData: QuoteFormData): string {
//   return `<!DOCTYPE html>
//     <html>
//     <head>
//       <style>
//         body { font-family: Arial, sans-serif; margin: 20px; }
//         .header { text-align: center; color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
//         .content { margin: 20px 0; }
//         .field { margin: 10px 0; }
//       </style>
//     </head>
//     <body>
//       <div class="header">
//         <h1>Solar Quotation</h1>
//         <p>Arpit Solar Shop</p>
//       </div>
//     </body>
//     </html>`;
// }

// // Helper function to find product data based on system size and category
// function findProductData(formData: QuoteFormData, category: string) {
//   if (!formData.product_name) return null;

//   // Extract kWp from product name (e.g., "2.14 kWp Solar System - 4 Modules")
//   const systemSizeMatch = formData.product_name.match(/(\d+\.?\d*)\s*kWp/i);
//   if (!systemSizeMatch) return null;

//   const systemSize = `${systemSizeMatch[1]} kWp`;

//   if (category === 'reliance') {
//     // Check commercial first if customer_type is commercial
//     if (formData.customer_type === 'commercial') {
//       const commercialMatch = relianceCommercialData.find(item => item.systemSize === systemSize);
//       if (commercialMatch) return commercialMatch;
//     }
//     // Then check residential
//     return relianceResidentialData.find(item => item.systemSize === systemSize);
//   } else if (category === 'shakti') {
//     return shaktiResidentialData.find(item => item.systemSize === systemSize);
//   }

//   return null;
// }

// function createSimplePDF(formData: QuoteFormData): Uint8Array {
//   // Create a basic PDF structure for fallback
//   const content = `%PDF-1.4
// 1 0 obj
// << /Type /Catalog /Pages 2 0 R >>
// endobj
// 2 0 obj
// << /Type /Pages /Kids [3 0 R] /Count 1 >>
// endobj
// 3 0 obj
// << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
// endobj
// 4 0 obj
// << /Length 200 >>
// stream
// BT
// /F1 12 Tf
// 50 750 Td
// (QUOTATION) Tj
// 0 -20 Td
// (Name: ${formData.name}) Tj
// 0 -20 Td
// (Phone: ${formData.phone}) Tj
// 0 -20 Td
// (Product: ${formData.product_name || 'Solar Solution'}) Tj
// 0 -20 Td
// (Date: ${new Date().toLocaleDateString()}) Tj
// ET
// endstream
// endobj
// 5 0 obj
// << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
// endobj
// xref
// 0 6
// 0000000000 65535 f
// 0000000010 00000 n
// 0000000053 00000 n
// 0000000110 00000 n
// 0000000252 00000 n
// 0000000504 00000 n
// trailer
// << /Size 6 /Root 1 0 R >>
// startxref
// 561
// %%EOF`;

//   return new TextEncoder().encode(content);
// }

// // Updated function to send WhatsApp template with document and URL shortening logic
// async function sendWhatsAppTemplate(phone: string, pdfUrl: string, fileName: string, formData: QuoteFormData): Promise<any> {
//   const API_KEY = "key_o6Dp7MBLIwKlpKHlqcf4VaI8eGEyGkWfp76gluNY0gjjd3T5EuUblUNsbgqGMzj7LZhDfwbuoLbDxU8LTGehJW1m0sSDhqDvf2GAw4puBEAfInI5qV13rWPjpNPrvw812bitePsseEFcnJavcAOlVfqqg0bJoOA15DI06zDAhOhbXai7xW7LFWt0DdDpuby7kWHGc3pcsRrCqUGPDRvnjfSfBtlMcxwXzLJyi27Y6Mh4hfjcyU1bu1eZBmGo";
//   const SENDER_NUMBER = "+919044555572";
  
//   // Clean and format phone number properly
//   let cleanPhone = phone.replace(/[^\d]/g, ''); // Remove all non-digits

//   // Add country code if missing
//   if (!cleanPhone.startsWith('91') && cleanPhone.length === 10) {
//     cleanPhone = '91' + cleanPhone;
//   }

//   // Ensure it starts with + for international format
//   if (!cleanPhone.startsWith('+')) {
//     cleanPhone = '+' + cleanPhone;
//   }

//   console.log('Sending WhatsApp template to:', cleanPhone);
//   console.log('PDF stored but not being sent to customer as requested');

//   // Send template message WITHOUT document attachment (as requested)
//   const payload = {
//     messages: [{
//       to: cleanPhone,
//       from: SENDER_NUMBER,
//       content: {
//         templateName: "personalized_quotation_from_arpit_solar_shop_web_v2",
//         language: "en",
//         templateData: {
//           body: {
//             placeholders: [
//               formData.name,
//               formData.product_category || 'solar solution'
//             ]
//           }
//         }
//       }
//     }]
//   };

//   console.log('Sending payload:', JSON.stringify(payload, null, 2));

//   try {
//     const response = await fetch('https://public.doubletick.io/whatsapp/message/template', {
//       method: 'POST',
//       headers: {
//         'Authorization': API_KEY,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     });

//     const result = await response.json();
//     console.log('DoubleTick API response status:', response.status);
//     console.log('DoubleTick API response:', result);

//     if (!response.ok) {
//       throw new Error(`DoubleTick API error (${response.status}): ${result.message || response.statusText}`);
//     }

//     return result;
//   } catch (error) {
//     console.error('DoubleTick send error:', error);
//     throw error;
//   }
// }







































// Updated Deno serverless function with Reliance/Shakti PDF branching and URL shortening
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
    // Pass fileName and formData to sendWhatsAppTemplate for URL shortening logic
    const whatsappResult = await sendWhatsAppTemplate(formData.phone, signedUrlData.signedUrl, fileName, formData);

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

  if (category.includes('reliance')) htmlContent = getRelianceQuotationHtml(formData);
  else if (category.includes('shakti')) htmlContent = getSaktiQuotationHtml(formData);
  else htmlContent = generateDefaultHTML(formData); // Keep fallback for unknown categories

  try {
    const puppeteer = await import("https://deno.land/x/puppeteer@16.2.0/mod.ts");
    const browser = await puppeteer.default.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: { top: '0', right: '0', bottom: '0', left: '0' }, // Margins are now controlled by HTML/CSS
      printBackground: true
    });
    await browser.close();
    return new Uint8Array(pdfBuffer);
  } catch (e) {
    console.warn('Puppeteer failed:', e);
    // Fallback to simple PDF if Puppeteer fails - this will be very basic and unstyled.
    // For a production system, ensuring Puppeteer runs reliably (e.g., correct environment, sufficient resources) is critical.
    return createSimplePDF(formData);
  }
}

// --- Helper for Populating HTML Templates ---
function populateHtmlTemplate(template: string, data: Record<string, string>): string {
    let populatedHtml = template;
    for (const key in data) {
        const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
        populatedHtml = populatedHtml.replace(regex, data[key]);
    }
    return populatedHtml;
}

// --- HTML Templates as constants ---

const RELIANCE_QUOTATION_HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solar Power Generation System Quotation</title>
    <style>
        /* Note: Relying on Google Fonts via @import requires internet access during PDF generation.
           For absolute offline reliability, fonts can be base64 encoded and embedded directly into CSS,
           but this increases HTML file size. */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        /* Base Styles */
        body {
            font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
            margin: 0;
            padding-top: 100px; /* Space for fixed header */
            padding-bottom: 70px; /* Space for fixed footer */
            background: #fdfdfd;
            color: #333;
            font-size: 11pt; /* Base font size for PDF */
            line-height: 1.6;
        }

        .document {
            max-width: 21cm; /* A4 width */
            margin: 0 auto; /* Center the document */
            box-shadow: 0 0 10px rgba(0,0,0,0.05);
            position: relative;
            background: white;
            padding: 0 30px;
            box-sizing: border-box;
        }

        /* Header */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 30px;
            border-bottom: 2px solid #e0e7ff;
            background-color: #f8faff;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            box-sizing: border-box;
        }
        .header .logo {
            height: 60px; /* Adjust logo size */
            width: auto;
        }
        .header .logo.left { margin-right: auto; }
        .header .logo.right { margin-left: auto; }

        /* Main Content Styling */
        .content {
            padding: 0;
        }

        h1 {
            font-size: 24pt;
            color: #1a237e;
            text-align: center;
            margin-top: 20px;
            margin-bottom: 30px;
            border-bottom: 3px solid #3f51b5;
            padding-bottom: 10px;
            font-weight: 700;
        }

        h2 {
            font-size: 16pt;
            color: #3f51b5;
            margin-top: 30px;
            margin-bottom: 15px;
            border-bottom: 1px solid #c5cae9;
            padding-bottom: 5px;
            font-weight: 600;
        }

        h3 {
            font-size: 14pt;
            color: #5c6bc0;
            margin-top: 25px;
            margin-bottom: 10px;
            font-weight: 600;
        }

        p {
            margin-bottom: 10px;
        }

        ul {
            list-style-type: disc;
            margin-left: 20px;
            margin-bottom: 15px;
        }
        ul li {
            margin-bottom: 5px;
        }
        ul.alpha-list {
            list-style-type: lower-alpha;
        }

        strong {
            font-weight: 600;
        }

        /* Tables */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            font-size: 10.5pt;
        }
        table th, table td {
            border: 1px solid #e0e0e0;
            padding: 10px 12px;
            text-align: left;
        }
        table th {
            background-color: #e8eaf6;
            color: #3f51b5;
            font-weight: 600;
            text-transform: uppercase;
        }
        table td {
            background-color: #ffffff;
        }
        table tr:nth-child(even) td {
            background-color: #f7f8fc;
        }
        .table-note {
            font-size: 9.5pt;
            color: #616161;
            margin-top: -15px;
            margin-bottom: 15px;
            padding-left: 5px;
        }
        .table-financials td:nth-child(2),
        .table-financials td:nth-child(3),
        .table-financials td:nth-child(4) {
            text-align: right;
            font-family: 'Inter', monospace;
        }
        .table-financials th:nth-child(2),
        .table-financials th:nth-child(3),
        .table-financials th:nth-child(4) {
            text-align: right;
        }
        .total-row {
            font-weight: 700;
            background-color: #e8eaf6 !important;
        }
        .total-row td {
             border-top: 2px solid #3f51b5;
        }


        /* Specific Sections */
        .overview-box {
            background-color: #e3f2fd;
            border-left: 5px solid #2196f3;
            padding: 20px;
            margin-bottom: 30px;
            border-radius: 5px;
        }
        .overview-box p {
            margin: 0;
            font-size: 12pt;
            color: #1e88e5;
            font-weight: 500;
        }

        .highlights {
            background: #e8f5e9; /* Light green background */
            padding: 20px;
            border-radius: 8px;
            border-left: 5px solid #4CAF50; /* Green left border */
            margin-top: 30px;
            margin-bottom: 30px;
            page-break-inside: avoid;
        }
        .highlights h3 {
            margin-top: 0;
            color: #388E3C; /* Darker green for heading */
            border-bottom: 1px solid #A5D6A7;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        .highlights .field {
            margin: 8px 0;
            padding: 4px 0;
        }
        .highlights .field strong {
            display: inline-block;
            width: 160px; /* Align labels */
            color: #333;
        }


        .note {
            background-color: #fffde7;
            border-left: 4px solid #ffca28;
            padding: 15px;
            margin-top: 20px;
            margin-bottom: 20px;
            border-radius: 4px;
            font-size: 10.5pt;
            color: #757575;
        }

        /* Footer */
        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 10px 30px;
            font-size: 8.5pt;
            color: #555;
            text-align: center;
            border-top: 1px solid #ccc;
            background: #f0f0f0;
            box-sizing: border-box;
            z-index: 1000;
        }
        .footer p {
            margin: 3px 0;
            line-height: 1.3;
        }
        .footer a {
            color: #3f51b5;
            text-decoration: none;
        }

        /* Page Break Control for Puppeteer */
        .page-break-after {
            page-break-after: always;
        }
        .avoid-break {
            page-break-inside: avoid;
        }
        .section-content {
            page-break-inside: avoid;
        }

        /* Customer Acceptance */
        .customer-acceptance {
            margin-top: 50px;
            padding-top: 30px;
            border-top: 1px dashed #999;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            font-size: 10.5pt;
            page-break-before: auto;
            page-break-inside: avoid;
        }
        .customer-acceptance div {
            width: 48%;
        }
        .customer-acceptance .signature-line {
            border-bottom: 1px solid #333;
            padding-bottom: 5px;
            margin-top: 60px;
        }
        .customer-acceptance p {
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="https://via.placeholder.com/150x60?text=Your+Company+Logo" alt="Arpit Solar Shop Logo" class="logo left">
        <img src="https://via.placeholder.com/150x60?text=Reliance+Logo" alt="Reliance New Energy Logo" class="logo right">
    </div>

    <div class="document">
        <div class="content">
            <h1>Quotation for Solar Power Generation System</h1>

            <div class="overview-box avoid-break">
                <p><strong>Proposed Solution:</strong> {{product_name}}</p>
                <p>We propose the installation of a cutting-edge solar power generation system utilizing advanced Reliance New Energy HJT NDCR (Non-Destructive Cell Reconstruction) solar modules. This system is meticulously designed for commercial applications, offering unparalleled performance, efficiency, and exceptional longevity, ensuring a superior return on your investment.</p>
            </div>

            <div class="section-content">
                <h2>1. Customer & Project Details</h2>
                <p><strong>Customer Name:</strong> {{name}}</p>
                <p><strong>Contact Number:</strong> {{phone}}</p>
                <p><strong>Project Location:</strong> {{project_location}}</p>
                <p><strong>Date of Quotation:</strong> {{date}}</p>
                <p>This quotation outlines the specifications and financial proposal for a high-performance solar power generation system by Arpit Solar Shop, featuring Reliance New Energy's state-of-the-art HJT NDCR solar modules and robust Hot-Dip Galvanized structures. This solution is engineered for optimal energy yield and durability, specifically tailored for commercial establishments seeking sustainable and efficient energy independence.</p>
            </div>

            <div class="section-content">
                <h2>2. Briefing on Key Technologies</h2>
                <ul class="alpha-list">
                    <li>
                        <h3>a) Heterojunction (HJT) Technology:</h3>
                        <p>Heterojunction Technology (HJT) represents a significant leap forward in solar cell efficiency, combining the best attributes of crystalline silicon and amorphous silicon technologies. This innovative approach yields superior performance characteristics:</p>
                        <ul>
                            <li><strong>Higher Efficiency:</strong> HJT cells achieve superior conversion efficiencies by minimizing energy losses due to electron recombination. They typically offer average efficiencies above 23%, significantly surpassing traditional PERC (Passivated Emitter and Rear Cell) technology.</li>
                            <li><strong>Excellent Performance at Higher Temperatures:</strong> HJT modules exhibit a remarkably lower temperature coefficient, meaning their efficiency degrades less significantly at elevated temperatures. This characteristic makes them particularly well-suited for warmer climates like India, ensuring consistent power output even during peak heat.</li>
                            <li><strong>Enhanced Bifacial Performance:</strong> Many HJT modules are bifacial by design, capable of absorbing sunlight from both the front and rear sides. This capability substantially increases overall energy generation, especially when installed in environments where reflected light (from rooftops, ground, etc.) can be effectively captured.</li>
                            <li><strong>Superior Durability and Longevity:</strong> The unique cell structure and advanced passivation layers in HJT panels significantly reduce degradation mechanisms such as Potential Induced Degradation (PID) and Light-Induced Degradation (LID). This leads to an extended operational lifespan, often exceeding 25-30 years, ensuring long-term reliability.</li>
                            <li><strong>Improved Low-Light Performance:</strong> HJT cells are engineered to generate power even in challenging low-light conditions, such as early mornings, late evenings, and cloudy days. This extends the daily energy harvest, maximizing the system's output throughout the day.</li>
                        </ul>
                    </li>
                    <li>
                        <h3>b) Hot-Dip Galvanized (HDG) Structure:</h3>
                        <p>The solar mounting structure will be meticulously fabricated from Hot-Dip Galvanized (HDG) steel. This proven process involves immersing fabricated steel components in a bath of molten zinc, resulting in a metallurgically bonded coating. This robust coating provides unparalleled protection against corrosion, offering a myriad of benefits:</p>
                        <ul>
                            <li><strong>Superior Corrosion Resistance:</strong> The zinc coating acts as a sacrificial barrier, effectively preventing rust and significantly extending the lifespan of the mounting structure. This ensures the structural integrity of your solar installation for decades, even in highly corrosive or harsh environmental conditions.</li>
                            <li><strong>High Strength and Durability:</strong> HDG steel structures are renowned for their exceptional structural integrity and robust design. They are engineered to effectively withstand high wind loads, seismic activity, and various other environmental stresses, safeguarding your investment.</li>
                            <li><strong>Low Maintenance:</strong> Due to its inherent and superior corrosion resistance, HDG structures require minimal to no maintenance throughout their extensive service life. This significantly reduces operational costs and the need for periodic inspections or repairs.</li>
                            <li><strong>Sustainability:</strong> Both steel and zinc are 100% recyclable materials, making HDG structures an environmentally conscious and sustainable choice for your solar installation. This aligns with modern ecological standards and contributes to a greener future.</li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="page-break-after"></div>

            <div class="section-content">
                <h2>3. Scope of Work & Inclusions: Complete Kit Components</h2>
                <p>The following is meticulously included in this comprehensive quotation, encompassing our complete scope of supply for your solar system package:</p>
                <ul>
                    <li><strong>Design & Engineering:</strong> Detailed system design and precise engineering tailored specifically to your site requirements, ensuring optimal performance and integration.</li>
                    <li><strong>Supply of Components:</strong> Provision of all high-quality components necessary for a complete and operational solar power system:
                        <ul class="alpha-list">
                            <li>Reliance New Energy HJT NDCR Solar PV Modules (690-720 Wp)</li>
                            <li>High-efficiency Solar Inverter (specific to system size)</li>
                            <li>Hot-Dip Galvanized (HDG) Mounting Structure – engineered for durability and corrosion resistance.</li>
                            <li>Net metering equipment (excluding actual net meter, which is typically provided by DISCOM)</li>
                            <li>All necessary DC and AC cables, connectors, earthing kits, lightning arrestors, and other balance of system components required for a safe and efficient installation.</li>
                        </ul>
                    </li>
                    <li><strong>Installation:</strong> Professional, certified installation of the entire solar power generation system by our highly trained and experienced technicians, adhering to the highest safety and quality standards.</li>
                    <li><strong>Testing & Commissioning:</strong> Comprehensive testing and meticulous commissioning of the entire system to verify optimal performance, safety, and grid synchronization.</li>
                    <li><strong>Approvals & Documentation:</strong> Dedicated assistance with securing all necessary government approvals and detailed documentation required for grid connectivity and compliance (if applicable).</li>
                    <li><strong>Warranty:</strong> Robust warranty coverage for your peace of mind:
                        <ul class="alpha-list">
                            <li>30-year performance warranty on Reliance New Energy HJT solar panels, guaranteeing long-term energy output.</li>
                            <li>5-year complete system warranty (including inverter and workmanship).</li>
                            <li>10-year inverter warranty, ensuring the reliability of the system's core component.</li>
                        </ul>
                    </li>
                </ul>

                <h3>Component Breakdown (Illustrative - final BOQ based on site survey):</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Component</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>1</td><td>Module</td><td>RIL 690-720 Wp Module - Silicon</td><td>{{module_quantity}} Nos.</td><td>Included</td></tr>
                        <tr><td>2</td><td>Inverter</td><td>{{inverter_type_display}}</td><td>1 Unit</td><td>Included</td></tr>
                        <tr><td>3</td><td>ACDB</td><td>ACDB, IP65 Protected with MCB 4P</td><td>1 Nos.</td><td>Included</td></tr>
                        <tr><td>4</td><td>MC4 Connector</td><td>Male & female (both)</td><td>As per requirement</td><td>Included</td></tr>
                        <tr><td>5</td><td>Monitoring Device</td><td>Network device, with 5 year of network service</td><td>1 Unit</td><td>Included</td></tr>
                        <tr><td>6</td><td>MMS</td><td>Mounting Structure</td><td>1 Set</td><td>Included</td></tr>
                        <tr><td>7</td><td>AC Cables</td><td>Copper / Aluminium (as per design)</td><td>As per design</td><td>Included</td></tr>
                        <tr><td>8</td><td>DC Cables</td><td>Solar Cables</td><td>As per design</td><td>Included</td></tr>
                        <tr><td>9</td><td>Earthing Kit</td><td>Main & Module Earthing</td><td>As per design</td><td>Included</td></tr>
                        <tr><td>10</td><td>Lightning Arrester</td><td>Unit</td><td>1 Unit</td><td>Included</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="page-break-after"></div>

            <div class="section-content">
                <h2>4. (a) Bill of Quantity (BOQ) - Illustrative</h2>
                <p>The following table provides an illustrative Bill of Quantity. The final BOQ will be provided after a detailed site survey and engineering design to accurately reflect your project's specific needs.</p>
                <table>
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Description</th>
                            <th>Unit</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>1</td><td>Reliance New Energy 690 Wp HJT NDCR Solar Modules</td><td>Nos.</td><td>{{module_quantity}}</td></tr>
                        <tr><td>2</td><td>On-Grid Solar Inverter {{inverter_size_kw}}KW 1PH</td><td>Unit</td><td>1</td></tr>
                        <tr><td>3</td><td>Hot-Dip Galvanized (HDG) Mounting Structure</td><td>Set</td><td>1</td></tr>
                        <tr><td>4</td><td>AC Distribution Box (ACDB)</td><td>Unit</td><td>1</td></tr>
                        <tr><td>5</td><td>DC Distribution Box (DCDB)</td><td>Unit</td><td>1</td></tr>
                        <tr><td>6</td><td>AC Cables (Inverter to ACDB Copper, ACDB to Load Aluminium)</td><td>Meter</td><td>As per site</td></tr>
                        <tr><td>7</td><td>DC Cables (Solar Panels to DCDB)</td><td>Meter</td><td>As per site</td></tr>
                        <tr><td>8</td><td>Earthing Kit (Main & Module Earthing)</td><td>Set</td><td>As per site</td></tr>
                        <tr><td>9</td><td>Lightning Arrester</td><td>Unit</td><td>1</td></tr>
                        <tr><td>10</td><td>Installation, Testing & Commissioning</td><td>Lumpsum</td><td>1</td></tr>
                        <tr><td>11</td><td>Transportation</td><td>Lumpsum</td><td>1</td></tr>
                    </tbody>
                </table>
                <p class="table-note"><strong>Note:</strong> Excluding Net Metering equipment (typically provided by DISCOM).</p>

                <h2>4. (b) Financials & Performance Estimates</h2>
                <table class="table-financials">
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Unit Price (INR)</th>
                            <th>Total Price (INR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1.</td>
                            <td>{{system_size}} Reliance New Energy HJT NDCR Solar Power Generation System (Includes Modules, Inverter, HDG Structure, BOS, Installation, Testing & Commissioning)</td>
                            <td>1</td>
                            <td>₹ {{estimated_cost}}</td>
                            <td>₹ {{estimated_cost}}</td>
                        </tr>
                        <tr class="total-row">
                            <td colspan="4">Grand Total</td>
                            <td>₹ {{estimated_cost}}</td>
                        </tr>
                        <tr>
                            <td colspan="4">Applicable Taxes (GST @ 13.8%)</td>
                            <td>Including</td>
                        </tr>
                        <tr class="total-row">
                            <td colspan="4">TOTAL QUOTED PRICE (INR)</td>
                            <td>₹ {{estimated_cost}}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="highlights">
                    <h3>Key Benefits & Performance Projections:</h3>
                    <div class="field"><strong>Estimated Monthly Generation:</strong> ~{{monthly_generation}} kWh</div>
                    <div class="field"><strong>Estimated Annual Savings:</strong> ~₹{{annual_savings}}</div>
                    <div class="field"><strong>Estimated Payback Period:</strong> ~{{payback_period}} years</div>
                    <div class="field"><strong>Estimated 25-Year Savings:</strong> ~₹{{twenty_five_year_savings}}</div>
                </div>


                <div class="note avoid-break">
                    <p><strong>Note:</strong></p>
                    <ul>
                        <li>Prices are subject to change based on market fluctuations at the time of final order.</li>
                        <li>The above price is an estimate for an on-grid system. Pricing for off-grid or hybrid systems will will differ and will be provided upon specific request.</li>
                        <li>Performance projections are estimates based on average solar irradiance for Varanasi and typical system efficiency. Actual generation may vary based on specific site conditions, weather, and usage patterns.</li>
                    </ul>
                </div>
            </div>

            <div class="page-break-after"></div>

            <div class="section-content">
                <h2>5. Payment Terms</h2>
                <ul>
                    <li><strong>Advance Payment:</strong> 20% of the total quoted price upon acceptance of this quotation and signing of the agreement. Upon receipt of this advance, the structure fabrication work will commence.</li>
                    <li><strong>Second Instalment:</strong> 70% against Proforma Invoice before the main components (modules, inverter, major structure components) are dispatched to your site.</li>
                    <li><strong>Final Payment:</strong> 10% upon successful commissioning and hand-over of the complete solar power generation system, after all tests are verified and the system is fully operational.</li>
                </ul>
            </div>

            <div class="section-content">
                <h2>6. Project Timeline</h2>
                <ul>
                    <li><strong>System Delivery:</strong> Approximately 4-6 weeks from the date of advance payment and final design approval.</li>
                    <li><strong>Installation & Commissioning:</strong> Approximately 10-15 working days from the date of equipment delivery at your site, subject to site readiness and weather conditions.</li>
                </ul>
            </div>

            <div class="section-content">
                <p style="margin-top: 40px;">Sincerely,</p>
                <p>We are confident that this Reliance New Energy HJT solar power generation system, coupled with our professional installation and maintenance services, will prove to be a highly valuable, reliable, and sustainable investment for your property. This system is designed to provide significant energy savings and contribute positively to your environmental goals.</p>
                <p>Please feel free to contact us for any clarifications, to discuss custom requirements, or to schedule a detailed site visit at your earliest convenience. Our team is ready to assist you.</p>
                <p>Thank you for considering Arpit Solar Shop as your trusted solar partner. We look forward to powering your future with clean energy.</p>

                <div class="customer-acceptance">
                    <div>
                        <p style="margin-bottom: 5px;">For Arpit Solar Shop</p>
                        <p style="font-weight: 700; font-size: 12pt;">Ratnesh Mishra</p>
                        <p style="font-style: italic; margin-top: -5px;">(Proprietor)</p>
                        <p>M/s. Arpit Solar Shop</p>
                    </div>
                    <div>
                        <p>(Customer acceptance with sign)</p>
                        <div class="signature-line"></div>
                        <p style="font-size: 9pt; margin-top: 5px;">Name: __________________________</p>
                        <p style="font-size: 9pt;">Date: ___________________________</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <p><strong>M/s. Arpit Solar Shop</strong></p>
        <p>Authorized Channel Partner: Reliance New Energy</p>
        <p>Office: Sh16/114-25-K-2, Sharvodayanagar, Kadipur, Shivpur, Varanasi 221003(UP)</p>
        <p>Branches: Ballia | Gorakhpur</p>
        <p>Contact: <a href="tel:+919005770466">9005770466</a> | WA Chatbot: <a href="https://wa.me/919044555572">9044555572</a> | Email: <a href="mailto:info@arpitsolar.com">info@arpitsolar.com</a> | Web: <a href="https://www.arpitsolar.com" target="_blank">www.arpitsolar.com</a></p>
        <p>GSTIN: 09APKPM6299L1ZW</p>
    </div>
</body>
</html>`;

const SAKTI_QUOTATION_HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sakti Solar Power Generation System Quotation</title>
    <style>
        /* Note: Relying on Google Fonts via @import requires internet access during PDF generation.
           For absolute offline reliability, fonts can be base64 encoded and embedded directly into CSS,
           but this increases HTML file size. */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        /* Base Styles */
        body {
            font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
            margin: 0;
            padding-top: 100px; /* Space for fixed header */
            padding-bottom: 70px; /* Space for fixed footer */
            background: #fdfdfd;
            color: #333;
            font-size: 11pt; /* Base font size for PDF */
            line-height: 1.6;
        }

        .document {
            max-width: 21cm; /* A4 width */
            margin: 0 auto; /* Center the document */
            box-shadow: 0 0 10px rgba(0,0,0,0.05);
            position: relative;
            background: white;
            padding: 0 30px;
            box-sizing: border-box;
        }

        /* Header */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 30px;
            border-bottom: 2px solid #e0e7ff;
            background-color: #f8faff;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            box-sizing: border-box;
        }
        .header .logo {
            height: 60px;
            width: auto;
        }
        .header .logo.left { margin-right: auto; }
        .header .logo.right { margin-left: auto; }

        /* Main Content Styling */
        .content {
            padding: 0;
        }

        h1 {
            font-size: 24pt;
            color: #1a237e;
            text-align: center;
            margin-top: 20px;
            margin-bottom: 30px;
            border-bottom: 3px solid #3f51b5;
            padding-bottom: 10px;
            font-weight: 700;
        }

        h2 {
            font-size: 16pt;
            color: #3f51b5;
            margin-top: 30px;
            margin-bottom: 15px;
            border-bottom: 1px solid #c5cae9;
            padding-bottom: 5px;
            font-weight: 600;
        }

        h3 {
            font-size: 14pt;
            color: #5c6bc0;
            margin-top: 25px;
            margin-bottom: 10px;
            font-weight: 600;
        }

        p {
            margin-bottom: 10px;
        }

        ul {
            list-style-type: disc;
            margin-left: 20px;
            margin-bottom: 15px;
        }
        ul li {
            margin-bottom: 5px;
        }
        ul.alpha-list {
            list-style-type: lower-alpha;
        }

        strong {
            font-weight: 600;
        }

        /* Tables */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            font-size: 10.5pt;
        }
        table th, table td {
            border: 1px solid #e0e0e0;
            padding: 10px 12px;
            text-align: left;
        }
        table th {
            background-color: #e8eaf6;
            color: #3f51b5;
            font-weight: 600;
            text-transform: uppercase;
        }
        table td {
            background-color: #ffffff;
        }
        table tr:nth-child(even) td {
            background-color: #f7f8fc;
        }
        .table-note {
            font-size: 9.5pt;
            color: #616161;
            margin-top: -15px;
            margin-bottom: 15px;
            padding-left: 5px;
        }
        .table-financials td:nth-child(2),
        .table-financials td:nth-child(3),
        .table-financials td:nth-child(4) {
            text-align: right;
            font-family: 'Inter', monospace;
        }
        .table-financials th:nth-child(2),
        .table-financials th:nth-child(3),
        .table-financials th:nth-child(4) {
            text-align: right;
        }
        .total-row {
            font-weight: 700;
            background-color: #e8eaf6 !important;
        }
        .total-row td {
             border-top: 2px solid #3f51b5;
        }


        /* Specific Sections */
        .overview-box {
            background-color: #e3f2fd;
            border-left: 5px solid #2196f3;
            padding: 20px;
            margin-bottom: 30px;
            border-radius: 5px;
        }
        .overview-box p {
            margin: 0;
            font-size: 12pt;
            color: #1e88e5;
            font-weight: 500;
        }

        .highlights {
            background: #e8f5e9; /* Light green background */
            padding: 20px;
            border-radius: 8px;
            border-left: 5px solid #4CAF50; /* Green left border */
            margin-top: 30px;
            margin-bottom: 30px;
            page-break-inside: avoid;
        }
        .highlights h3 {
            margin-top: 0;
            color: #388E3C; /* Darker green for heading */
            border-bottom: 1px solid #A5D6A7;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        .highlights .field {
            margin: 8px 0;
            padding: 4px 0;
        }
        .highlights .field strong {
            display: inline-block;
            width: 160px; /* Align labels */
            color: #333;
        }


        .note {
            background-color: #fffde7;
            border-left: 4px solid #ffca28;
            padding: 15px;
            margin-top: 20px;
            margin-bottom: 20px;
            border-radius: 4px;
            font-size: 10.5pt;
            color: #757575;
        }

        /* Footer */
        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 10px 30px;
            font-size: 8.5pt;
            color: #555;
            text-align: center;
            border-top: 1px solid #ccc;
            background: #f0f0f0;
            box-sizing: border-box;
            z-index: 1000;
        }
        .footer p {
            margin: 3px 0;
            line-height: 1.3;
        }
        .footer a {
            color: #3f51b5;
            text-decoration: none;
        }

        /* Page Break Control for Puppeteer */
        .page-break-after {
            page-break-after: always;
        }
        .avoid-break {
            page-break-inside: avoid;
        }
        .section-content {
            page-break-inside: avoid;
        }

        /* Customer Acceptance */
        .customer-acceptance {
            margin-top: 50px;
            padding-top: 30px;
            border-top: 1px dashed #999;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            font-size: 10.5pt;
            page-break-before: auto;
            page-break-inside: avoid;
        }
        .customer-acceptance div {
            width: 48%;
        }
        .customer-acceptance .signature-line {
            border-bottom: 1px solid #333;
            padding-bottom: 5px;
            margin-top: 60px;
        }
        .customer-acceptance p {
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="https://via.placeholder.com/150x60?text=Your+Company+Logo" alt="Sakti Solar Logo" class="logo left">
        <img src="https://via.placeholder.com/150x60?text=Shakti+Solar+Logo" alt="Sakti Module Brand Logo" class="logo right">
    </div>

    <div class="document">
        <div class="content">
            <h1>Quotation for Solar Power Generation System</h1>

            <div class="overview-box avoid-break">
                <p><strong>Proposed Solution:</strong> {{product_name}}</p>
                <p>We propose the installation of a cutting-edge solar power generation system utilizing advanced Sakti HJT NDCR (Non-Destructive Cell Reconstruction) solar modules. This system is meticulously designed for commercial applications, offering unparalleled performance, efficiency, and exceptional longevity, ensuring a superior return on your investment.</p>
            </div>

            <div class="section-content">
                <h2>1. Customer & Project Details</h2>
                <p><strong>Customer Name:</strong> {{name}}</p>
                <p><strong>Contact Number:</strong> {{phone}}</p>
                <p><strong>Project Location:</strong> {{project_location}}</p>
                <p><strong>Date of Quotation:</strong> {{date}}</p>
                <p>This quotation outlines the specifications and financial proposal for a high-performance solar power generation system by Sakti Solar, featuring Sakti's state-of-the-art HJT NDCR solar modules and robust Hot-Dip Galvanized structures. This solution is engineered for optimal energy yield and durability, specifically tailored for commercial establishments seeking sustainable and efficient energy independence.</p>
            </div>

            <div class="section-content">
                <h2>2. Briefing on Key Technologies</h2>
                <ul class="alpha-list">
                    <li>
                        <h3>a) Heterojunction (HJT) Technology:</h3>
                        <p>Heterojunction Technology (HJT) represents a significant leap forward in solar cell efficiency, combining the best attributes of crystalline silicon and amorphous silicon technologies. This innovative approach yields superior performance characteristics:</p>
                        <ul>
                            <li><strong>Higher Efficiency:</strong> HJT cells achieve superior conversion efficiencies by minimizing energy losses due to electron recombination. They typically offer average efficiencies above 23%, significantly surpassing traditional PERC (Passivated Emitter and Rear Cell) technology.</li>
                            <li><strong>Excellent Performance at Higher Temperatures:</strong> HJT modules exhibit a remarkably lower temperature coefficient, meaning their efficiency degrades less significantly at elevated temperatures. This characteristic makes them particularly well-suited for warmer climates like India, ensuring consistent power output even during peak heat.</li>
                            <li><strong>Enhanced Bifacial Performance:</strong> Many HJT modules are bifacial by design, capable of absorbing sunlight from both the front and rear sides. This capability substantially increases overall energy generation, especially when installed in environments where reflected light (from rooftops, ground, etc.) can be effectively captured.</li>
                            <li><strong>Superior Durability and Longevity:</strong> The unique cell structure and advanced passivation layers in HJT panels significantly reduce degradation mechanisms such as Potential Induced Degradation (PID) and Light-Induced Degradation (LID). This leads to an extended operational lifespan, often exceeding 25-30 years, ensuring long-term reliability.</li>
                            <li><strong>Improved Low-Light Performance:</strong> HJT cells are engineered to generate power even in challenging low-light conditions, such as early mornings, late evenings, and cloudy days. This extends the daily energy harvest, maximizing the system's output throughout the day.</li>
                        </ul>
                    </li>
                    <li>
                        <h3>b) Hot-Dip Galvanized (HDG) Structure:</h3>
                        <p>The solar mounting structure will be meticulously fabricated from Hot-Dip Galvanized (HDG) steel. This proven process involves immersing fabricated steel components in a bath of molten zinc, resulting in a metallurgically bonded coating. This robust coating provides unparalleled protection against corrosion, offering a myriad of benefits:</p>
                        <ul>
                            <li><strong>Superior Corrosion Resistance:</strong> The zinc coating acts as a sacrificial barrier, effectively preventing rust and significantly extending the lifespan of the mounting structure. This ensures the structural integrity of your solar installation for decades, even in highly corrosive or harsh environmental conditions.</li>
                            <li><strong>High Strength and Durability:</strong> HDG steel structures are renowned for their exceptional structural integrity and robust design. They are engineered to effectively withstand high wind loads, seismic activity, and various other environmental stresses, safeguarding your investment.</li>
                            <li><strong>Low Maintenance:</strong> Due0 to its inherent and superior corrosion resistance, HDG structures require minimal to no maintenance throughout their extensive service life. This significantly reduces operational costs and the need for periodic inspections or repairs.</li>
                            <li><strong>Sustainability:</strong> Both steel and zinc are 100% recyclable materials, making HDG structures an environmentally conscious and sustainable choice for your solar installation. This aligns with modern ecological standards and contributes to a greener future.</li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="page-break-after"></div>

            <div class="section-content">
                <h2>3. Scope of Work & Inclusions: Complete Kit Components</h2>
                <p>The following is meticulously included in this comprehensive quotation, encompassing our complete scope of supply for your solar system package:</p>
                <ul>
                    <li><strong>Design & Engineering:</strong> Detailed system design and precise engineering tailored specifically to your site requirements, ensuring optimal performance and integration.</li>
                    <li><strong>Supply of Components:</strong> Provision of all high-quality components necessary for a complete and operational solar power system:
                        <ul class="alpha-list">
                            <li>Sakti HJT NDCR Solar PV Modules (690-720 Wp)</li>
                            <li>High-efficiency Solar Inverter (specific to system size)</li>
                            <li>Hot-Dip Galvanized (HDG) Mounting Structure – engineered for durability and corrosion resistance.</li>
                            <li>Net metering equipment (excluding actual net meter, which is typically provided by DISCOM)</li>
                            <li>All necessary DC and AC cables, connectors, earthing kits, lightning arrestors, and other balance of system components required for a safe and efficient installation.</li>
                        </ul>
                    </li>
                    <li><strong>Installation:</strong> Professional, certified installation of the entire solar power generation system by our highly trained and experienced technicians, adhering to the highest safety and quality standards.</li>
                    <li><strong>Testing & Commissioning:</strong> Comprehensive testing and meticulous commissioning of the entire system to verify optimal performance, safety, and grid synchronization.</li>
                    <li><strong>Approvals & Documentation:</strong> Dedicated assistance with securing all necessary government approvals and detailed documentation required for grid connectivity and compliance (if applicable).</li>
                    <li><strong>Warranty:</strong> Robust warranty coverage for your peace of mind:
                        <ul class="alpha-list">
                            <li>30-year performance warranty on Sakti HJT solar panels, guaranteeing long-term energy output.</li>
                            <li>5-year complete system warranty (including inverter and workmanship).</li>
                            <li>10-year inverter warranty, ensuring the reliability of the system's core component.</li>
                        </ul>
                    </li>
                </ul>

                <h3>Component Breakdown (Illustrative - final BOQ based on site survey):</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Component</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>1</td><td>Module</td><td>Sakti 690-720 Wp Module - Silicon</td><td>{{module_quantity}} Nos.</td><td>Included</td></tr>
                        <tr><td>2</td><td>Inverter</td><td>{{inverter_type_display}}</td><td>1 Unit</td><td>Included</td></tr>
                        <tr><td>3</td><td>ACDB</td><td>ACDB, IP65 Protected with MCB 4P</td><td>1 Nos.</td><td>Included</td></tr>
                        <tr><td>4</td><td>MC4 Connector</td><td>Male & female (both)</td><td>As per requirement</td><td>Included</td></tr>
                        <tr><td>5</td><td>Monitoring Device</td><td>Network device, with 5 year of network service</td><td>1 Unit</td><td>Included</td></tr>
                        <tr><td>6</td><td>MMS</td><td>Mounting Structure</td><td>1 Set</td><td>Included</td></tr>
                        <tr><td>7</td><td>AC Cables</td><td>Copper / Aluminium (as per design)</td><td>As per design</td><td>Included</td></tr>
                        <tr><td>8</td><td>DC Cables</td><td>Solar Cables</td><td>As per design</td><td>Included</td></tr>
                        <tr><td>9</td><td>Earthing Kit</td><td>Main & Module Earthing</td><td>As per design</td><td>Included</td></tr>
                        <tr><td>10</td><td>Lightning Arrester</td><td>Unit</td><td>1 Unit</td><td>Included</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="page-break-after"></div>

            <div class="section-content">
                <h2>4. (a) Bill of Quantity (BOQ) - Illustrative</h2>
                <p>The following table provides an illustrative Bill of Quantity. The final BOQ will be provided after a detailed site survey and engineering design to accurately reflect your project's specific needs.</p>
                <table>
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Description</th>
                            <th>Unit</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>1</td><td>Sakti 690 Wp HJT NDCR Solar Modules</td><td>Nos.</td><td>{{module_quantity}}</td></tr>
                        <tr><td>2</td><td>On-Grid Solar Inverter {{inverter_size_kw}}KW 1PH</td><td>Unit</td><td>1</td></tr>
                        <tr><td>3</td><td>Hot-Dip Galvanized (HDG) Mounting Structure</td><td>Set</td><td>1</td></tr>
                        <tr><td>4</td><td>AC Distribution Box (ACDB)</td><td>Unit</td><td>1</td></tr>
                        <tr><td>5</td><td>DC Distribution Box (DCDB)</td><td>Unit</td><td>1</td></tr>
                        <tr><td>6</td><td>AC Cables (Inverter to ACDB Copper, ACDB to Load Aluminium)</td><td>Meter</td><td>As per site</td></tr>
                        <tr><td>7</td><td>DC Cables (Solar Panels to DCDB)</td><td>Meter</td><td>As per site</td></tr>
                        <tr><td>8</td><td>Earthing Kit (Main & Module Earthing)</td><td>Set</td><td>As per site</td></tr>
                        <tr><td>9</td><td>Lightning Arrester</td><td>Unit</td><td>1</td></tr>
                        <tr><td>10</td><td>Installation, Testing & Commissioning</td><td>Lumpsum</td><td>1</td></tr>
                        <tr><td>11</td><td>Transportation</td><td>Lumpsum</td><td>1</td></tr>
                    </tbody>
                </table>
                <p class="table-note"><strong>Note:</strong> Excluding Net Metering equipment (typically provided by DISCOM).</p>

                <h2>4. (b) Financials & Performance Estimates</h2>
                <table class="table-financials">
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Unit Price (INR)</th>
                            <th>Total Price (INR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1.</td>
                            <td>{{system_size}} Sakti HJT NDCR Solar Power Generation System (Includes Modules, Inverter, HDG Structure, BOS, Installation, Testing & Commissioning)</td>
                            <td>1</td>
                            <td>₹ {{estimated_cost}}</td>
                            <td>₹ {{estimated_cost}}</td>
                        </tr>
                        <tr class="total-row">
                            <td colspan="4">Grand Total</td>
                            <td>₹ {{estimated_cost}}</td>
                        </tr>
                        <tr>
                            <td colspan="4">Applicable Taxes (GST @ 13.8%)</td>
                            <td>Including</td>
                        </tr>
                        <tr class="total-row">
                            <td colspan="4">TOTAL QUOTED PRICE (INR)</td>
                            <td>₹ {{estimated_cost}}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="highlights">
                    <h3>Key Benefits & Performance Projections:</h3>
                    <div class="field"><strong>Estimated Monthly Generation:</strong> ~{{monthly_generation}} kWh</div>
                    <div class="field"><strong>Estimated Annual Savings:</strong> ~₹{{annual_savings}}</div>
                    <div class="field"><strong>Estimated Payback Period:</strong> ~{{payback_period}} years</div>
                    <div class="field"><strong>Estimated 25-Year Savings:</strong> ~₹{{twenty_five_year_savings}}</div>
                </div>


                <div class="note avoid-break">
                    <p><strong>Note:</strong></p>
                    <ul>
                        <li>Prices are subject to change based on market fluctuations at the time of final order.</li>
                        <li>The above price is an estimate for an on-grid system. Pricing for off-grid or hybrid systems will differ and will be provided upon specific request.</li>
                        <li>Performance projections are estimates based on average solar irradiance for Varanasi and typical system efficiency. Actual generation may vary based on specific site conditions, weather, and usage patterns.</li>
                    </ul>
                </div>
            </div>

            <div class="page-break-after"></div>

            <div class="section-content">
                <h2>5. Payment Terms</h2>
                <ul>
                    <li><strong>Advance Payment:</strong> 20% of the total quoted price upon acceptance of this quotation and signing of the agreement. Upon receipt of this advance, the structure fabrication work will commence.</li>
                    <li><strong>Second Instalment:</strong> 70% against Proforma Invoice before the main components (modules, inverter, major structure components) are dispatched to your site.</li>
                    <li><strong>Final Payment:</strong> 10% upon successful commissioning and hand-over of the complete solar power generation system, after all tests are verified and the system is fully operational.</li>
                </ul>
            </div>

            <div class="section-content">
                <h2>6. Project Timeline</h2>
                <ul>
                    <li><strong>System Delivery:</strong> Approximately 4-6 weeks from the date of advance payment and final design approval.</li>
                    <li><strong>Installation & Commissioning:</strong> Approximately 10-15 working days from the date of equipment delivery at your site, subject to site readiness and weather conditions.</li>
                </ul>
            </div>

            <div class="section-content">
                <p style="margin-top: 40px;">Sincerely,</p>
                <p>We are confident that this Sakti HJT solar power generation system, coupled with our professional installation and maintenance services, will prove to be a highly valuable, reliable, and sustainable investment for your property. This system is designed to provide significant energy savings and contribute positively to your environmental goals.</p>
                <p>Please feel free to contact us for any clarifications, to discuss custom requirements, or to schedule a detailed site visit at your earliest convenience. Our team is ready to assist you.</p>
                <p>Thank you for considering Sakti Solar as your trusted solar partner. We look forward to powering your future with clean energy.</p>

                <div class="customer-acceptance">
                    <div>
                        <p style="margin-bottom: 5px;">For Sakti Solar</p>
                        <p style="font-weight: 700; font-size: 12pt;">{{sakti_proprietor_name}}</p>
                        <p style="font-style: italic; margin-top: -5px;">(Proprietor/Authorized Signatory)</p>
                        <p>M/s. Sakti Solar</p>
                    </div>
                    <div>
                        <p>(Customer acceptance with sign)</p>
                        <div class="signature-line"></div>
                        <p style="font-size: 9pt; margin-top: 5px;">Name: __________________________</p>
                        <p style="font-size: 9pt;">Date: ___________________________</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <p><strong>M/s. Sakti Solar</strong></p>
        <p>Authorized Channel Partner: Sakti (or specific module brand if different)</p>
        <p>Office: {{sakti_address}}</p>
        <p>Contact: <a href="tel:{{sakti_phone}}">{{sakti_phone}}</a> | Email: <a href="mailto:{{sakti_email}}">{{sakti_email}}</a> | Web: <a href="{{sakti_website}}" target="_blank">{{sakti_website}}</a></p>
        <p>GSTIN: {{sakti_gstin}}</p>
    </div>
</body>
</html>`;


// --- Updated HTML Generation Functions ---

function getRelianceQuotationHtml(formData: QuoteFormData): string {
    const productData = findProductData(formData, 'reliance');

    const systemSizeKw = productData ? parseFloat(productData.systemSize.replace(' kWp', '')) : null;
    const pricePerWatt = productData ? productData.pricePerWatt : null;

    // Price calculation: pricePerWatt (INR/W) * systemSize (kWp) * 1000 (W/kW)
    const estimatedCost = (systemSizeKw !== null && pricePerWatt !== null)
        ? Math.round(pricePerWatt * systemSizeKw * 1000).toLocaleString('en-IN')
        : 'Contact for pricing';

    const monthlyGeneration = productData ? productData.monthlyGeneration.toString() : 'N/A';
    const paybackPeriod = productData ? productData.paybackPeriod.toString() : 'N/A';
    const systemSizeDisplay = productData ? productData.systemSize : (formData.power_demand_kw ? `${formData.power_demand_kw} kWp` : 'N/A');

    const annualSavings = (monthlyGeneration !== 'N/A')
        ? Math.round(parseFloat(monthlyGeneration) * 12 * 8).toLocaleString('en-IN') // Assuming INR 8 per kWh for annual savings calculation
        : 'TBD';
    const twentyFiveYearSavings = (annualSavings !== 'TBD')
        ? Math.round(parseFloat(annualSavings.replace(/,/g, '')) * 25).toLocaleString('en-IN') // Remove commas for calculation
        : 'TBD';

    const moduleQuantity = productData ? productData.modules.toString() : 'N/A';
    const inverterTypeDisplay = productData?.components.match(/(\d+\.?\d*kW Inverter)/i)?.[1] || 'Standard Inverter';
    const inverterSizeKw = systemSizeKw ? systemSizeKw.toString() : 'N/A';


    const data = {
        product_name: formData.product_name || `Reliance New Energy HJT Solar Solution (${systemSizeDisplay})`,
        name: formData.name,
        phone: formData.phone,
        project_location: formData.project_location || 'Not specified',
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
        system_size: systemSizeDisplay,
        estimated_cost: estimatedCost,
        monthly_generation: monthlyGeneration,
        payback_period: paybackPeriod,
        annual_savings: annualSavings,
        twenty_five_year_savings: twentyFiveYearSavings,
        module_quantity: moduleQuantity,
        inverter_type_display: inverterTypeDisplay,
        inverter_size_kw: inverterSizeKw,
        // Hardcoded Arpit Solar Shop details from the template (remain unchanged as per original template)
        reliance_proprietor_name: 'Ratnesh Mishra',
        reliance_address: 'Sh16/114-25-K-2, Sharvodayanagar, Kadipur, Shivpur, Varanasi 221003(UP)',
        reliance_phone: '+919005770466',
        reliance_email: 'info@arpitsolar.com',
        reliance_website: 'https://www.arpitsolar.com',
        reliance_gstin: '09APKPM6299L1ZW'
    };

    return populateHtmlTemplate(RELIANCE_QUOTATION_HTML_TEMPLATE, data);
}

function getSaktiQuotationHtml(formData: QuoteFormData): string {
    const productData = findProductData(formData, 'shakti');

    const systemSizeKw = productData ? parseFloat(productData.systemSize.replace(' kWp', '')) : null;
    const pricePerWatt = productData ? productData.pricePerWatt : null;

    // Price calculation: pricePerWatt (INR/W) * systemSize (kWp) * 1000 (W/kW)
    const estimatedCost = (systemSizeKw !== null && pricePerWatt !== null)
        ? Math.round(pricePerWatt * systemSizeKw * 1000).toLocaleString('en-IN')
        : 'Contact for pricing';

    const monthlyGeneration = productData ? productData.monthlyGeneration.toString() : 'N/A';
    const paybackPeriod = productData ? productData.paybackPeriod.toString() : 'N/A';
    const systemSizeDisplay = productData ? productData.systemSize : (formData.power_demand_kw ? `${formData.power_demand_kw} kWp` : 'N/A');

    const annualSavings = (monthlyGeneration !== 'N/A')
        ? Math.round(parseFloat(monthlyGeneration) * 12 * 7.5).toLocaleString('en-IN') // Assuming INR 7.5 per kWh for annual savings calculation
        : 'TBD';
    const twentyFiveYearSavings = (annualSavings !== 'TBD')
        ? Math.round(parseFloat(annualSavings.replace(/,/g, '')) * 25).toLocaleString('en-IN') // Remove commas for calculation
        : 'TBD';

    const moduleQuantity = productData ? productData.modules.toString() : 'N/A';
    const inverterTypeDisplay = productData?.components.match(/(\d+\.?\d*kW Inverter)/i)?.[1] || 'Standard Inverter';
    const inverterSizeKw = systemSizeKw ? systemSizeKw.toString() : 'N/A';

    const data = {
        product_name: formData.product_name || `Sakti Solar Solution (${systemSizeDisplay})`,
        name: formData.name,
        phone: formData.phone,
        project_location: formData.project_location || 'Not specified',
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
        system_size: systemSizeDisplay,
        estimated_cost: estimatedCost,
        monthly_generation: monthlyGeneration,
        payback_period: paybackPeriod,
        annual_savings: annualSavings,
        twenty_five_year_savings: twentyFiveYearSavings,
        module_quantity: moduleQuantity,
        inverter_type_display: inverterTypeDisplay,
        inverter_size_kw: inverterSizeKw,
        // IMPORTANT: Replace these placeholders with actual company details for Sakti Solar
        sakti_proprietor_name: 'Proprietor Name Here', // Replace with actual name
        sakti_address: 'Your Sakti Solar Office Address, City, State, PIN', // Replace with actual address
        sakti_phone: '+91-XXXXXXXXXX', // Replace with actual phone
        sakti_email: 'info@saktisolar.com', // Replace with actual email
        sakti_website: 'https://www.saktisolar.com', // Replace with actual website
        sakti_gstin: 'XXAAAAAXXXXXAZX' // Replace with actual GSTIN
    };

    return populateHtmlTemplate(SAKTI_QUOTATION_HTML_TEMPLATE, data);
}

// Keep the default HTML generation as a fallback
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
        <p>This is a basic quotation. Please contact us for a detailed proposal.</p>
      </div>
    </body>
    </html>`;
}

// Helper function to find product data based on system size and category
function findProductData(formData: QuoteFormData, category: string) {
    if (!formData.product_name) {
        console.warn('findProductData: product_name is missing in formData.');
        return null;
    }

    // Extract kWp from product name (e.g., "2.14 kWp Solar System - 4 Modules")
    const systemSizeMatch = formData.product_name.match(/(\d+\.?\d*)\s*kWp/i);
    if (!systemSizeMatch) {
        console.warn(`findProductData: Could not extract system size from product_name: ${formData.product_name}`);
        return null;
    }

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

// Updated function to send WhatsApp template with document and URL shortening logic
async function sendWhatsAppTemplate(phone: string, pdfUrl: string, fileName: string, formData: QuoteFormData): Promise<any> {
  const API_KEY = "key_o6Dp7MBLIwKlpKHlqcf4VaI8eGEyGkWfp76gluNY0gjjd3T5EuUblUNsbgqGMzj7LZhDfwbuoLbDxU8LTGehJW1m0sSDhqDvf2GAw4puBEAfInI5qV13rWPjpNPrvw812bitePsseEFcnJavcAOlVfqqg0bJoOA15DI06zDAhOhbXai7xW7LFWt0DdDpuby7kWHGc3pcsRrCqUGPDRvnjfSfBtlMcxwXzLJyi27Y6Mh4hfjcyU1bu1eZBmGo";
  const SENDER_NUMBER = "+919044555572";
  
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
  console.log('PDF stored but not being sent to customer as requested');

  // Send template message WITHOUT document attachment (as requested)
  const payload = {
    messages: [{
      to: cleanPhone,
      from: SENDER_NUMBER,
      content: {
        templateName: "personalized_quotation_from_arpit_solar_shop_web_v2",
        language: "en",
        templateData: {
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



















