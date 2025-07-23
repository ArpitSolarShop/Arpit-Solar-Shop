import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Globe, Factory, TrendingUp, Award, Target, Quote, MessageSquare } from "lucide-react";
import RelianceQuoteForm from "@/components/forms/RelianceQuoteForm";

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
            <Badge className="mb-4 bg-primary/20 text-white border-white/20 hover:bg-primary/30">
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
                className="bg-primary hover:bg-primary/90 text-white shadow-xl border border-white/20 backdrop-blur-sm group"
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

              <Button size="lg" className="reliance-bg-primary hover:opacity-90 text-white">
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
              className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg group border-2 border-transparent hover:border-white/20"
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

      <Footer />
      
      {/* Quote Form Modal */}
      <RelianceQuoteForm open={quoteFormOpen} onOpenChange={setQuoteFormOpen} />
    </div>
  );
};

export default Reliance;