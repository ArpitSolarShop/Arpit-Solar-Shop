"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calculator, Cable, Package, ArrowUpDown, Search, CheckCircle, Zap } from "lucide-react"
import RelianceQuoteForm from "@/components/forms/reliance-quote-form"
import {
  gridTieSystemData,
  largeSystemData,
  dcCableData,
  kitItems,
  COMMERCIAL_SYSTEM_SIZE_LIMIT,
  PRODUCT_DESCRIPTION,
} from "@/assets/reliance-solar-data"
import type { GridTieSystemData, LargeSystemData } from "@/assets/reliance-solar-data"

// Components
function GridTieSystemTable({ onRowClick }: { onRowClick: (product: GridTieSystemData, type: string) => void }) {
  const [sortField, setSortField] = useState<keyof GridTieSystemData | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSort = (field: keyof GridTieSystemData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredAndSortedData = gridTieSystemData
    .filter(
      (item) =>
        item.phase.toLowerCase().includes(searchTerm.toLowerCase()) || item.systemSize.toString().includes(searchTerm),
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
      {/* Search */}
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by phase or system size..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Table */}
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
              <TableHead className="font-semibold">Inverter Capacity (kW)</TableHead>
              <TableHead className="font-semibold">Phase</TableHead>
              <TableHead className="font-semibold">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("hdgElevatedWithGst")}
                  className="h-auto p-0 font-semibold"
                >
                  Price/Watt (₹)
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="font-semibold">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("hdgElevatedPrice")}
                  className="h-auto p-0 font-semibold"
                >
                  Total Price (₹)
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedData.map((item) => (
              <TableRow key={item.slNo} className="hover:bg-gray-50">
                <TableCell className="font-medium">{item.slNo}</TableCell>
                <TableCell>{item.systemSize}</TableCell>
                <TableCell>{item.noOfModules}</TableCell>
                <TableCell>{item.inverterCapacity}</TableCell>
                <TableCell>
                  <Badge variant={item.phase === "Single" ? "default" : "secondary"} className="text-xs">
                    {item.phase}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">₹{item.hdgElevatedWithGst.toFixed(2)}</TableCell>
                <TableCell className="font-bold text-green-600">
                  ₹{item.hdgElevatedPrice.toLocaleString("en-IN")}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => onRowClick(item, "residential")}
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

function LargeSystemTable({ onRowClick }: { onRowClick: (product: LargeSystemData, type: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<keyof LargeSystemData | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: keyof LargeSystemData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredAndSortedData = largeSystemData
    .filter(
      (item) => item.systemSizeKWp.toString().includes(searchTerm) || item.systemSizeKW.toString().includes(searchTerm),
    )
    .sort((a, b) => {
      if (!sortField) return 0
      const aValue = a[sortField]
      const bValue = b[sortField]
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }
      return 0
    })

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by system size..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Pricing Options Tabs */}
      <Tabs defaultValue="tin-shed" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tin-shed">Tin Shed</TabsTrigger>
          <TabsTrigger value="rcc-elevated">RCC Elevated</TabsTrigger>
          <TabsTrigger value="pre-gi-mms">Pre GI MMS</TabsTrigger>
          <TabsTrigger value="without-mms">Without MMS</TabsTrigger>
        </TabsList>

        <TabsContent value="tin-shed" className="mt-4">
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Sl No.</TableHead>
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("systemSizeKWp")}
                      className="h-auto p-0 font-semibold"
                    >
                      System Size (kWp)
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  {/* <TableHead className="font-semibold">System Size (kW)</TableHead> */}
                  <TableHead className="font-semibold">No. of Modules</TableHead>
                  <TableHead className="font-semibold">Inverter Capacity (kW)</TableHead>
                  <TableHead className="font-semibold">Phase</TableHead>
                  <TableHead className="font-semibold">Price/Watt (₹)</TableHead>
                  <TableHead className="font-semibold">Total Price (₹)</TableHead>
                  <TableHead className="font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedData.map((item) => (
                  <TableRow key={item.slNo} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{item.slNo}</TableCell>
                    <TableCell>{item.systemSizeKWp}</TableCell>
                    {/* <TableCell>{item.systemSizeKW}</TableCell> */}
                    <TableCell>{item.noOfModules}</TableCell>
                    <TableCell>{item.inverterCapacity}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {item.phase}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">₹{item.shortRailTinShedPricePerWatt.toFixed(2)}</TableCell>
                    <TableCell className="font-bold text-green-600">
                      ₹{item.shortRailTinShedPrice.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => onRowClick(item, "commercial-tin-shed")}
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
        </TabsContent>

        <TabsContent value="rcc-elevated" className="mt-4">
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Sl No.</TableHead>
                  <TableHead className="font-semibold">System Size (kWp)</TableHead>
                  {/* <TableHead className="font-semibold">System Size (kW)</TableHead> */}
                  <TableHead className="font-semibold">No. of Modules</TableHead>
                  <TableHead className="font-semibold">Inverter Capacity (kW)</TableHead>
                  <TableHead className="font-semibold">Phase</TableHead>
                  <TableHead className="font-semibold">Price/Watt (₹)</TableHead>
                  <TableHead className="font-semibold">Total Price (₹)</TableHead>
                  <TableHead className="font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedData.map((item) => (
                  <TableRow key={item.slNo} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{item.slNo}</TableCell>
                    <TableCell>{item.systemSizeKWp}</TableCell>
                    {/* <TableCell>{item.systemSizeKW}</TableCell> */}
                    <TableCell>{item.noOfModules}</TableCell>
                    <TableCell>{item.inverterCapacity}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {item.phase}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">₹{item.hdgElevatedRccPricePerWatt.toFixed(2)}</TableCell>
                    <TableCell className="font-bold text-green-600">
                      ₹{item.hdgElevatedRccPrice.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => onRowClick(item, "commercial-rcc")}
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
        </TabsContent>

        <TabsContent value="pre-gi-mms" className="mt-4">
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Sl No.</TableHead>
                  <TableHead className="font-semibold">System Size (kWp)</TableHead>
                  {/* <TableHead className="font-semibold">System Size (kW)</TableHead> */}
                  <TableHead className="font-semibold">No. of Modules</TableHead>
                  <TableHead className="font-semibold">Inverter Capacity (kW)</TableHead>
                  <TableHead className="font-semibold">Phase</TableHead>
                  <TableHead className="font-semibold">Price/Watt (₹)</TableHead>
                  <TableHead className="font-semibold">Total Price (₹)</TableHead>
                  <TableHead className="font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedData.map((item) => (
                  <TableRow key={item.slNo} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{item.slNo}</TableCell>
                    <TableCell>{item.systemSizeKWp}</TableCell>
                    {/* <TableCell>{item.systemSizeKW}</TableCell> */}
                    <TableCell>{item.noOfModules}</TableCell>
                    <TableCell>{item.inverterCapacity}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {item.phase}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">₹{item.preGiMmsPricePerWatt.toFixed(2)}</TableCell>
                    <TableCell className="font-bold text-green-600">
                      ₹{item.preGiMmsPrice.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => onRowClick(item, "commercial-mms")}
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
        </TabsContent>

        <TabsContent value="without-mms" className="mt-4">
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Sl No.</TableHead>
                  <TableHead className="font-semibold">System Size (kWp)</TableHead>
                  {/* <TableHead className="font-semibold">System Size (kW)</TableHead> */}
                  <TableHead className="font-semibold">No. of Modules</TableHead>
                  <TableHead className="font-semibold">Inverter Capacity (kW)</TableHead>
                  <TableHead className="font-semibold">Phase</TableHead>
                  <TableHead className="font-semibold">Price/Watt (₹)</TableHead>
                  <TableHead className="font-semibold">Total Price (₹)</TableHead>
                  <TableHead className="font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedData.map((item) => (
                  <TableRow key={item.slNo} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{item.slNo}</TableCell>
                    <TableCell>{item.systemSizeKWp}</TableCell>
                    {/* <TableCell>{item.systemSizeKW}</TableCell> */}
                    <TableCell>{item.noOfModules}</TableCell>
                    <TableCell>{item.inverterCapacity}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {item.phase}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">₹{item.priceWithoutMmsPricePerWatt.toFixed(2)}</TableCell>
                    <TableCell className="font-bold text-green-600">
                      ₹{item.priceWithoutMmsPrice.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => onRowClick(item, "commercial-without-mms")}
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
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DCCableTable({ onRowClick }: { onRowClick: (product: any, type: string) => void }) {
  const totalAmount = dcCableData.reduce((sum, item) => sum + item.total, 0)

  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Sr No</TableHead>
              <TableHead className="font-semibold">Product Description</TableHead>
              <TableHead className="font-semibold">UOM</TableHead>
              <TableHead className="font-semibold">Quantity</TableHead>
              <TableHead className="font-semibold">Price (₹)</TableHead>
              <TableHead className="font-semibold">Total (₹)</TableHead>
              <TableHead className="font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dcCableData.map((item) => (
              <TableRow key={item.srNo} className="hover:bg-gray-50">
                <TableCell className="font-medium">{item.srNo}</TableCell>
                <TableCell>{item.productDescription}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {item.uom}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{item.quantity}</TableCell>
                <TableCell>₹{item.price.toFixed(2)}</TableCell>
                <TableCell className="font-bold text-green-600">₹{item.total.toLocaleString("en-IN")}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => onRowClick(item, "cables")}
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
          <TableFooter>
            <TableRow className="bg-gray-50">
              <TableCell colSpan={6} className="font-bold text-right">
                Total Amount:
              </TableCell>
              <TableCell className="font-bold text-lg text-gray-900">₹{totalAmount.toLocaleString("en-IN")}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}

function KitItemsTable() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Sr No.</TableHead>
              <TableHead className="font-semibold">Component</TableHead>
              <TableHead className="font-semibold">Description</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kitItems.map((item) => (
              <TableRow key={item.srNo} className="hover:bg-gray-50">
                <TableCell className="font-medium">{item.srNo}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-medium">
                    {item.item}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-md">
                  {item.description || "Standard component as per system requirements"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Included</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-2">{"What's Included in Our Scope:"}</h4>
        <ul className="text-sm text-gray-800 space-y-1">
          <li>• Complete system design and engineering</li>
          <li>• All components listed above</li>
          <li>• Installation and commissioning</li>
          <li>• 5-year monitoring service</li>
          <li>• Warranty as per manufacturer terms</li>
        </ul>
      </div>
    </div>
  )
}

// Main Component
export default function Reliance() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [productType, setProductType] = useState<"residential" | "commercial" | "cables" | "kit">("residential")
  const [selectedCommercialType, setSelectedCommercialType] = useState<string>("")

  const handleRowClick = (product: any, type: string) => {
    setSelectedProduct(product)
    setProductType(type.includes("commercial") ? "commercial" : (type as any))
    setSelectedCommercialType(type)
    setIsFormOpen(true)
  }

  const getProductName = (product: any, type: string) => {
    if (type === "residential") {
      return `${product.systemSize} kWp Residential Solar System - ${product.noOfModules} Modules`
    } else if (type.includes("commercial")) {
      const mountingType = type.includes("tin-shed")
        ? "Tin Shed"
        : type.includes("rcc")
          ? "RCC Elevated"
          : type.includes("mms")
            ? "Pre GI MMS"
            : "Without MMS"
      return `${product.systemSizeKWp} kWp Commercial Solar System - ${mountingType} - ${product.noOfModules} Modules`
    } else if (type === "cables") {
      return `${product.productDescription} - ${product.quantity} ${product.uom}`
    } else if (type === "kit") {
      return `Solar Kit Component - ${product.item}`
    }
    return "Reliance Solar Product"
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src="/reliance-industries-ltd.png" alt="Reliance Solar" className="h-12 w-auto" />
            <h1 className="text-4xl font-bold text-gray-900">HJT Solar System Pricing</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive pricing for {PRODUCT_DESCRIPTION} and complete system packages
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="text-sm">
              Non DCR Modules
            </Badge>
            <Badge variant="secondary" className="text-sm">
              Excluding GST
            </Badge>
            <Badge variant="secondary" className="text-sm">
              Net Metering Not Included
            </Badge>
          </div>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="residential" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="residential" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Residential</span>
            </TabsTrigger>
            <TabsTrigger value="commercial" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Commercial</span>
            </TabsTrigger>
            <TabsTrigger value="cables" className="flex items-center gap-2">
              <Cable className="h-4 w-4" />
              <span className="hidden sm:inline">Cables</span>
            </TabsTrigger>
            <TabsTrigger value="kit" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Kit Items</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="residential" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Calculator className="h-5 w-5 text-gray-700" />
                  Residential Grid Tie Systems
                </CardTitle>
                <CardDescription>
                  Perfect for homes and small businesses. Single and three-phase options available.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GridTieSystemTable onRowClick={handleRowClick} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commercial" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Zap className="h-5 w-5 text-gray-700" />
                  Commercial & Industrial Systems
                </CardTitle>
                <CardDescription>
                  Large-scale solar installations with multiple mounting options and pricing tiers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LargeSystemTable onRowClick={handleRowClick} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cables" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Cable className="h-5 w-5 text-gray-700" />
                  DC Cables - Bulk Supply
                </CardTitle>
                <CardDescription>
                  High-quality DC cables for solar installations with competitive bulk pricing.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DCCableTable onRowClick={handleRowClick} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kit" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Package className="h-5 w-5 text-gray-700" />
                  Complete Kit Components
                </CardTitle>
                <CardDescription>
                  All components included in our solar system packages - our complete scope of supply.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <KitItemsTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Large System Notice */}
        <Card className="bg-gray-100 border-gray-300">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Need a system larger than {COMMERCIAL_SYSTEM_SIZE_LIMIT} kWp?
              </h3>
              <p className="text-gray-600">
                For utility-scale installations above {COMMERCIAL_SYSTEM_SIZE_LIMIT} kWp, please contact our sales team
                for customized pricing and solutions.
              </p>
              <Button
                variant="outline"
                className="mt-4 border-gray-400 text-gray-700 hover:bg-gray-200 bg-transparent"
                onClick={() => {
                  const largeSystemProduct = {
                    systemSize: 0,
                    systemSizeKWp: 0,
                    noOfModules: 0,
                    inverterCapacity: 0,
                    phase: "Three",
                  }
                  setSelectedProduct(largeSystemProduct)
                  setProductType("commercial")
                  setIsFormOpen(true)
                }}
              >
                Contact Sales Team
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Terms and Conditions */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">Terms and Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Payment Schedule</h3>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li><strong>10% Advance:</strong> Due when the order is placed.</li>
                <li><strong>80% Pre-Dispatch:</strong> Due when the materials are ready for shipment.</li>
                <li><strong>10% Final Payment:</strong> Due after the project has been fully installed and commissioned.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Project Timeline</h3>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li><strong>Material Delivery:</strong> Materials will be supplied 30 days after 90% of the payment (Advance + Pre-Dispatch) is received.</li>
                <li><strong>Commissioning:</strong> The system will be installed and operational within 8 to 10 weeks after the materials arrive at the project site.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Scope &amp; Costs</h3>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li><strong>Included:</strong> The quoted price covers Installation &amp; Commissioning (I&amp;C) and transportation.</li>
                <li><strong>Excluded:</strong> The cost of any required civil work (like foundation work) isnot included. Above 8Kw Net-Feed-in/Net-Billing in Customer's Scope.</li>
                <li><strong>Customer's Responsibility:</strong> The customer is responsible for arranging Net-Metering or Net-Billing with the utility company.</li>
                <li><strong>Annual Maintenance Contract (AMC):</strong> After project handover, an optional AMC is available at a rate of 650 per KWp per year.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Warranties</h3>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li><strong>Complete System:</strong> 5 years</li>
                <li><strong>Solar Modules:</strong> 30 years (performance warranty 90%)</li>
                <li><strong>Inverter:</strong> 10 years</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 border-t pt-8">
          <p>All prices are subject to change. Contact us for the latest pricing and availability.</p>
        </div>

        {/* Quote Form Dialog */}
        <RelianceQuoteForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          productName={
            selectedProduct?.systemSize === 0 || selectedProduct?.systemSizeKWp === 0
              ? "Large Scale Solar System (Above 165.6 kWp)"
              : selectedProduct
                ? getProductName(selectedProduct, selectedCommercialType || productType)
                : "Reliance Solar Product"
          }
          isLargeSystem={selectedProduct?.systemSize === 0 || selectedProduct?.systemSizeKWp === 0}
          productType={productType}
          powerDemandKw={productType === "commercial" ? selectedProduct?.systemSizeKWp || null : selectedProduct?.systemSize || selectedProduct?.systemSizeKW || null}
          mountingType={(() => {
            if (!selectedCommercialType) return null;
            if (selectedCommercialType.includes("tin-shed")) return "Tin Shed";
            if (selectedCommercialType.includes("rcc")) return "RCC Elevated";
            if (selectedCommercialType.includes("mms")) return "Pre GI MMS";
            if (selectedCommercialType.includes("without-mms")) return "Without MMS";
            return null;
          })()}
        />

      </div>
    </div>
  )
}











