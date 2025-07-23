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

          {/* Strategy Synthesis */}
          <div className="mt-16 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                The Complete Strategy
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                These three strategic moves form a single, cohesive strategy to control the entire solar value chain: 
                from raw materials and cutting-edge technology to global sales and manufacturing at scale.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-200/20 hover:scale-105 transition-transform duration-300">
                <h4 className="font-bold text-blue-600 text-xl mb-3">1. Acquire (REC)</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">Instantly gain world-class brand, HJT technology, and global market access</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-200/20 hover:scale-105 transition-transform duration-300">
                <h4 className="font-bold text-emerald-600 text-xl mb-3">2. Innovate (NexWafe)</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">Invest in future-proof technology to leapfrog competition on cost and efficiency</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200/20 hover:scale-105 transition-transform duration-300">
                <h4 className="font-bold text-orange-600 text-xl mb-3">3. Build (PLI Scheme)</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">Leverage acquired expertise and innovative technology for giga-scale manufacturing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HJT Technology Deep Dive */}
      <section className="py-20 reliance-bg animate-on-scroll">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 reliance-bg-primary text-white border-transparent">
                Advanced Technology
              </Badge>
              <h2 className="text-4xl font-bold mb-6 reliance-text">
                Heterojunction Technology (HJT): The Future of Solar
              </h2>
              <p className="text-lg reliance-body-text mb-8">
                Through our acquisition of REC Solar, Reliance now commands one of the world's most advanced solar technologies. 
                HJT cells combine the best of crystalline and amorphous silicon to achieve unprecedented efficiency levels.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 reliance-bg-primary rounded-full flex items-center justify-center mt-1">
                    <TrendingUp className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold reliance-text">Superior Efficiency</h4>
                    <p className="text-sm reliance-body-text">Up to 22%+ efficiency in commercial modules</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 reliance-bg-primary rounded-full flex items-center justify-center mt-1">
                    <Award className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold reliance-text">Premium Performance</h4>
                    <p className="text-sm reliance-body-text">Lower temperature coefficients and better low-light performance</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 reliance-bg-primary rounded-full flex items-center justify-center mt-1">
                    <Target className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold reliance-text">Reliability</h4>
                    <p className="text-sm reliance-body-text">25+ year warranties with minimal degradation</p>
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
                <div className="text-2xl font-bold reliance-primary">22%+</div>
                <div className="text-sm reliance-body-text">Efficiency</div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white reliance-border border shadow-lg rounded-lg p-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="text-2xl font-bold reliance-primary">25+</div>
                <div className="text-sm reliance-body-text">Year Warranty</div>
              </div>
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