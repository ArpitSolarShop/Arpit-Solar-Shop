import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowRight, Globe } from 'lucide-react'

const Contact = () => {
  const contactInfo = {
    address: "Sh16/114-25-K2, Sarvodynagar, Kadipur, Shivpur, Varanasi (UP)-221 003",
    phone: "+91-904 4555 574",
    email: "info@arpitsolarshop.com"
  }

  const businessHours = [
    "Monday - Friday: 9:00 AM - 7:00 PM",
    "Saturday: 9:00 AM - 5:00 PM", 
    "Sunday: 10:00 AM - 4:00 PM"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 text-sm font-semibold px-4 py-2 bg-yellow-100 text-yellow-600">
              Contact Us
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-yellow-500">Get in</span>{' '}
              <span className="text-black dark:text-white">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to start your solar journey? Contact Arpit Solar Shop for all your renewable energy needs.
            </p>
          </div>

          {/* Main Contact Card - Visiting Card Style */}
          <div className="mb-12">
            <Card className="overflow-hidden shadow-2xl border-0 bg-white dark:bg-gray-800">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Side - Business Card Info */}
                <div className="p-8 lg:p-12 bg-gradient-to-br from-blue-600 to-green-600 text-white">
                  <div className="flex flex-col h-full justify-between">
                    {/* Logo and Company Name */}
                    <div className="mb-8">
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 bg-white rounded-xl p-2 mr-4">
                          <Image
                            src="/logo.png"
                            alt="Arpit Solar Shop Logo"
                            width={60}
                            height={60}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">Arpit Solar Shop</h2>
                          <p className="text-blue-100">Solar Energy Solutions</p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <MapPin className="w-6 h-6 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-1">Address</h3>
                          <p className="text-blue-100 leading-relaxed">
                            {contactInfo.address}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Phone className="w-6 h-6 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-1">Phone</h3>
                          <a 
                            href={`tel:${contactInfo.phone}`}
                            className="text-blue-100 hover:text-white transition-colors"
                          >
                            {contactInfo.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Mail className="w-6 h-6 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-1">Email</h3>
                          <a 
                            href={`mailto:${contactInfo.email}`}
                            className="text-blue-100 hover:text-white transition-colors"
                          >
                            {contactInfo.email}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 space-y-3">
                      <Button 
                        className="w-full bg-white text-blue-600 hover:bg-blue-50"
                        onClick={() => {
                          if (typeof window !== 'undefined') {
                            window.location.href = `tel:${contactInfo.phone}`;
                          }
                        }}
                      >
                        <Phone className="mr-2 w-4 h-4" />
                        Call Now
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full bg-white text-blue-600 hover:bg-blue-50 border-0"
                        onClick={() => {
                          if (typeof window !== 'undefined') {
                            window.location.href = `mailto:${contactInfo.email}?subject=Solar Energy Inquiry&body=Hello, I would like to know more about your solar energy solutions.`;
                          }
                        }}
                      >
                        <Mail className="mr-2 w-4 h-4" />
                        Send Email
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right Side - Map */}
                <div className="p-0">
                  <div className="h-full min-h-[500px] lg:min-h-[600px]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.5367708745584!2d82.94755207538691!3d25.353320777610783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2db16a9c907f%3A0xe094345c3bcc59c2!2sArpit%20Solar%20Shop!5e0!3m2!1sen!2sin!4v1754479644816!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Arpit Solar Shop Location"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Additional Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Business Hours */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold ml-3">Business Hours</h3>
                </div>
                <div className="space-y-2">
                  {businessHours.map((hour, index) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      {hour}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Quote */}
            <Card className="border-0 bg-gradient-to-br from-blue-500 to-green-500 text-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold ml-3">Get Free Quote</h3>
                </div>
                <p className="text-blue-100 mb-4 text-sm">
                  Start your solar journey with a personalized quote tailored to your needs.
                </p>
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                  <ArrowRight className="mr-2 w-4 h-4" />
                  Request Quote
                </Button>
              </CardContent>
            </Card>

            {/* Services */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold ml-3">Our Services</h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Solar Panel Installation</p>
                  <p>• Solar System Maintenance</p>
                  <p>• Energy Consultation</p>
                  <p>• 24/7 Technical Support</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Contact
