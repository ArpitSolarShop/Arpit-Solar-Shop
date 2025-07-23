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
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-300 hover:text-white hover:bg-white/10"
                onClick={() => window.open('https://www.facebook.com/@arpitsolar', '_blank')}
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-300 hover:text-white hover:bg-white/10"
                onClick={() => window.open('https://www.linkedin.com/in/arpit-solar-shop', '_blank')}
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-300 hover:text-white hover:bg-white/10"
                onClick={() => window.open('https://www.instagram.com/arpitsolarweb/', '_blank')}
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-300 hover:text-white hover:bg-white/10"
                onClick={() => window.open('https://in.pinterest.com/arpitsolar/', '_blank')}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12c1.018 0 2.006-.133 2.939-.379-1.339-.723-2.028-2.168-2.028-2.168s-.277-1.104-.277-2.615c0-1.53.874-2.676 1.96-2.676.926 0 1.375.695 1.375 1.528 0 .93-.593 2.322-.9 3.616-.256 1.083.544 1.966 1.613 1.966 1.938 0 3.432-2.043 3.432-4.991 0-2.612-1.878-4.439-4.555-4.439-3.103 0-4.924 2.326-4.924 4.732 0 .937.361 1.943.814 2.486.089.108.102.202.075.313-.08.336-.258 1.035-.293 1.181-.046.192-.149.233-.344.14-1.295-.603-2.106-2.494-2.106-4.016 0-3.273 2.378-6.278 6.854-6.278 3.599 0 6.398 2.565 6.398 5.996 0 3.578-2.255 6.456-5.386 6.456-1.051 0-2.041-.547-2.379-1.201 0 0-.52 1.982-.647 2.469-.234.897-.866 2.024-1.289 2.708.97.299 2 .458 3.063.458 6.626 0 12-5.374 12-12S18.626 0 12 0z"/>
                </svg>
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