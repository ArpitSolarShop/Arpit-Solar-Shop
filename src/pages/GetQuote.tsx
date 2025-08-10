// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/hooks/use-toast";
// import { Sun, ArrowLeft } from "lucide-react";
// import { Link } from "react-router-dom";

// // Reusable form component for embedding into a modal or page
// export const GetQuoteForm = ({
//   compact = false,
//   showHeader = true,
// }: {
//   compact?: boolean;
//   showHeader?: boolean;
// }) => {
//   const { toast } = useToast();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     entity_type: "",
//     solution_classification: "",
//     estimated_area_sqft: "",
//     monthly_bill: "",
//     power_demand_kw: "",
//     project_location: "",
//     referral_name: "",
//     referral_phone: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const insertData = {
//         name: formData.name,
//         phone: formData.phone,
//         email: formData.email || null,
//         entity_type: (formData.entity_type as "Individual" | "Enterprise") || null,
//         solution_classification:
//           (formData.solution_classification as
//             | "Residential"
//             | "Commercial"
//             | "Commercial and industrial DG"
//             | "BIPv"
//             | "Utility-scale") || null,
//         estimated_area_sqft: formData.estimated_area_sqft ? parseFloat(formData.estimated_area_sqft) : null,
//         monthly_bill: formData.monthly_bill ? parseFloat(formData.monthly_bill) : null,
//         power_demand_kw: formData.power_demand_kw ? parseFloat(formData.power_demand_kw) : null,
//         project_location: formData.project_location || null,
//         referral_name: formData.referral_name || null,
//         referral_phone: formData.referral_phone || null,
//         source: "Quote Form" as const,
//         // --- ADDED FOR CONSISTENCY WITH CHATBOT ---
//         customer_type: formData.entity_type === 'Individual' ? 'residential' : formData.entity_type ? 'commercial' : null,
//       };

//       // --- UPDATED TABLE NAME TO MATCH YOUR DATABASE ---
//       const { error } = await supabase.from("solar_quote_requests").insert(insertData);

//       if (error) throw error;

//       toast({
//         title: "Quote Request Submitted!",
//         description: "Our team will contact you within 24 hours to discuss your solar solution.",
//       });

//       // Reset form
//       setFormData({
//         name: "",
//         phone: "",
//         email: "",
//         entity_type: "",
//         solution_classification: "",
//         estimated_area_sqft: "",
//         monthly_bill: "",
//         power_demand_kw: "",
//         project_location: "",
//         referral_name: "",
//         referral_phone: "",
//       });
//     } catch (error) {
//       console.error("Error submitting quote:", error);
//       toast({
//         title: "Error",
//         description: `Failed to submit quote request. Details: ${(error as any).message}`,
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const isFrameless = compact && !showHeader;

//   return (
//     <Card className={isFrameless ? "bg-transparent shadow-none border-0" : "card-shadow"}>
//       {showHeader && (
//         <CardHeader className={compact ? "py-3" : undefined}>
//           <CardTitle className={compact ? "text-xl" : undefined}>Solar Solution Information</CardTitle>
//           <CardDescription className={compact ? "text-xs" : undefined}>
//             Please provide accurate information to help us create the best solar solution for you
//           </CardDescription>
//         </CardHeader>
//       )}
//       <CardContent className={isFrameless ? "p-0" : compact ? "pt-4" : undefined}>
//         <form onSubmit={handleSubmit} className={compact ? "space-y-4" : "space-y-6"}>
//           {/* Personal Information */}
//           <div className={`grid ${compact ? "grid-cols-1 sm:grid-cols-2 gap-4" : "grid-cols-1 md:grid-cols-2 gap-6"}`}>
//             <div className="space-y-2">
//               <Label htmlFor="name" className="text-sm font-medium">
//                 Full Name *
//               </Label>
//               <Input
//                 id="name"
//                 type="text"
//                 required
//                 value={formData.name}
//                 onChange={(e) => handleInputChange("name", e.target.value)}
//                 placeholder="Enter your full name"
//                 className={compact ? "h-10" : "h-11"}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="phone" className="text-sm font-medium">
//                 Phone Number *
//               </Label>
//               <Input
//                 id="phone"
//                 type="tel"
//                 required
//                 value={formData.phone}
//                 onChange={(e) => handleInputChange("phone", e.target.value)}
//                 placeholder="+91 98765 43210"
//                 className={compact ? "h-10" : "h-11"}
//               />
//             </div>
//           </div>

//           <div className={`grid ${compact ? "grid-cols-1 sm:grid-cols-2 gap-4" : "grid-cols-1 md:grid-cols-2 gap-6"}`}>
//             <div className="space-y-2">
//               <Label htmlFor="email" className="text-sm font-medium">
//                 Email Address
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => handleInputChange("email", e.target.value)}
//                 placeholder="your.email@example.com"
//                 className={compact ? "h-10" : "h-11"}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="entity_type" className="text-sm font-medium">
//                 Entity Type
//               </Label>
//               <Select value={formData.entity_type} onValueChange={(value) => handleInputChange("entity_type", value)}>
//                 <SelectTrigger className={compact ? "h-10" : "h-11"}>
//                   <SelectValue placeholder="Select entity type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Individual">Individual</SelectItem>
//                   <SelectItem value="Enterprise">Enterprise</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {/* Project Details */}
//           <div className={`grid ${compact ? "grid-cols-1 sm:grid-cols-2 gap-4" : "grid-cols-1 md:grid-cols-2 gap-6"}`}>
//             <div className="space-y-2">
//               <Label htmlFor="solution_classification" className="text-sm font-medium">
//                 Solution Type
//               </Label>
//               <Select
//                 value={formData.solution_classification}
//                 onValueChange={(value) => handleInputChange("solution_classification", value)}
//               >
//                 <SelectTrigger className={compact ? "h-10" : "h-11"}>
//                   <SelectValue placeholder="Select solution type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Residential">Residential</SelectItem>
//                   <SelectItem value="Commercial">Commercial</SelectItem>
//                   <SelectItem value="Commercial and industrial DG">Commercial and Industrial DG</SelectItem>
//                   <SelectItem value="BIPv">BIPV</SelectItem>
//                   <SelectItem value="Utility-scale">Utility-scale</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="estimated_area_sqft" className="text-sm font-medium">
//                 Installation Area (sq ft)
//               </Label>
//               <Input
//                 id="estimated_area_sqft"
//                 type="number"
//                 value={formData.estimated_area_sqft}
//                 onChange={(e) => handleInputChange("estimated_area_sqft", e.target.value)}
//                 placeholder="e.g. 1000"
//                 className={compact ? "h-10" : "h-11"}
//               />
//             </div>
//           </div>

//           <div className={`grid ${compact ? "grid-cols-1 sm:grid-cols-2 gap-4" : "grid-cols-1 md:grid-cols-2 gap-6"}`}>
//             <div className="space-y-2">
//               <Label htmlFor="monthly_bill" className="text-sm font-medium">
//                 Monthly Electricity Bill (₹)
//               </Label>
//               <Input
//                 id="monthly_bill"
//                 type="number"
//                 value={formData.monthly_bill}
//                 onChange={(e) => handleInputChange("monthly_bill", e.target.value)}
//                 placeholder="e.g. 5000"
//                 className={compact ? "h-10" : "h-11"}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="power_demand_kw" className="text-sm font-medium">
//                 Power Demand (kW)
//               </Label>
//               <Input
//                 id="power_demand_kw"
//                 type="number"
//                 value={formData.power_demand_kw}
//                 onChange={(e) => handleInputChange("power_demand_kw", e.target.value)}
//                 placeholder="e.g. 5"
//                 className={compact ? "h-10" : "h-11"}
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="project_location" className="text-sm font-medium">
//               Project Location
//             </Label>
//             <Input
//               id="project_location"
//               type="text"
//               value={formData.project_location}
//               onChange={(e) => handleInputChange("project_location", e.target.value)}
//               placeholder="City, State"
//               className={compact ? "h-10" : "h-11"}
//             />
//           </div>

//           <div className={`grid ${compact ? "grid-cols-1 sm:grid-cols-2 gap-4" : "grid-cols-1 md:grid-cols-2 gap-6"}`}>
//             <div className="space-y-2">
//               <Label htmlFor="referral_name" className="text-sm font-medium">
//                 Referral Name (Optional)
//               </Label>
//               <Input
//                 id="referral_name"
//                 type="text"
//                 value={formData.referral_name}
//                 onChange={(e) => handleInputChange("referral_name", e.target.value)}
//                 placeholder="Name of person who referred you"
//                 className={compact ? "h-10" : "h-11"}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="referral_phone" className="text-sm font-medium">
//                 Referral Phone Number (Optional)
//               </Label>
//               <Input
//                 id="referral_phone"
//                 type="tel"
//                 value={formData.referral_phone}
//                 onChange={(e) => handleInputChange("referral_phone", e.target.value)}
//                 placeholder="+91 98765 43210"
//                 className={compact ? "h-10" : "h-11"}
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className={compact ? "pt-3" : "pt-4"}>
//             <Button
//               type="submit"
//               disabled={loading || !formData.name || !formData.phone}
//               className={`w-full sunset-gradient text-white font-semibold ${
//                 compact ? "h-10 text-base" : "h-12 text-lg"
//               }`}
//             >
//               {loading ? "Submitting..." : "Get My Free Quote"}
//             </Button>
//             <p
//               className={`text-center mt-3 ${
//                 compact ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"
//               }`}
//             >
//               By submitting this form, you agree to our terms of service and privacy policy
//             </p>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// // Main page component
// const GetQuote = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-solar-blue/5 to-solar-orange/5 py-20">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <Link to="/" className="inline-flex items-center text-solar-orange hover:text-solar-gold transition-colors mb-4">
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Home
//           </Link>
//           <div className="flex justify-center mb-4">
//             <div className="w-12 h-12 sunset-gradient rounded-xl flex items-center justify-center">
//               <Sun className="w-6 h-6 text-white" />
//             </div>
//           </div>
//           <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Get Your Free Solar Quote</h1>
//           <p className="text-lg text-muted-foreground">
//             Fill out this form and our solar experts will design a custom solution for your needs
//           </p>
//         </div>

//         {/* Form */}
//         <GetQuoteForm />
//       </div>
//     </div>
//   );
// };

// export default GetQuote;





import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Sun, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Reusable form component for embedding into a modal or page
export const GetQuoteForm = ({
  compact = false,
  showHeader = true,
}: {
  compact?: boolean;
  showHeader?: boolean;
}) => {
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
        solution_classification:
          (formData.solution_classification as
            | "Residential"
            | "Commercial"
            | "Commercial and industrial DG"
            | "BIPv"
            | "Utility-scale") || null,
        estimated_area_sqft: formData.estimated_area_sqft ? parseFloat(formData.estimated_area_sqft) : null,
        monthly_bill: formData.monthly_bill ? parseFloat(formData.monthly_bill) : null,
        power_demand_kw: formData.power_demand_kw ? parseFloat(formData.power_demand_kw) : null,
        project_location: formData.project_location || null,
        referral_name: formData.referral_name || null,
        referral_phone: formData.referral_phone || null,
        source: "Quote Form" as const,
        customer_type: formData.entity_type === 'Individual' ? 'residential' : formData.entity_type ? 'commercial' : null,
      };

      const { error } = await supabase.from("solar_quote_requests").insert(insertData);

      if (error) throw error;

      toast({
        title: "Quote Request Submitted!",
        description: "Our team will contact you within 24 hours to discuss your solar solution.",
      });

      // Reset form
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
    } catch (error) {
      console.error("Error submitting quote:", error);
      toast({
        title: "Error",
        description: `Failed to submit quote request. Details: ${(error as any).message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFrameless = compact && !showHeader;

  return (
    <Card className={isFrameless ? "bg-transparent shadow-none border-0" : "card-shadow"}>
      {showHeader && (
        <CardHeader className={compact ? "py-3" : undefined}>
          <CardTitle className={compact ? "text-xl" : undefined}>Solar Solution Information</CardTitle>
          <CardDescription className={compact ? "text-xs" : undefined}>
            Please provide accurate information to help us create the best solar solution for you
          </CardDescription>
        </CardHeader>
      )}
      <CardContent className={isFrameless ? "p-0" : compact ? "pt-4" : undefined}>
        <form onSubmit={handleSubmit} className={compact ? "space-y-4" : "space-y-6"}>
          {/* Personal Information */}
          <div className={`grid ${compact ? "grid-cols-1 sm:grid-cols-2 gap-4" : "grid-cols-1 md:grid-cols-2 gap-6"}`}>
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
                className={compact ? "h-10" : "h-11"}
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
                className={compact ? "h-10" : "h-11"}
              />
            </div>
          </div>

          <div className={`grid ${compact ? "grid-cols-1 sm:grid-cols-2 gap-4" : "grid-cols-1 md:grid-cols-2 gap-6"}`}>
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
                className={compact ? "h-10" : "h-11"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="entity_type" className="text-sm font-medium">
                Entity Type
              </Label>
              <Select value={formData.entity_type} onValueChange={(value) => handleInputChange("entity_type", value)}>
                <SelectTrigger className={compact ? "h-10" : "h-11"}>
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
          <div className={`grid ${compact ? "grid-cols-1 sm:grid-cols-2 gap-4" : "grid-cols-1 md:grid-cols-2 gap-6"}`}>
            <div className="space-y-2">
              <Label htmlFor="solution_classification" className="text-sm font-medium">
                Solution Type
              </Label>
              <Select
                value={formData.solution_classification}
                onValueChange={(value) => handleInputChange("solution_classification", value)}
              >
                <SelectTrigger className={compact ? "h-10" : "h-11"}>
                  <SelectValue placeholder="Select solution type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Residential">Residential</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Commercial and industrial DG">Commercial and Industrial DG</SelectItem>
                  <SelectItem value="BIPv">BIPV</SelectItem>
                  <SelectItem value="Utility-scale">Utility-scale</SelectItem>
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
                className={compact ? "h-10" : "h-11"}
              />
            </div>
          </div>

          <div className={`grid ${compact ? "grid-cols-1 sm:grid-cols-2 gap-4" : "grid-cols-1 md:grid-cols-2 gap-6"}`}>
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
                className={compact ? "h-10" : "h-11"}
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
                className={compact ? "h-10" : "h-11"}
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
              className={compact ? "h-10" : "h-11"}
            />
          </div>

          <div className={`grid ${compact ? "grid-cols-1 sm:grid-cols-2 gap-4" : "grid-cols-1 md:grid-cols-2 gap-6"}`}>
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
                className={compact ? "h-10" : "h-11"}
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
                className={compact ? "h-10" : "h-11"}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className={compact ? "pt-3" : "pt-4"}>
            <Button
              type="submit"
              disabled={loading || !formData.name || !formData.phone}
              className={`w-full sunset-gradient text-white font-semibold ${
                compact ? "h-10 text-base" : "h-12 text-lg"
              }`}
            >
              {loading ? "Submitting..." : "Get My Free Quote"}
            </Button>
            <p
              className={`text-center mt-3 ${
                compact ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"
              }`}
            >
              By submitting this form, you agree to our terms of service and privacy policy
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// Main page component
const GetQuote = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-solar-blue/5 to-solar-orange/5 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-solar-orange hover:text-solar-gold transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex justify-center mb-4">
            {/* THIS IS THE UPDATED PART WITH YOUR LOGO */}
            <img 
              src="/logo.png" 
              alt="Company Logo" 
              className="h-16 w-auto" 
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Get Your Free Solar Quote</h1>
          <p className="text-lg text-muted-foreground">
            Fill out this form and our solar experts will design a custom solution for your needs
          </p>
        </div>

        {/* Form */}
        <GetQuoteForm />
      </div>
    </div>
  );
};

export default GetQuote;