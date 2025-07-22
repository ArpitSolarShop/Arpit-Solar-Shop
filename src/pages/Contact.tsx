import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: [
        "Arpit Solar Shop",
        "123 Green Energy Park",
        "Sector 45, Gurgaon",
        "Haryana 122003, India"
      ]
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        "+91 98765 43210",
        "+91 87654 32109",
        "Toll Free: 1800-123-SOLAR"
      ]
    },
    {
      icon: Mail,
      title: "Email Address",
      details: [
        "info@arpitsolar.com",
        "sales@arpitsolar.com",
        "support@arpitsolar.com"
      ]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 7:00 PM",
        "Saturday: 9:00 AM - 5:00 PM",
        "Sunday: 10:00 AM - 4:00 PM",
        "Emergency Support: 24/7"
      ]
    }
  ];

  const quickActions = [
    {
      title: "Get Free Quote",
      description: "Start your solar journey with a personalized quote",
      link: "/get-quote",
      icon: ArrowRight,
      primary: true
    },
    {
      title: "Schedule Consultation",
      description: "Book a free on-site consultation with our experts",
      link: "/get-quote",
      icon: MessageCircle,
      primary: false
    }
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
                Get in Touch
              </h1>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Ready to start your solar journey? Our team is here to help you 
                with all your solar energy needs. Contact us today!
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Actions */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Card 
                    key={index} 
                    className={`group hover:shadow-xl transition-all duration-300 cursor-pointer ${
                      action.primary 
                        ? 'border-primary/50 bg-primary/5' 
                        : 'border-0 bg-card/50 backdrop-blur-sm'
                    }`}
                  >
                    <Link to={action.link}>
                      <CardHeader className="text-center">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${
                          action.primary 
                            ? 'bg-primary text-white' 
                            : 'bg-gradient-primary text-white'
                        }`}>
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                          {action.title}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {action.description}
                        </CardDescription>
                      </CardHeader>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 text-sm font-semibold px-4 py-2">
                Contact Information
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Reach Out to Us
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Multiple ways to connect with our solar experts. Choose what works best for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <Card key={index} className="border-0 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <CardHeader className="text-center pb-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{info.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-sm text-muted-foreground text-center">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Map Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Find Us on the Map
              </h3>
              <p className="text-muted-foreground">
                Visit our showroom to see our solar products and meet our team
              </p>
            </div>

            <div className="bg-muted rounded-3xl overflow-hidden">
              <div className="aspect-video flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.525258341956!2d77.06889731455052!3d28.457523999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18f2b3d3a3ab%3A0x8b1f1f1f1f1f1f1f!2sSector%2045%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Arpit Solar Shop Location"
                  className="rounded-3xl"
                />
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/10 dark:to-green-900/10 rounded-3xl p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Need Immediate Assistance?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  For urgent solar system issues or emergency support, 
                  our technical team is available 24/7 to help you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="font-semibold px-8"
                    onClick={() => window.open('tel:+919876543210')}
                  >
                    <Phone className="mr-2 w-5 h-5" />
                    Call Emergency Support
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="font-semibold px-8"
                    onClick={() => window.open('mailto:support@arpitsolar.com')}
                  >
                    <Mail className="mr-2 w-5 h-5" />
                    Send Email
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;