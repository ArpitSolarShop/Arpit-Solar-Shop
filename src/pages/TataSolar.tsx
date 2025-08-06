import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Bell, 
  Star, 
  Zap, 
  Shield, 
  Award,
  ArrowRight,
  Mail
} from "lucide-react";
import { Link } from "react-router-dom";

const TataSolar = () => {
  const comingSoonFeatures = [
    {
      icon: Zap,
      title: "High Efficiency Panels",
      description: "Advanced solar technology with industry-leading efficiency ratings"
    },
    {
      icon: Shield,
      title: "25-Year Warranty",
      description: "Comprehensive warranty coverage for long-term peace of mind"
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Tata's trusted brand quality and reliability standards"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary/90 to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[url('/Tata%20Power%20Solar.png')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 text-sm font-medium bg-white/20 text-white border-white/30">
              <Clock className="w-4 h-4 mr-2" />
              Coming Soon
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6">
              Tata Solar
              <span className="text-accent block">Power Solutions</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed px-4">
              Get ready for premium solar solutions from India's most trusted brand. 
              Tata Solar is coming soon with cutting-edge technology and reliability you can count on.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/contact">Notify Me When Available</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/products">View Other Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What to Expect
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tata Solar will bring you the latest in solar technology with the trust and reliability of the Tata brand.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {comingSoonFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stay Tuned Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Bell className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Stay Tuned!
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We're working hard to bring you the best Tata Solar solutions. 
              Our team is finalizing partnerships and preparing to offer you 
              premium solar products with unmatched quality and service.
            </p>
            
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-yellow-500 mr-2" />
                  <span className="font-semibold text-lg">Be the First to Know</span>
                </div>
                <p className="text-muted-foreground mb-6">
                  Subscribe to get notified when Tata Solar products become available. 
                  Early subscribers will get exclusive access to special launch offers.
                </p>
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link to="/contact" className="flex items-center justify-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Get Notified
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Alternative Options */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Available Now
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              While you wait for Tata Solar, explore our other premium solar solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <img 
                  src="/reliance-industries-ltd.png" 
                  alt="Reliance Solar" 
                  className="w-20 h-20 object-contain mx-auto mb-4"
                />
                <CardTitle className="text-xl">Reliance Solar</CardTitle>
                <Badge variant="secondary" className="w-fit mx-auto">
                  Recommended for Commercial
                </Badge>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mb-4">
                  Leading renewable energy solutions with cutting-edge technology
                </CardDescription>
                <Button asChild className="w-full">
                  <Link to="/reliance">
                    Explore Reliance Solar
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <img 
                  src="/Shakti%20Solar.png" 
                  alt="Shakti Solar" 
                  className="w-20 h-20 object-contain mx-auto mb-4"
                />
                <CardTitle className="text-xl">Shakti Solar</CardTitle>
                <Badge variant="secondary" className="w-fit mx-auto">
                  Recommended for Residential
                </Badge>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mb-4">
                  Innovative solar solutions perfect for residential installations
                </CardDescription>
                <Button asChild className="w-full">
                  <Link to="/shakti-solar">
                    Explore Shakti Solar
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Questions About Solar Solutions?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our solar experts are here to help you choose the right solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/get-quote">Get Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TataSolar;