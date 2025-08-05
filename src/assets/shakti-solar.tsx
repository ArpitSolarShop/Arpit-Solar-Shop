"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, Search } from "lucide-react"
import ShaktiQuoteForm from "@/components/forms/shakti-quote-form"
import {
  gridTieSystemData,
  SYSTEM_SIZE_LIMIT,
  COMPANY_NAME,
  PRODUCT_DESCRIPTION,
  WORK_SCOPE,
} from "@/assets/shakti-solar-data"
import type { GridTieSystemData } from "@/assets/shakti-solar-data"

// Components
function GridTieSystemTable({ onRowClick }: { onRowClick: (product: GridTieSystemData) => void }) {
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
      {/* Search */}
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by phase, system size, or serial number..."
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
              <TableHead className="font-semibold">
                <Button variant="ghost" onClick={() => handleSort("slNo")} className="h-auto p-0 font-semibold">
                  Sl No.
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
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
                  onClick={() => handleSort("preGiElevatedWithGst")}
                  className="h-auto p-0 font-semibold"
                >
                  Price/kWp (₹)
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="font-semibold">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("preGiElevatedPrice")}
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
                <TableCell className="font-medium">₹{item.preGiElevatedWithGst.toFixed(2)}</TableCell>
                <TableCell className="font-bold text-green-600">
                  ₹{item.preGiElevatedPrice.toLocaleString("en-IN")}
                </TableCell>
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

// Main Component
export default function ShaktiSolar() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<GridTieSystemData | null>(null)

  const handleRowClick = (product: GridTieSystemData) => {
    setSelectedProduct(product)
    setIsFormOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src="/Shakti Solar.png" alt="Shakti Solar" className="h-12 w-auto" />
            <h1 className="text-4xl font-bold text-gray-900">{COMPANY_NAME} System Pricing</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Grid Tie System - {PRODUCT_DESCRIPTION} ({WORK_SCOPE})
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="text-sm">
              DCR RIL 535 Wp Modules
            </Badge>
            <Badge variant="secondary" className="text-sm">
              String Inverter Included
            </Badge>
            <Badge variant="secondary" className="text-sm">
              Civil Material Excluded
            </Badge>
          </div>
        </div>

        {/* Grid Tie Systems */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <img src="/Shakti Solar.png" alt="Shakti Solar" className="h-5 w-auto" />
              Grid Tie Systems - DCR RIL 535 Wp Modules
            </CardTitle>
            <CardDescription>
              Complete solar systems with string inverters. Single and three-phase options available. Civil material not
              included.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GridTieSystemTable onRowClick={handleRowClick} />
          </CardContent>
        </Card>

        {/* Large System Notice */}
        <Card className="bg-gray-100 border-gray-300">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Need a system larger than {SYSTEM_SIZE_LIMIT} kWp?
              </h3>
              <p className="text-gray-600">
                For commercial and industrial installations above {SYSTEM_SIZE_LIMIT} kWp, please contact our sales team
                for customized pricing and solutions.
              </p>
              <Button
                variant="outline"
                className="mt-4 border-gray-400 text-gray-700 hover:bg-gray-200 bg-transparent"
                onClick={() => {
                  const largeSystemProduct: GridTieSystemData = {
                    slNo: 0,
                    systemSize: 0,
                    noOfModules: 0,
                    inverterCapacity: 0,
                    phase: "Three",
                    preGiElevatedWithGst: 0,
                    preGiElevatedPrice: 0,
                  }
                  setSelectedProduct(largeSystemProduct)
                  setIsFormOpen(true)
                }}
              >
                Contact Sales Team
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 border-t pt-8">
          <p>All prices are subject to change. Contact us for the latest pricing and availability.</p>
          <p className="mt-2">
            Civil material and installation charges are additional and not included in the above pricing.
          </p>
        </div>

        {/* Quote Form Dialog */}
        <ShaktiQuoteForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          productName={
            selectedProduct?.systemSize === 0
              ? "Large Scale Solar System (Above 10 kWp)"
              : selectedProduct
                ? `${selectedProduct.systemSize} kWp Solar System - ${selectedProduct.noOfModules} Modules`
                : "Shakti Solar Product"
          }
          isLargeSystem={selectedProduct?.systemSize === 0}
          powerDemandKw={selectedProduct?.systemSize === 0 ? null : selectedProduct?.systemSize || null}
        />
      </div>
    </div>
  )
}
