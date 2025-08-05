import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorks from "@/components/sections/HowItWorks";
import ProjectHighlights from "@/components/sections/ProjectHighlights";
import Certifications from "@/components/sections/Certifications";

import FAQ from "@/components/sections/FAQ";
import CleanEnergySolution from "@/components/sections/CleanEnergySolution";

import TrustedPartnersSection from '@/components/sections/TrustedPartnersSection'; 



const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <CleanEnergySolution />
        <HowItWorks />
        <TrustedPartnersSection />
        <ProjectHighlights />
        <Certifications />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
