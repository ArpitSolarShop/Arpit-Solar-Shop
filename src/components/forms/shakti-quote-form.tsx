"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, AlertCircle } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"

interface ShaktiQuoteFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  productName?: string
  isLargeSystem?: boolean
  powerDemandKw?: number | null
}

const ShaktiQuoteForm = ({
  open,
  onOpenChange,
  productName = "Shakti Solar Product",
  isLargeSystem = false,
  powerDemandKw = null,
}: ShaktiQuoteFormProps) => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    entity_type: "",
    solution_classification: "",
    estimated_area_sqft: "",
    monthly_bill: "",
    power_demand_kw: "",
    project_location: "",
    referral_name: "",
    referral_phone: "",
  })

  useEffect(() => {
    if (powerDemandKw !== null && powerDemandKw !== undefined) {
      setFormData((prev) => ({
        ...prev,
        power_demand_kw: String(powerDemandKw),
      }))
    }
  }, [powerDemandKw])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Submit to Supabase database
      const insertData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        entity_type: (formData.entity_type as "Individual" | "Enterprise") || null,
        solution_classification: (formData.solution_classification as "Residential" | "Commercial" | "Commercial and industrial DG" | "BIPv" | "Utility-scale") || null,
        estimated_area_sqft: formData.estimated_area_sqft ? parseFloat(formData.estimated_area_sqft) : null,
        monthly_bill: formData.monthly_bill ? parseFloat(formData.monthly_bill) : null,
        power_demand_kw: formData.power_demand_kw ? parseFloat(formData.power_demand_kw) : null,
        project_location: formData.project_location || null,
        referral_name: formData.referral_name || null,
        referral_phone: formData.referral_phone || null,
        product_name: productName,
        product_category: "Shakti",
        source: "Quote Form" as const,
        customer_type: formData.entity_type === "Individual" ? "residential" : "commercial",
        referral_source: formData.referral_name ? "referral" : null,
      };

      const { error } = await supabase.from("quotes").insert(insertData);

      if (error) throw error;

      // Call edge function to generate PDF and send via WhatsApp
      try {
        const pdfResponse = await supabase.functions.invoke('generate-quote-pdf', {
          body: { formData: insertData }
        });
        
        if (pdfResponse.error) {
          console.error('PDF generation error:', pdfResponse.error);
        } else {
          console.log('PDF generated and sent successfully:', pdfResponse.data);
        }
      } catch (pdfError) {
        console.error('Error calling PDF function:', pdfError);
        // Don't throw - we don't want to fail the whole process if PDF fails
      }

      toast({
        title: "Quote Request Submitted!",
        description: isLargeSystem
          ? "Our sales team will contact you within 24 hours to discuss your large-scale solar project. You'll also receive a detailed quote via WhatsApp."
          : "Our Shakti Solar team will contact you within 24 hours to discuss your solar solution. You'll also receive a detailed quote via WhatsApp.",
      })

      // Reset form and close dialog
      setFormData({
        name: "",
        phone: "",
        email: "",
        entity_type: "",
        solution_classification: "",
        estimated_area_sqft: "",
        monthly_bill: "",
        power_demand_kw: "",
        project_location: "",
        referral_name: "",
        referral_phone: "",
      })
      onOpenChange(false)
    } catch (error) {
      console.error("Error submitting quote:", error)
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="relative">
          {/* Shakti Logo */}
          <div className="flex justify-center mb-4">
            <img src="/Shakti Solar.png" alt="Shakti Solar" className="h-16 w-auto" />
          </div>

          <div className="text-center mb-4">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {isLargeSystem ? "Large Scale Solar Quote" : "Shakti Solar Quote"}
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              {isLargeSystem
                ? "Get a customized quote for large-scale solar installations"
                : "Get a personalized quote for efficient solar solutions"}
            </DialogDescription>
          </div>

          {/* Large System Alert */}
          {isLargeSystem && (
            <Alert className="mb-4 border-gray-300 bg-gray-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-gray-700">
                <strong>Large Scale Project:</strong> Our sales team will provide customized pricing and solutions for
                systems above 10 kWp.
              </AlertDescription>
            </Alert>
          )}

          {/* Selected Product Display */}
          {productName !== "Shakti Solar Product" && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <img src="/Shakti Solar.png" alt="Shakti Solar" className="h-4 w-auto" />
                <span className="font-semibold text-gray-800">Selected Product:</span>
              </div>
              <Badge variant="secondary" className="bg-gray-100 text-gray-800 text-sm">
                {productName}
              </Badge>
              <p className="text-sm text-gray-700 mt-2">DCR RIL 535 Wp Modules with String Inverter</p>
            </div>
          )}
        </DialogHeader>

        <Card className="border-0 shadow-none">
          <CardHeader className="px-0 pb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-gray-700" />
              <span>High Efficiency Panels</span>
              <CheckCircle className="h-4 w-4 text-gray-700" />
              <span>Reliable Performance</span>
              <CheckCircle className="h-4 w-4 text-gray-700" />
              <span>Competitive Pricing</span>
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    className="h-10 border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number *
                  </Label>
                  <div className="flex">
                    <Select value="+91" disabled>
                      <SelectTrigger className="w-24 h-10 border-gray-300 rounded-r-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+91">+91 India</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="98765 43210"
                      className="h-10 border-gray-300 rounded-l-none border-l-0"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className="h-10 border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="entity_type" className="text-sm font-medium text-gray-700">
                    Entity Type
                  </Label>
                  <Select
                    value={formData.entity_type}
                    onValueChange={(value) => handleInputChange("entity_type", value)}
                  >
                    <SelectTrigger className="h-10 border-gray-300">
                      <SelectValue placeholder="Select entity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Individual">Individual</SelectItem>
                      <SelectItem value="Enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="solution_classification" className="text-sm font-medium text-gray-700">
                    Solution Type
                  </Label>
                  <Select
                    value={formData.solution_classification}
                    onValueChange={(value) => handleInputChange("solution_classification", value)}
                  >
                    <SelectTrigger className="h-10 border-gray-300">
                      <SelectValue placeholder="Select solution type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Residential">Residential Solar</SelectItem>
                      <SelectItem value="Commercial">Commercial Solar</SelectItem>
                      {/* <SelectItem value="Commercial and industrial DG">Industrial Solar Systems</SelectItem>
                      <SelectItem value="Utility-scale">Utility-scale Projects</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimated_area_sqft" className="text-sm font-medium text-gray-700">
                    Installation Area (sq ft)
                  </Label>
                  <Input
                    id="estimated_area_sqft"
                    type="number"
                    value={formData.estimated_area_sqft}
                    onChange={(e) => handleInputChange("estimated_area_sqft", e.target.value)}
                    placeholder="e.g. 1000"
                    className="h-10 border-gray-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthly_bill" className="text-sm font-medium text-gray-700">
                    Monthly Electricity Bill (₹)
                  </Label>
                  <Input
                    id="monthly_bill"
                    type="number"
                    value={formData.monthly_bill}
                    onChange={(e) => handleInputChange("monthly_bill", e.target.value)}
                    placeholder="e.g. 5000"
                    className="h-10 border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="power_demand_kw" className="text-sm font-medium text-gray-700">
                    Power Demand (kW)
                  </Label>
                  <Input
                    id="power_demand_kw"
                    type="number"
                    value={formData.power_demand_kw}
                    onChange={(e) => {
                      if (powerDemandKw === null || powerDemandKw === undefined) {
                        handleInputChange("power_demand_kw", e.target.value)
                      }
                    }}
                    readOnly={powerDemandKw !== null && powerDemandKw !== undefined}
                    placeholder="e.g. 5"
                    className="h-10 border-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project_location" className="text-sm font-medium text-gray-700">
                  Project Location
                </Label>
                <Input
                  id="project_location"
                  type="text"
                  value={formData.project_location}
                  onChange={(e) => handleInputChange("project_location", e.target.value)}
                  placeholder="City, State"
                  className="h-10 border-gray-300"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="referral_name" className="text-sm font-medium text-gray-700">
                    Referral Name (Optional)
                  </Label>
                  <Input
                    id="referral_name"
                    type="text"
                    value={formData.referral_name}
                    onChange={(e) => handleInputChange("referral_name", e.target.value)}
                    placeholder="Name of person who referred you"
                    className="h-10 border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="referral_phone" className="text-sm font-medium text-gray-700">
                    Referral Phone Number (Optional)
                  </Label>
                  <Input
                    id="referral_phone"
                    type="tel"
                    value={formData.referral_phone}
                    onChange={(e) => handleInputChange("referral_phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className="h-10 border-gray-300"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={loading || !formData.name || !formData.phone}
                  className="w-full bg-black hover:bg-gray-800 text-white font-semibold h-12 text-base"
                >
                  {loading ? "Submitting..." : isLargeSystem ? "Contact Sales Team" : "Get My Shakti Solar Quote"}
                </Button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  By submitting this form, you agree to be contacted by Shakti Solar representatives
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

export default ShaktiQuoteForm
