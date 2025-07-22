import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorks from "@/components/sections/HowItWorks";
import ProjectHighlights from "@/components/sections/ProjectHighlights";
import Certifications from "@/components/sections/Certifications";
import HappyCustomers from "@/components/sections/HappyCustomers";
import FAQ from "@/components/sections/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <ProjectHighlights />
        <Certifications />
        <HappyCustomers />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
