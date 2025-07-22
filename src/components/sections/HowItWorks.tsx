import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Ruler, 
  Wrench, 
  BarChart3,
  ArrowRight
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: MessageCircle,
      title: "Consultation",
      description: "Our solar experts visit your location for a free consultation and energy assessment."
    },
    {
      step: "02",
      icon: Ruler,
      title: "Custom Design",
      description: "We create a tailored solar system design based on your energy needs and roof specifications."
    },
    {
      step: "03",
      icon: Wrench,
      title: "Professional Installation",
      description: "Our certified technicians install your solar system with precision and quality assurance."
    },
    {
      step: "04",
      icon: BarChart3,
      title: "Monitoring & Support",
      description: "Enjoy 24/7 system monitoring and comprehensive support throughout the system's lifetime."
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 text-sm font-semibold px-4 py-2">
            Simple Process
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From consultation to installation, we make your solar journey seamless and hassle-free
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                <Card className="border-0 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 h-full">
                  <CardHeader className="text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-solar-orange text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-3">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-muted-foreground leading-relaxed">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
                
                {/* Arrow connecting to next step */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 bg-white dark:bg-card rounded-full flex items-center justify-center shadow-lg">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Ready to start your solar journey?
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-primary/10 rounded-full">
            <span className="text-primary font-semibold mr-2">Average Installation Time:</span>
            <span className="text-foreground font-bold">1-2 Days</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;