import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: "Products", href: "/products" },
    { name: "Energy", href: "/solutions/residential" },
    { name: "Commercial", href: "/solutions/commercial-industrial" },
    { name: "Services", href: "/services" },
    { name: "Support", href: "/contact" },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <>
      {/* Tesla-inspired Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center transition-transform duration-200 hover:scale-105"
            >
              <img
                src="/logo.png"
                alt="Arpit Solar"
                className="h-8 w-auto object-contain"
              />
            </Link>

            {/* Center Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                    isActivePath(item.href)
                      ? scrolled 
                        ? 'text-black' 
                        : 'text-white'
                      : scrolled
                        ? 'text-gray-700 hover:text-black'
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.name}
                  {/* Underline animation */}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    scrolled ? 'bg-black' : 'bg-white'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <Button
                asChild
                className={`px-6 py-2 text-sm font-medium transition-all duration-300 ${
                  scrolled
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-white text-black hover:bg-gray-100'
                } rounded-sm border-0`}
              >
                <Link to="/get-quote">Get Quote</Link>
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden p-2 transition-colors duration-200 ${
                  scrolled ? 'text-gray-700 hover:text-black' : 'text-white/80 hover:text-white'
                }`}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
              onClick={() => setIsOpen(false)} 
            />
            <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b">
                  <img
                    src="/logo.png"
                    alt="Arpit Solar"
                    className="h-8 w-auto object-contain"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="flex-1 p-6">
                  <div className="space-y-6">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <Button
                      asChild
                      className="w-full bg-black text-white hover:bg-gray-800 py-3"
                    >
                      <Link to="/get-quote" onClick={() => setIsOpen(false)}>
                        Get Quote
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;