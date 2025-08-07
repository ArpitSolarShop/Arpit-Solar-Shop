"use client"
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react"
import { motion } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUpDown,
  Search,
  Building2,
  TrendingUp,
  DollarSign,
  Battery,
  CheckCircle,
  Lock,
  Leaf,
  Zap,
} from "lucide-react"
import RelianceQuoteForm from "@/components/forms/reliance-quote-form"
import { relianceCommercialData, RELIANCE_COMPANY_NAME } from "./commercial-data"
import type { RelianceCommercialData } from "./commercial-data"
import heroImage from "@/assets/factory-businessmen-doing-sales-presentation-shareholders.jpg"
import Step1 from "@/assets/1.jpg";
import Step2 from "@/assets/2.jpg";
import Step3 from "@/assets/3.jpg";
import Step4 from "@/assets/4.jpg";
import { Link } from "react-router-dom";

// Reusable Card Component for Benefits Sections
const BenefitCard = ({ title, description, Icon }: { title: string; description: string; Icon: any }) => (
  <motion.div
    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border-t-4 border-blue-500"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    role="article"
  >
    <div className="flex items-center mb-4">
      <Icon className="h-10 w-10 text-blue-600" />
      <h3 className="text-xl font-semibold text-gray-800 ml-3">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm">{description}</p>
  </motion.div>
)

// Reusable Checklist Item Component
const ChecklistItem = ({ text }: { text: string }) => (
  <div className="flex items-center mb-3">
    <CheckCircle className="h-6 w-6 text-blue-600 mr-2" />
    <p className="text-gray-600">{text}</p>
  </div>
)

// Installation steps data - **Consolidated and using imported images**
const installationSteps = [
  {
    title: "Site Assessment & Feasibility",
    description:
      "We conduct a detailed assessment of your site to determine energy requirements and installation viability.",
    image: Step1,
    alt: "Site Assessment",
    reverse: false,
  },
  {
    title: "Customized System Design",
    description:
      "Our engineers design a system tailored to your commercial needs, ensuring maximum efficiency and output.",
    image: Step2,
    alt: "System Design",
    reverse: true,
  },
  {
    title: "Installation & Commissioning",
    description:
      "Our experienced technicians install and test all components, ensuring safety and compliance.",
    image: Step3,
    alt: "Installation",
    reverse: false,
  },
  {
    title: "Monitoring & Maintenance",
    description:
      "We offer post-installation support, including real-time monitoring and preventive maintenance services.",
    image: Step4,
    alt: "Maintenance",
    reverse: true,
  },
];

// Installation step component
const InstallationStep = ({
  title,
  description,
  image,
  alt,
  reverse,
}: {
  title: string;
  description: string;
  image: string; // Type should reflect it's a string path (from imported image)
  alt: string;
  reverse: boolean;
}) => (
  <motion.div
    className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-6 mb-8`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <img
      src={image} // This now correctly uses the imported image path
      alt={alt}
      className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-md"
    />
    <div className="md:w-1/2">
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
);


// Components for pricing tables
function RelianceCommercialTable({ onRowClick }: { onRowClick: (product: RelianceCommercialData) => void }) {
  const [sortField, setSortField] = useState<keyof RelianceCommercialData | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSort = (field: keyof RelianceCommercialData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredAndSortedData = relianceCommercialData
    .filter(
      (item) =>
        item.phase.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.systemSize.toString().includes(searchTerm) ||
        item.slNo.toString().includes(searchTerm),
    )
    .sort((a, b) => {
      if (!sortField) return 0
      const aValue = a[sortField]
      const bValue = b[sortField]
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }
      return 0
    })

  return (
    <div className="space-y-4 pt-16">
     <Navbar /> 
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by phase, system size, or serial number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Sl No.</TableHead>
              <TableHead className="font-semibold">
                <Button variant="ghost" onClick={() => handleSort("systemSize")} className="h-auto p-0 font-semibold">
                  System Size (kWp)
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="font-semibold">No of Modules</TableHead>
              <TableHead className="font-semibold">Inverter (kW)</TableHead>
              <TableHead className="font-semibold">Phase</TableHead>
              <TableHead className="font-semibold">Monthly Generation (kWh)</TableHead>
              <TableHead className="font-semibold">Roof Area (sq ft)</TableHead>
              <TableHead className="font-semibold">
                <Button variant="ghost" onClick={() => handleSort("pricePerWatt")} className="h-auto p-0 font-semibold">
                  Price/Watt (₹)
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="font-semibold">
                <Button variant="ghost" onClick={() => handleSort("totalPrice")} className="h-auto p-0 font-semibold">
                  Total Price (₹)
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="font-semibold">Monthly Savings (₹)</TableHead>
              <TableHead className="font-semibold">Payback (Years)</TableHead>
              <TableHead className="font-semibold">CO₂ Reduction (tons/year)</TableHead>
              <TableHead className="font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedData.map((item) => (
              <TableRow key={item.slNo} className="hover:bg-gray-50">
                <TableCell className="font-medium">{item.slNo}</TableCell>
                <TableCell className="font-medium text-blue-600">{item.systemSize}</TableCell>
                <TableCell>{item.noOfModules}</TableCell>
                <TableCell>{item.inverterCapacity}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">
                    {item.phase}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium text-green-600">
                  {item.monthlyGeneration.toLocaleString("en-IN")}
                </TableCell>
                <TableCell>{item.roofAreaRequired.toLocaleString("en-IN")}</TableCell>
                <TableCell className="font-medium">₹{item.pricePerWatt.toFixed(2)}</TableCell>
                <TableCell className="font-bold text-green-600">₹{item.totalPrice.toLocaleString("en-IN")}</TableCell>
                <TableCell className="font-medium text-green-600">
                  ₹{item.monthlySavings.toLocaleString("en-IN")}
                </TableCell>
                <TableCell className="font-medium text-blue-600">{item.paybackPeriod}</TableCell>
                <TableCell className="font-medium text-green-600">{item.co2Reduction}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => onRowClick(item)}
                    size="sm"
                    variant="default"
                    className="bg-black hover:bg-gray-800 text-white"
                  >
                    Get Quote
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {filteredAndSortedData.length === 0 && (
        <div className="text-center py-8 text-gray-500">No systems found matching your search criteria.</div>
      )}
    </div>
  )
}

// Price Comparison Component
function PriceComparison() {
  const [selectedSize, setSelectedSize] = useState<number>(100.0)

  const relianceSystem = relianceCommercialData.find(
    (item) =>
      Math.abs(item.systemSize - selectedSize) ===
      Math.min(...relianceCommercialData.map((s) => Math.abs(s.systemSize - selectedSize))),
  )

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Commercial Price Comparison Tool
        </CardTitle>
        <CardDescription>
          Compare prices between Shakti Solar and Reliance Solar for commercial system sizes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="system-size-select" className="text-sm font-medium text-gray-700 mb-2 block">Select System Size (kWp):</label>
            <select
              id="system-size-select" // Added ID for accessibility
              value={selectedSize}
              onChange={(e) => setSelectedSize(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value={25.0}>~25 kWp</option>
              <option value={50.0}>~50 kWp</option>
              <option value={100.0}>~100 kWp</option>
              <option value={250.0}>~250 kWp</option>
              <option value={500.0}>~500 kWp</option>
              <option value={1000.0}>~1000 kWp</option>
            </select>
          </div>

          {relianceSystem && (
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-3">
                <img src="/reliance-industries-ltd.png" alt="Reliance Solar" className="h-6 w-auto" />
                <h4 className="font-semibold text-gray-900">Reliance Solar</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>System Size:</span>
                  <span className="font-medium">{relianceSystem.systemSize} kWp</span>
                </div>
                <div className="flex justify-between">
                  <span>Price/Watt:</span>
                  <span className="font-medium">₹{relianceSystem.pricePerWatt.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Price:</span>
                  <span className="font-bold text-green-600">₹{relianceSystem.totalPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Savings:</span>
                  <span className="font-medium text-green-600">
                    ₹{relianceSystem.monthlySavings.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payback Period:</span>
                  <span className="font-medium text-blue-600">{relianceSystem.paybackPeriod} years</span>
                </div>
                <div className="flex justify-between">
                  <span>CO₂ Reduction:</span>
                  <span className="font-medium text-green-600">{relianceSystem.co2Reduction} tons/year</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Main Component
export default function CommercialIndustrial() {
  const [isRelianceFormOpen, setIsRelianceFormOpen] = useState(false)
  const [selectedRelianceProduct, setSelectedRelianceProduct] = useState<RelianceCommercialData | null>(null)

  const handleRelianceRowClick = (product: RelianceCommercialData) => {
    setSelectedRelianceProduct(product)
    setIsRelianceFormOpen(true)
  }

  // Data for Why Choose Commercial Solar
  const whyChooseCommercialSolar = [
    {
      title: "Reduce Operating Costs",
      description: "Significantly lower your business electricity expenses and improve profit margins.",
      Icon: DollarSign,
    },
    {
      title: "Energy Independence",
      description: "Protect your business from rising energy costs with predictable solar power.",
      Icon: Lock,
    },
    {
      title: "Sustainability Goals",
      description: "Meet corporate sustainability targets and enhance your brand reputation.",
      Icon: Leaf,
    },
    {
      title: "Tax Benefits",
      description: "Take advantage of accelerated depreciation and government incentives.",
      Icon: Building2,
    },
  ]

  // Data for Commercial Solar Offerings
  const commercialSolarOfferings = [
    {
      title: "Large Scale Systems",
      description: "25kW to 1MW+ systems for commercial and industrial facilities.",
      Icon: Battery,
    },
    {
      title: "Grid Integration",
      description: "Three-phase systems with advanced grid integration capabilities.",
      Icon: Zap,
    },
    {
      title: "Monitoring & Analytics",
      description: "Real-time monitoring and performance analytics for optimal efficiency.",
      Icon: TrendingUp,
    },
    {
      title: "Maintenance Support",
      description: "Comprehensive O&M services for maximum system uptime.",
      Icon: Building2,
    },
  ]

  // Data for What's Included
  const whatsIncluded = [
    "Detailed site assessment and energy audit",
    "Custom system design and engineering",
    "High-efficiency solar modules and inverters",
    "Mounting structures and electrical components",
    "Grid synchronization and net metering setup",
    "Comprehensive monitoring and analytics platform",
    "25-year performance warranty and O&M support",
  ]

  // **Removed redundant installationSteps data from here, using the global one defined above.**

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section
      className="relative bg-cover bg-center h-[70vh]"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center justify-center">
        <motion.div
          className="text-center text-white px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Commercial & Industrial Solar Solutions
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6">
            Power your business with scalable solar energy solutions. Reduce
            costs, achieve sustainability goals, and gain energy independence.
          </p>
          <a
            href="#pricing"
            className="inline-block bg-blue-500 text-white py-3 px-8 rounded-full hover:bg-blue-600 transition font-semibold"
          >
            Get Commercial Quote
          </a>
        </motion.div>
      </div>
    </section>

      {/* Why Choose Commercial Solar Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-12">
            Why Choose Commercial Solar?
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Transform your business operations with clean energy and significant cost savings.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseCommercialSolar.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Commercial Solar Offerings Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-12">
            Enterprise Solar Solutions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {commercialSolarOfferings.map((offering, index) => (
              <BenefitCard key={index} {...offering} />
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Enterprise Features</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Tier-1 commercial-grade PV modules (Mono PERC / HJT)</li>
              <li>Industrial string inverters with SCADA integration</li>
              <li>Advanced monitoring and analytics platforms</li>
              <li>Comprehensive O&M and performance guarantees</li>
            </ul>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-12">
            What's Included in Our Commercial Installation?
          </h2>
          <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
            {whatsIncluded.map((item, index) => (
              <ChecklistItem key={index} text={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Price Comparison Tool */}
      <section className="py-20 px-4 md:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <PriceComparison />
        </div>
      </section>

      {/* Company Comparison Tabs */}
      <section id="pricing" className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-12">
            Compare Commercial Solar Solutions
          </h2>
          <Tabs defaultValue="reliance" className="w-full">
            <TabsList className="grid w-full grid-cols-1 mb-8">
              <TabsTrigger value="reliance" className="flex items-center gap-2">
                <img src="/reliance-industries-ltd.png" alt="Reliance Solar" className="h-4 w-auto" />
                <span>Reliance Solar</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reliance" className="space-y-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <img src="/reliance-industries-ltd.png" alt="Reliance Solar" className="h-5 w-auto" />
                    {RELIANCE_COMPANY_NAME} - Commercial Solar Systems
                  </CardTitle>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge variant="secondary" className="text-sm">
                      Non DCR RIL 690 Wp HJT Modules
                    </Badge>
                    <Badge variant="secondary" className="text-sm">
                      String Inverter Included
                    </Badge>
                    <Badge variant="secondary" className="text-sm">
                      Excluding GST & Net Metering
                    </Badge>
                    <Badge variant="secondary" className="text-sm">
                      Price Without MMS NOC Required
                    </Badge>
                  </div>
                  <CardDescription>
                    Non DCR RIL 690 Wp HJT Solar Modules (Excluding GST & Net Metering) - Price Without MMS NOC Required
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RelianceCommercialTable onRowClick={handleRelianceRowClick} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Installation Process Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-12">
            Our Commercial Installation Process
          </h2>
          <div className="space-y-12">
            {installationSteps.map((step, index) => (
              <InstallationStep key={index} {...step} />
            ))}
          </div>
        </div>
      </section>


      {/* Custom Solutions */}
      <section className="py-20 px-4 md:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-gray-100 border-gray-300">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Need a Custom Commercial Solution?</h3>
                <p className="text-gray-600">
                  Every business has unique energy requirements. Our experts can design a custom solar solution based on
                  your facility size, energy consumption, and operational needs.
                </p>
                <div className="flex gap-4 justify-center mt-4">
                  <Button
                    variant="outline"
                    className="border-gray-400 text-gray-700 hover:bg-gray-200 bg-transparent"
                    onClick={() => {
                      const customProduct: RelianceCommercialData = {
                        slNo: 0,
                        systemSize: 0,
                        noOfModules: 0,
                        inverterCapacity: 0,
                        phase: "Three",
                        pricePerWatt: 0,
                        totalPrice: 0,
                        monthlyGeneration: 0,
                        roofAreaRequired: 0,
                        monthlySavings: 0,
                        paybackPeriod: 0,
                        co2Reduction: 0,
                      }
                      setSelectedRelianceProduct(customProduct)
                      setIsRelianceFormOpen(true)
                    }}
                  >
                    Get Reliance Solar Quote
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-20 px-4 md:px-8 bg-blue-600 text-white text-center">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Ready to Power Your Business with Solar?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Non DCR RIL 690 Wp HJT Solar Modules (Complete System Package - Excluding GST & Net Metering)
          </p>
            <Link to="/get-quote"><Button className="bg-white text-blue-600 hover:bg-gray-100">Request Commercial Energy Audit</Button></Link>
     
        </motion.div>

      </section>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 border-t pt-8 pb-8 bg-white">
        <p>
          All prices include GST and are subject to change. Actual savings may vary based on location, usage patterns,
          and system performance.
        </p>
        <p className="mt-2">
          Monthly generation estimates are based on 4.5 peak sun hours. Actual generation may vary based on weather
          conditions and system maintenance.
        </p>
      </div>

      {/* Quote Form Dialogs */}
      <RelianceQuoteForm
        open={isRelianceFormOpen}
        onOpenChange={setIsRelianceFormOpen}
        productName={
          selectedRelianceProduct?.systemSize === 0
            ? "Custom Reliance Solar Commercial Solution"
            : selectedRelianceProduct
              ? `${selectedRelianceProduct.systemSize} kWp Reliance Commercial Solar System - ${selectedRelianceProduct.noOfModules} Modules`
              : "Reliance Solar Commercial System"
        }
        isLargeSystem={selectedRelianceProduct?.systemSize === 0}
        productType="commercial"
        powerDemandKw={selectedRelianceProduct?.systemSize || null}
        dcCables={selectedRelianceProduct ? `LSZH DC Cable - ${Math.ceil(selectedRelianceProduct.systemSize * 2)} meters` : null}
      />
        <Footer />
    </div>
  )
}