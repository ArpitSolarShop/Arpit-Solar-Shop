import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Globe, Factory, TrendingUp, Award, Target, Quote, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import RelianceQuoteForm from "@/components/forms/RelianceQuoteForm";
import RelianceDataTables from "@/components/sections/RelianceDataTables";

// Import generated images
import relianceHero from "@/assets/reliance-hero.jpg";
import hjtTechnology from "@/assets/hjt-technology.jpg";
import nexwafeTechnology from "@/assets/nexwafe-technology.jpg";
import relianceFacility from "@/assets/reliance-facility.jpg";

const SwiperNavButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="absolute top-1/2 left-0 right-0 z-10 flex items-center justify-between px-4 -translate-y-1/2 pointer-events-none">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => swiper.slidePrev()}
        className="pointer-events-auto bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-300 hidden md:flex items-center justify-center p-2"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-gray-700" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => swiper.slideNext()}
        className="pointer-events-auto bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-300 hidden md:flex items-center justify-center p-2"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-gray-700" />
      </Button>
    </div>
  );
};

const Reliance = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [quoteFormOpen, setQuoteFormOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll(".animate-on-scroll");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen reliance-bg">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${relianceHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/20"></div>
        
        <div className="container relative z-10 text-center text-white px-4">
          <div className="animate-fade-in">
            {/* Reliance Logo */}
            <div className="mb-6 flex justify-center">
              <img 
                src="/reliance-industries-ltd.png" 
                alt="Reliance Industries Ltd" 
                className="h-16 md:h-20 w-auto opacity-90"
              />
            </div>
            
            <Badge className="mb-4 bg-white/20 text-white border-white/20 hover:bg-white/30">
              Leading India's Solar Revolution
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Reliance Solar Energy
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Pioneering Advanced Heterojunction Technology (HJT) to power India's sustainable future with world-class solar solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => setQuoteFormOpen(true)}
                className="bg-transparent border-2 reliance-border reliance-primary hover:reliance-hover shadow-xl backdrop-blur-sm group"
              >
                <Quote className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Get HJT Solar Quote
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Floating elements animation */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-white/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-white/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Strategic Achievements Section */}
      <section className="py-20 bg-gradient-to-br from-[#eef4fa] to-white overflow-hidden animate-on-scroll">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold mb-5 text-gray-900 leading-tight">
              Strategic{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                Achievements
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto font-light">
              Three transformative strategic moves in 2021 that positioned Reliance at the forefront of global solar innovation: 
              <span className="font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> Acquire • Innovate • Build</span>
            </p>
          </div>

          <div className="relative">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              slidesPerView={1}
              spaceBetween={30}
              loop
              breakpoints={{
                640: { slidesPerView: 1.2, spaceBetween: 20 },
                768: { slidesPerView: 1.5, spaceBetween: 30 },
                1024: { slidesPerView: 2.5, spaceBetween: 40 },
                1280: { slidesPerView: 3, spaceBetween: 40 },
              }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
              className="!pb-16"
            >
              {/* Technology Acquisition - NexWafe */}
              <SwiperSlide className="h-auto">
                <Card className="h-full flex flex-col rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 border border-gray-100 bg-white">
                  <CardHeader className="p-0 relative">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 overflow-hidden flex items-center justify-center relative">
                      <img 
                        src={nexwafeTechnology} 
                        alt="NexWafe Technology" 
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/60 via-purple-600/60 to-indigo-700/60"></div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1 text-xs font-semibold rounded-full shadow-sm bg-white text-blue-600">
                        Technology Acquisition
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col p-6">
                    <CardTitle className="text-2xl font-bold mb-2 text-gray-800">
                      NexWafe GmbH
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 flex-grow mb-4 leading-relaxed">
                      €25 Million investment in revolutionary "Green Solar Wafer" technology that eliminates up to 40% silicon waste through epitaxial kerf-free manufacturing.
                    </CardDescription>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Zero kerf waste technology</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Massive cost reduction</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <span>Supply chain control</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Zero Kerf</Badge>
                      <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">Cost Leader</Badge>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Green Tech</Badge>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>

              {/* Market Entry & Scale - REC Solar */}
              <SwiperSlide className="h-auto">
                <Card className="h-full flex flex-col rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 border border-gray-100 bg-white">
                  <CardHeader className="p-0 relative">
                    <div className="w-full h-48 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 overflow-hidden flex items-center justify-center relative">
                      <img 
                        src={hjtTechnology} 
                        alt="HJT Technology" 
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/60 via-teal-600/60 to-cyan-700/60"></div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1 text-xs font-semibold rounded-full shadow-sm bg-white text-emerald-600">
                        Market Entry & Scale
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Globe className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col p-6">
                    <CardTitle className="text-2xl font-bold mb-2 text-gray-800">
                      REC Solar Holdings AS
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 flex-grow mb-4 leading-relaxed">
                      $771 Million acquisition of world-class Tier-1 brand with pioneering Heterojunction Technology and proven Alpha series panels among the world's most efficient.
                    </CardDescription>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span>Tier-1 global brand</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        <span>Advanced HJT technology</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                        <span>Global operations</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">HJT Pioneer</Badge>
                      <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-200">Global Brand</Badge>
                      <Badge className="bg-cyan-100 text-cyan-700 hover:bg-cyan-200">Tier-1</Badge>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>

              {/* Domestic Manufacturing - PLI Scheme */}
              <SwiperSlide className="h-auto">
                <Card className="h-full flex flex-col rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 border border-gray-100 bg-white">
                  <CardHeader className="p-0 relative">
                    <div className="w-full h-48 bg-gradient-to-br from-orange-500 via-red-600 to-pink-700 overflow-hidden flex items-center justify-center relative">
                      <img 
                        src={relianceFacility} 
                        alt="Reliance Facility" 
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/60 via-red-600/60 to-pink-700/60"></div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1 text-xs font-semibold rounded-full shadow-sm bg-white text-orange-600">
                        Domestic Manufacturing
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Factory className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col p-6">
                    <CardTitle className="text-2xl font-bold mb-2 text-gray-800">
                      PLI Scheme Success
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 flex-grow mb-4 leading-relaxed">
                      4 GW integrated solar manufacturing facility at Jamnagar Green Energy Complex. Complete integration from polysilicon to modules with PLI incentives.
                    </CardDescription>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>4 GW annual capacity</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>Complete integration</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                        <span>Government support</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">4GW Capacity</Badge>
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-200">Full Integration</Badge>
                      <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-200">PLI Incentives</Badge>
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>

              <SwiperNavButtons />
            </Swiper>
          </div>

        </div>
      </section>

      {/* HJT Technology Deep Dive */}
      <section className="py-20 reliance-bg animate-on-scroll">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <Badge className="mb-4 reliance-bg-primary text-white border-transparent">
                Advanced Technology
              </Badge>
              <h2 className="text-4xl font-bold mb-6 reliance-text">
                Heterojunction Technology (HJT): The Future of Solar
              </h2>
              <p className="text-lg reliance-body-text mb-4">
                <strong>HJT = Crystalline Silicon + Amorphous Silicon Layers</strong>
              </p>
              <p className="text-lg reliance-body-text mb-8">
                Heterojunction solar cells are hybrid solar cells that combine a base layer of crystalline silicon with two thin layers of amorphous silicon (a-Si:H) on both sides. This creates a highly efficient junction with fewer electron losses, better light absorption, and superior temperature performance.
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 mb-8 border border-blue-100 dark:border-blue-800">
                <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  How It Works (Simply)
                </h4>
                <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Light hits the front layer → electrons excited</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Amorphous silicon layers act as passivation layers, reducing energy loss</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Electrons flow through the crystalline silicon core</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Energy is collected through transparent conductive layers on both sides</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 reliance-bg-primary rounded-full flex items-center justify-center mt-1">
                    <TrendingUp className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold reliance-text">Superior Efficiency</h4>
                    <p className="text-sm reliance-body-text">23–25% efficiency (very high)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 reliance-bg-primary rounded-full flex items-center justify-center mt-1">
                    <Award className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold reliance-text">Premium Performance</h4>
                    <p className="text-sm reliance-body-text">~ -0.25% /°C temperature coefficient (less power drop in heat)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 reliance-bg-primary rounded-full flex items-center justify-center mt-1">
                    <Target className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold reliance-text">Exceptional Reliability</h4>
                    <p className="text-sm reliance-body-text">Very low degradation (~0.25% per year) with excellent bifaciality</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="bg-transparent border-2 reliance-border reliance-primary hover:reliance-hover">
                Learn More About HJT <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={hjtTechnology} 
                  alt="HJT Technology Diagram" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating stats */}
              <div className="absolute -top-4 -right-4 bg-white reliance-border border shadow-lg rounded-lg p-4 animate-float">
                <div className="text-2xl font-bold reliance-primary">25%</div>
                <div className="text-sm reliance-body-text">Max Efficiency</div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white reliance-border border shadow-lg rounded-lg p-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="text-2xl font-bold reliance-primary">90%</div>
                <div className="text-sm reliance-body-text">Bifaciality</div>
              </div>
            </div>
          </div>

          {/* Technology Comparison Section */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900/50 dark:to-blue-900/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Solar Technology Comparison: HJT vs TOPCon vs PERC
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
                Compare the three most popular solar cell technologies in 2025 to understand why HJT represents the premium choice
              </p>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm rounded-2xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <th className="p-4 text-left font-semibold">Feature / Metric</th>
                    <th className="p-4 text-center font-semibold">⚡ HJT (Heterojunction)</th>
                    <th className="p-4 text-center font-semibold">🔆 TOPCon</th>
                    <th className="p-4 text-center font-semibold">🔅 PERC</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800">
                  <tr className="border-b border-gray-100 dark:border-slate-700">
                    <td className="p-4 font-semibold text-gray-700 dark:text-gray-300">Cell Type</td>
                    <td className="p-4 text-center text-blue-600 font-semibold">N-Type</td>
                    <td className="p-4 text-center text-green-600 font-semibold">N-Type</td>
                    <td className="p-4 text-center text-orange-600 font-semibold">P-Type (mostly)</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-slate-700 bg-blue-25 dark:bg-blue-900/10">
                    <td className="p-4 font-semibold text-gray-700 dark:text-gray-300">Efficiency</td>
                    <td className="p-4 text-center font-bold text-blue-600">⭐ 23–25%</td>
                    <td className="p-4 text-center font-bold text-green-600">⭐ 22–24%</td>
                    <td className="p-4 text-center font-bold text-orange-600">⭐ 19–21%</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-slate-700">
                    <td className="p-4 font-semibold text-gray-700 dark:text-gray-300">Temperature Coefficient</td>
                    <td className="p-4 text-center font-bold text-blue-600">🔥 ~ -0.25%/°C (best)</td>
                    <td className="p-4 text-center font-bold text-green-600">🔥 ~ -0.30%/°C</td>
                    <td className="p-4 text-center font-bold text-red-600">❌ ~ -0.38%/°C (worst)</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-slate-700 bg-blue-25 dark:bg-blue-900/10">
                    <td className="p-4 font-semibold text-gray-700 dark:text-gray-300">Bifacial Capability</td>
                    <td className="p-4 text-center font-bold text-blue-600">✅ Excellent (~90%)</td>
                    <td className="p-4 text-center font-bold text-green-600">✅ Good (~70–80%)</td>
                    <td className="p-4 text-center font-bold text-orange-600">⚠️ Moderate (~60%)</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-slate-700">
                    <td className="p-4 font-semibold text-gray-700 dark:text-gray-300">Degradation Rate</td>
                    <td className="p-4 text-center font-bold text-blue-600">🔒 Very Low (~0.25%/yr)</td>
                    <td className="p-4 text-center font-bold text-green-600">🔒 Low (~0.3%/yr)</td>
                    <td className="p-4 text-center font-bold text-orange-600">⚠️ Higher (~0.5%/yr)</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-slate-700 bg-blue-25 dark:bg-blue-900/10">
                    <td className="p-4 font-semibold text-gray-700 dark:text-gray-300">LID (Light Induced Degradation)</td>
                    <td className="p-4 text-center font-bold text-blue-600">❌ None (N-type)</td>
                    <td className="p-4 text-center font-bold text-green-600">❌ None (N-type)</td>
                    <td className="p-4 text-center font-bold text-red-600">⚠️ Yes (P-type silicon)</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-slate-700">
                    <td className="p-4 font-semibold text-gray-700 dark:text-gray-300">Cost per Watt</td>
                    <td className="p-4 text-center font-bold text-red-600">💸 High</td>
                    <td className="p-4 text-center font-bold text-yellow-600">💵 Medium</td>
                    <td className="p-4 text-center font-bold text-green-600">💰 Low</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-slate-700 bg-blue-25 dark:bg-blue-900/10">
                    <td className="p-4 font-semibold text-gray-700 dark:text-gray-300">Best Use Case</td>
                    <td className="p-4 text-center text-blue-600 font-semibold">Premium homes, commercial rooftops</td>
                    <td className="p-4 text-center text-green-600 font-semibold">Balanced use in modern systems</td>
                    <td className="p-4 text-center text-orange-600 font-semibold">Budget projects, price-sensitive areas</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Technology Verdict Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <Card className="relative overflow-hidden border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <CardTitle className="text-green-700 dark:text-green-300">TOPCon</CardTitle>
                  </div>
                  <div className="text-2xl font-bold text-green-600">"Best Balance"</div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">✅</span>
                      <span>Best cost-performance balance</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">✅</span>
                      <span>N-type silicon = no LID, better lifespan</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">✅</span>
                      <span>Becoming industry standard 2025–26</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-2 border-orange-200 dark:border-orange-800 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                      <Target className="h-4 w-4 text-white" />
                    </div>
                    <CardTitle className="text-orange-700 dark:text-orange-300">PERC</CardTitle>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">"Entry Level"</div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">✅</span>
                      <span>Cheapest, reliable, well-known tech</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">✅</span>
                      <span>Good for budget-friendly systems</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-600">❌</span>
                      <span>Lower efficiency, worse in heat</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>

      {/* Products & Pricing Section */}
      <section className="py-20 reliance-bg animate-on-scroll">
        <div className="container px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 reliance-bg-primary text-white border-transparent">
              Product Catalog
            </Badge>
            <h2 className="text-4xl font-bold mb-4 reliance-text">Reliance Solar System Configurations</h2>
            <p className="text-xl reliance-body-text max-w-3xl mx-auto">
              Choose from our comprehensive range of HJT modules with competitive pricing and flexible configurations
            </p>
          </div>

          {/* Use the new TanStack Table and Material UI data tables */}
          <RelianceDataTables />

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={() => setQuoteFormOpen(true)}
              className="bg-transparent border-2 reliance-border reliance-primary hover:reliance-hover shadow-lg"
            >
              <Quote className="mr-2 h-5 w-5" />
              Get Custom Quote for These Systems
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section ref={statsRef} className="py-20 reliance-bg-alt animate-on-scroll">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 reliance-text">Reliance Solar by Numbers</h2>
            <p className="text-xl reliance-body-text">Leading India's renewable energy transformation</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold reliance-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                4GW
              </div>
              <div className="reliance-body-text">Annual Capacity</div>
            </div>
            
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold reliance-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                $800M+
              </div>
              <div className="reliance-body-text">Total Investment</div>
            </div>
            
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold reliance-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                22%+
              </div>
              <div className="reliance-body-text">HJT Efficiency</div>
            </div>
            
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold reliance-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                0%
              </div>
              <div className="reliance-body-text">Kerf Waste</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 reliance-bg-primary text-white animate-on-scroll relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        
        <div className="container px-4 text-center relative z-10">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20">
            Join India's Solar Revolution
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">
            Ready to Power Your Future with HJT Solar?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Experience the superior efficiency of Heterojunction Technology. Get a personalized quote for 
            India's most advanced solar panels with 22%+ efficiency and 25+ year warranty.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setQuoteFormOpen(true)}
              className="bg-white reliance-primary hover:bg-white/90 font-semibold shadow-lg group border-2 reliance-border"
            >
              <MessageSquare className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Get Free Quote Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-bold text-white mb-1">24 Hours</div>
              <div className="text-white/80 text-sm">Response Time</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-bold text-white mb-1">Free</div>
              <div className="text-white/80 text-sm">Site Assessment</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-bold text-white mb-1">25+ Years</div>
              <div className="text-white/80 text-sm">Performance Warranty</div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms and Conditions Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Terms and Conditions</h2>
            <div className="w-24 h-1 reliance-bg-primary mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6 text-sm leading-relaxed">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="reliance-primary font-bold min-w-[2rem]">1.</span>
                  <p>This pricing is effective from 22nd May 2025 to 30th June 2025 subject to material availability.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="reliance-primary font-bold min-w-[2rem]">2.</span>
                  <p>All prices are subject to change without notice and are not guaranteed, except that prices for an order that have been accepted by RIL</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="reliance-primary font-bold min-w-[2rem]">3.</span>
                  <p>Published prices are basic and are exclusive of taxes. Goods and Services Tax (GST) as applicable will be extra.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="reliance-primary font-bold min-w-[2rem]">4.</span>
                  <p>Above prices are Ex-Work prices</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="reliance-primary font-bold min-w-[2rem]">5.</span>
                  <p>Full payment (100%) is required in advance upon placing the order.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="reliance-primary font-bold min-w-[2rem]">6.</span>
                  <p>Orders to be placed on specified Purchase Order template issued by RIL in favour of Reliance Industries Limited.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="reliance-primary font-bold min-w-[2rem]">7.</span>
                  <p>NDCR Modules supplied will have a capacity of 690-720 Wp subject to availability.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="reliance-primary font-bold min-w-[2rem]">8.</span>
                  <p>Delivery of material will occur within approx. 5 weeks on receipt of accepted purchase order and full payment, depending on distance and availability of material.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="reliance-primary font-bold min-w-[2rem]">9.</span>
                  <p>Materials not supplied directly by RIL must be sourced from approved manufacturers and specifications as shared by RIL.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="reliance-primary font-bold min-w-[2rem]">10.</span>
                  <p>Warranty terms and conditions as specified in the warranty certificate issued on QA check.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="reliance-primary font-bold min-w-[2rem]">11.</span>
                  <p>Before installation of the system at the customer premises, site survey form, site layout and array layout supported with photographs must be approved by RIL. Any modifications/changes suggested by RIL shall have to be followed and implemented mandatorily, without which warranty certificate will not be applicable.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="reliance-primary font-bold min-w-[2rem]">12.</span>
                  <div>
                    <p className="mb-2">Installation and commissioning of the system are the responsibility of the Channel Partner, following RIL guidelines. All installed systems must be offered for RIL quality inspection for issuing the warranty certification with the specified completed installation & commissioning checklist and photographs.</p>
                    <p className="italic">Proper personal protective equipment (PPE) and safety protocols must be followed during installation.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="reliance-primary font-bold min-w-[2rem]">13.</span>
                  <p>All site-related activities, including net metering and DISCOM synchronization approvals, are the responsibility of the Channel Partners.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="reliance-primary font-bold min-w-[2rem]">14.</span>
                  <p>Cancellation of any previous orders will attract 2% of Purchase order value.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="reliance-primary font-bold min-w-[2rem]">15.</span>
                  <p>Any information, suggestions, or ideas transmitted by RIL in connection with this price list are secret or confidential or submitted in confidence to Channel Partner, except as may be specifically agreed to in writing by Channel Partner.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="reliance-primary font-bold min-w-[2rem]">16.</span>
                  <p>All terms and conditions will be valid as per the Channel Partner Agreement.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              © 2025 Reliance Industries Limited. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Quote Form Modal */}
      <RelianceQuoteForm open={quoteFormOpen} onOpenChange={setQuoteFormOpen} />
    </div>
  );
};

export default Reliance;