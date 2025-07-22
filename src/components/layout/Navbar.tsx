import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navigationItems = [
    { name: "Home", href: "/" },
    {
      name: "Solution",
      dropdown: [
        { name: "Residential", href: "/solutions/residential" },
        { name: "Commercial", href: "/solutions/commercial" },
      ],
    },
    {
      name: "Product",
      dropdown: [
        { name: "Reliance Solar", href: "/products/reliance" },
        { name: "Sakti Solar", href: "/products/sakti" },
        { name: "Tata Solar", href: "/products/tata" },
      ],
    },
    { name: "Services", href: "/services" },
    { name: "Sustainability", href: "/sustainability" },
    {
      name: "About",
      dropdown: [
        { name: "About Solar Technology", href: "/about/technology" },
        { name: "About Us", href: "/about/company" },
      ],
    },
    { name: "Contact Us", href: "/contact" },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300">
      <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-3 mx-4">
        <div className="flex justify-between items-center">
          {/* Logo - Middle Left */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">
              Arpit Solar
            </span>
          </Link>

          {/* Desktop Navigation - Middle Right */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-1 text-white hover:bg-white/10 border-0 bg-transparent">
                        <span>{item.name}</span>
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 bg-black/80 backdrop-blur-lg border border-white/20 rounded-xl">
                      {item.dropdown.map((dropdownItem) => (
                        <DropdownMenuItem key={dropdownItem.name} asChild>
                          <Link
                            to={dropdownItem.href}
                            className="w-full cursor-pointer text-white hover:bg-white/10 rounded-lg"
                          >
                            {dropdownItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isActivePath(item.href)
                        ? "text-solar-orange"
                        : "text-white hover:text-solar-orange"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Right Side - CTA & Theme Toggle */}
            <div className="flex items-center space-x-3 ml-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="w-9 h-9 text-white hover:bg-white/10 border-0 bg-transparent"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button asChild className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 rounded-xl">
                <Link to="/get-quote">Get Quote</Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 text-white hover:bg-white/10 border-0 bg-transparent"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-black/80 backdrop-blur-lg border border-white/20 rounded-2xl mx-4 mt-2">
          <div className="px-4 pt-4 pb-4 space-y-2">
            {navigationItems.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-sm font-medium text-white">
                      {item.name}
                    </div>
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        to={dropdownItem.href}
                        className="block px-6 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/10"
                        onClick={() => setIsOpen(false)}
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                      isActivePath(item.href)
                        ? "text-solar-orange bg-white/10"
                        : "text-white hover:text-solar-orange hover:bg-white/10"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="border-t border-white/20 pt-4 mt-4 space-y-2">
              <Button
                variant="ghost"
                onClick={toggleDarkMode}
                className="w-full justify-start text-white hover:bg-white/10 border-0 bg-transparent"
              >
                {darkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </Button>
              <Button asChild className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-xl">
                <Link to="/get-quote" onClick={() => setIsOpen(false)}>
                  Get Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;