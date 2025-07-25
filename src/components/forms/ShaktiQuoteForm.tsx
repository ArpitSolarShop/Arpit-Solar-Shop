import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Droplets, CheckCircle } from "lucide-react";

interface ShaktiQuoteFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName?: string;
}

const ShaktiQuoteForm = ({ open, onOpenChange, productName = "Shakti Solar Product" }: ShaktiQuoteFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
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
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
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
      };

      const { error } = await supabase.from("quotes").insert(insertData);

      if (error) throw error;

      toast({
        title: "Quote Request Submitted!",
        description: "Our Shakti Solar team will contact you within 24 hours to discuss your solar solution.",
      });

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
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting quote:", error);
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          {/* Shakti Logo */}
          <div className="flex justify-center mb-4">
            <img 
              src="/Shakti Solar.png" 
              alt="Shakti Solar" 
              className="h-12 w-auto"
            />
          </div>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <Droplets className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-orange-600">
                Shakti Solar Quote
              </DialogTitle>
              <DialogDescription className="text-base">
                Get a personalized quote for efficient solar solutions
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Card className="border-0 shadow-none">
          <CardHeader className="px-0 pb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-orange-600" />
              <span>High Efficiency Panels</span>
              <CheckCircle className="h-4 w-4 text-orange-600" />
              <span>Reliable Performance</span>
              <CheckCircle className="h-4 w-4 text-orange-600" />
              <span>Competitive Pricing</span>
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className="h-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="entity_type" className="text-sm font-medium">
                    Entity Type
                  </Label>
                  <Select value={formData.entity_type} onValueChange={(value) => handleInputChange("entity_type", value)}>
                    <SelectTrigger className="h-10">
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
                  <Label htmlFor="solution_classification" className="text-sm font-medium">
                    Solution Type
                  </Label>
                  <Select value={formData.solution_classification} onValueChange={(value) => handleInputChange("solution_classification", value)}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select solution type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Residential">Residential Solar</SelectItem>
                      <SelectItem value="Commercial">Commercial Solar</SelectItem>
                      <SelectItem value="Commercial and industrial DG">Industrial Solar Systems</SelectItem>
                      <SelectItem value="Utility-scale">Utility-scale Projects</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimated_area_sqft" className="text-sm font-medium">
                    Installation Area (sq ft)
                  </Label>
                  <Input
                    id="estimated_area_sqft"
                    type="number"
                    value={formData.estimated_area_sqft}
                    onChange={(e) => handleInputChange("estimated_area_sqft", e.target.value)}
                    placeholder="e.g. 1000"
                    className="h-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthly_bill" className="text-sm font-medium">
                    Monthly Electricity Bill (₹)
                  </Label>
                  <Input
                    id="monthly_bill"
                    type="number"
                    value={formData.monthly_bill}
                    onChange={(e) => handleInputChange("monthly_bill", e.target.value)}
                    placeholder="e.g. 5000"
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="power_demand_kw" className="text-sm font-medium">
                    Power Demand (kW)
                  </Label>
                  <Input
                    id="power_demand_kw"
                    type="number"
                    value={formData.power_demand_kw}
                    onChange={(e) => handleInputChange("power_demand_kw", e.target.value)}
                    placeholder="e.g. 5"
                    className="h-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project_location" className="text-sm font-medium">
                  Project Location
                </Label>
                <Input
                  id="project_location"
                  type="text"
                  value={formData.project_location}
                  onChange={(e) => handleInputChange("project_location", e.target.value)}
                  placeholder="City, State"
                  className="h-10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="referral_name" className="text-sm font-medium">
                    Referral Name (Optional)
                  </Label>
                  <Input
                    id="referral_name"
                    type="text"
                    value={formData.referral_name}
                    onChange={(e) => handleInputChange("referral_name", e.target.value)}
                    placeholder="Name of person who referred you"
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="referral_phone" className="text-sm font-medium">
                    Referral Phone Number (Optional)
                  </Label>
                  <Input
                    id="referral_phone"
                    type="tel"
                    value={formData.referral_phone}
                    onChange={(e) => handleInputChange("referral_phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className="h-10"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={loading || !formData.name || !formData.phone}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold h-12 text-base"
                >
                  {loading ? "Submitting..." : "Get My Shakti Solar Quote"}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  By submitting this form, you agree to be contacted by Shakti Solar representatives
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ShaktiQuoteForm;