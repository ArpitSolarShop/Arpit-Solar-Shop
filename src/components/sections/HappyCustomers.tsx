import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Star, Quote, Camera } from "lucide-react";
import { Link } from "react-router-dom";

interface Testimonial {
  id: string;
  customer_name: string;
  feedback: string;
  project_id: string | null;
}

const HappyCustomers = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .limit(6)
        .order('customer_name');

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.max(1, testimonials.length - 2));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, testimonials.length - 3) : prevIndex - 1
    );
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  // Generate star ratings
  const generateStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ));
  };

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-xl">Loading testimonials...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 text-sm font-semibold px-4 py-2">
            Customer Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Happy Customers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Read what our customers say about their solar journey with us
          </p>
        </div>

        {testimonials.length > 0 ? (
          <>
            {/* Testimonials Carousel */}
            <div className="relative mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {visibleTestimonials.map((testimonial, index) => (
                  <Card 
                    key={testimonial.id} 
                    className="group hover:shadow-xl transition-all duration-500 border-0 bg-card/50 backdrop-blur-sm relative overflow-hidden"
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <CardContent className="p-8">
                      {/* Quote icon */}
                      <div className="absolute top-4 right-4 opacity-20">
                        <Quote className="w-8 h-8 text-primary" />
                      </div>
                      
                      {/* Star Rating */}
                      <div className="flex mb-4">
                        {generateStars()}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-4">
                        "{testimonial.feedback}"
                      </p>

                      {/* Customer Name */}
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                          {testimonial.customer_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">
                            {testimonial.customer_name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Verified Customer
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Navigation Buttons */}
              {testimonials.length > 3 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white dark:bg-card shadow-lg hover:shadow-xl z-10"
                    onClick={prevTestimonial}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white dark:bg-card shadow-lg hover:shadow-xl z-10"
                    onClick={nextTestimonial}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            {/* Project Gallery CTA */}
            <div className="bg-gradient-primary rounded-3xl p-8 md:p-12 text-center text-white">
              <div className="mb-8">
                <Camera className="w-16 h-16 mx-auto mb-4 opacity-90" />
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  See Our Work in Action
                </h3>
                <p className="text-xl opacity-90 max-w-2xl mx-auto">
                  Explore our comprehensive project gallery featuring installations 
                  across residential, commercial, and industrial sectors
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-sm opacity-90">Residential Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">200+</div>
                  <div className="text-sm opacity-90">Commercial Installations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">100+</div>
                  <div className="text-sm opacity-90">Industrial Solutions</div>
                </div>
              </div>

              <Button 
                asChild 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8"
              >
                <Link to="/gallery" className="flex items-center">
                  <Camera className="mr-2 w-5 h-5" />
                  View Our Project Gallery
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No testimonials found. Check back soon for customer reviews!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HappyCustomers;