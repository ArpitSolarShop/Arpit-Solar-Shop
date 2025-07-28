// import RelianceQuoteForm from "@/components/forms/reliance-quote-form"
// import ShaktiQuoteForm from "@/components/forms//shakti-quote-form"



"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpDown, Search, Home, Sun, TrendingUp, DollarSign, Battery, CheckCircle, Lock } from "lucide-react"
import RelianceQuoteForm from "@/components/forms/reliance-quote-form"
import ShaktiQuoteForm from "@/components/forms//shakti-quote-form"
import {
  shaktiResidentialData,
  relianceResidentialData,
  SHAKTI_COMPANY_NAME,
  SHAKTI_PRODUCT_DESCRIPTION,
  SHAKTI_WORK_SCOPE,
  RELIANCE_COMPANY_NAME,
  RELIANCE_PRODUCT_DESCRIPTION,
  RELIANCE_WORK_SCOPE,
} from "@/pages/residential-data"
import type { ShaktiResidentialData, RelianceResidentialData } from "@/pages/residential-data"

// Reusable Card Component for Benefits Sections
const BenefitCard = ({ title, description, Icon }: { title: string; description: string; Icon: any }) => (
  <motion.div
    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border-t-4 border-green-500"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    role="article"
  >
    <div className="flex items-center mb-4">
      <Icon className="h-10 w-10 text-green-600" />
      <h3 className="text-xl font-semibold text-gray-800 ml-3">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm">{description}</p>
  </motion.div>
)

// Reusable Checklist Item Component
const ChecklistItem = ({ text }: { text: string }) => (
  <div className="flex items-center mb-3">
    <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
    <p className="text-gray-600">{text}</p>
  </div>
)

// Reusable Installation Step Component
const InstallationStep = ({
  title,
  description,
  image,
  alt,
  reverse,
}: {
  title: string
  description: string
  image: string
  alt: string
  reverse: boolean
}) => (
  <motion.div
    className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-6 mb-8`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <img src={image || "/placeholder.svg"} alt={alt} className="w-full md:w-1/2 h-64 object-cover rounded-lg" />
    <div className="md:w-1/2">
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
)

// Components for pricing tables (keeping existing functionality)
function ShaktiResidentialTable({ onRowClick }: { onRowClick: (product: ShaktiResidentialData) => void }) {
  const [sortField, setSortField] = useState<keyof ShaktiResidentialData | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSort = (field: keyof ShaktiResidentialData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredAndSortedData = shaktiResidentialData
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
    <div className="space-y-4">
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
                  <Badge variant={item.phase === "Single" ? "default" : "secondary"} className="text-xs">
                    {item.phase}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium text-green-600">{item.monthlyGeneration}</TableCell>
                <TableCell>{item.roofAreaRequired}</TableCell>
                <TableCell className="font-medium">₹{item.pricePerWatt.toFixed(2)}</TableCell>
                <TableCell className="font-bold text-green-600">₹{item.totalPrice.toLocaleString("en-IN")}</TableCell>
                <TableCell className="font-medium text-green-600">
                  ₹{item.monthlySavings.toLocaleString("en-IN")}
                </TableCell>
                <TableCell className="font-medium text-blue-600">{item.paybackPeriod}</TableCell>
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

function RelianceResidentialTable({ onRowClick }: { onRowClick: (product: RelianceResidentialData) => void }) {
  const [sortField, setSortField] = useState<keyof RelianceResidentialData | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSort = (field: keyof RelianceResidentialData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredAndSortedData = relianceResidentialData
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
    <div className="space-y-4">
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
                  <Badge variant={item.phase === "Single" ? "default" : "secondary"} className="text-xs">
                    {item.phase}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium text-green-600">{item.monthlyGeneration}</TableCell>
                <TableCell>{item.roofAreaRequired}</TableCell>
                <TableCell className="font-medium">₹{item.pricePerWatt.toFixed(2)}</TableCell>
                <TableCell className="font-bold text-green-600">₹{item.totalPrice.toLocaleString("en-IN")}</TableCell>
                <TableCell className="font-medium text-green-600">
                  ₹{item.monthlySavings.toLocaleString("en-IN")}
                </TableCell>
                <TableCell className="font-medium text-blue-600">{item.paybackPeriod}</TableCell>
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
  const [selectedSize, setSelectedSize] = useState<number>(5.0)

  const shaktiSystem = shaktiResidentialData.find(
    (item) =>
      Math.abs(item.systemSize - selectedSize) ===
      Math.min(...shaktiResidentialData.map((s) => Math.abs(s.systemSize - selectedSize))),
  )

  const relianceSystem = relianceResidentialData.find(
    (item) =>
      Math.abs(item.systemSize - selectedSize) ===
      Math.min(...relianceResidentialData.map((s) => Math.abs(s.systemSize - selectedSize))),
  )

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Price Comparison Tool
        </CardTitle>
        <CardDescription>
          Compare prices between Shakti Solar and Reliance Solar for similar system sizes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Select System Size (kWp):</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value={2.5}>~2.5 kWp</option>
              <option value={3.5}>~3.5 kWp</option>
              <option value={5.0}>~5.0 kWp</option>
              <option value={8.0}>~8.0 kWp</option>
              <option value={10.0}>~10.0 kWp</option>
            </select>
          </div>

          {shaktiSystem && relianceSystem && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-3">
                  <img src="/Shakti Solar.png" alt="Shakti Solar" className="h-6 w-auto" />
                  <h4 className="font-semibold text-gray-900">Shakti Solar</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>System Size:</span>
                    <span className="font-medium">{shaktiSystem.systemSize} kWp</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price/Watt:</span>
                    <span className="font-medium">₹{shaktiSystem.pricePerWatt.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Price:</span>
                    <span className="font-bold text-green-600">₹{shaktiSystem.totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Savings:</span>
                    <span className="font-medium text-green-600">
                      ₹{shaktiSystem.monthlySavings.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payback Period:</span>
                    <span className="font-medium text-blue-600">{shaktiSystem.paybackPeriod} years</span>
                  </div>
                </div>
              </div>

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
                    <span className="font-bold text-green-600">
                      ₹{relianceSystem.totalPrice.toLocaleString("en-IN")}
                    </span>
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
                </div>
              </div>
            </div>
          )}

          {shaktiSystem && relianceSystem && (
            <div className="bg-white p-4 rounded-lg border border-yellow-200 bg-yellow-50">
              <h5 className="font-semibold text-gray-900 mb-2">Price Difference Analysis:</h5>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Price Difference:</span>
                  <span
                    className={`font-bold ${relianceSystem.totalPrice > shaktiSystem.totalPrice ? "text-red-600" : "text-green-600"}`}
                  >
                    ₹{Math.abs(relianceSystem.totalPrice - shaktiSystem.totalPrice).toLocaleString("en-IN")}
                    {relianceSystem.totalPrice > shaktiSystem.totalPrice ? " (Reliance Higher)" : " (Shakti Higher)"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Better Value:</span>
                  <span className="font-bold text-blue-600">
                    {relianceSystem.totalPrice < shaktiSystem.totalPrice ? "Reliance Solar" : "Shakti Solar"}
                  </span>
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
export default function Residential() {
  const [isShaktiFormOpen, setIsShaktiFormOpen] = useState(false)
  const [isRelianceFormOpen, setIsRelianceFormOpen] = useState(false)
  const [selectedShaktiProduct, setSelectedShaktiProduct] = useState<ShaktiResidentialData | null>(null)
  const [selectedRelianceProduct, setSelectedRelianceProduct] = useState<RelianceResidentialData | null>(null)

  const handleShaktiRowClick = (product: ShaktiResidentialData) => {
    setSelectedShaktiProduct(product)
    setIsShaktiFormOpen(true)
  }

  const handleRelianceRowClick = (product: RelianceResidentialData) => {
    setSelectedRelianceProduct(product)
    setIsRelianceFormOpen(true)
  }

  // Data for Why Choose Residential Solar
  const whyChooseSolar = [
    {
      title: "Lower Bills",
      description: "Drastically reduce your electricity bills with solar power.",
      Icon: DollarSign,
    },
    {
      title: "Price Protection",
      description: "Protect against rising energy costs with a fixed, renewable energy source.",
      Icon: Lock,
    },
    {
      title: "Long-Term Power",
      description: "Enjoy 25+ years of clean, low-maintenance power.",
      Icon: Sun,
    },
    {
      title: "Home Value",
      description: "Increase your home's value and environmental contribution.",
      Icon: Home,
    },
  ]

  // Data for Residential Solar Offerings
  const solarOfferings = [
    {
      title: "System Sizes",
      description: "1kW to 10kW systems for small to medium homes.",
      Icon: Battery,
    },
    {
      title: "Phase Options",
      description: "Single-phase and three-phase options available.",
      Icon: Battery,
    },
    {
      title: "Mounting Support",
      description: "RCC and tin shed mounting support for versatile installation.",
      Icon: Home,
    },
    {
      title: "Net Metering",
      description: "Net metering ready for maximum ROI.",
      Icon: DollarSign,
    },
  ]

  // Data for What's Included
  const whatsIncluded = [
    "Site survey and load analysis",
    "Custom system design",
    "Inverter + Solar panels + Mounting structure",
    "Wiring, safety devices, earthing",
    "Government net-metering support",
    "25-year performance warranty on panels",
  ]

  // Data for Installation Steps
  const installationSteps = [
    {
      title: "1. Consultation & Assessment",
      description:
        "Our experts evaluate your home's energy needs, roof condition, and sun exposure to design a custom solar solution.",
      image: "/placeholder.svg?height=300&width=600&text=Solar+Consultation",
      alt: "Solar consultation with homeowner",
      reverse: false,
    },
    {
      title: "2. System Design & Permitting",
      description:
        "We create a tailored solar system design and handle all necessary permits for a hassle-free experience.",
      image: "/placeholder.svg?height=300&width=600&text=System+Design",
      alt: "Designing solar system layout",
      reverse: true,
    },
    {
      title: "3. Installation",
      description:
        "Our certified installers set up your solar panels with precision, ensuring optimal performance and aesthetics.",
      image: "/placeholder.svg?height=300&width=600&text=Solar+Installation",
      alt: "Installing solar panels on roof",
      reverse: false,
    },
    {
      title: "4. Activation & Monitoring",
      description: "We activate your system and provide monitoring tools to track energy production and savings.",
      image: "/placeholder.svg?height=300&width=600&text=System+Monitoring",
      alt: "Monitoring solar system performance",
      reverse: true,
    },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[70vh]"
        style={{ backgroundImage: "url('/placeholder.svg?height=800&width=1920&text=Residential+Solar+Hero')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center justify-center">
          <motion.div
            className="text-center text-white px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Residential Solar Solutions</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6">
              Power your home with clean, renewable energy. Save on bills and contribute to a sustainable future.
            </p>
            <a
              href="#pricing"
              className="inline-block bg-green-500 text-white py-3 px-8 rounded-full hover:bg-green-600 transition font-semibold"
            >
              Get a Free Quote
            </a>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Residential Solar Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-12">
            Why Choose Residential Solar?
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Visualize the power of solar: from the sun to your home's lights.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseSolar.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Residential Solar Offerings Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-12">
            Tailored Solar Solutions for Every Home
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {solarOfferings.map((offering, index) => (
              <BenefitCard key={index} {...offering} />
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Features</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Tier-1 PV modules (Mono PERC / HJT)</li>
              <li>BIS-certified Inverters</li>
              <li>Remote Monitoring Systems (optional)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-12">
            What's Included in Our Installation?
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
            Compare Solar Solutions
          </h2>
          <Tabs defaultValue="shakti" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="shakti" className="flex items-center gap-2">
                <img src="/Shakti Solar.png" alt="Shakti Solar" className="h-4 w-auto" />
                <span>Shakti Solar</span>
              </TabsTrigger>
              <TabsTrigger value="reliance" className="flex items-center gap-2">
                <img src="/reliance-industries-ltd.png" alt="Reliance Solar" className="h-4 w-auto" />
                <span>Reliance Solar</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="shakti" className="space-y-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <img src="/Shakti Solar.png" alt="Shakti Solar" className="h-5 w-auto" />
                    {SHAKTI_COMPANY_NAME} - Residential Solar Systems
                  </CardTitle>
                  <CardDescription>
                    {SHAKTI_PRODUCT_DESCRIPTION} ({SHAKTI_WORK_SCOPE})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ShaktiResidentialTable onRowClick={handleShaktiRowClick} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reliance" className="space-y-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <img src="/reliance-industries-ltd.png" alt="Reliance Solar" className="h-5 w-auto" />
                    {RELIANCE_COMPANY_NAME} - Residential Solar Systems
                  </CardTitle>
                  <CardDescription>
                    {RELIANCE_PRODUCT_DESCRIPTION} ({RELIANCE_WORK_SCOPE})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RelianceResidentialTable onRowClick={handleRelianceRowClick} />
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
            Our Residential Installation Process
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
                <h3 className="text-lg font-semibold text-gray-900">Need a Custom Solution for Your Home?</h3>
                <p className="text-gray-600">
                  Every home is unique. Our experts can design a custom solar solution based on your roof space, energy
                  consumption, and budget requirements.
                </p>
                <div className="flex gap-4 justify-center mt-4">
                  <Button
                    variant="outline"
                    className="border-gray-400 text-gray-700 hover:bg-gray-200 bg-transparent"
                    onClick={() => {
                      const customProduct: ShaktiResidentialData = {
                        slNo: 0,
                        systemSize: 0,
                        noOfModules: 0,
                        inverterCapacity: 0,
                        phase: "Single",
                        pricePerWatt: 0,
                        totalPrice: 0,
                        monthlyGeneration: 0,
                        roofAreaRequired: 0,
                        monthlySavings: 0,
                        paybackPeriod: 0,
                      }
                      setSelectedShaktiProduct(customProduct)
                      setIsShaktiFormOpen(true)
                    }}
                  >
                    Get Shakti Solar Quote
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-400 text-gray-700 hover:bg-gray-200 bg-transparent"
                    onClick={() => {
                      const customProduct: RelianceResidentialData = {
                        slNo: 0,
                        systemSize: 0,
                        noOfModules: 0,
                        inverterCapacity: 0,
                        phase: "Single",
                        pricePerWatt: 0,
                        totalPrice: 0,
                        monthlyGeneration: 0,
                        roofAreaRequired: 0,
                        monthlySavings: 0,
                        paybackPeriod: 0,
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
      <section className="py-20 px-4 md:px-8 bg-green-600 text-white text-center">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Ready to Go Solar?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Contact us today to learn how solar energy can benefit your home. Get a free, no-obligation quote!
          </p>
          <Button className="bg-white text-green-600 hover:bg-gray-100">Request Your Free Quote</Button>
        </motion.div>
      </section>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 border-t pt-8 pb-8 bg-white">
        <p>
          All prices include GST and are subject to change. Actual savings may vary based on location and usage
          patterns.
        </p>
        <p className="mt-2">
          Monthly generation estimates are based on 4.5 peak sun hours. Actual generation may vary based on weather
          conditions.
        </p>
      </div>

      {/* Quote Form Dialogs */}
      <ShaktiQuoteForm
        open={isShaktiFormOpen}
        onOpenChange={setIsShaktiFormOpen}
        productName={
          selectedShaktiProduct?.systemSize === 0
            ? "Custom Shakti Solar Residential Solution"
            : selectedShaktiProduct
              ? `${selectedShaktiProduct.systemSize} kWp Shakti Solar System - ${selectedShaktiProduct.noOfModules} Modules`
              : "Shakti Solar Residential System"
        }
        isLargeSystem={selectedShaktiProduct?.systemSize === 0}
      />

      <RelianceQuoteForm
        open={isRelianceFormOpen}
        onOpenChange={setIsRelianceFormOpen}
        productName={
          selectedRelianceProduct?.systemSize === 0
            ? "Custom Reliance Solar Residential Solution"
            : selectedRelianceProduct
              ? `${selectedRelianceProduct.systemSize} kWp Reliance Solar System - ${selectedRelianceProduct.noOfModules} Modules`
              : "Reliance Solar Residential System"
        }
        isLargeSystem={selectedRelianceProduct?.systemSize === 0}
        productType="residential"
      />
    </div>
  )
}
