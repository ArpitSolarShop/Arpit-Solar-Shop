// // import React, { useEffect, useRef, useState } from "react";
// // import Navbar from "@/components/layout/Navbar";
// // import Footer from "@/components/layout/Footer";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { ArrowRight, Zap, Globe, Factory, TrendingUp, Award, Target, Quote, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";

// // import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// // import "swiper/css";
// // import "swiper/css/autoplay";
// // import "swiper/css/pagination";
// // import "swiper/css/navigation";
// // import { Autoplay, Pagination, Navigation } from "swiper/modules";
// // import RelianceQuoteForm from "@/components/forms/RelianceQuoteForm";


// // // Import generated images
// // import relianceHero from "@/assets/reliance-hero.jpg";
// // import hjtTechnology from "@/assets/hjt-technology.jpg";
// // import nexwafeTechnology from "@/assets/nexwafe-technology.jpg";
// // import relianceFacility from "@/assets/reliance-facility.jpg";

// // const SwiperNavButtons = () => {
// //   const swiper = useSwiper();
// //   return (
// //     <div className="absolute top-1/2 left-0 right-0 z-10 flex items-center justify-between px-4 -translate-y-1/2 pointer-events-none">
// //       <Button
// //         variant="ghost"
// //         size="icon"
// //         onClick={() => swiper.slidePrev()}
// //         className="pointer-events-auto bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-300 hidden md:flex items-center justify-center p-2"
// //         aria-label="Previous slide"
// //       >
// //         <ChevronLeft className="h-6 w-6 text-gray-700" />
// //       </Button>
// //       <Button
// //         variant="ghost"
// //         size="icon"
// //         onClick={() => swiper.slideNext()}
// //         className="pointer-events-auto bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-300 hidden md:flex items-center justify-center p-2"
// //         aria-label="Next slide"
// //       >
// //         <ChevronRight className="h-6 w-6 text-gray-700" />
// //       </Button>
// //     </div>
// //   );
// // };

// // const Reliance = () => {
// //   const heroRef = useRef<HTMLDivElement>(null);
// //   const statsRef = useRef<HTMLDivElement>(null);
// //   const [quoteFormOpen, setQuoteFormOpen] = useState(false);

// //   useEffect(() => {
// //     const observer = new IntersectionObserver(
// //       (entries) => {
// //         entries.forEach((entry) => {
// //           if (entry.isIntersecting) {
// //             entry.target.classList.add("animate-fade-in");
// //           }
// //         });
// //       },
// //       { threshold: 0.1 }
// //     );

// //     const sections = document.querySelectorAll(".animate-on-scroll");
// //     sections.forEach((section) => observer.observe(section));

// //     return () => observer.disconnect();
// //   }, []);

// //   return (
// //     <div className="min-h-screen reliance-bg">
// //       <Navbar />
      
// //       {/* Hero Section */}
// //       <section 
// //         ref={heroRef}
// //         className="relative min-h-screen flex items-center justify-center overflow-hidden"
// //         style={{
// //           backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${relianceHero})`,
// //           backgroundSize: 'cover',
// //           backgroundPosition: 'center',
// //         }}
// //       >
// //         <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/20"></div>
        
// //         <div className="container relative z-10 text-center text-white px-4">
// //           <div className="animate-fade-in">
// //             {/* Reliance Logo */}
// //             <div className="mb-6 flex justify-center">
// //               <img 
// //                 src="/reliance-industries-ltd.png" 
// //                 alt="Reliance Industries Ltd" 
// //                 className="h-16 md:h-20 w-auto opacity-90"
// //               />
// //             </div>
            
// //             <Badge className="mb-4 bg-white/20 text-white border-white/20 hover:bg-white/30">
// //               Leading India's Solar Revolution
// //             </Badge>
// //             <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
// //               Reliance Solar Energy
// //             </h1>
// //             <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
// //               Pioneering Advanced Heterojunction Technology (HJT) to power India's sustainable future with world-class solar solutions
// //             </p>
// //             <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //               <Button 
// //                 size="lg" 
// //                 onClick={() => setQuoteFormOpen(true)}
// //                 className="bg-transparent border-2 reliance-border reliance-primary hover:reliance-hover shadow-xl backdrop-blur-sm group"
// //               >
// //                 <Quote className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
// //                 Get HJT Solar Quote
// //                 <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
// //               </Button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Floating elements animation */}
// //         <div className="absolute top-20 left-10 w-4 h-4 bg-white/30 rounded-full animate-float"></div>
// //         <div className="absolute top-40 right-20 w-6 h-6 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
// //         <div className="absolute bottom-40 left-20 w-3 h-3 bg-white/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
// //       </section>

// //       {/* Strategic Achievements Section */}
// //       <section className="relative overflow-hidden animate-on-scroll">
// //         <Swiper
// //           modules={[Autoplay, Pagination]}
// //           slidesPerView={1}
// //           loop
// //           autoplay={{ delay: 5000, disableOnInteraction: false }}
// //           pagination={{ clickable: true, dynamicBullets: true }}
// //           className="h-screen"
// //         >
// //           {/* Technology Acquisition - NexWafe */}
// //           <SwiperSlide>
// //             <div 
// //               className="relative w-full h-screen flex items-center justify-center"
// //               style={{
// //                 backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${nexwafeTechnology})`,
// //                 backgroundSize: 'cover',
// //                 backgroundPosition: 'center',
// //               }}
// //             >
// //               <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
// //                 <div className="max-w-4xl mx-auto">
// //                   <div className="mb-6">
// //                     <Badge className="mb-4 bg-white/20 text-white border-white/20 hover:bg-white/30">
// //                       Technology Acquisition
// //                     </Badge>
// //                     <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
// //                       <Zap className="h-8 w-8 text-white" />
// //                     </div>
// //                   </div>
                  
// //                   <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
// //                     Strategic{" "}
// //                     <span className="text-yellow-300">Achievements</span>
// //                   </h2>
                  
// //                   <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
// //                     NexWafe GmbH
// //                   </h3>
                  
// //                   <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
// //                     €25 Million investment in revolutionary "Green Solar Wafer" technology that eliminates up to 40% silicon waste through epitaxial kerf-free manufacturing.
// //                   </p>
                  
// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //                     <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
// //                       <div className="text-2xl font-bold text-white mb-2">Zero Kerf</div>
// //                       <div className="text-white/80 text-sm">Waste Technology</div>
// //                     </div>
// //                     <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
// //                       <div className="text-2xl font-bold text-white mb-2">40%</div>
// //                       <div className="text-white/80 text-sm">Cost Reduction</div>
// //                     </div>
// //                     <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
// //                       <div className="text-2xl font-bold text-white mb-2">Full</div>
// //                       <div className="text-white/80 text-sm">Supply Control</div>
// //                     </div>
// //                   </div>
                  
// //                   <div className="flex flex-wrap gap-3 justify-center">
// //                     <Badge className="bg-green-600 text-white px-4 py-2">Zero Kerf</Badge>
// //                     <Badge className="bg-yellow-600 text-white px-4 py-2">Cost Leader</Badge>
// //                     <Badge className="bg-green-600 text-white px-4 py-2">Green Tech</Badge>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </SwiperSlide>

// //           {/* Market Entry & Scale - REC Solar */}
// //           <SwiperSlide>
// //             <div 
// //               className="relative w-full h-screen flex items-center justify-center"
// //               style={{
// //                 backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${hjtTechnology})`,
// //                 backgroundSize: 'cover',
// //                 backgroundPosition: 'center',
// //               }}
// //             >
// //               <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
// //                 <div className="max-w-4xl mx-auto">
// //                   <div className="mb-6">
// //                     <Badge className="mb-4 bg-white/20 text-white border-white/20 hover:bg-white/30">
// //                       Market Entry & Scale
// //                     </Badge>
// //                     <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
// //                       <Globe className="h-8 w-8 text-white" />
// //                     </div>
// //                   </div>
                  
// //                   <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
// //                     Strategic{" "}
// //                     <span className="text-yellow-300">Achievements</span>
// //                   </h2>
                  
// //                   <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
// //                     REC Solar Holdings AS
// //                   </h3>
                  
// //                   <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
// //                     $771 Million acquisition of world-class Tier-1 brand with pioneering Heterojunction Technology and proven Alpha series panels among the world's most efficient.
// //                   </p>
                  
// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //                     <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
// //                       <div className="text-2xl font-bold text-white mb-2">Tier-1</div>
// //                       <div className="text-white/80 text-sm">Global Brand</div>
// //                     </div>
// //                     <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
// //                       <div className="text-2xl font-bold text-white mb-2">HJT</div>
// //                       <div className="text-white/80 text-sm">Technology</div>
// //                     </div>
// //                     <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
// //                       <div className="text-2xl font-bold text-white mb-2">Global</div>
// //                       <div className="text-white/80 text-sm">Operations</div>
// //                     </div>
// //                   </div>
                  
// //                   <div className="flex flex-wrap gap-3 justify-center">
// //                     <Badge className="bg-green-600 text-white px-4 py-2">HJT Pioneer</Badge>
// //                     <Badge className="bg-yellow-600 text-white px-4 py-2">Global Brand</Badge>
// //                     <Badge className="bg-green-600 text-white px-4 py-2">Tier-1</Badge>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </SwiperSlide>

// //           {/* Domestic Manufacturing - PLI Scheme */}
// //           <SwiperSlide>
// //             <div 
// //               className="relative w-full h-screen flex items-center justify-center"
// //               style={{
// //                 backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${relianceFacility})`,
// //                 backgroundSize: 'cover',
// //                 backgroundPosition: 'center',
// //               }}
// //             >
// //               <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
// //                 <div className="max-w-4xl mx-auto">
// //                   <div className="mb-6">
// //                     <Badge className="mb-4 bg-white/20 text-white border-white/20 hover:bg-white/30">
// //                       Domestic Manufacturing
// //                     </Badge>
// //                     <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
// //                       <Factory className="h-8 w-8 text-white" />
// //                     </div>
// //                   </div>
                  
// //                   <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
// //                     Strategic{" "}
// //                     <span className="text-yellow-300">Achievements</span>
// //                   </h2>
                  
// //                   <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
// //                     PLI Scheme Success
// //                   </h3>
                  
// //                   <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
// //                     4 GW integrated solar manufacturing facility at Jamnagar Green Energy Complex. Complete integration from polysilicon to modules with PLI incentives.
// //                   </p>
                  
// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //                     <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
// //                       <div className="text-2xl font-bold text-white mb-2">4 GW</div>
// //                       <div className="text-white/80 text-sm">Annual Capacity</div>
// //                     </div>
// //                     <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
// //                       <div className="text-2xl font-bold text-white mb-2">Full</div>
// //                       <div className="text-white/80 text-sm">Integration</div>
// //                     </div>
// //                     <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
// //                       <div className="text-2xl font-bold text-white mb-2">PLI</div>
// //                       <div className="text-white/80 text-sm">Support</div>
// //                     </div>
// //                   </div>
                  
// //                   <div className="flex flex-wrap gap-3 justify-center">
// //                     <Badge className="bg-yellow-600 text-white px-4 py-2">4GW Capacity</Badge>
// //                     <Badge className="bg-green-600 text-white px-4 py-2">Full Integration</Badge>
// //                     <Badge className="bg-yellow-600 text-white px-4 py-2">PLI Incentives</Badge>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </SwiperSlide>
// //         </Swiper>
// //       </section>

// //       {/* HJT Technology Deep Dive */}
// //       <section className="py-20 reliance-bg animate-on-scroll">
// //         <div className="container px-4">
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
// //             <div>
// //               <Badge className="mb-4 reliance-bg-primary text-white border-transparent">
// //                 Advanced Technology
// //               </Badge>
// //               <h2 className="text-4xl font-bold mb-6 reliance-text">
// //                 Heterojunction Technology (HJT): The Future of Solar
// //               </h2>
// //               <p className="text-lg reliance-body-text mb-4">
// //                 <strong>HJT = Crystalline Silicon + Amorphous Silicon Layers</strong>
// //               </p>
// //               <p className="text-lg reliance-body-text mb-8">
// //                 Heterojunction solar cells are hybrid solar cells that combine a base layer of crystalline silicon with two thin layers of amorphous silicon (a-Si:H) on both sides. This creates a highly efficient junction with fewer electron losses, better light absorption, and superior temperature performance.
// //               </p>
              
// //               <div className="reliance-bg-alt rounded-2xl p-6 mb-8 reliance-border border-2">
// //                 <h4 className="font-bold reliance-text mb-4 flex items-center gap-2">
// //                   <Zap className="h-5 w-5" />
// //                   How It Works (Simply)
// //                 </h4>
// //                 <div className="space-y-2 text-sm reliance-body-text">
// //                   <div className="flex items-start gap-3">
// //                     <div className="w-2 h-2 reliance-bg-secondary rounded-full mt-2"></div>
// //                     <span>Light hits the front layer → electrons excited</span>
// //                   </div>
// //                   <div className="flex items-start gap-3">
// //                     <div className="w-2 h-2 reliance-bg-secondary rounded-full mt-2"></div>
// //                     <span>Amorphous silicon layers act as passivation layers, reducing energy loss</span>
// //                   </div>
// //                   <div className="flex items-start gap-3">
// //                     <div className="w-2 h-2 reliance-bg-secondary rounded-full mt-2"></div>
// //                     <span>Electrons flow through the crystalline silicon core</span>
// //                   </div>
// //                   <div className="flex items-start gap-3">
// //                     <div className="w-2 h-2 reliance-bg-secondary rounded-full mt-2"></div>
// //                     <span>Energy is collected through transparent conductive layers on both sides</span>
// //                   </div>
// //                 </div>
// //               </div>
              
// //               <div className="space-y-4 mb-8">
// //                 <div className="flex items-start gap-3">
// //                   <div className="w-6 h-6 reliance-bg-primary rounded-full flex items-center justify-center mt-1">
// //                     <TrendingUp className="h-3 w-3 text-white" />
// //                   </div>
// //                   <div>
// //                     <h4 className="font-semibold reliance-text">Superior Efficiency</h4>
// //                     <p className="text-sm reliance-body-text">23–25% efficiency (very high)</p>
// //                   </div>
// //                 </div>
                
// //                 <div className="flex items-start gap-3">
// //                   <div className="w-6 h-6 reliance-bg-primary rounded-full flex items-center justify-center mt-1">
// //                     <Award className="h-3 w-3 text-white" />
// //                   </div>
// //                   <div>
// //                     <h4 className="font-semibold reliance-text">Premium Performance</h4>
// //                     <p className="text-sm reliance-body-text">~ -0.25% /°C temperature coefficient (less power drop in heat)</p>
// //                   </div>
// //                 </div>
                
// //                 <div className="flex items-start gap-3">
// //                   <div className="w-6 h-6 reliance-bg-primary rounded-full flex items-center justify-center mt-1">
// //                     <Target className="h-3 w-3 text-white" />
// //                   </div>
// //                   <div>
// //                     <h4 className="font-semibold reliance-text">Exceptional Reliability</h4>
// //                     <p className="text-sm reliance-body-text">Very low degradation (~0.25% per year) with excellent bifaciality</p>
// //                   </div>
// //                 </div>
// //               </div>

// //             </div>
            
// //             <div className="relative">
// //               <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
// //                 <img 
// //                   src={hjtTechnology} 
// //                   alt="HJT Technology Diagram" 
// //                   className="w-full h-full object-cover"
// //                 />
// //               </div>
              
// //               {/* Floating stats */}
// //               <div className="absolute -top-4 -right-4 reliance-bg reliance-border border-2 shadow-lg rounded-lg p-4 animate-float">
// //                 <div className="text-2xl font-bold reliance-primary">25%</div>
// //                 <div className="text-sm reliance-body-text">Max Efficiency</div>
// //               </div>
              
// //               <div className="absolute -bottom-4 -left-4 reliance-bg reliance-border border-2 shadow-lg rounded-lg p-4 animate-float" style={{ animationDelay: '1s' }}>
// //                 <div className="text-2xl font-bold reliance-primary">90%</div>
// //                 <div className="text-sm reliance-body-text">Bifaciality</div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Technology Comparison Section */}
// //           <div className="reliance-bg-alt rounded-3xl p-8 reliance-border border-2">
// //             <div className="text-center mb-12">
// //               <h3 className="text-3xl font-bold mb-4 reliance-text">
// //                 Solar Technology Comparison: HJT vs TOPCon vs PERC
// //               </h3>
// //               <p className="text-lg reliance-body-text max-w-4xl mx-auto">
// //                 Compare the three most popular solar cell technologies in 2025 to understand why HJT represents the premium choice
// //               </p>
// //             </div>

// //             {/* Comparison Table */}
// //             <div className="overflow-x-auto">
// //               <table className="w-full text-sm rounded-2xl overflow-hidden shadow-lg">
// //                 <thead>
// //                   <tr className="reliance-bg-primary text-white">
// //                     <th className="p-4 text-left font-semibold">Feature / Metric</th>
// //                     <th className="p-4 text-center font-semibold">⚡ HJT (Heterojunction)</th>
// //                     <th className="p-4 text-center font-semibold">🔆 TOPCon</th>
// //                     <th className="p-4 text-center font-semibold">🔅 PERC</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="reliance-bg">
// //                   <tr className="reliance-border border-b">
// //                     <td className="p-4 font-semibold reliance-text">Cell Type</td>
// //                     <td className="p-4 text-center reliance-secondary font-semibold">N-Type</td>
// //                     <td className="p-4 text-center reliance-secondary font-semibold">N-Type</td>
// //                     <td className="p-4 text-center reliance-primary font-semibold">P-Type (mostly)</td>
// //                   </tr>
// //                   <tr className="reliance-border border-b reliance-bg-alt">
// //                     <td className="p-4 font-semibold reliance-text">Efficiency</td>
// //                     <td className="p-4 text-center font-bold reliance-secondary">⭐ 23–25%</td>
// //                     <td className="p-4 text-center font-bold reliance-secondary">⭐ 22–24%</td>
// //                     <td className="p-4 text-center font-bold reliance-primary">⭐ 19–21%</td>
// //                   </tr>
// //                   <tr className="reliance-border border-b">
// //                     <td className="p-4 font-semibold reliance-text">Temperature Coefficient</td>
// //                     <td className="p-4 text-center font-bold reliance-secondary">🔥 ~ -0.25%/°C (best)</td>
// //                     <td className="p-4 text-center font-bold reliance-secondary">🔥 ~ -0.30%/°C</td>
// //                     <td className="p-4 text-center font-bold reliance-text">❌ ~ -0.38%/°C (worst)</td>
// //                   </tr>
// //                   <tr className="reliance-border border-b reliance-bg-alt">
// //                     <td className="p-4 font-semibold reliance-text">Bifacial Capability</td>
// //                     <td className="p-4 text-center font-bold reliance-secondary">✅ Excellent (~90%)</td>
// //                     <td className="p-4 text-center font-bold reliance-secondary">✅ Good (~70–80%)</td>
// //                     <td className="p-4 text-center font-bold reliance-primary">⚠️ Moderate (~60%)</td>
// //                   </tr>
// //                   <tr className="reliance-border border-b">
// //                     <td className="p-4 font-semibold reliance-text">Degradation Rate</td>
// //                     <td className="p-4 text-center font-bold reliance-secondary">🔒 Very Low (~0.25%/yr)</td>
// //                     <td className="p-4 text-center font-bold reliance-secondary">🔒 Low (~0.3%/yr)</td>
// //                     <td className="p-4 text-center font-bold reliance-primary">⚠️ Higher (~0.5%/yr)</td>
// //                   </tr>
// //                   <tr className="reliance-border border-b reliance-bg-alt">
// //                     <td className="p-4 font-semibold reliance-text">LID (Light Induced Degradation)</td>
// //                     <td className="p-4 text-center font-bold reliance-secondary">❌ None (N-type)</td>
// //                     <td className="p-4 text-center font-bold reliance-secondary">❌ None (N-type)</td>
// //                     <td className="p-4 text-center font-bold reliance-text">⚠️ Yes (P-type silicon)</td>
// //                   </tr>
// //                   <tr className="reliance-border border-b">
// //                     <td className="p-4 font-semibold reliance-text">Cost per Watt</td>
// //                     <td className="p-4 text-center font-bold reliance-text">💸 High</td>
// //                     <td className="p-4 text-center font-bold reliance-primary">💵 Medium</td>
// //                     <td className="p-4 text-center font-bold reliance-secondary">💰 Low</td>
// //                   </tr>
// //                   <tr className="reliance-border border-b reliance-bg-alt">
// //                     <td className="p-4 font-semibold reliance-text">Best Use Case</td>
// //                     <td className="p-4 text-center reliance-secondary font-semibold">Premium homes, commercial rooftops</td>
// //                     <td className="p-4 text-center reliance-secondary font-semibold">Balanced use in modern systems</td>
// //                     <td className="p-4 text-center reliance-primary font-semibold">Budget projects, price-sensitive areas</td>
// //                   </tr>
// //                 </tbody>
// //               </table>
// //             </div>


// //           </div>
// //         </div>
// //       </section>

// //       {/* Products & Pricing Section */}
// //       <section className="py-20 reliance-bg animate-on-scroll">
// //         <div className="container px-4">
// //           <div className="text-center mb-16">
// //             <Badge className="mb-4 reliance-bg-primary text-white border-transparent">
// //               Product Catalog
// //             </Badge>
// //             <h2 className="text-4xl font-bold mb-4 reliance-text">Reliance Solar System Configurations</h2>
// //             <p className="text-xl reliance-body-text max-w-3xl mx-auto">
// //               Choose from our comprehensive range of HJT modules with competitive pricing and flexible configurations
// //             </p>
// //           </div>

// //           {/* Use the new TanStack Table and Material UI data tables */}
          
// //           <div className="text-center mt-12">
// //             <Button 
// //               size="lg" 
// //               onClick={() => setQuoteFormOpen(true)}
// //               className="bg-transparent border-2 reliance-border reliance-primary hover:reliance-hover shadow-lg"
// //             >
// //               <Quote className="mr-2 h-5 w-5" />
// //               Get Custom Quote for These Systems
// //               <ArrowRight className="ml-2 h-5 w-5" />
// //             </Button>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Statistics Section */}
// //       <section ref={statsRef} className="py-20 reliance-bg-alt animate-on-scroll">
// //         <div className="container px-4">
// //           <div className="text-center mb-16">
// //             <h2 className="text-4xl font-bold mb-4 reliance-text">Reliance Solar by Numbers</h2>
// //             <p className="text-xl reliance-body-text">Leading India's renewable energy transformation</p>
// //           </div>
          
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
// //             <div className="text-center group">
// //               <div className="text-4xl md:text-5xl font-bold reliance-primary mb-2 group-hover:scale-110 transition-transform duration-300">
// //                 4GW
// //               </div>
// //               <div className="reliance-body-text">Annual Capacity</div>
// //             </div>
            
// //             <div className="text-center group">
// //               <div className="text-4xl md:text-5xl font-bold reliance-primary mb-2 group-hover:scale-110 transition-transform duration-300">
// //                 $800M+
// //               </div>
// //               <div className="reliance-body-text">Total Investment</div>
// //             </div>
            
// //             <div className="text-center group">
// //               <div className="text-4xl md:text-5xl font-bold reliance-primary mb-2 group-hover:scale-110 transition-transform duration-300">
// //                 22%+
// //               </div>
// //               <div className="reliance-body-text">HJT Efficiency</div>
// //             </div>
            
// //             <div className="text-center group">
// //               <div className="text-4xl md:text-5xl font-bold reliance-primary mb-2 group-hover:scale-110 transition-transform duration-300">
// //                 0%
// //               </div>
// //               <div className="reliance-body-text">Kerf Waste</div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Call to Action */}
// //       <section className="py-20 reliance-bg-primary text-white animate-on-scroll relative overflow-hidden">
// //         {/* Background decoration */}
// //         <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/10"></div>
// //         <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
// //         <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        
// //         <div className="container px-4 text-center relative z-10">
// //           <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20">
// //             Join India's Solar Revolution
// //           </Badge>
// //           <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">
// //             Ready to Power Your Future with HJT Solar?
// //           </h2>
// //           <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
// //             Experience the superior efficiency of Heterojunction Technology. Get a personalized quote for 
// //             India's most advanced solar panels with 22%+ efficiency and 25+ year warranty.
// //           </p>
          
// //           <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //             <Button 
// //               size="lg" 
// //               onClick={() => setQuoteFormOpen(true)}
// //               className="bg-white reliance-primary hover:bg-white/90 font-semibold shadow-lg group border-2 reliance-border"
// //             >
// //               <MessageSquare className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
// //               Get Free Quote Now
// //               <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
// //             </Button>
// //           </div>
          
// //           <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
// //             <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
// //               <div className="text-2xl font-bold text-white mb-1">24 Hours</div>
// //               <div className="text-white/80 text-sm">Response Time</div>
// //             </div>
// //             <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
// //               <div className="text-2xl font-bold text-white mb-1">Free</div>
// //               <div className="text-white/80 text-sm">Site Assessment</div>
// //             </div>
// //             <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
// //               <div className="text-2xl font-bold text-white mb-1">25+ Years</div>
// //               <div className="text-white/80 text-sm">Performance Warranty</div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Terms and Conditions Footer */}
// //       <footer className="reliance-text reliance-bg py-16 reliance-border border-t-2">
// //         <div className="container px-4">
// //           <div className="text-center mb-12">
// //             <h2 className="text-3xl font-bold mb-4 reliance-text">Terms and Conditions</h2>
// //             <div className="w-24 h-1 reliance-bg-primary mx-auto"></div>
// //           </div>
          
// //           <div className="max-w-4xl mx-auto space-y-6 text-sm leading-relaxed">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div className="space-y-4">
// //                 <div className="flex items-start gap-3">
// //                   <span className="reliance-primary font-bold min-w-[2rem]">1.</span>
// //                   <p className="reliance-body-text">This pricing is effective from 22nd May 2025 to 30th June 2025 subject to material availability.</p>
// //                 </div>
                
// //                 <div className="flex items-start gap-3">
// //                   <span className="reliance-primary font-bold min-w-[2rem]">2.</span>
// //                   <p className="reliance-body-text">All prices are subject to change without notice and are not guaranteed, except that prices for an order that have been accepted by RIL</p>
// //                 </div>
                
// //                 <div className="flex items-start gap-3">
// //                   <span className="reliance-primary font-bold min-w-[2rem]">3.</span>
// //                   <p>Published prices are basic and are exclusive of taxes. Goods and Services Tax (GST) as applicable will be extra.</p>
// //                 </div>
                
// //                 <div className="flex items-start gap-3">
// //                   <span className="reliance-primary font-bold min-w-[2rem]">4.</span>
// //                   <p>Above prices are Ex-Work prices</p>
// //                 </div>
                
// //                 <div className="flex items-start gap-3">
// //                   <span className="reliance-primary font-bold min-w-[2rem]">5.</span>
// //                   <p>Full payment (100%) is required in advance upon placing the order.</p>
// //                 </div>
                
// //                 <div className="flex items-start gap-3">
// //                   <span className="reliance-primary font-bold min-w-[2rem]">6.</span>
// //                   <p>Orders to be placed on specified Purchase Order template issued by RIL in favour of Reliance Industries Limited.</p>
// //                 </div>
                
// //                 <div className="flex items-start gap-3">
// //                   <span className="reliance-primary font-bold min-w-[2rem]">7.</span>
// //                   <p>NDCR Modules supplied will have a capacity of 690-720 Wp subject to availability.</p>
// //                 </div>
                
// //                 <div className="flex items-start gap-3">
// //                   <span className="reliance-primary font-bold min-w-[2rem]">8.</span>
// //                   <p>Delivery of material will occur within approx. 5 weeks on receipt of accepted purchase order and full payment, depending on distance and availability of material.</p>
// //                 </div>
                
// //                 <div className="flex items-start gap-3">
// //                   <span className="reliance-primary font-bold min-w-[2rem]">9.</span>
// //                   <p>Materials not supplied directly by RIL must be sourced from approved manufacturers and specifications as shared by RIL.</p>
// //                 </div>
// //               </div>
              
// //               <div className="space-y-4">
// //                 <div className="flex items-start gap-3">
// //                   <span className="reliance-primary font-bold min-w-[2rem]">10.</span>
// //                   <p>Warranty terms and conditions as specified in the warranty certificate issued on QA check.</p>
// //                 </div>
                
// //                 <div className="flex items-start gap-3">
// //                   <span className="reliance-primary font-bold min-w-[2rem]">11.</span>
// //                   <p>Before installation of the system at the customer premises, site survey form, site layout and array layout supported with photographs must be approved by RIL. Any modifications/changes suggested by RIL shall have to be followed and implemented mandatorily, without which warranty certificate will not be applicable.</p>
// //                 </div>
                
// //                 <div className="flex items-start gap-3">
// //                   <span className="reliance-primary font-bold min-w-[2rem]">12.</span>
// //                   <div>
// //                     <p className="mb-2">Installation and commissioning of the system are the responsibility of the Channel Partner, following RIL guidelines. All installed systems must be offered for RIL quality inspection for issuing the warranty certification with the specified completed installation & commissioning checklist and photographs.</p>
// //                     <p className="italic">Proper personal protective equipment (PPE) and safety protocols must be followed during installation.</p>
// //                   </div>
// //                 </div>
                
// //                 <div className="flex items-start gap-3">
// //                   <span className="reliance-primary font-bold min-w-[2rem]">13.</span>
// //                   <p>All site-related activities, including net metering and DISCOM synchronization approvals, are the responsibility of the Channel Partners.</p>
// //                 </div>
                
// //                 <div className="flex items-start gap-3">
// //                   <span className="reliance-primary font-bold min-w-[2rem]">14.</span>
// //                   <p>Cancellation of any previous orders will attract 2% of Purchase order value.</p>
// //                 </div>
                
// //                 <div className="flex items-start gap-3">
// //                   <span className="reliance-primary font-bold min-w-[2rem]">15.</span>
// //                   <p>Any information, suggestions, or ideas transmitted by RIL in connection with this price list are secret or confidential or submitted in confidence to Channel Partner, except as may be specifically agreed to in writing by Channel Partner.</p>
// //                 </div>
                
// //                 <div className="flex items-start gap-3">
// //                   <span className="reliance-primary font-bold min-w-[2rem]">16.</span>
// //                   <p>All terms and conditions will be valid as per the Channel Partner Agreement.</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
          
// //           <div className="text-center mt-12 pt-8 border-t border-gray-700">
// //             <p className="text-gray-400 text-sm">
// //               © 2025 Reliance Industries Limited. All rights reserved.
// //             </p>
// //           </div>
// //         </div>
// //       </footer>
      
// //       {/* Quote Form Modal */}
// //       <RelianceQuoteForm open={quoteFormOpen} onOpenChange={setQuoteFormOpen} />
// //     </div>
// //   );
// // };

// // export default Reliance;



// // "use client"

// // import { useState } from "react"
// // import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table"
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // import { Badge } from "@/components/ui/badge"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Calculator, Zap, Cable, Package, ArrowUpDown, Search, CheckCircle } from "lucide-react"

// // // Interfaces
// // interface GridTieSystemData {
// //   slNo: number
// //   systemSize: number
// //   noOfModules: number
// //   inverterCapacity: number
// //   phase: string
// //   hdgElevatedWithGst: number
// //   hdgElevatedPrice: number
// // }

// // interface LargeSystemData {
// //   slNo: number
// //   systemSizeKWp: number
// //   systemSizeKW: number
// //   noOfModules: number
// //   inverterCapacity: number
// //   phase: string
// //   shortRailTinShedPricePerWatt: number
// //   shortRailTinShedPrice: number
// //   hdgElevatedRccPricePerWatt: number
// //   hdgElevatedRccPrice: number
// //   preGiMmsPricePerWatt: number
// //   preGiMmsPrice: number
// // }

// // interface DCCableData {
// //   srNo: number
// //   productDescription: string
// //   uom: string
// //   quantity: number
// //   price: number
// //   total: number
// // }

// // interface KitItem {
// //   srNo: number
// //   item: string
// //   description: string
// // }

// // // Data
// // const gridTieSystemData: GridTieSystemData[] = [
// //   {
// //     slNo: 1,
// //     systemSize: 3.45,
// //     noOfModules: 5,
// //     inverterCapacity: 3,
// //     phase: "Single",
// //     hdgElevatedWithGst: 61.13,
// //     hdgElevatedPrice: 210900,
// //   },
// //   {
// //     slNo: 2,
// //     systemSize: 5.52,
// //     noOfModules: 8,
// //     inverterCapacity: 5,
// //     phase: "Single",
// //     hdgElevatedWithGst: 60.22,
// //     hdgElevatedPrice: 332410,
// //   },
// //   {
// //     slNo: 3,
// //     systemSize: 5.52,
// //     noOfModules: 8,
// //     inverterCapacity: 5,
// //     phase: "Three",
// //     hdgElevatedWithGst: 65.06,
// //     hdgElevatedPrice: 359153,
// //   },
// //   {
// //     slNo: 4,
// //     systemSize: 8.28,
// //     noOfModules: 12,
// //     inverterCapacity: 10,
// //     phase: "Three",
// //     hdgElevatedWithGst: 58.55,
// //     hdgElevatedPrice: 484822,
// //   },
// //   {
// //     slNo: 5,
// //     systemSize: 10.35,
// //     noOfModules: 15,
// //     inverterCapacity: 10,
// //     phase: "Three",
// //     hdgElevatedWithGst: 55.45,
// //     hdgElevatedPrice: 573910,
// //   },
// //   {
// //     slNo: 6,
// //     systemSize: 13.8,
// //     noOfModules: 20,
// //     inverterCapacity: 10,
// //     phase: "Three",
// //     hdgElevatedWithGst: 53.49,
// //     hdgElevatedPrice: 738095,
// //   },
// // ]

// // const largeSystemData: LargeSystemData[] = [
// //   {
// //     slNo: 1,
// //     systemSizeKWp: 19.32,
// //     systemSizeKW: 15,
// //     noOfModules: 28,
// //     inverterCapacity: 15,
// //     phase: "Three",
// //     shortRailTinShedPricePerWatt: 33.91,
// //     shortRailTinShedPrice: 655060,
// //     hdgElevatedRccPricePerWatt: 38.91,
// //     hdgElevatedRccPrice: 751660,
// //     preGiMmsPricePerWatt: 36.57,
// //     preGiMmsPrice: 706500,
// //   },
// //   {
// //     slNo: 2,
// //     systemSizeKWp: 33.12,
// //     systemSizeKW: 25,
// //     noOfModules: 48,
// //     inverterCapacity: 20,
// //     phase: "Three",
// //     shortRailTinShedPricePerWatt: 32.92,
// //     shortRailTinShedPrice: 1090460,
// //     hdgElevatedRccPricePerWatt: 37.92,
// //     hdgElevatedRccPrice: 1256060,
// //     preGiMmsPricePerWatt: 36.08,
// //     preGiMmsPrice: 1195060,
// //   },
// //   {
// //     slNo: 3,
// //     systemSizeKWp: 52.44,
// //     systemSizeKW: 40,
// //     noOfModules: 76,
// //     inverterCapacity: 40,
// //     phase: "Three",
// //     shortRailTinShedPricePerWatt: 31.96,
// //     shortRailTinShedPrice: 1676180,
// //     hdgElevatedRccPricePerWatt: 36.96,
// //     hdgElevatedRccPrice: 1938380,
// //     preGiMmsPricePerWatt: 35.62,
// //     preGiMmsPrice: 1867900,
// //   },
// //   {
// //     slNo: 4,
// //     systemSizeKWp: 65.55,
// //     systemSizeKW: 50,
// //     noOfModules: 95,
// //     inverterCapacity: 50,
// //     phase: "Three",
// //     shortRailTinShedPricePerWatt: 31.23,
// //     shortRailTinShedPrice: 2047350,
// //     hdgElevatedRccPricePerWatt: 36.23,
// //     hdgElevatedRccPrice: 2375100,
// //     preGiMmsPricePerWatt: 34.39,
// //     preGiMmsPrice: 2254300,
// //   },
// //   {
// //     slNo: 5,
// //     systemSizeKWp: 105.57,
// //     systemSizeKW: 80,
// //     noOfModules: 153,
// //     inverterCapacity: 80,
// //     phase: "Three",
// //     shortRailTinShedPricePerWatt: 30.22,
// //     shortRailTinShedPrice: 3190020,
// //     hdgElevatedRccPricePerWatt: 35.22,
// //     hdgElevatedRccPrice: 3717870,
// //     preGiMmsPricePerWatt: 34.87,
// //     preGiMmsPrice: 3681725,
// //   },
// //   {
// //     slNo: 6,
// //     systemSizeKWp: 124.2,
// //     systemSizeKW: 100,
// //     noOfModules: 180,
// //     inverterCapacity: 100,
// //     phase: "Three",
// //     shortRailTinShedPricePerWatt: 30.04,
// //     shortRailTinShedPrice: 3731500,
// //     hdgElevatedRccPricePerWatt: 35.04,
// //     hdgElevatedRccPrice: 4352500,
// //     preGiMmsPricePerWatt: 34.21,
// //     preGiMmsPrice: 4248400,
// //   },
// //   {
// //     slNo: 7,
// //     systemSizeKWp: 165.6,
// //     systemSizeKW: 125,
// //     noOfModules: 240,
// //     inverterCapacity: 125,
// //     phase: "Three",
// //     shortRailTinShedPricePerWatt: 29.46,
// //     shortRailTinShedPrice: 4878300,
// //     hdgElevatedRccPricePerWatt: 34.46,
// //     hdgElevatedRccPrice: 5706300,
// //     preGiMmsPricePerWatt: 34.62,
// //     preGiMmsPrice: 5732600,
// //   },
// // ]

// // const dcCableData: DCCableData[] = [
// //   {
// //     srNo: 1,
// //     productDescription: "DC Cable ble Insulated X",
// //     uom: "Mtrs",
// //     quantity: 500,
// //     price: 46.67,
// //     total: 23333.33,
// //   },
// //   {
// //     srNo: 2,
// //     productDescription: "DC Cable ble Insulated XL",
// //     uom: "Mtrs",
// //     quantity: 500,
// //     price: 46.67,
// //     total: 23333.33,
// //   },
// // ]

// // const kitItems: KitItem[] = [
// //   { srNo: 1, item: "Module", description: "RIL 690-720 Wp Module - Silicon" },
// //   { srNo: 2, item: "Inverter", description: "3 String Inverter (According to system size)" },
// //   { srNo: 3, item: "ACDB", description: "ACDB, IP65 Protected with MCB 4P-1 Nos." },
// //   { srNo: 4, item: "MC4 Connector", description: "Male & female (both)" },
// //   { srNo: 5, item: "Monitoring Device", description: "Network device, with 5 year of network service" },
// //   { srNo: 6, item: "MMS", description: "Mounting & Monitoring System" },
// // ]

// // // Components
// // function GridTieSystemTable() {
// //   const [sortField, setSortField] = useState<keyof GridTieSystemData | null>(null)
// //   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
// //   const [searchTerm, setSearchTerm] = useState("")

// //   const handleSort = (field: keyof GridTieSystemData) => {
// //     if (sortField === field) {
// //       setSortDirection(sortDirection === "asc" ? "desc" : "asc")
// //     } else {
// //       setSortField(field)
// //       setSortDirection("asc")
// //     }
// //   }

// //   const filteredAndSortedData = gridTieSystemData
// //     .filter(
// //       (item) =>
// //         item.phase.toLowerCase().includes(searchTerm.toLowerCase()) || item.systemSize.toString().includes(searchTerm),
// //     )
// //     .sort((a, b) => {
// //       if (!sortField) return 0
// //       const aValue = a[sortField]
// //       const bValue = b[sortField]
// //       if (typeof aValue === "string" && typeof bValue === "string") {
// //         return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
// //       }
// //       if (typeof aValue === "number" && typeof bValue === "number") {
// //         return sortDirection === "asc" ? aValue - bValue : bValue - aValue
// //       }
// //       return 0
// //     })

// //   return (
// //     <div className="space-y-4">
// //       {/* Search */}
// //       <div className="flex items-center space-x-2">
// //         <Search className="h-4 w-4 text-gray-400" />
// //         <Input
// //           placeholder="Search by phase or system size..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //           className="max-w-sm"
// //         />
// //       </div>

// //       {/* Table */}
// //       <div className="rounded-md border overflow-x-auto">
// //         <Table>
// //           <TableHeader>
// //             <TableRow className="bg-blue-50">
// //               <TableHead className="font-semibold">Sl No.</TableHead>
// //               <TableHead className="font-semibold">
// //                 <Button variant="ghost" onClick={() => handleSort("systemSize")} className="h-auto p-0 font-semibold">
// //                   System Size (kWp)
// //                   <ArrowUpDown className="ml-2 h-4 w-4" />
// //                 </Button>
// //               </TableHead>
// //               <TableHead className="font-semibold">No of Modules</TableHead>
// //               <TableHead className="font-semibold">Inverter Capacity (kW)</TableHead>
// //               <TableHead className="font-semibold">Phase</TableHead>
// //               <TableHead className="font-semibold">
// //                 <Button
// //                   variant="ghost"
// //                   onClick={() => handleSort("hdgElevatedWithGst")}
// //                   className="h-auto p-0 font-semibold"
// //                 >
// //                   Price/Watt (₹)
// //                   <ArrowUpDown className="ml-2 h-4 w-4" />
// //                 </Button>
// //               </TableHead>
// //               <TableHead className="font-semibold">
// //                 <Button
// //                   variant="ghost"
// //                   onClick={() => handleSort("hdgElevatedPrice")}
// //                   className="h-auto p-0 font-semibold"
// //                 >
// //                   Total Price (₹)
// //                   <ArrowUpDown className="ml-2 h-4 w-4" />
// //                 </Button>
// //               </TableHead>
// //             </TableRow>
// //           </TableHeader>
// //           <TableBody>
// //             {filteredAndSortedData.map((item) => (
// //               <TableRow key={item.slNo} className="hover:bg-gray-50">
// //                 <TableCell className="font-medium">{item.slNo}</TableCell>
// //                 <TableCell>{item.systemSize}</TableCell>
// //                 <TableCell>{item.noOfModules}</TableCell>
// //                 <TableCell>{item.inverterCapacity}</TableCell>
// //                 <TableCell>
// //                   <Badge variant={item.phase === "Single" ? "default" : "secondary"} className="text-xs">
// //                     {item.phase}
// //                   </Badge>
// //                 </TableCell>
// //                 <TableCell className="font-medium">₹{item.hdgElevatedWithGst.toFixed(2)}</TableCell>
// //                 <TableCell className="font-bold text-green-600">
// //                   ₹{item.hdgElevatedPrice.toLocaleString("en-IN")}
// //                 </TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </div>
// //       {filteredAndSortedData.length === 0 && (
// //         <div className="text-center py-8 text-gray-500">No systems found matching your search criteria.</div>
// //       )}
// //     </div>
// //   )
// // }

// // function LargeSystemTable() {
// //   const [searchTerm, setSearchTerm] = useState("")
// //   const [sortField, setSortField] = useState<keyof LargeSystemData | null>(null)
// //   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

// //   const handleSort = (field: keyof LargeSystemData) => {
// //     if (sortField === field) {
// //       setSortDirection(sortDirection === "asc" ? "desc" : "asc")
// //     } else {
// //       setSortField(field)
// //       setSortDirection("asc")
// //     }
// //   }

// //   const filteredAndSortedData = largeSystemData
// //     .filter(
// //       (item) => item.systemSizeKWp.toString().includes(searchTerm) || item.systemSizeKW.toString().includes(searchTerm),
// //     )
// //     .sort((a, b) => {
// //       if (!sortField) return 0
// //       const aValue = a[sortField]
// //       const bValue = b[sortField]
// //       if (typeof aValue === "number" && typeof bValue === "number") {
// //         return sortDirection === "asc" ? aValue - bValue : bValue - aValue
// //       }
// //       return 0
// //     })

// //   return (
// //     <div className="space-y-4">
// //       {/* Search */}
// //       <div className="flex items-center space-x-2">
// //         <Search className="h-4 w-4 text-gray-400" />
// //         <Input
// //           placeholder="Search by system size..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //           className="max-w-sm"
// //         />
// //       </div>

// //       {/* Pricing Options Tabs */}
// //       <Tabs defaultValue="tin-shed" className="w-full">
// //         <TabsList className="grid w-full grid-cols-3">
// //           <TabsTrigger value="tin-shed">Tin Shed</TabsTrigger>
// //           <TabsTrigger value="rcc-elevated">RCC Elevated</TabsTrigger>
// //           <TabsTrigger value="pre-gi-mms">Pre GI MMS</TabsTrigger>
// //         </TabsList>

// //         <TabsContent value="tin-shed" className="mt-4">
// //           <div className="rounded-md border overflow-x-auto">
// //             <Table>
// //               <TableHeader>
// //                 <TableRow className="bg-blue-50">
// //                   <TableHead className="font-semibold">Sl No.</TableHead>
// //                   <TableHead className="font-semibold">
// //                     <Button
// //                       variant="ghost"
// //                       onClick={() => handleSort("systemSizeKWp")}
// //                       className="h-auto p-0 font-semibold"
// //                     >
// //                       System Size (kWp)
// //                       <ArrowUpDown className="ml-2 h-4 w-4" />
// //                     </Button>
// //                   </TableHead>
// //                   <TableHead className="font-semibold">System Size (kW)</TableHead>
// //                   <TableHead className="font-semibold">No. of Modules</TableHead>
// //                   <TableHead className="font-semibold">Inverter Capacity (kW)</TableHead>
// //                   <TableHead className="font-semibold">Phase</TableHead>
// //                   <TableHead className="font-semibold">Price/Watt (₹)</TableHead>
// //                   <TableHead className="font-semibold">Total Price (₹)</TableHead>
// //                 </TableRow>
// //               </TableHeader>
// //               <TableBody>
// //                 {filteredAndSortedData.map((item) => (
// //                   <TableRow key={item.slNo} className="hover:bg-gray-50">
// //                     <TableCell className="font-medium">{item.slNo}</TableCell>
// //                     <TableCell>{item.systemSizeKWp}</TableCell>
// //                     <TableCell>{item.systemSizeKW}</TableCell>
// //                     <TableCell>{item.noOfModules}</TableCell>
// //                     <TableCell>{item.inverterCapacity}</TableCell>
// //                     <TableCell>
// //                       <Badge variant="secondary" className="text-xs">
// //                         {item.phase}
// //                       </Badge>
// //                     </TableCell>
// //                     <TableCell className="font-medium">₹{item.shortRailTinShedPricePerWatt.toFixed(2)}</TableCell>
// //                     <TableCell className="font-bold text-green-600">
// //                       ₹{item.shortRailTinShedPrice.toLocaleString("en-IN")}
// //                     </TableCell>
// //                   </TableRow>
// //                 ))}
// //               </TableBody>
// //             </Table>
// //           </div>
// //         </TabsContent>

// //         <TabsContent value="rcc-elevated" className="mt-4">
// //           <div className="rounded-md border overflow-x-auto">
// //             <Table>
// //               <TableHeader>
// //                 <TableRow className="bg-blue-50">
// //                   <TableHead className="font-semibold">Sl No.</TableHead>
// //                   <TableHead className="font-semibold">System Size (kWp)</TableHead>
// //                   <TableHead className="font-semibold">System Size (kW)</TableHead>
// //                   <TableHead className="font-semibold">No. of Modules</TableHead>
// //                   <TableHead className="font-semibold">Inverter Capacity (kW)</TableHead>
// //                   <TableHead className="font-semibold">Phase</TableHead>
// //                   <TableHead className="font-semibold">Price/Watt (₹)</TableHead>
// //                   <TableHead className="font-semibold">Total Price (₹)</TableHead>
// //                 </TableRow>
// //               </TableHeader>
// //               <TableBody>
// //                 {filteredAndSortedData.map((item) => (
// //                   <TableRow key={item.slNo} className="hover:bg-gray-50">
// //                     <TableCell className="font-medium">{item.slNo}</TableCell>
// //                     <TableCell>{item.systemSizeKWp}</TableCell>
// //                     <TableCell>{item.systemSizeKW}</TableCell>
// //                     <TableCell>{item.noOfModules}</TableCell>
// //                     <TableCell>{item.inverterCapacity}</TableCell>
// //                     <TableCell>
// //                       <Badge variant="secondary" className="text-xs">
// //                         {item.phase}
// //                       </Badge>
// //                     </TableCell>
// //                     <TableCell className="font-medium">₹{item.hdgElevatedRccPricePerWatt.toFixed(2)}</TableCell>
// //                     <TableCell className="font-bold text-green-600">
// //                       ₹{item.hdgElevatedRccPrice.toLocaleString("en-IN")}
// //                     </TableCell>
// //                   </TableRow>
// //                 ))}
// //               </TableBody>
// //             </Table>
// //           </div>
// //         </TabsContent>

// //         <TabsContent value="pre-gi-mms" className="mt-4">
// //           <div className="rounded-md border overflow-x-auto">
// //             <Table>
// //               <TableHeader>
// //                 <TableRow className="bg-blue-50">
// //                   <TableHead className="font-semibold">Sl No.</TableHead>
// //                   <TableHead className="font-semibold">System Size (kWp)</TableHead>
// //                   <TableHead className="font-semibold">System Size (kW)</TableHead>
// //                   <TableHead className="font-semibold">No. of Modules</TableHead>
// //                   <TableHead className="font-semibold">Inverter Capacity (kW)</TableHead>
// //                   <TableHead className="font-semibold">Phase</TableHead>
// //                   <TableHead className="font-semibold">Price/Watt (₹)</TableHead>
// //                   <TableHead className="font-semibold">Total Price (₹)</TableHead>
// //                 </TableRow>
// //               </TableHeader>
// //               <TableBody>
// //                 {filteredAndSortedData.map((item) => (
// //                   <TableRow key={item.slNo} className="hover:bg-gray-50">
// //                     <TableCell className="font-medium">{item.slNo}</TableCell>
// //                     <TableCell>{item.systemSizeKWp}</TableCell>
// //                     <TableCell>{item.systemSizeKW}</TableCell>
// //                     <TableCell>{item.noOfModules}</TableCell>
// //                     <TableCell>{item.inverterCapacity}</TableCell>
// //                     <TableCell>
// //                       <Badge variant="secondary" className="text-xs">
// //                         {item.phase}
// //                       </Badge>
// //                     </TableCell>
// //                     <TableCell className="font-medium">₹{item.preGiMmsPricePerWatt.toFixed(2)}</TableCell>
// //                     <TableCell className="font-bold text-green-600">
// //                       ₹{item.preGiMmsPrice.toLocaleString("en-IN")}
// //                     </TableCell>
// //                   </TableRow>
// //                 ))}
// //               </TableBody>
// //             </Table>
// //           </div>
// //         </TabsContent>
// //       </Tabs>
// //     </div>
// //   )
// // }

// // function DCCableTable() {
// //   const totalAmount = dcCableData.reduce((sum, item) => sum + item.total, 0)

// //   return (
// //     <div className="space-y-4">
// //       <div className="rounded-md border overflow-x-auto">
// //         <Table>
// //           <TableHeader>
// //             <TableRow className="bg-blue-50">
// //               <TableHead className="font-semibold">Sr No</TableHead>
// //               <TableHead className="font-semibold">Product Description</TableHead>
// //               <TableHead className="font-semibold">UOM</TableHead>
// //               <TableHead className="font-semibold">Quantity</TableHead>
// //               <TableHead className="font-semibold">Price (₹)</TableHead>
// //               <TableHead className="font-semibold">Total (₹)</TableHead>
// //             </TableRow>
// //           </TableHeader>
// //           <TableBody>
// //             {dcCableData.map((item) => (
// //               <TableRow key={item.srNo} className="hover:bg-gray-50">
// //                 <TableCell className="font-medium">{item.srNo}</TableCell>
// //                 <TableCell>{item.productDescription}</TableCell>
// //                 <TableCell>
// //                   <Badge variant="outline" className="text-xs">
// //                     {item.uom}
// //                   </Badge>
// //                 </TableCell>
// //                 <TableCell className="font-medium">{item.quantity}</TableCell>
// //                 <TableCell>₹{item.price.toFixed(2)}</TableCell>
// //                 <TableCell className="font-bold text-green-600">₹{item.total.toLocaleString("en-IN")}</TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //           <TableFooter>
// //             <TableRow className="bg-gray-50">
// //               <TableCell colSpan={5} className="font-bold text-right">
// //                 Total Amount:
// //               </TableCell>
// //               <TableCell className="font-bold text-lg text-blue-600">₹{totalAmount.toLocaleString("en-IN")}</TableCell>
// //             </TableRow>
// //           </TableFooter>
// //         </Table>
// //       </div>
// //     </div>
// //   )
// // }

// // function KitItemsTable() {
// //   return (
// //     <div className="space-y-4">
// //       <div className="rounded-md border overflow-x-auto">
// //         <Table>
// //           <TableHeader>
// //             <TableRow className="bg-blue-50">
// //               <TableHead className="font-semibold">Sr No.</TableHead>
// //               <TableHead className="font-semibold">Component</TableHead>
// //               <TableHead className="font-semibold">Description</TableHead>
// //               <TableHead className="font-semibold">Status</TableHead>
// //             </TableRow>
// //           </TableHeader>
// //           <TableBody>
// //             {kitItems.map((item) => (
// //               <TableRow key={item.srNo} className="hover:bg-gray-50">
// //                 <TableCell className="font-medium">{item.srNo}</TableCell>
// //                 <TableCell>
// //                   <Badge variant="secondary" className="font-medium">
// //                     {item.item}
// //                   </Badge>
// //                 </TableCell>
// //                 <TableCell className="max-w-md">
// //                   {item.description || "Standard component as per system requirements"}
// //                 </TableCell>
// //                 <TableCell>
// //                   <div className="flex items-center gap-2 text-green-600">
// //                     <CheckCircle className="h-4 w-4" />
// //                     <span className="text-sm font-medium">Included</span>
// //                   </div>
// //                 </TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </div>
// //       <div className="bg-blue-50 p-4 rounded-lg">
// //         <h4 className="font-semibold text-blue-900 mb-2">{"What's Included in Our Scope:"}</h4>
// //         <ul className="text-sm text-blue-800 space-y-1">
// //           <li>• Complete system design and engineering</li>
// //           <li>• All components listed above</li>
// //           <li>• Installation and commissioning</li>
// //           <li>• 5-year monitoring service</li>
// //           <li>• Warranty as per manufacturer terms</li>
// //         </ul>
// //       </div>
// //     </div>
// //   )
// // }

// // // Main Component
// // export default function Reliance() {
// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
// //       <div className="max-w-7xl mx-auto space-y-8">
// //         {/* Header */}
// //         <div className="text-center space-y-4">
// //           <div className="flex items-center justify-center gap-2 mb-4">
// //             <Zap className="h-8 w-8 text-blue-600" />
// //             <h1 className="text-4xl font-bold text-gray-900">HJT Solar System Pricing</h1>
// //           </div>
// //           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
// //             Comprehensive pricing for RIL 690 Wp HJT Solar Modules and complete system packages
// //           </p>
// //           <div className="flex flex-wrap justify-center gap-2">
// //             <Badge variant="secondary" className="text-sm">
// //               Non DCR Modules
// //             </Badge>
// //             <Badge variant="secondary" className="text-sm">
// //               Excluding GST
// //             </Badge>
// //             <Badge variant="secondary" className="text-sm">
// //               Net Metering Not Included
// //             </Badge>
// //           </div>
// //         </div>

// //         {/* Tabs for different sections */}
// //         <Tabs defaultValue="residential" className="w-full">
// //           <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
// //             <TabsTrigger value="residential" className="flex items-center gap-2">
// //               <Calculator className="h-4 w-4" />
// //               <span className="hidden sm:inline">Residential</span>
// //             </TabsTrigger>
// //             <TabsTrigger value="commercial" className="flex items-center gap-2">
// //               <Zap className="h-4 w-4" />
// //               <span className="hidden sm:inline">Commercial</span>
// //             </TabsTrigger>
// //             <TabsTrigger value="cables" className="flex items-center gap-2">
// //               <Cable className="h-4 w-4" />
// //               <span className="hidden sm:inline">Cables</span>
// //             </TabsTrigger>
// //             <TabsTrigger value="kit" className="flex items-center gap-2">
// //               <Package className="h-4 w-4" />
// //               <span className="hidden sm:inline">Kit Items</span>
// //             </TabsTrigger>
// //           </TabsList>

// //           <TabsContent value="residential" className="space-y-6">
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2">
// //                   <Calculator className="h-5 w-5 text-blue-600" />
// //                   Residential Grid Tie Systems
// //                 </CardTitle>
// //                 <CardDescription>
// //                   Perfect for homes and small businesses. Single and three-phase options available.
// //                 </CardDescription>
// //               </CardHeader>
// //               <CardContent>
// //                 <GridTieSystemTable />
// //               </CardContent>
// //             </Card>
// //           </TabsContent>

// //           <TabsContent value="commercial" className="space-y-6">
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2">
// //                   <Zap className="h-5 w-5 text-blue-600" />
// //                   Commercial & Industrial Systems
// //                 </CardTitle>
// //                 <CardDescription>
// //                   Large-scale solar installations with multiple mounting options and pricing tiers.
// //                 </CardDescription>
// //               </CardHeader>
// //               <CardContent>
// //                 <LargeSystemTable />
// //               </CardContent>
// //             </Card>
// //           </TabsContent>

// //           <TabsContent value="cables" className="space-y-6">
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2">
// //                   <Cable className="h-5 w-5 text-blue-600" />
// //                   DC Cables - Bulk Supply
// //                 </CardTitle>
// //                 <CardDescription>
// //                   High-quality DC cables for solar installations with competitive bulk pricing.
// //                 </CardDescription>
// //               </CardHeader>
// //               <CardContent>
// //                 <DCCableTable />
// //               </CardContent>
// //             </Card>
// //           </TabsContent>

// //           <TabsContent value="kit" className="space-y-6">
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2">
// //                   <Package className="h-5 w-5 text-blue-600" />
// //                   Complete Kit Components
// //                 </CardTitle>
// //                 <CardDescription>
// //                   All components included in our solar system packages - our complete scope of supply.
// //                 </CardDescription>
// //               </CardHeader>
// //               <CardContent>
// //                 <KitItemsTable />
// //               </CardContent>
// //             </Card>
// //           </TabsContent>
// //         </Tabs>

// //         {/* Footer */}
// //         <div className="text-center text-sm text-gray-500 border-t pt-8">
// //           <p>All prices are subject to change. Contact us for the latest pricing and availability.</p>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }







// "use client"

// import { useState } from "react"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Calculator, Zap, Cable, Package, ArrowUpDown, Search, CheckCircle } from "lucide-react"

// // Interfaces
// interface GridTieSystemData {
//   slNo: number
//   systemSize: number
//   noOfModules: number
//   inverterCapacity: number
//   phase: string
//   hdgElevatedWithGst: number
//   hdgElevatedPrice: number
// }

// interface LargeSystemData {
//   slNo: number
//   systemSizeKWp: number
//   systemSizeKW: number
//   noOfModules: number
//   inverterCapacity: number
//   phase: string
//   shortRailTinShedPricePerWatt: number
//   shortRailTinShedPrice: number
//   hdgElevatedRccPricePerWatt: number
//   hdgElevatedRccPrice: number
//   preGiMmsPricePerWatt: number
//   preGiMmsPrice: number
//   priceWithoutMmsPricePerWatt: number
//   priceWithoutMmsPrice: number
// }

// interface DCCableData {
//   srNo: number
//   productDescription: string
//   uom: string
//   quantity: number
//   price: number
//   total: number
// }

// interface KitItem {
//   srNo: number
//   item: string
//   description: string
// }

// // Data
// const gridTieSystemData: GridTieSystemData[] = [
//   {
//     slNo: 1,
//     systemSize: 3.45,
//     noOfModules: 5,
//     inverterCapacity: 3,
//     phase: "Single",
//     hdgElevatedWithGst: 61.13,
//     hdgElevatedPrice: 210900,
//   },
//   {
//     slNo: 2,
//     systemSize: 5.52,
//     noOfModules: 8,
//     inverterCapacity: 5,
//     phase: "Single",
//     hdgElevatedWithGst: 60.22,
//     hdgElevatedPrice: 332410,
//   },
//   {
//     slNo: 3,
//     systemSize: 5.52,
//     noOfModules: 8,
//     inverterCapacity: 5,
//     phase: "Three",
//     hdgElevatedWithGst: 65.06,
//     hdgElevatedPrice: 359153,
//   },
//   {
//     slNo: 4,
//     systemSize: 8.28,
//     noOfModules: 12,
//     inverterCapacity: 10,
//     phase: "Three",
//     hdgElevatedWithGst: 58.55,
//     hdgElevatedPrice: 484822,
//   },
//   {
//     slNo: 5,
//     systemSize: 10.35,
//     noOfModules: 15,
//     inverterCapacity: 10,
//     phase: "Three",
//     hdgElevatedWithGst: 55.45,
//     hdgElevatedPrice: 573910,
//   },
//   {
//     slNo: 6,
//     systemSize: 13.8,
//     noOfModules: 20,
//     inverterCapacity: 10,
//     phase: "Three",
//     hdgElevatedWithGst: 53.49,
//     hdgElevatedPrice: 738095,
//   },
// ]

// const largeSystemData: LargeSystemData[] = [
//   {
//     slNo: 1,
//     systemSizeKWp: 19.32,
//     systemSizeKW: 15,
//     noOfModules: 28,
//     inverterCapacity: 15,
//     phase: "Three",
//     shortRailTinShedPricePerWatt: 33.91,
//     shortRailTinShedPrice: 655060,
//     hdgElevatedRccPricePerWatt: 38.91,
//     hdgElevatedRccPrice: 751660,
//     preGiMmsPricePerWatt: 36.57,
//     preGiMmsPrice: 706500,
//     priceWithoutMmsPricePerWatt: 32.0761956,
//     priceWithoutMmsPrice: 619560,
//   },
//   {
//     slNo: 2,
//     systemSizeKWp: 33.12,
//     systemSizeKW: 25,
//     noOfModules: 48,
//     inverterCapacity: 20,
//     phase: "Three",
//     shortRailTinShedPricePerWatt: 32.92,
//     shortRailTinShedPrice: 1090460,
//     hdgElevatedRccPricePerWatt: 37.92,
//     hdgElevatedRccPrice: 1256060,
//     preGiMmsPricePerWatt: 36.08,
//     preGiMmsPrice: 1195060,
//     priceWithoutMmsPricePerWatt: 31.08102946,
//     priceWithoutMmsPrice: 1029460,
//   },
//   {
//     slNo: 3,
//     systemSizeKWp: 52.44,
//     systemSizeKW: 40,
//     noOfModules: 76,
//     inverterCapacity: 40,
//     phase: "Three",
//     shortRailTinShedPricePerWatt: 31.96,
//     shortRailTinShedPrice: 1676180,
//     hdgElevatedRccPricePerWatt: 36.96,
//     hdgElevatedRccPrice: 1938380,
//     preGiMmsPricePerWatt: 35.62,
//     preGiMmsPrice: 1867900,
//     priceWithoutMmsPricePerWatt: 30.12157948,
//     priceWithoutMmsPrice: 1579480,
//   },
//   {
//     slNo: 4,
//     systemSizeKWp: 65.55,
//     systemSizeKW: 50,
//     noOfModules: 95,
//     inverterCapacity: 50,
//     phase: "Three",
//     shortRailTinShedPricePerWatt: 31.23,
//     shortRailTinShedPrice: 2047350,
//     hdgElevatedRccPricePerWatt: 36.23,
//     hdgElevatedRccPrice: 2375100,
//     preGiMmsPricePerWatt: 34.39,
//     preGiMmsPrice: 2254300,
//     priceWithoutMmsPricePerWatt: 29.39192655,
//     priceWithoutMmsPrice: 1926550,
//   },
//   {
//     slNo: 5,
//     systemSizeKWp: 105.57,
//     systemSizeKW: 80,
//     noOfModules: 153,
//     inverterCapacity: 80,
//     phase: "Three",
//     shortRailTinShedPricePerWatt: 30.22,
//     shortRailTinShedPrice: 3190020,
//     hdgElevatedRccPricePerWatt: 35.22,
//     hdgElevatedRccPrice: 3717870,
//     preGiMmsPricePerWatt: 34.87,
//     preGiMmsPrice: 3681725,
//     priceWithoutMmsPricePerWatt: 28.37299552,
//     priceWithoutMmsPrice: 2995520,
//   },
//   {
//     slNo: 6,
//     systemSizeKWp: 124.2,
//     systemSizeKW: 100,
//     noOfModules: 180,
//     inverterCapacity: 100,
//     phase: "Three",
//     shortRailTinShedPricePerWatt: 30.04,
//     shortRailTinShedPrice: 3731500,
//     hdgElevatedRccPricePerWatt: 35.04,
//     hdgElevatedRccPrice: 4352500,
//     preGiMmsPricePerWatt: 34.21,
//     preGiMmsPrice: 4248400,
//     priceWithoutMmsPricePerWatt: 28.2135032,
//     priceWithoutMmsPrice: 3503200,
//   },
//   {
//     slNo: 7,
//     systemSizeKWp: 165.6,
//     systemSizeKW: 125,
//     noOfModules: 240,
//     inverterCapacity: 125,
//     phase: "Three",
//     shortRailTinShedPricePerWatt: 29.46,
//     shortRailTinShedPrice: 4878300,
//     hdgElevatedRccPricePerWatt: 34.46,
//     hdgElevatedRccPrice: 5706300,
//     preGiMmsPricePerWatt: 34.62,
//     preGiMmsPrice: 5732600,
//     priceWithoutMmsPricePerWatt: 27.6245734,
//     priceWithoutMmsPrice: 4573400,
//   },
// ]

// const dcCableData: DCCableData[] = [
//   {
//     srNo: 1,
//     productDescription: "DC Cable ble Insulated X",
//     uom: "Mtrs",
//     quantity: 500,
//     price: 46.67,
//     total: 23333.33,
//   },
//   {
//     srNo: 2,
//     productDescription: "DC Cable ble Insulated XL",
//     uom: "Mtrs",
//     quantity: 500,
//     price: 46.67,
//     total: 23333.33,
//   },
// ]

// const kitItems: KitItem[] = [
//   { srNo: 1, item: "Module", description: "RIL 690-720 Wp Module - Silicon" },
//   { srNo: 2, item: "Inverter", description: "3 String Inverter (According to system size)" },
//   { srNo: 3, item: "ACDB", description: "ACDB, IP65 Protected with MCB 4P-1 Nos." },
//   { srNo: 4, item: "MC4 Connector", description: "Male & female (both)" },
//   { srNo: 5, item: "Monitoring Device", description: "Network device, with 5 year of network service" },
//   { srNo: 6, item: "MMS", description: "Mounting & Monitoring System" },
// ]

// // Components
// function GridTieSystemTable() {
//   const [sortField, setSortField] = useState<keyof GridTieSystemData | null>(null)
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
//   const [searchTerm, setSearchTerm] = useState("")

//   const handleSort = (field: keyof GridTieSystemData) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc")
//     } else {
//       setSortField(field)
//       setSortDirection("asc")
//     }
//   }

//   const filteredAndSortedData = gridTieSystemData
//     .filter(
//       (item) =>
//         item.phase.toLowerCase().includes(searchTerm.toLowerCase()) || item.systemSize.toString().includes(searchTerm),
//     )
//     .sort((a, b) => {
//       if (!sortField) return 0
//       const aValue = a[sortField]
//       const bValue = b[sortField]
//       if (typeof aValue === "string" && typeof bValue === "string") {
//         return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
//       }
//       if (typeof aValue === "number" && typeof bValue === "number") {
//         return sortDirection === "asc" ? aValue - bValue : bValue - aValue
//       }
//       return 0
//     })

//   return (
//     <div className="space-y-4">
//       {/* Search */}
//       <div className="flex items-center space-x-2">
//         <Search className="h-4 w-4 text-gray-400" />
//         <Input
//           placeholder="Search by phase or system size..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="max-w-sm"
//         />
//       </div>

//       {/* Table */}
//       <div className="rounded-md border overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-blue-50">
//               <TableHead className="font-semibold">Sl No.</TableHead>
//               <TableHead className="font-semibold">
//                 <Button variant="ghost" onClick={() => handleSort("systemSize")} className="h-auto p-0 font-semibold">
//                   System Size (kWp)
//                   <ArrowUpDown className="ml-2 h-4 w-4" />
//                 </Button>
//               </TableHead>
//               <TableHead className="font-semibold">No of Modules</TableHead>
//               <TableHead className="font-semibold">Inverter Capacity (kW)</TableHead>
//               <TableHead className="font-semibold">Phase</TableHead>
//               <TableHead className="font-semibold">
//                 <Button
//                   variant="ghost"
//                   onClick={() => handleSort("hdgElevatedWithGst")}
//                   className="h-auto p-0 font-semibold"
//                 >
//                   Price/Watt (₹)
//                   <ArrowUpDown className="ml-2 h-4 w-4" />
//                 </Button>
//               </TableHead>
//               <TableHead className="font-semibold">
//                 <Button
//                   variant="ghost"
//                   onClick={() => handleSort("hdgElevatedPrice")}
//                   className="h-auto p-0 font-semibold"
//                 >
//                   Total Price (₹)
//                   <ArrowUpDown className="ml-2 h-4 w-4" />
//                 </Button>
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredAndSortedData.map((item) => (
//               <TableRow key={item.slNo} className="hover:bg-gray-50">
//                 <TableCell className="font-medium">{item.slNo}</TableCell>
//                 <TableCell>{item.systemSize}</TableCell>
//                 <TableCell>{item.noOfModules}</TableCell>
//                 <TableCell>{item.inverterCapacity}</TableCell>
//                 <TableCell>
//                   <Badge variant={item.phase === "Single" ? "default" : "secondary"} className="text-xs">
//                     {item.phase}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="font-medium">₹{item.hdgElevatedWithGst.toFixed(2)}</TableCell>
//                 <TableCell className="font-bold text-green-600">
//                   ₹{item.hdgElevatedPrice.toLocaleString("en-IN")}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//       {filteredAndSortedData.length === 0 && (
//         <div className="text-center py-8 text-gray-500">No systems found matching your search criteria.</div>
//       )}
//     </div>
//   )
// }

// function LargeSystemTable() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [sortField, setSortField] = useState<keyof LargeSystemData | null>(null)
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

//   const handleSort = (field: keyof LargeSystemData) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc")
//     } else {
//       setSortField(field)
//       setSortDirection("asc")
//     }
//   }

//   const filteredAndSortedData = largeSystemData
//     .filter(
//       (item) => item.systemSizeKWp.toString().includes(searchTerm) || item.systemSizeKW.toString().includes(searchTerm),
//     )
//     .sort((a, b) => {
//       if (!sortField) return 0
//       const aValue = a[sortField]
//       const bValue = b[sortField]
//       if (typeof aValue === "number" && typeof bValue === "number") {
//         return sortDirection === "asc" ? aValue - bValue : bValue - aValue
//       }
//       return 0
//     })

//   return (
//     <div className="space-y-4">
//       {/* Search */}
//       <div className="flex items-center space-x-2">
//         <Search className="h-4 w-4 text-gray-400" />
//         <Input
//           placeholder="Search by system size..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="max-w-sm"
//         />
//       </div>

//       {/* Pricing Options Tabs */}
//       <Tabs defaultValue="tin-shed" className="w-full">
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="tin-shed">Tin Shed</TabsTrigger>
//           <TabsTrigger value="rcc-elevated">RCC Elevated</TabsTrigger>
//           <TabsTrigger value="pre-gi-mms">Pre GI MMS</TabsTrigger>
//           <TabsTrigger value="without-mms">Without MMS</TabsTrigger>
//         </TabsList>

//         <TabsContent value="tin-shed" className="mt-4">
//           <div className="rounded-md border overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-blue-50">
//                   <TableHead className="font-semibold">Sl No.</TableHead>
//                   <TableHead className="font-semibold">
//                     <Button
//                       variant="ghost"
//                       onClick={() => handleSort("systemSizeKWp")}
//                       className="h-auto p-0 font-semibold"
//                     >
//                       System Size (kWp)
//                       <ArrowUpDown className="ml-2 h-4 w-4" />
//                     </Button>
//                   </TableHead>
//                   <TableHead className="font-semibold">System Size (kW)</TableHead>
//                   <TableHead className="font-semibold">No. of Modules</TableHead>
//                   <TableHead className="font-semibold">Inverter Capacity (kW)</TableHead>
//                   <TableHead className="font-semibold">Phase</TableHead>
//                   <TableHead className="font-semibold">Price/Watt (₹)</TableHead>
//                   <TableHead className="font-semibold">Total Price (₹)</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredAndSortedData.map((item) => (
//                   <TableRow key={item.slNo} className="hover:bg-gray-50">
//                     <TableCell className="font-medium">{item.slNo}</TableCell>
//                     <TableCell>{item.systemSizeKWp}</TableCell>
//                     <TableCell>{item.systemSizeKW}</TableCell>
//                     <TableCell>{item.noOfModules}</TableCell>
//                     <TableCell>{item.inverterCapacity}</TableCell>
//                     <TableCell>
//                       <Badge variant="secondary" className="text-xs">
//                         {item.phase}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="font-medium">₹{item.shortRailTinShedPricePerWatt.toFixed(2)}</TableCell>
//                     <TableCell className="font-bold text-green-600">
//                       ₹{item.shortRailTinShedPrice.toLocaleString("en-IN")}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </TabsContent>

//         <TabsContent value="rcc-elevated" className="mt-4">
//           <div className="rounded-md border overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-blue-50">
//                   <TableHead className="font-semibold">Sl No.</TableHead>
//                   <TableHead className="font-semibold">System Size (kWp)</TableHead>
//                   <TableHead className="font-semibold">System Size (kW)</TableHead>
//                   <TableHead className="font-semibold">No. of Modules</TableHead>
//                   <TableHead className="font-semibold">Inverter Capacity (kW)</TableHead>
//                   <TableHead className="font-semibold">Phase</TableHead>
//                   <TableHead className="font-semibold">Price/Watt (₹)</TableHead>
//                   <TableHead className="font-semibold">Total Price (₹)</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredAndSortedData.map((item) => (
//                   <TableRow key={item.slNo} className="hover:bg-gray-50">
//                     <TableCell className="font-medium">{item.slNo}</TableCell>
//                     <TableCell>{item.systemSizeKWp}</TableCell>
//                     <TableCell>{item.systemSizeKW}</TableCell>
//                     <TableCell>{item.noOfModules}</TableCell>
//                     <TableCell>{item.inverterCapacity}</TableCell>
//                     <TableCell>
//                       <Badge variant="secondary" className="text-xs">
//                         {item.phase}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="font-medium">₹{item.hdgElevatedRccPricePerWatt.toFixed(2)}</TableCell>
//                     <TableCell className="font-bold text-green-600">
//                       ₹{item.hdgElevatedRccPrice.toLocaleString("en-IN")}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </TabsContent>

//         <TabsContent value="pre-gi-mms" className="mt-4">
//           <div className="rounded-md border overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-blue-50">
//                   <TableHead className="font-semibold">Sl No.</TableHead>
//                   <TableHead className="font-semibold">System Size (kWp)</TableHead>
//                   <TableHead className="font-semibold">System Size (kW)</TableHead>
//                   <TableHead className="font-semibold">No. of Modules</TableHead>
//                   <TableHead className="font-semibold">Inverter Capacity (kW)</TableHead>
//                   <TableHead className="font-semibold">Phase</TableHead>
//                   <TableHead className="font-semibold">Price/Watt (₹)</TableHead>
//                   <TableHead className="font-semibold">Total Price (₹)</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredAndSortedData.map((item) => (
//                   <TableRow key={item.slNo} className="hover:bg-gray-50">
//                     <TableCell className="font-medium">{item.slNo}</TableCell>
//                     <TableCell>{item.systemSizeKWp}</TableCell>
//                     <TableCell>{item.systemSizeKW}</TableCell>
//                     <TableCell>{item.noOfModules}</TableCell>
//                     <TableCell>{item.inverterCapacity}</TableCell>
//                     <TableCell>
//                       <Badge variant="secondary" className="text-xs">
//                         {item.phase}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="font-medium">₹{item.preGiMmsPricePerWatt.toFixed(2)}</TableCell>
//                     <TableCell className="font-bold text-green-600">
//                       ₹{item.preGiMmsPrice.toLocaleString("en-IN")}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </TabsContent>

//         <TabsContent value="without-mms" className="mt-4">
//           <div className="rounded-md border overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-blue-50">
//                   <TableHead className="font-semibold">Sl No.</TableHead>
//                   <TableHead className="font-semibold">System Size (kWp)</TableHead>
//                   <TableHead className="font-semibold">System Size (kW)</TableHead>
//                   <TableHead className="font-semibold">No. of Modules</TableHead>
//                   <TableHead className="font-semibold">Inverter Capacity (kW)</TableHead>
//                   <TableHead className="font-semibold">Phase</TableHead>
//                   <TableHead className="font-semibold">Price/Watt (₹)</TableHead>
//                   <TableHead className="font-semibold">Total Price (₹)</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredAndSortedData.map((item) => (
//                   <TableRow key={item.slNo} className="hover:bg-gray-50">
//                     <TableCell className="font-medium">{item.slNo}</TableCell>
//                     <TableCell>{item.systemSizeKWp}</TableCell>
//                     <TableCell>{item.systemSizeKW}</TableCell>
//                     <TableCell>{item.noOfModules}</TableCell>
//                     <TableCell>{item.inverterCapacity}</TableCell>
//                     <TableCell>
//                       <Badge variant="secondary" className="text-xs">
//                         {item.phase}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="font-medium">₹{item.priceWithoutMmsPricePerWatt.toFixed(2)}</TableCell>
//                     <TableCell className="font-bold text-green-600">
//                       ₹{item.priceWithoutMmsPrice.toLocaleString("en-IN")}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// function DCCableTable() {
//   const totalAmount = dcCableData.reduce((sum, item) => sum + item.total, 0)

//   return (
//     <div className="space-y-4">
//       <div className="rounded-md border overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-blue-50">
//               <TableHead className="font-semibold">Sr No</TableHead>
//               <TableHead className="font-semibold">Product Description</TableHead>
//               <TableHead className="font-semibold">UOM</TableHead>
//               <TableHead className="font-semibold">Quantity</TableHead>
//               <TableHead className="font-semibold">Price (₹)</TableHead>
//               <TableHead className="font-semibold">Total (₹)</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {dcCableData.map((item) => (
//               <TableRow key={item.srNo} className="hover:bg-gray-50">
//                 <TableCell className="font-medium">{item.srNo}</TableCell>
//                 <TableCell>{item.productDescription}</TableCell>
//                 <TableCell>
//                   <Badge variant="outline" className="text-xs">
//                     {item.uom}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="font-medium">{item.quantity}</TableCell>
//                 <TableCell>₹{item.price.toFixed(2)}</TableCell>
//                 <TableCell className="font-bold text-green-600">₹{item.total.toLocaleString("en-IN")}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//           <TableFooter>
//             <TableRow className="bg-gray-50">
//               <TableCell colSpan={5} className="font-bold text-right">
//                 Total Amount:
//               </TableCell>
//               <TableCell className="font-bold text-lg text-blue-600">₹{totalAmount.toLocaleString("en-IN")}</TableCell>
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </div>
//     </div>
//   )
// }

// function KitItemsTable() {
//   return (
//     <div className="space-y-4">
//       <div className="rounded-md border overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-blue-50">
//               <TableHead className="font-semibold">Sr No.</TableHead>
//               <TableHead className="font-semibold">Component</TableHead>
//               <TableHead className="font-semibold">Description</TableHead>
//               <TableHead className="font-semibold">Status</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {kitItems.map((item) => (
//               <TableRow key={item.srNo} className="hover:bg-gray-50">
//                 <TableCell className="font-medium">{item.srNo}</TableCell>
//                 <TableCell>
//                   <Badge variant="secondary" className="font-medium">
//                     {item.item}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="max-w-md">
//                   {item.description || "Standard component as per system requirements"}
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex items-center gap-2 text-green-600">
//                     <CheckCircle className="h-4 w-4" />
//                     <span className="text-sm font-medium">Included</span>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="bg-blue-50 p-4 rounded-lg">
//         <h4 className="font-semibold text-blue-900 mb-2">{"What's Included in Our Scope:"}</h4>
//         <ul className="text-sm text-blue-800 space-y-1">
//           <li>• Complete system design and engineering</li>
//           <li>• All components listed above</li>
//           <li>• Installation and commissioning</li>
//           <li>• 5-year monitoring service</li>
//           <li>• Warranty as per manufacturer terms</li>
//         </ul>
//       </div>
//     </div>
//   )
// }

// // Main Component
// export default function Reliance() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="text-center space-y-4">
//           <div className="flex items-center justify-center gap-2 mb-4">
//             <Zap className="h-8 w-8 text-blue-600" />
//             <h1 className="text-4xl font-bold text-gray-900">HJT Solar System Pricing</h1>
//           </div>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Comprehensive pricing for RIL 690 Wp HJT Solar Modules and complete system packages
//           </p>
//           <div className="flex flex-wrap justify-center gap-2">
//             <Badge variant="secondary" className="text-sm">
//               Non DCR Modules
//             </Badge>
//             <Badge variant="secondary" className="text-sm">
//               Excluding GST
//             </Badge>
//             <Badge variant="secondary" className="text-sm">
//               Net Metering Not Included
//             </Badge>
//           </div>
//         </div>

//         {/* Tabs for different sections */}
//         <Tabs defaultValue="residential" className="w-full">
//           <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
//             <TabsTrigger value="residential" className="flex items-center gap-2">
//               <Calculator className="h-4 w-4" />
//               <span className="hidden sm:inline">Residential</span>
//             </TabsTrigger>
//             <TabsTrigger value="commercial" className="flex items-center gap-2">
//               <Zap className="h-4 w-4" />
//               <span className="hidden sm:inline">Commercial</span>
//             </TabsTrigger>
//             <TabsTrigger value="cables" className="flex items-center gap-2">
//               <Cable className="h-4 w-4" />
//               <span className="hidden sm:inline">Cables</span>
//             </TabsTrigger>
//             <TabsTrigger value="kit" className="flex items-center gap-2">
//               <Package className="h-4 w-4" />
//               <span className="hidden sm:inline">Kit Items</span>
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="residential" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Calculator className="h-5 w-5 text-blue-600" />
//                   Residential Grid Tie Systems
//                 </CardTitle>
//                 <CardDescription>
//                   Perfect for homes and small businesses. Single and three-phase options available.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <GridTieSystemTable />
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="commercial" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Zap className="h-5 w-5 text-blue-600" />
//                   Commercial & Industrial Systems
//                 </CardTitle>
//                 <CardDescription>
//                   Large-scale solar installations with multiple mounting options and pricing tiers.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <LargeSystemTable />
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="cables" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Cable className="h-5 w-5 text-blue-600" />
//                   DC Cables - Bulk Supply
//                 </CardTitle>
//                 <CardDescription>
//                   High-quality DC cables for solar installations with competitive bulk pricing.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <DCCableTable />
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="kit" className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Package className="h-5 w-5 text-blue-600" />
//                   Complete Kit Components
//                 </CardTitle>
//                 <CardDescription>
//                   All components included in our solar system packages - our complete scope of supply.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <KitItemsTable />
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>

//         {/* Footer */}
//         <div className="text-center text-sm text-gray-500 border-t pt-8">
//           <p>All prices are subject to change. Contact us for the latest pricing and availability.</p>
//         </div>
//       </div>
//     </div>
//   )
// }




import Reliance_Price_Data from "@/assets/reliance"
export default function Page() {
 
  return <Reliance_Price_Data />
}