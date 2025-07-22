import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  Factory, 
  Award, 
  TrendingDown, 
  Recycle, 
  Shield,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const Sustainability = () => {
  const carbonReductionStats = [
    { metric: "CO2 Reduced", value: "50,000+", unit: "tons annually" },
    { metric: "Trees Equivalent", value: "2.3M", unit: "trees planted" },
    { metric: "Homes Powered", value: "15,000+", unit: "clean energy" },
  ];

  const govSchemes = [
    {
      title: "Solar Rooftop Subsidy",
      description: "Up to 40% subsidy on residential solar installations",
      benefit: "₹18,000/kW",
      icon: Award
    },
    {
      title: "PM-KUSUM Scheme",
      description: "Support for farmers to install solar pumps and grid-connected systems",
      benefit: "90% subsidy",
      icon: Leaf
    },
    {
      title: "Net Metering",
      description: "Sell excess solar power back to the grid at attractive rates",
      benefit: "Revenue generation",
      icon: TrendingDown
    },
  ];

  const sustainability_features = [
    "100% renewable energy manufacturing",
    "Zero carbon emissions during operation",
    "Recyclable solar panels and components",
    "Sustainable packaging materials",
    "Local sourcing to reduce transportation",
    "Water-efficient manufacturing processes"
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
                Sustainable Energy for a Better Tomorrow
              </h1>
              <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
                Our commitment to sustainability goes beyond just solar panels. We're building 
                a cleaner, greener future through innovative technology and responsible practices.
              </p>
              <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                <Link to="/get-quote" className="flex items-center">
                  Start Your Green Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Carbon Reduction Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 text-sm font-semibold px-4 py-2">
                Environmental Impact
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Carbon Reduction Impact
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Every solar installation contributes to a significant reduction in carbon emissions. 
                Here's how our projects are making a difference.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {carbonReductionStats.map((stat, index) => (
                <Card key={index} className="text-center p-6 border-0 bg-card/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingDown className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-primary mb-1">
                      {stat.metric}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.unit}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 rounded-3xl p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Environmental Benefits</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>Reduces greenhouse gas emissions by up to 90%</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>Decreases dependence on fossil fuels</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>Improves local air quality</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>Conserves water resources</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-lg">
                    <Leaf className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-foreground mb-2">25+ Years</div>
                    <div className="text-muted-foreground">of clean energy production per installation</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Zero-Carbon Factory Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 text-sm font-semibold px-4 py-2">
                Manufacturing Excellence
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Zero-Carbon Manufacturing
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our manufacturing partners operate zero-carbon factories, ensuring that 
                sustainability is embedded in every step of the production process.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Card className="border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                      <Factory className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-xl">Sustainable Manufacturing</CardTitle>
                    <CardDescription>
                      Our production facilities are powered entirely by renewable energy sources
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {sustainability_features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-3xl p-8 text-white">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">100%</div>
                      <div className="text-sm opacity-90">Renewable Energy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">0%</div>
                      <div className="text-sm opacity-90">Carbon Emissions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">95%</div>
                      <div className="text-sm opacity-90">Recyclable Materials</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">50%</div>
                      <div className="text-sm opacity-90">Water Savings</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Government Schemes Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 text-sm font-semibold px-4 py-2">
                Financial Incentives
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Government Schemes & Incentives
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Take advantage of government subsidies and schemes to make your solar investment 
                more affordable while contributing to India's renewable energy goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {govSchemes.map((scheme, index) => {
                const IconComponent = scheme.icon;
                return (
                  <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                        {scheme.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {scheme.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-primary/10 rounded-lg p-4">
                        <div className="font-semibold text-primary text-lg">
                          {scheme.benefit}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Maximum benefit available
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-6">
                Ready to explore these opportunities? Our experts will help you navigate 
                the application process and maximize your savings.
              </p>
              <Button asChild size="lg" className="font-semibold px-8">
                <Link to="/contact" className="flex items-center">
                  Get Expert Guidance
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sustainability;