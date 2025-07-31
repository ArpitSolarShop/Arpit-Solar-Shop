import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GetQuote from "./pages/GetQuote";
import Products from "./pages/Products";
import Services from "./pages/Services";
import About from "./pages/About";
import AboutSolarTechnology from "./pages/AboutSolarTechnology";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Reliance from "./pages/Reliance";
import ShaktiSolar from "./pages/ShaktiSolar";
import Residential from "./pages/Residential";
import CommercialIndustrial from "./pages/CommercialIndustrial";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import ProductManager from "./pages/ProductManager";
import FloatingChatButton from "@/components/FloatingChatButton";






const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/get-quote" element={<GetQuote />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/sustainability" element={<AboutSolarTechnology />} />
          <Route path="/about/us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reliance" element={<Reliance />} />
          <Route path="/shakti-solar" element={<ShaktiSolar />} />
          <Route path="/solutions/residential" element={<Residential />} />
          <Route path="/solutions/commercial-industrial" element={<CommercialIndustrial />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/products" element={<ProductManager />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingChatButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
