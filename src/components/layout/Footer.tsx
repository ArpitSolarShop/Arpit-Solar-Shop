import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sun, MapPin, Phone, Mail, Facebook, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-solar-navy text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 sunset-gradient rounded-lg flex items-center justify-center">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">Arpit Solar</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Leading the transition to clean, renewable energy with cutting-edge solar solutions. 
              Powering homes and businesses across India with sustainable energy.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Instagram className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about/company" },
                { name: "Solar Technology", href: "/about/technology" },
                { name: "Products", href: "/products" },
                { name: "Services", href: "/services" },
                { name: "Sustainability", href: "/sustainability" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-solar-orange transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Solutions</h3>
            <ul className="space-y-2">
              {[
                { name: "Residential Solar", href: "/solutions/residential" },
                { name: "Commercial Solar", href: "/solutions/commercial" },
                { name: "Industrial Solar", href: "/solutions/industrial" },
                { name: "Utility Scale", href: "/solutions/utility" },
                { name: "BIPV Solutions", href: "/solutions/bipv" },
                { name: "Solar Maintenance", href: "/support" },
              ].map((solution) => (
                <li key={solution.name}>
                  <Link
                    to={solution.href}
                    className="text-gray-300 hover:text-solar-orange transition-colors duration-200 text-sm"
                  >
                    {solution.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get In Touch</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-solar-orange mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  123 Solar Street, Green Energy Complex<br />
                  New Delhi, India 110001
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-solar-orange flex-shrink-0" />
                <p className="text-gray-300 text-sm">+91 98765 43210</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-solar-orange flex-shrink-0" />
                <p className="text-gray-300 text-sm">info@arpitsolar.com</p>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-sm font-semibold mb-2">Subscribe to Newsletter</h4>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-sm"
                />
                <Button size="sm" className="sunset-gradient text-white font-medium">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-solar-navy/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Arpit Solar Shop. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-solar-orange text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-solar-orange text-sm transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-solar-orange text-sm transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;