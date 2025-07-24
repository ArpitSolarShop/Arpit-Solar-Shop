import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sun, 
  Zap, 
  Leaf, 
  TrendingUp, 
  Shield, 
  Lightbulb,
  Battery,
  Home,
  Factory,
  Recycle
} from "lucide-react";

const AboutSolarTechnology = () => {
  const solarTechnologies = [
    {
      title: "Photovoltaic (PV) Technology",
      description: "Converting sunlight directly into electricity using semiconductor materials",
      icon: Sun,
      features: ["Silicon-based cells", "High efficiency rates", "25+ year lifespan"]
    },
    {
      title: "Monocrystalline Solar Panels",
      description: "Premium efficiency panels made from single crystal silicon",
      icon: Zap,
      features: ["20-22% efficiency", "Space-efficient", "Better performance in low light"]
    },
    {
      title: "Polycrystalline Solar Panels",
      description: "Cost-effective panels made from multiple silicon crystals",
      icon: Shield,
      features: ["15-17% efficiency", "Budget-friendly", "Reliable performance"]
    },
    {
      title: "Thin-Film Technology",
      description: "Lightweight and flexible solar panels for diverse applications",
      icon: Lightbulb,
      features: ["Flexible design", "Lower cost", "Better heat tolerance"]
    }
  ];

  const benefits = [
    {
      title: "Environmental Benefits",
      icon: Leaf,
      points: [
        "Zero greenhouse gas emissions during operation",
        "Reduces dependence on fossil fuels",
        "No air or water pollution",
        "Contributes to cleaner air quality"
      ]
    },
    {
      title: "Economic Advantages",
      icon: TrendingUp,
      points: [
        "Significant reduction in electricity bills",
        "Government incentives and tax benefits",
        "Increases property value",
        "Job creation in green energy sector"
      ]
    },
    {
      title: "Energy Independence",
      icon: Battery,
      points: [
        "Reduces reliance on grid electricity",
        "Protection against rising energy costs",
        "Energy storage solutions available",
        "Predictable energy costs for decades"
      ]
    }
  ];

  const applications = [
    {
      title: "Residential Solar",
      description: "Rooftop installations for homes and apartments",
      icon: Home,
      features: ["Reduced electricity bills", "Net metering benefits", "Increased home value"]
    },
    {
      title: "Commercial & Industrial",
      description: "Large-scale installations for businesses and factories",
      icon: Factory,
      features: ["Lower operational costs", "Corporate sustainability goals", "Tax incentives"]
    },
    {
      title: "Utility-Scale Projects",
      description: "Massive solar farms feeding into the power grid",
      icon: Recycle,
      features: ["Grid stability", "Renewable energy targets", "Clean power generation"]
    }
  ];

  const futureInnovations = [
    "Perovskite solar cells with higher efficiency",
    "Bifacial panels capturing light from both sides",
    "Floating solar farms on water bodies",
    "Building-integrated photovoltaics (BIPV)",
    "Solar paint and transparent solar cells",
    "AI-powered solar tracking systems"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary-dark to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/hero-solar-house.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 text-sm font-medium bg-white/20 text-white border-white/30">
              Solar Technology Innovation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              The Science Behind
              <span className="text-accent block">Solar Energy</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Discover how photovoltaic technology transforms sunlight into clean, renewable electricity 
              powering homes and businesses worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Solar Technologies Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Solar Technologies We Use
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced photovoltaic technologies designed for maximum efficiency and reliability.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solarTechnologies.map((tech, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <tech.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tech.title}</CardTitle>
                  <CardDescription>{tech.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tech.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Solar Energy?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Solar technology offers comprehensive benefits for the environment, economy, and energy security.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {benefit.points.map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 mt-2"></div>
                        <span className="text-sm text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Solar Applications
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From residential rooftops to utility-scale installations, solar technology adapts to every need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {applications.map((app, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <app.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{app.title}</CardTitle>
                  <CardDescription>{app.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {app.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Future Innovations Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Future of Solar Technology
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Exciting innovations that will shape the next generation of solar energy solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureInnovations.map((innovation, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Lightbulb className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">{innovation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutSolarTechnology;