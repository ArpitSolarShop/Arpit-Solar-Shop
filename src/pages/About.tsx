import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sun, 
  Zap, 
  Leaf, 
  Users, 
  Award, 
  Target,
  Eye,
  Heart,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const solarBenefits = [
    {
      icon: Leaf,
      title: "Environmental Benefits",
      description: "Solar energy produces zero emissions, helping combat climate change and reduce pollution."
    },
    {
      icon: Zap,
      title: "Energy Independence",
      description: "Generate your own clean electricity and reduce dependence on the grid."
    },
    {
      icon: Award,
      title: "Long-term Savings",
      description: "Solar systems pay for themselves within 3-5 years and provide 25+ years of free electricity."
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Solar Absorption",
      description: "Solar panels contain photovoltaic cells that absorb sunlight and convert it into direct current (DC) electricity."
    },
    {
      step: "2",
      title: "Power Conversion",
      description: "An inverter converts the DC electricity into alternating current (AC) electricity used by your home appliances."
    },
    {
      step: "3",
      title: "Grid Connection",
      description: "Excess electricity is fed back into the grid, and you receive credits through net metering programs."
    },
    {
      step: "4",
      title: "Monitoring",
      description: "Smart monitoring systems track energy production and consumption, optimizing system performance."
    }
  ];

  const companyValues = [
    {
      icon: Target,
      title: "Mission",
      description: "To accelerate India's transition to renewable energy by making solar accessible, affordable, and reliable for everyone."
    },
    {
      icon: Eye,
      title: "Vision",
      description: "To be India's leading solar solutions provider, powering homes and businesses with clean, sustainable energy."
    },
    {
      icon: Heart,
      title: "Values",
      description: "Integrity, innovation, sustainability, and customer-centricity drive everything we do."
    }
  ];

  const teamStats = [
    { metric: "Years Experience", value: "10+", description: "in solar industry" },
    { metric: "Certified Engineers", value: "50+", description: "expert professionals" },
    { metric: "Projects Completed", value: "5000+", description: "successful installations" },
    { metric: "Customer Satisfaction", value: "98%", description: "happy customers" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="bg-gradient-primary text-white py-16 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Solar Technology & Our Company
              </h1>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Discover the power of solar energy and learn about our mission to 
                transform India's energy landscape with sustainable solutions.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* About Solar Technology Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 text-sm font-semibold px-4 py-2">
                Solar Technology
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose Solar Energy?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Solar technology harnesses the power of the sun to generate clean, renewable electricity. 
                Here's why it's the future of energy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {solarBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <Card key={index} className="text-center border-0 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* How It Works */}
            <div className="mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
                How Solar Technology Works
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {howItWorks.map((step, index) => (
                  <div key={index} className="relative">
                    <Card className="border-0 bg-card/50 backdrop-blur-sm h-full">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                          {step.step}
                        </div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-center text-muted-foreground">
                          {step.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                    {index < howItWorks.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                        <ArrowRight className="w-6 h-6 text-primary" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Environmental Benefits */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Environmental Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">0%</div>
                  <div className="text-sm text-muted-foreground">Carbon Emissions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
                  <div className="text-sm text-muted-foreground">Years Clean Energy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">90%</div>
                  <div className="text-sm text-muted-foreground">Emission Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Renewable Source</div>
                </div>
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 text-sm font-semibold px-4 py-2">
                About Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Company
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We are India's trusted solar solutions provider, committed to delivering 
                high-quality installations and exceptional customer service.
              </p>
            </div>

            {/* Mission, Vision, Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {companyValues.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="border-0 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-muted-foreground leading-relaxed">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Team Stats */}
            <div className="bg-gradient-primary rounded-3xl p-8 text-white mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Our Team by Numbers
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {teamStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold opacity-90 mb-1">
                      {stat.metric}
                    </div>
                    <div className="text-xs opacity-75">
                      {stat.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Story */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">Our Story</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded with a vision to make solar energy accessible to every Indian household 
                    and business, we have grown from a small startup to one of India's leading 
                    solar solution providers.
                  </p>
                  <p>
                    Our journey began with a simple belief: clean energy should be affordable, 
                    reliable, and easy to adopt. Over the years, we have installed thousands of 
                    solar systems across residential, commercial, and industrial sectors.
                  </p>
                  <p>
                    Today, we continue to innovate and expand our services, always keeping our 
                    customers' needs at the center of everything we do. Our success is measured 
                    by the smiles of our satisfied customers and the positive impact we create 
                    for the environment.
                  </p>
                </div>
                <div className="mt-8">
                  <Button asChild size="lg" className="font-semibold">
                    <Link to="/contact" className="flex items-center">
                      Join Our Mission
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div>
                <Card className="border-0 bg-card/50 backdrop-blur-sm p-6">
                  <h4 className="font-semibold text-lg mb-4">Why Choose Us?</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">10+ years of industry experience</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Certified and trained professionals</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">25-year comprehensive warranty</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">24/7 customer support</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Premium quality components</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">End-to-end project management</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;