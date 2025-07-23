import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Globe, Factory, TrendingUp, Award, Target, Quote, MessageSquare } from "lucide-react";
import RelianceQuoteForm from "@/components/forms/RelianceQuoteForm";
import RelianceDataTables from "@/components/sections/RelianceDataTables";

// Import generated images
import relianceHero from "@/assets/reliance-hero.jpg";
import hjtTechnology from "@/assets/hjt-technology.jpg";
import nexwafeTechnology from "@/assets/nexwafe-technology.jpg";
import relianceFacility from "@/assets/reliance-facility.jpg";

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
                className="bg-transparent border-2 border-[#BFA161] text-[#BFA161] hover:bg-[#BFA161]/10 shadow-xl backdrop-blur-sm group"
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
      <section className="py-20 reliance-bg-alt animate-on-scroll">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 reliance-text">Strategic Achievements</h2>
            <p className="text-xl reliance-body-text max-w-3xl mx-auto">
              Three transformative investments that position Reliance at the forefront of global solar technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* NexWafe Investment */}
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 reliance-hover bg-white border reliance-border">
              <CardHeader>
                <div className="w-12 h-12 reliance-bg-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl group-hover:reliance-primary transition-colors reliance-text">
                  €25M NexWafe Investment
                </CardTitle>
                <CardDescription className="reliance-body-text">Revolutionary Green Solar Wafer Technology</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={nexwafeTechnology} 
                    alt="NexWafe Technology" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-sm reliance-body-text mb-4">
                  Kerf-free wafer manufacturing eliminates 40% silicon waste, dramatically reducing costs and environmental impact.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">No Kerf Waste</Badge>
                  <Badge variant="secondary">Cost Reduction</Badge>
                  <Badge variant="secondary">Green Tech</Badge>
                </div>
              </CardContent>
            </Card>

            {/* REC Solar Acquisition */}
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 reliance-hover bg-white border reliance-border">
              <CardHeader>
                <div className="w-12 h-12 reliance-bg-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl group-hover:reliance-primary transition-colors reliance-text">
                  $771M REC Solar Acquisition
                </CardTitle>
                <CardDescription className="reliance-body-text">World-Class HJT Technology & Global Brand</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={hjtTechnology} 
                    alt="HJT Technology" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-sm reliance-body-text mb-4">
                  Advanced Heterojunction Technology delivers superior efficiency and performance in REC's Alpha series panels.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">HJT Technology</Badge>
                  <Badge variant="secondary">Global Brand</Badge>
                  <Badge variant="secondary">Tier-1 Panels</Badge>
                </div>
              </CardContent>
            </Card>

            {/* PLI Scheme */}
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 reliance-hover bg-white border reliance-border">
              <CardHeader>
                <div className="w-12 h-12 reliance-bg-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Factory className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl group-hover:reliance-primary transition-colors reliance-text">
                  4GW Integrated Facility
                </CardTitle>
                <CardDescription className="reliance-body-text">IREDA PLI Scheme Manufacturing Hub</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={relianceFacility} 
                    alt="Reliance Facility" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-sm reliance-body-text mb-4">
                  End-to-end solar manufacturing from polysilicon to finished modules at Jamnagar Green Energy Complex.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">4GW Capacity</Badge>
                  <Badge variant="secondary">Vertical Integration</Badge>
                  <Badge variant="secondary">PLI Support</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* HJT Technology Deep Dive */}
      <section className="py-20 reliance-bg animate-on-scroll">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-[#BFA161] text-white border-transparent">
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

              <Button size="lg" className="bg-transparent border-2 border-[#BFA161] text-[#BFA161] hover:bg-[#BFA161]/10">
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
            <Badge className="mb-4 bg-[#BFA161] text-white border-transparent">
              Product Catalog
            </Badge>
            <h2 className="text-4xl font-bold mb-4 reliance-text">Reliance Solar System Configurations</h2>
            <p className="text-xl reliance-body-text max-w-3xl mx-auto">
              Choose from our comprehensive range of HJT and standard modules with competitive pricing
            </p>
          </div>

          {/* Use the new TanStack Table and Material UI data tables */}
          <RelianceDataTables />

          {/* Additional Products & Services */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* DC Cables */}
            <Card className="bg-white reliance-border border">
              <CardHeader>
                <CardTitle className="text-xl reliance-text">DC Cables - Bulk Supply</CardTitle>
                <CardDescription className="reliance-body-text">High-quality insulated DC cables</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold reliance-text">DC Cable (500m)</div>
                      <div className="text-sm reliance-body-text">Insulated cable per meter</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold reliance-primary">₹46.67/m</div>
                      <div className="text-sm text-gray-600">₹23,333 total</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Kit Items */}
            <Card className="bg-white reliance-border border">
              <CardHeader>
                <CardTitle className="text-xl reliance-text">Complete Kit Includes</CardTitle>
                <CardDescription className="reliance-body-text">Everything you need for installation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 reliance-bg-primary rounded-full"></div>
                    <span className="reliance-body-text">RIL 690-720 Wp Silicon Modules</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 reliance-bg-primary rounded-full"></div>
                    <span className="reliance-body-text">String Inverter (System Size Specific)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 reliance-bg-primary rounded-full"></div>
                    <span className="reliance-body-text">ACDB IP65 Protected with MCB 4P</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 reliance-bg-primary rounded-full"></div>
                    <span className="reliance-body-text">MC4 Connectors (Male & Female)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 reliance-bg-primary rounded-full"></div>
                    <span className="reliance-body-text">Signal Device</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 reliance-bg-primary rounded-full"></div>
                    <span className="reliance-body-text">Network Device (5 Year Data Plan)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 reliance-bg-primary rounded-full"></div>
                    <span className="reliance-body-text">MMS (Monitoring & Management)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={() => setQuoteFormOpen(true)}
              className="bg-transparent border-2 border-[#BFA161] text-[#BFA161] hover:bg-[#BFA161]/10 shadow-lg"
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
              className="bg-white text-[#BFA161] hover:bg-white/90 font-semibold shadow-lg group border-2 border-[#BFA161]"
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
            <div className="w-24 h-1 bg-[#BFA161] mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6 text-sm leading-relaxed">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-[#BFA161] font-bold min-w-[2rem]">1.</span>
                  <p>This pricing is effective from 22 May 2025 to 30th June 2025 subject, to material availability.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-[#BFA161] font-bold min-w-[2rem]">2.</span>
                  <p>All prices are subject to change without notice and are not guaranteed, except that prices for an order that have been accepted by RIL</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-[#BFA161] font-bold min-w-[2rem]">3.</span>
                  <p>Published prices are basic and are exclusive of taxes. Goods and Services Tax (GST) as applicable will be extra.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-[#BFA161] font-bold min-w-[2rem]">4.</span>
                  <p>Above prices are Ex-Work prices</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-[#BFA161] font-bold min-w-[2rem]">5.</span>
                  <p>Full payment (100%) is required in advance upon placing the order.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-[#BFA161] font-bold min-w-[2rem]">7.</span>
                  <p>Orders to be placed on specified Purchase Order template issued by RIL in favour of Reliance Industries Limited.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-[#BFA161] font-bold min-w-[2rem]">8.</span>
                  <p>NDCR Modules supplied will have a capacity of 690-720 Wp subject to availability.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-[#BFA161] font-bold min-w-[2rem]">9.</span>
                  <p>Delivery of material will occur within approx. 5 weeks on receipt of accepted purchase order and full payment, depending on distance and availability of material.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-[#BFA161] font-bold min-w-[2rem]">10.</span>
                  <p>Materials not supplied directly by RIL must be sourced from approved manufacturers and specifications as shared by Ril...</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-[#BFA161] font-bold min-w-[2rem]">11.</span>
                  <p>Warranty terms and conditions as specified in the warranty certificate issued on QA check.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-[#BFA161] font-bold min-w-[2rem]">12.</span>
                  <p>Before installation of the system at the customer premises, site survey form, site layout and array layout supported with photographs must be approved by RIL.. Any modifications/changes suggested by RIL, shall have to be followed and implemented mandatorily, without which warranty certificate will not be applicable.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-[#BFA161] font-bold min-w-[2rem]">13.</span>
                  <div>
                    <p className="mb-2">Installation and commissioning of the system are the responsibility of the Channel Partner, following RIL guidelines. All installed systems must be offered for RIL. quality inspection for issuing the warranty certification with the specified completed installation & commissioning checklist and photographs.</p>
                    <p className="italic">Proper personal protective equipment (PPE) and safety protocols must be followed during installation.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-[#BFA161] font-bold min-w-[2rem]">14.</span>
                  <p>All site-related activities, including net metering and DISCOM synchronization approvals, are the responsibility of the Channel Partners.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-[#BFA161] font-bold min-w-[2rem]">15.</span>
                  <p>Cancellation of any previous orders will attract 2% of Purchase order value.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-[#BFA161] font-bold min-w-[2rem]">16.</span>
                  <p>Any information, suggestions, or ideas transmitted by RIL connection with this price list a secret or confidential or submitted in confidence to Channel Partner, except as may be specifically agreed to in writing by Channel Partner.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-[#BFA161] font-bold min-w-[2rem]">17.</span>
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