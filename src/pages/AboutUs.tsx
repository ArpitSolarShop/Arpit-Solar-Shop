import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Target, 
  Eye, 
  Heart, 
  Award, 
  MapPin,
  Calendar,
  Zap,
  CheckCircle,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const companyValues = [
    {
      title: "Innovation",
      description: "Continuously adopting cutting-edge solar technologies to provide the best solutions.",
      icon: Zap
    },
    {
      title: "Quality",
      description: "Committed to delivering premium solar products with exceptional performance and durability.",
      icon: Award
    },
    {
      title: "Sustainability",
      description: "Dedicated to promoting clean energy solutions for a greener future.",
      icon: Heart
    },
    {
      title: "Customer Focus",
      description: "Prioritizing customer satisfaction through personalized service and support.",
      icon: Users
    }
  ];

  const milestones = [
    {
      year: "2015",
      title: "Company Founded",
      description: "Started with a vision to make solar energy accessible to everyone."
    },
    {
      year: "2017",
      title: "1000+ Installations",
      description: "Reached our first major milestone with over 1000 successful installations."
    },
    {
      year: "2019",
      title: "Commercial Expansion",
      description: "Expanded into commercial and industrial solar solutions."
    },
    {
      year: "2021",
      title: "Technology Partnership",
      description: "Partnered with leading solar manufacturers like Reliance, Shakti, and Tata."
    },
    {
      year: "2023",
      title: "5000+ Happy Customers",
      description: "Celebrated serving over 5000 satisfied customers across the region."
    },
    {
      year: "2024",
      title: "Sustainability Leader",
      description: "Recognized as a regional leader in renewable energy solutions."
    }
  ];

  const teamStats = [
    { number: "50+", label: "Expert Engineers", icon: Users },
    { number: "5000+", label: "Happy Customers", icon: CheckCircle },
    { number: "10+", label: "Years Experience", icon: Calendar },
    { number: "24/7", label: "Customer Support", icon: Phone }
  ];

  const certifications = [
    "ISO 9001:2015 Quality Management",
    "IEC 61215 Solar Panel Standards",
    "MNRE (Ministry of New and Renewable Energy) Approved",
    "Bureau of Indian Standards (BIS) Certified",
    "Electrical Safety Certification",
    "Environmental Management ISO 14001"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary-dark to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/reliance-facility.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 text-sm font-medium bg-white/20 text-white border-white/30">
              About Arpit Solar
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Pioneering Solar
              <span className="text-accent block">Energy Solutions</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              For over a decade, we've been at the forefront of India's renewable energy revolution, 
              delivering cutting-edge solar solutions that power progress and protect our planet.
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Mission */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl text-primary">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To democratize clean energy by making high-quality solar solutions accessible, 
                  affordable, and reliable for every home and business in India.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl text-primary">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be India's most trusted solar energy partner, leading the transition to 
                  sustainable energy while creating a cleaner future for generations to come.
                </p>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl text-primary">Our Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Based in India, serving customers nationwide with comprehensive solar solutions 
                  from residential rooftops to large-scale commercial installations.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Company Values */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our commitment to excellence and sustainable energy solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyValues.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Measurable results that showcase our commitment to excellence and customer satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {teamStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Journey */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our evolution as a leading solar energy solutions provider.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((milestone, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">{milestone.year}</Badge>
                  <CardTitle className="text-lg">{milestone.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Certifications & Standards
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our commitment to quality is backed by industry-leading certifications and standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                      <Award className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-sm font-medium">{cert}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join Our Solar Revolution?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's work together to create a sustainable future with clean, renewable solar energy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/get-quote">Get Your Quote</Link>
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

export default AboutUs;