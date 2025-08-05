import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.52.0";

// Import actual data structures
interface GridTieSystemData {
  slNo: number
  systemSize: number
  noOfModules: number
  inverterCapacity: number
  phase: string
  preGiElevatedWithGst?: number
  preGiElevatedPrice?: number
  hdgElevatedWithGst?: number
  hdgElevatedPrice?: number
}

interface LargeSystemData {
  slNo: number
  systemSizeKWp: number
  systemSizeKW: number
  noOfModules: number
  inverterCapacity: number
  phase: string
  shortRailTinShedPricePerWatt: number
  shortRailTinShedPrice: number
  hdgElevatedRccPricePerWatt: number
  hdgElevatedRccPrice: number
  preGiMmsPricePerWatt: number
  preGiMmsPrice: number
  priceWithoutMmsPricePerWatt: number
  priceWithoutMmsPrice: number
}

// Reliance Solar Data - sourced from actual data file
const relianceGridTieSystemData: GridTieSystemData[] = [
  { slNo: 1, systemSize: 3.45, noOfModules: 5, inverterCapacity: 3, phase: "Single", hdgElevatedWithGst: 61.13, hdgElevatedPrice: 210900 },
  { slNo: 2, systemSize: 5.52, noOfModules: 8, inverterCapacity: 5, phase: "Single", hdgElevatedWithGst: 60.22, hdgElevatedPrice: 332410 },
  { slNo: 3, systemSize: 5.52, noOfModules: 8, inverterCapacity: 5, phase: "Three", hdgElevatedWithGst: 65.06, hdgElevatedPrice: 359153 },
  { slNo: 4, systemSize: 8.28, noOfModules: 12, inverterCapacity: 10, phase: "Three", hdgElevatedWithGst: 58.55, hdgElevatedPrice: 484822 },
  { slNo: 5, systemSize: 10.35, noOfModules: 15, inverterCapacity: 10, phase: "Three", hdgElevatedWithGst: 55.45, hdgElevatedPrice: 573910 },
  { slNo: 6, systemSize: 13.8, noOfModules: 20, inverterCapacity: 10, phase: "Three", hdgElevatedWithGst: 53.49, hdgElevatedPrice: 738095 }
];

const relianceLargeSystemData: LargeSystemData[] = [
  { slNo: 1, systemSizeKWp: 19.32, systemSizeKW: 15, noOfModules: 28, inverterCapacity: 15, phase: "Three", shortRailTinShedPricePerWatt: 33.91, shortRailTinShedPrice: 655060, hdgElevatedRccPricePerWatt: 38.91, hdgElevatedRccPrice: 751660, preGiMmsPricePerWatt: 36.57, preGiMmsPrice: 706500, priceWithoutMmsPricePerWatt: 32.0761956, priceWithoutMmsPrice: 619560 },
  { slNo: 2, systemSizeKWp: 33.12, systemSizeKW: 25, noOfModules: 48, inverterCapacity: 20, phase: "Three", shortRailTinShedPricePerWatt: 32.92, shortRailTinShedPrice: 1090460, hdgElevatedRccPricePerWatt: 37.92, hdgElevatedRccPrice: 1256060, preGiMmsPricePerWatt: 36.08, preGiMmsPrice: 1195060, priceWithoutMmsPricePerWatt: 31.08102946, priceWithoutMmsPrice: 1029460 },
  { slNo: 3, systemSizeKWp: 52.44, systemSizeKW: 40, noOfModules: 76, inverterCapacity: 40, phase: "Three", shortRailTinShedPricePerWatt: 31.96, shortRailTinShedPrice: 1676180, hdgElevatedRccPricePerWatt: 36.96, hdgElevatedRccPrice: 1938380, preGiMmsPricePerWatt: 35.62, preGiMmsPrice: 1867900, priceWithoutMmsPricePerWatt: 30.12157948, priceWithoutMmsPrice: 1579480 },
  { slNo: 4, systemSizeKWp: 65.55, systemSizeKW: 50, noOfModules: 95, inverterCapacity: 50, phase: "Three", shortRailTinShedPricePerWatt: 31.23, shortRailTinShedPrice: 2047350, hdgElevatedRccPricePerWatt: 36.23, hdgElevatedRccPrice: 2375100, preGiMmsPricePerWatt: 34.39, preGiMmsPrice: 2254300, priceWithoutMmsPricePerWatt: 29.39192655, priceWithoutMmsPrice: 1926550 },
  { slNo: 5, systemSizeKWp: 105.57, systemSizeKW: 80, noOfModules: 153, inverterCapacity: 80, phase: "Three", shortRailTinShedPricePerWatt: 30.22, shortRailTinShedPrice: 3190020, hdgElevatedRccPricePerWatt: 35.22, hdgElevatedRccPrice: 3717870, preGiMmsPricePerWatt: 34.87, preGiMmsPrice: 3681725, priceWithoutMmsPricePerWatt: 28.37299552, priceWithoutMmsPrice: 2995520 },
  { slNo: 6, systemSizeKWp: 124.2, systemSizeKW: 100, noOfModules: 180, inverterCapacity: 100, phase: "Three", shortRailTinShedPricePerWatt: 30.04, shortRailTinShedPrice: 3731500, hdgElevatedRccPricePerWatt: 35.04, hdgElevatedRccPrice: 4352500, preGiMmsPricePerWatt: 34.21, preGiMmsPrice: 4248400, priceWithoutMmsPricePerWatt: 28.2135032, priceWithoutMmsPrice: 3503200 },
  { slNo: 7, systemSizeKWp: 165.6, systemSizeKW: 125, noOfModules: 240, inverterCapacity: 125, phase: "Three", shortRailTinShedPricePerWatt: 29.46, shortRailTinShedPrice: 4878300, hdgElevatedRccPricePerWatt: 34.46, hdgElevatedRccPrice: 5706300, preGiMmsPricePerWatt: 34.62, preGiMmsPrice: 5732600, priceWithoutMmsPricePerWatt: 27.6245734, priceWithoutMmsPrice: 4573400 }
];

// Shakti Solar Data - sourced from actual data file  
const shaktiGridTieSystemData: GridTieSystemData[] = [
  { slNo: 1, systemSize: 2.14, noOfModules: 4, inverterCapacity: 2, phase: "Single", preGiElevatedWithGst: 65000, preGiElevatedPrice: 130000 },
  { slNo: 2, systemSize: 3.21, noOfModules: 6, inverterCapacity: 3, phase: "Single", preGiElevatedWithGst: 61666.67, preGiElevatedPrice: 185000 },
  { slNo: 3, systemSize: 4.28, noOfModules: 8, inverterCapacity: 4, phase: "Single", preGiElevatedWithGst: 61250, preGiElevatedPrice: 245000 },
  { slNo: 4, systemSize: 4.82, noOfModules: 9, inverterCapacity: 4, phase: "Single", preGiElevatedWithGst: 57000, preGiElevatedPrice: 285000 },
  { slNo: 5, systemSize: 5.35, noOfModules: 10, inverterCapacity: 5, phase: "Single", preGiElevatedWithGst: 59000, preGiElevatedPrice: 295000 },
  { slNo: 6, systemSize: 5.35, noOfModules: 10, inverterCapacity: 5, phase: "Single", preGiElevatedWithGst: 59000, preGiElevatedPrice: 315000 },
  { slNo: 7, systemSize: 5.89, noOfModules: 11, inverterCapacity: 6, phase: "Three", preGiElevatedWithGst: 60000, preGiElevatedPrice: 330000 },
  { slNo: 8, systemSize: 8.03, noOfModules: 15, inverterCapacity: 8, phase: "Three", preGiElevatedWithGst: 60833.33, preGiElevatedPrice: 365000 },
  { slNo: 9, systemSize: 9.63, noOfModules: 18, inverterCapacity: 9, phase: "Three", preGiElevatedWithGst: 60625, preGiElevatedPrice: 485000 },
  { slNo: 10, systemSize: 10, noOfModules: 10, inverterCapacity: 10, phase: "Three", preGiElevatedWithGst: 60500, preGiElevatedPrice: 605000 }
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

  if (category.includes('reliance')) {
    htmlContent = await getRelianceQuotationHtml(formData);
  } else if (category.includes('shakti')) {
    htmlContent = await getSaktiQuotationHtml(formData);
  } else {
    htmlContent = generateDefaultHTML(formData);
  }

  try {
    const puppeteer = await import("https://deno.land/x/puppeteer@16.2.0/mod.ts");
    const browser = await puppeteer.default.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      printBackground: true
    });
    await browser.close();
    return new Uint8Array(pdfBuffer);
  } catch (e) {
    console.warn('Puppeteer failed:', e);
    return createSimplePDF(formData);
  }
}

// Helper function to find product data based on system size and category
function findProductData(formData: QuoteFormData, category: string) {
  console.log('Finding product data for:', { product_name: formData.product_name, category });
  
  if (!formData.product_name) {
    console.log('No product name provided');
    return null;
  }

  // Extract kWp from product name (e.g., "13.8 kWp Residential Solar System - 20 Modules")
  const systemSizeMatch = formData.product_name.match(/(\d+\.?\d*)\s*kWp/i);
  if (!systemSizeMatch) {
    console.log('No system size found in product name');
    return null;
  }

  const systemSize = parseFloat(systemSizeMatch[1]);
  console.log('Extracted system size:', systemSize);

  if (category === 'reliance') {
    // Check residential first
    const residentialMatch = relianceGridTieSystemData.find(item => Math.abs(item.systemSize - systemSize) < 0.01);
    if (residentialMatch) {
      console.log('Found residential match:', residentialMatch);
      return residentialMatch;
    }
    
    // Then check large system data
    const largeMatch = relianceLargeSystemData.find(item => Math.abs(item.systemSizeKWp - systemSize) < 0.01);
    if (largeMatch) {
      console.log('Found large system match:', largeMatch);
      return largeMatch;
    }
  } else if (category === 'shakti') {
    const shaktiMatch = shaktiGridTieSystemData.find(item => Math.abs(item.systemSize - systemSize) < 0.01);
    if (shaktiMatch) {
      console.log('Found shakti match:', shaktiMatch);
      return shaktiMatch;
    }
  }

  console.log('No product data found');
  return null;
}

async function getRelianceQuotationHtml(formData: QuoteFormData): Promise<string> {
  // Load HTML template from external source or define inline
  const templateUrl = "https://raw.githubusercontent.com/your-repo/templates/reliance-quotation.html";
  
  try {
    // Try to fetch template from external source
    const response = await fetch(templateUrl);
    if (response.ok) {
      const template = await response.text();
      return populateHtmlTemplate(template, formData);
    }
  } catch (error) {
    console.log('Could not fetch external template, using built-in template');
  }

  // Fallback to built-in template
  const productData = findProductData(formData, 'reliance');
  const systemSize = productData?.systemSize || productData?.systemSizeKWp || 'TBD';
  const estimatedCost = productData?.hdgElevatedPrice || productData?.hdgElevatedRccPrice || 'Contact for pricing';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solar Power Generation System Quotation</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            background: #fdfdfd;
            color: #333;
            font-size: 11pt;
            line-height: 1.6;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 2px solid #e0e7ff;
            background-color: #f8faff;
            margin-bottom: 30px;
        }
        .logo {
            height: 60px;
            width: auto;
        }
        h1 {
            font-size: 24pt;
            color: #1a237e;
            text-align: center;
            margin: 20px 0 30px 0;
            border-bottom: 3px solid #3f51b5;
            padding-bottom: 10px;
            font-weight: 700;
        }
        .overview-box {
            background-color: #e3f2fd;
            border-left: 5px solid #2196f3;
            padding: 20px;
            margin-bottom: 30px;
            border-radius: 5px;
        }
        .field {
            margin: 12px 0;
            padding: 8px 0;
            border-bottom: 1px solid #f3f4f6;
        }
        .field strong {
            color: #374151;
            display: inline-block;
            width: 200px;
        }
        .highlights {
            background: #e8f5e9;
            padding: 20px;
            border-radius: 8px;
            border-left: 5px solid #4CAF50;
            margin: 30px 0;
        }
        .price-box {
            background: #dcfce7;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
        }
        .price-box .amount {
            font-size: 24px;
            font-weight: bold;
            color: #059669;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMTIwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMDA2NkNDIi8+Cjx0ZXh0IHg9IjYwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UmVsaWFuY2U8L3RleHQ+Cjwvc3ZnPgo=" alt="Reliance Solar" class="logo">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMTIwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRkY2NjAwIi8+Cjx0ZXh0IHg9IjYwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QXJwaXQgU29sYXI8L3RleHQ+Cjwvc3ZnPgo=" alt="Arpit Solar" class="logo">
    </div>

    <h1>SOLAR POWER GENERATION SYSTEM QUOTATION</h1>
    
    <div class="overview-box">
        <p><strong>Product:</strong> ${formData.product_name || 'Reliance HJT Solar System'}</p>
    </div>

    <div class="section">
        <h2>Customer Details</h2>
        <div class="field"><strong>Name:</strong> ${formData.name}</div>
        <div class="field"><strong>Phone:</strong> ${formData.phone}</div>
        <div class="field"><strong>Email:</strong> ${formData.email || 'Not provided'}</div>
        <div class="field"><strong>Location:</strong> ${formData.project_location || 'TBD'}</div>
        <div class="field"><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
    </div>

    ${productData ? `
    <div class="section">
        <h2>System Specifications</h2>
        <div class="field"><strong>System Size:</strong> ${systemSize} kWp</div>
        <div class="field"><strong>Number of Modules:</strong> ${productData.noOfModules}</div>
        <div class="field"><strong>Inverter Capacity:</strong> ${productData.inverterCapacity} kW</div>
        <div class="field"><strong>Phase:</strong> ${productData.phase}</div>
        <div class="field"><strong>Technology:</strong> Reliance HJT (Heterojunction) Solar Modules</div>
    </div>

    <div class="price-box">
        <div>Estimated System Cost</div>
        <div class="amount">₹${estimatedCost.toLocaleString()}</div>
        <div style="font-size: 14px; color: #6b7280; margin-top: 5px;">*Final pricing subject to site survey</div>
    </div>
    ` : `
    <div class="section">
        <h2>System Details</h2>
        <div class="field"><strong>Product:</strong> ${formData.product_name || 'Reliance HJT Solar Solution'}</div>
        <div class="field"><strong>Power Demand:</strong> ${formData.power_demand_kw || 'TBD'} kW</div>
        <div class="field"><strong>Monthly Bill:</strong> ₹${formData.monthly_bill || 'TBD'}</div>
    </div>
    `}

    <div class="highlights">
        <h3>Key Benefits</h3>
        <ul>
            <li>25 Years Performance Warranty + 12 Years Product Warranty</li>
            <li>High Efficiency HJT Technology</li>
            <li>Complete System Solutions</li>
            <li>Professional Installation</li>
            <li>Government Subsidy Support</li>
        </ul>
    </div>

    <div style="margin-top: 30px; padding: 20px; background: #f9fafb; border-radius: 8px; text-align: center; font-size: 14px; color: #6b7280;">
        <p><strong>Next Steps:</strong> Our technical team will contact you within 24 hours for a detailed site assessment and final quotation.</p>
        <p>Contact: +91 90445 55572 | Email: info@arpitsolarshop.com</p>
    </div>
</body>
</html>`;
}

async function getSaktiQuotationHtml(formData: QuoteFormData): Promise<string> {
  const productData = findProductData(formData, 'shakti');
  const systemSize = productData?.systemSize || 'TBD';
  const estimatedCost = productData?.preGiElevatedPrice || 'Contact for pricing';

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shakti Solar Quotation</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            background: #fdfdfd;
            color: #333;
            font-size: 11pt;
            line-height: 1.6;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 2px solid #e0e7ff;
            background-color: #f0fdf4;
            margin-bottom: 30px;
        }
        .logo {
            height: 60px;
            width: auto;
        }
        h1 {
            font-size: 24pt;
            color: #16a085;
            text-align: center;
            margin: 20px 0 30px 0;
            border-bottom: 3px solid #27ae60;
            padding-bottom: 10px;
            font-weight: 700;
        }
        .overview-box {
            background-color: #f0fdf4;
            border-left: 5px solid #16a085;
            padding: 20px;
            margin-bottom: 30px;
            border-radius: 5px;
        }
        .field {
            margin: 12px 0;
            padding: 8px 0;
            border-bottom: 1px solid #f3f4f6;
        }
        .field strong {
            color: #374151;
            display: inline-block;
            width: 200px;
        }
        .highlights {
            background: #f0fdf4;
            padding: 20px;
            border-radius: 8px;
            border-left: 5px solid #16a085;
            margin: 30px 0;
        }
        .price-box {
            background: #dcfce7;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
        }
        .price-box .amount {
            font-size: 24px;
            font-weight: bold;
            color: #059669;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMTIwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMTZhMDg1Ii8+Cjx0ZXh0IHg9IjYwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U2hha3RpIFNvbGFyPC90ZXh0Pgo8L3N2Zz4K" alt="Shakti Solar" class="logo">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMTIwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRkY2NjAwIi8+Cjx0ZXh0IHg9IjYwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QXJwaXQgU29sYXI8L3RleHQ+Cjwvc3ZnPgo=" alt="Arpit Solar" class="logo">
    </div>

    <h1>SHAKTI SOLAR QUOTATION</h1>
    
    <div class="overview-box">
        <p><strong>Product:</strong> ${formData.product_name || 'Shakti Solar System'}</p>
    </div>

    <div class="section">
        <h2>Customer Details</h2>
        <div class="field"><strong>Name:</strong> ${formData.name}</div>
        <div class="field"><strong>Phone:</strong> ${formData.phone}</div>
        <div class="field"><strong>Email:</strong> ${formData.email || 'Not provided'}</div>
        <div class="field"><strong>Location:</strong> ${formData.project_location || 'TBD'}</div>
        <div class="field"><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
    </div>

    ${productData ? `
    <div class="section">
        <h2>System Specifications</h2>
        <div class="field"><strong>System Size:</strong> ${systemSize} kWp</div>
        <div class="field"><strong>Number of Modules:</strong> ${productData.noOfModules}</div>
        <div class="field"><strong>Inverter Capacity:</strong> ${productData.inverterCapacity} kW</div>
        <div class="field"><strong>Phase:</strong> ${productData.phase}</div>
        <div class="field"><strong>Technology:</strong> Shakti Solar PERC Mono Crystalline Modules</div>
    </div>

    <div class="price-box">
        <div>Estimated System Cost</div>
        <div class="amount">₹${estimatedCost.toLocaleString()}</div>
        <div style="font-size: 14px; color: #6b7280; margin-top: 5px;">*Final pricing subject to site survey</div>
    </div>
    ` : `
    <div class="section">
        <h2>System Details</h2>
        <div class="field"><strong>Product:</strong> ${formData.product_name || 'Shakti Solar Solution'}</div>
        <div class="field"><strong>Power Demand:</strong> ${formData.power_demand_kw || 'TBD'} kW</div>
        <div class="field"><strong>Monthly Bill:</strong> ₹${formData.monthly_bill || 'TBD'}</div>
    </div>
    `}

    <div class="highlights">
        <h3>Key Benefits</h3>
        <ul>
            <li>25 Years Performance Warranty + 12 Years Product Warranty</li>
            <li>High Efficiency PERC Technology</li>
            <li>Reliable Performance</li>
            <li>Professional Installation</li>
            <li>Government Subsidy Support</li>
        </ul>
    </div>

    <div style="margin-top: 30px; padding: 20px; background: #f9fafb; border-radius: 8px; text-align: center; font-size: 14px; color: #6b7280;">
        <p><strong>Next Steps:</strong> Our technical team will contact you within 24 hours for a detailed site assessment and final quotation.</p>
        <p>Contact: +91 90445 55572 | Email: info@arpitsolarshop.com</p>
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
        <h1>QUOTATION</h1>
        <p>Arpit Solar Shop</p>
    </div>
    <div class="content">
        <div class="field"><strong>Name:</strong> ${formData.name}</div>
        <div class="field"><strong>Phone:</strong> ${formData.phone}</div>
        <div class="field"><strong>Product:</strong> ${formData.product_name || 'Solar System'}</div>
        <div class="field"><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
    </div>
</body>
</html>`;
}

// Helper for Populating HTML Templates
function populateHtmlTemplate(template: string, formData: QuoteFormData): string {
    const productData = findProductData(formData, formData.product_category?.toLowerCase() || '');
    
    const data: Record<string, string> = {
        name: formData.name || '',
        phone: formData.phone || '',
        email: formData.email || 'Not provided',
        project_location: formData.project_location || 'TBD',
        product_name: formData.product_name || 'Solar System',
        date: new Date().toLocaleDateString(),
        system_size: productData?.systemSize?.toString() || productData?.systemSizeKWp?.toString() || 'TBD',
        estimated_cost: (productData?.hdgElevatedPrice || productData?.preGiElevatedPrice || productData?.hdgElevatedRccPrice || 'Contact for pricing').toString(),
        power_demand_kw: formData.power_demand_kw?.toString() || 'TBD',
        monthly_bill: formData.monthly_bill?.toString() || 'TBD'
    };

    let populatedHtml = template;
    for (const key in data) {
        const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
        populatedHtml = populatedHtml.replace(regex, data[key]);
    }
    return populatedHtml;
}

async function createSimplePDF(formData: QuoteFormData): Promise<Uint8Array> {
  // Create a comprehensive PDF using pdf-lib as fallback
  const pdfLib = await import("https://cdn.skypack.dev/pdf-lib@^1.17.1");
  const pdfDoc = await pdfLib.PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
  
  const helveticaFont = await pdfDoc.embedFont(pdfLib.StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(pdfLib.StandardFonts.HelveticaBold);
  
  let yPosition = 750;
  
  // Header
  page.drawText('SOLAR POWER GENERATION SYSTEM QUOTATION', {
    x: 50,
    y: yPosition,
    size: 18,
    font: helveticaBold,
  });
  yPosition -= 40;
  
  // Customer Details
  page.drawText('Customer Details:', {
    x: 50,
    y: yPosition,
    size: 14,
    font: helveticaBold,
  });
  yPosition -= 25;
  
  page.drawText(`Name: ${formData.name}`, {
    x: 70,
    y: yPosition,
    size: 12,
    font: helveticaFont,
  });
  yPosition -= 20;
  
  page.drawText(`Phone: ${formData.phone}`, {
    x: 70,
    y: yPosition,
    size: 12,
    font: helveticaFont,
  });
  yPosition -= 20;
  
  if (formData.email) {
    page.drawText(`Email: ${formData.email}`, {
      x: 70,
      y: yPosition,
      size: 12,
      font: helveticaFont,
    });
    yPosition -= 20;
  }
  
  if (formData.project_location) {
    page.drawText(`Location: ${formData.project_location}`, {
      x: 70,
      y: yPosition,
      size: 12,
      font: helveticaFont,
    });
    yPosition -= 20;
  }
  
  page.drawText(`Date: ${new Date().toLocaleDateString()}`, {
    x: 70,
    y: yPosition,
    size: 12,
    font: helveticaFont,
  });
  yPosition -= 40;
  
  // Product Details
  if (formData.product_name) {
    page.drawText('Product Details:', {
      x: 50,
      y: yPosition,
      size: 14,
      font: helveticaBold,
    });
    yPosition -= 25;
    
    page.drawText(`Product: ${formData.product_name}`, {
      x: 70,
      y: yPosition,
      size: 12,
      font: helveticaFont,
    });
    yPosition -= 20;
    
    const category = formData.product_category?.toLowerCase() || '';
    const productData = findProductData(formData, category);
    
    if (productData) {
      if ('systemSize' in productData) {
        page.drawText(`System Size: ${productData.systemSize} kWp`, {
          x: 70,
          y: yPosition,
          size: 12,
          font: helveticaFont,
        });
        yPosition -= 20;
        
        page.drawText(`Number of Modules: ${productData.noOfModules}`, {
          x: 70,
          y: yPosition,
          size: 12,
          font: helveticaFont,
        });
        yPosition -= 20;
        
        page.drawText(`Inverter Capacity: ${productData.inverterCapacity} kW`, {
          x: 70,
          y: yPosition,
          size: 12,
          font: helveticaFont,
        });
        yPosition -= 20;
        
        page.drawText(`Phase: ${productData.phase}`, {
          x: 70,
          y: yPosition,
          size: 12,
          font: helveticaFont,
        });
        yPosition -= 30;
        
        // Pricing
        const price = productData.hdgElevatedPrice || productData.preGiElevatedPrice;
        if (price) {
          page.drawText('Estimated Cost:', {
            x: 50,
            y: yPosition,
            size: 14,
            font: helveticaBold,
          });
          yPosition -= 25;
          
          page.drawText(`₹${price.toLocaleString('en-IN')}`, {
            x: 70,
            y: yPosition,
            size: 16,
            font: helveticaBold,
          });
          yPosition -= 20;
          
          page.drawText('*Final pricing subject to site survey', {
            x: 70,
            y: yPosition,
            size: 10,
            font: helveticaFont,
          });
          yPosition -= 30;
        }
      }
    }
    
    if (formData.power_demand_kw) {
      page.drawText(`Power Demand: ${formData.power_demand_kw} kW`, {
        x: 70,
        y: yPosition,
        size: 12,
        font: helveticaFont,
      });
      yPosition -= 20;
    }
    
    if (formData.monthly_bill) {
      page.drawText(`Monthly Bill: ₹${formData.monthly_bill}`, {
        x: 70,
        y: yPosition,
        size: 12,
        font: helveticaFont,
      });
      yPosition -= 20;
    }
  }
  
  // Key Benefits
  yPosition -= 20;
  page.drawText('Key Benefits:', {
    x: 50,
    y: yPosition,
    size: 14,
    font: helveticaBold,
  });
  yPosition -= 20;
  
  const benefits = [
    '• 25 Years Performance Warranty + 12 Years Product Warranty',
    '• High Efficiency Solar Technology',
    '• Professional Installation',
    '• Government Subsidy Support',
    '• Significant Electricity Bill Savings'
  ];
  
  benefits.forEach(benefit => {
    page.drawText(benefit, {
      x: 70,
      y: yPosition,
      size: 10,
      font: helveticaFont,
    });
    yPosition -= 15;
  });
  
  // Footer
  yPosition = 150;
  page.drawText('Next Steps:', {
    x: 50,
    y: yPosition,
    size: 12,
    font: helveticaBold,
  });
  yPosition -= 20;
  
  page.drawText('Our technical team will contact you within 24 hours for a detailed', {
    x: 50,
    y: yPosition,
    size: 10,
    font: helveticaFont,
  });
  yPosition -= 15;
  
  page.drawText('site assessment and final quotation.', {
    x: 50,
    y: yPosition,
    size: 10,
    font: helveticaFont,
  });
  yPosition -= 25;
  
  page.drawText('Contact: +91 90445 55572 | Email: info@arpitsolarshop.com', {
    x: 50,
    y: yPosition,
    size: 10,
    font: helveticaFont,
  });
  
  const pdfBytes = await pdfDoc.save();
  return new Uint8Array(pdfBytes);
}

async function sendWhatsAppTemplate(phone: string, pdfUrl: string, fileName: string, formData: QuoteFormData) {
  const API_KEY = 'key_o6Dp7MBLIwKlpKHlqcf4VaI8eGEyGkWfp76gluNY0gjjd3T5EuUblUNsbgqGMzj7LZhDfwbuoLbDxU8LTGehJW1m0sSDhqDvf2GAw4puBEAfInI5qV13rWPjpNPrvw812bitePsseEFcnJavcAOlVfqqg0bJoOA15DI06zDAhOhbXai7xW7LFWt0DdDpuby7kWHGc3pcsRrCqUGPDRvnjfSfBtlMcxwXzLJyi27Y6Mh4hfjcyU1bu1eZBmGo';
  const SENDER_NUMBER = '+919044555572';

  // Clean phone number
  let cleanPhone = phone.replace(/[^\d]/g, '');
  if (!cleanPhone.startsWith('91') && cleanPhone.length === 10) {
    cleanPhone = '91' + cleanPhone;
  }
  if (!cleanPhone.startsWith('+')) {
    cleanPhone = '+' + cleanPhone;
  }

  console.log('Sending WhatsApp template to:', cleanPhone);
  console.log('PDF URL:', pdfUrl);

  // Send template message with document attachment using DoubleTick API
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