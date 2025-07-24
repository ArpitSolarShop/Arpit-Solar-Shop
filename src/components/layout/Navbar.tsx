import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  ShoppingCart,
  Hammer,
  Leaf,
  Info,
  Phone,
  PackageCheck,
  Facebook,
  Linkedin,
  Instagram,
  Home,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const navigationItems = [
    { name: "Home", icon: Home, href: "/" },
    {
      name: "Solutions",
      icon: PackageCheck,
      dropdown: [
        { name: "Residential", href: "/solutions/residential" },
        { name: "Commercial/Industrial", href: "/solutions/commercial-industrial" },
      ],
    },
    {
      name: "Products",
      icon: ShoppingCart,
      href: "/products",
      dropdown: [
        { 
          name: "Reliance Solar", 
          href: "/reliance", 
          image: "/reliance-industries-ltd.png",
          description: "Leading renewable energy solutions"
        },
        { 
          name: "Shakti Solar", 
          href: "/products?company=shakti", 
          image: "/Shakti%20Solar.png",
          description: "Innovative solar solutions"
        },
        { 
          name: "Tata Solar", 
          href: "/products?company=tata", 
          image: "/Tata%20Power%20Solar.png",
          description: "Trusted solar power systems"
        },
      ],
    },
    { name: "Services", icon: Hammer, href: "/services" },
    { name: "Sustainability", icon: Leaf, href: "/sustainability" },
    {
      name: "About",
      icon: Info,
      href: "/about"
    },
    { name: "Contact", icon: Phone, href: "/contact" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/@arpitsolar" },
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/arpit-solar-shop" },
    { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/arpitsolarweb/" },
    { 
      name: "Pinterest", 
      icon: () => (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12c1.018 0 2.006-.133 2.939-.379-1.339-.723-2.028-2.168-2.028-2.168s-.277-1.104-.277-2.615c0-1.53.874-2.676 1.96-2.676.926 0 1.375.695 1.375 1.528 0 .93-.593 2.322-.9 3.616-.256 1.083.544 1.966 1.613 1.966 1.938 0 3.432-2.043 3.432-4.991 0-2.612-1.878-4.439-4.555-4.439-3.103 0-4.924 2.326-4.924 4.732 0 .937.361 1.943.814 2.486.089.108.102.202.075.313-.08.336-.258 1.035-.293 1.181-.046.192-.149.233-.344.14-1.295-.603-2.106-2.494-2.106-4.016 0-3.273 2.378-6.278 6.854-6.278 3.599 0 6.398 2.565 6.398 5.996 0 3.578-2.255 6.456-5.386 6.456-1.051 0-2.041-.547-2.379-1.201 0 0-.52 1.982-.647 2.469-.234.897-.866 2.024-1.289 2.708.97.299 2 .458 3.063.458 6.626 0 12-5.374 12-12S18.626 0 12 0z"/>
        </svg>
      ), 
      url: "https://in.pinterest.com/arpitsolar/" 
    },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <>
      {/* Main Navigation */}
      <div className={`fixed ${scrolled ? 'top-0' : 'top-4'} left-0 right-0 z-50 transition-all duration-300`}>
        <div className="flex items-center justify-center px-4">
          <div className="flex items-center gap-x-4 w-full max-w-7xl">
            {/* Logo */}
            <Link
              to="/"
              className={`bg-white/20 backdrop-blur-md border border-white/20 rounded-full p-2 transition-all duration-300 hover:bg-white/30 ${
                scrolled ? 'scale-90' : 'scale-100'
              }`}
            >
              <img
                src="/logo.png"
                alt="Arpit Solar Logo"
                className="w-12 h-12 object-contain rounded-full"
              />
            </Link>

            {/* Navigation Bar */}
            <nav className="flex-1">
              <div className={`bg-black/20 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3 shadow-xl transition-all duration-300 ${
                scrolled ? 'bg-black/40' : 'bg-black/20'
              }`}>
                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {navigationItems.map((item) => (
                      <div key={item.name}>
                        {item.dropdown ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="flex items-center text-white hover:bg-white/10 space-x-1 px-4 py-2 rounded-full transition-all duration-200"
                              >
                                {item.icon && <item.icon className="w-4 h-4 mr-1" />}
                                <span className="text-sm font-medium">{item.name}</span>
                                <ChevronDown className="w-4 h-4 ml-1" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent 
                              className="w-96 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl mt-2 p-4"
                              sideOffset={5}
                            >
                              {item.name === "Products" ? (
                                <div className="grid grid-cols-3 gap-4">
                                  {item.dropdown.map((dropdownItem) => (
                                    <DropdownMenuItem key={dropdownItem.name} asChild className="p-0">
                                      <Link
                                        to={dropdownItem.href}
                                        className="flex flex-col items-center gap-3 p-4 cursor-pointer hover:bg-primary/10 rounded-lg transition-colors duration-200 border border-transparent hover:border-primary/20 group"
                                      >
                                        <div className="w-20 h-20 bg-white rounded-lg p-2 shadow-sm group-hover:shadow-md transition-shadow duration-200">
                                          <img
                                            src={dropdownItem.image}
                                            alt={dropdownItem.name}
                                            className="w-full h-full object-contain"
                                          />
                                        </div>
                                        <div className="text-center">
                                          <div className="text-sm font-medium text-foreground">{dropdownItem.name}</div>
                                        </div>
                                      </Link>
                                    </DropdownMenuItem>
                                  ))}
                                </div>
                              ) : (
                                item.dropdown.map((dropdownItem) => (
                                  <DropdownMenuItem key={dropdownItem.name} asChild className="p-0">
                                    <Link
                                      to={dropdownItem.href}
                                      className="flex items-center gap-3 w-full cursor-pointer hover:bg-primary/10 rounded-lg p-3 transition-colors duration-200 border border-transparent hover:border-primary/20"
                                    >
                                      {dropdownItem.icon && (
                                        <div className="text-xl">{dropdownItem.icon}</div>
                                      )}
                                      <div className="flex-1">
                                        <div className="text-sm font-medium text-foreground">{dropdownItem.name}</div>
                                      </div>
                                    </Link>
                                  </DropdownMenuItem>
                                ))
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <Link
                            to={item.href}
                            className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                              isActivePath(item.href)
                                ? "text-primary bg-white/10"
                                : "text-white hover:text-primary hover:bg-white/10"
                            }`}
                          >
                            {item.icon && <item.icon className="w-4 h-4" />}
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Right Side Actions */}
                  <div className="flex items-center space-x-2">
                    {/* Social Media Icons */}
                    <div className="hidden md:flex items-center space-x-1 mr-2">
                      {socialLinks.map((social) => {
                        const IconComponent = social.icon;
                        return (
                          <Button
                            key={social.name}
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-white/80 hover:text-white hover:bg-white/10"
                            onClick={() => window.open(social.url, '_blank')}
                            aria-label={`Visit our ${social.name} page`}
                          >
                            <IconComponent />
                          </Button>
                        );
                      })}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleDarkMode}
                      className="w-9 h-9 text-white hover:bg-white/10 bg-transparent transition-all duration-200"
                      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                    >
                      {darkMode ? (
                        <Sun className="w-4 h-4" />
                      ) : (
                        <Moon className="w-4 h-4" />
                      )}
                    </Button>
                    
                    <Button
                      asChild
                      className="bg-gradient-primary text-white font-semibold hover:scale-105 rounded-full px-6 transition-all duration-200 shadow-lg"
                    >
                      <Link to="/get-quote">Get Quote</Link>
                    </Button>
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden flex items-center justify-between">
                  <span className="text-white font-semibold text-lg">Menu</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-9 h-9 text-white hover:bg-white/10 bg-transparent transition-all duration-200"
                    aria-label="Toggle mobile menu"
                  >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </Button>
                </div>
              </div>

              {/* Mobile Menu Panel */}
              {isOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 mt-2 mx-2">
                  <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl overflow-hidden">
                    <div className="px-4 pt-4 pb-4 space-y-2">
                      {navigationItems.map((item) => (
                        <div key={item.name}>
                          {item.dropdown ? (
                            <div className="space-y-1">
                              <div className="px-3 py-2 text-sm font-semibold text-foreground flex items-center gap-2">
                                {item.icon && <item.icon className="w-4 h-4" />}
                                {item.name}
                              </div>
                              {item.name === "Products" ? (
                                <div className="grid grid-cols-3 gap-3 px-3 py-3">
                                  {item.dropdown.map((dropdownItem) => (
                                    <Link
                                      key={dropdownItem.name}
                                      to={dropdownItem.href}
                                      className="flex flex-col items-center gap-2 p-3 cursor-pointer hover:bg-muted transition-colors duration-200 rounded-lg border border-transparent hover:border-primary/20"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      <div className="w-16 h-16 bg-white rounded-lg p-2 shadow-sm">
                                        <img
                                          src={dropdownItem.image}
                                          alt={dropdownItem.name}
                                          className="w-full h-full object-contain"
                                        />
                                      </div>
                                      <div className="text-center">
                                        <div className="text-xs font-medium text-foreground">{dropdownItem.name}</div>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              ) : (
                                item.dropdown.map((dropdownItem) => (
                                  <Link
                                    key={dropdownItem.name}
                                    to={dropdownItem.href}
                                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors duration-200 rounded-lg ml-2 border border-transparent hover:border-primary/20"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {dropdownItem.icon && (
                                      <div className="text-lg">{dropdownItem.icon}</div>
                                    )}
                                    <div className="flex-1">
                                      <div className="font-medium text-foreground">{dropdownItem.name}</div>
                                    </div>
                                  </Link>
                                ))
                              )}
                            </div>
                          ) : (
                            <Link
                              to={item.href}
                              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                                isActivePath(item.href)
                                  ? "text-primary bg-primary/10"
                                  : "text-foreground hover:text-primary hover:bg-muted"
                              }`}
                              onClick={() => setIsOpen(false)}
                            >
                              {item.icon && <item.icon className="w-4 h-4" />}
                              {item.name}
                            </Link>
                          )}
                        </div>
                      ))}
                      
                      {/* Mobile Footer */}
                      <div className="border-t border-border pt-4 mt-4 space-y-3">
                        {/* Social Media for Mobile */}
                        <div className="flex items-center justify-center space-x-3">
                          {socialLinks.map((social) => {
                            const IconComponent = social.icon;
                            return (
                              <Button
                                key={social.name}
                                variant="ghost"
                                size="icon"
                                className="w-9 h-9 text-muted-foreground hover:text-foreground hover:bg-muted"
                                onClick={() => window.open(social.url, '_blank')}
                                aria-label={`Visit our ${social.name} page`}
                              >
                                <IconComponent />
                              </Button>
                            );
                          })}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            onClick={toggleDarkMode}
                            className="flex-1 justify-start text-foreground hover:bg-muted"
                          >
                            {darkMode ? (
                              <Sun className="w-4 h-4 mr-2" />
                            ) : (
                              <Moon className="w-4 h-4 mr-2" />
                            )}
                            {darkMode ? "Light Mode" : "Dark Mode"}
                          </Button>
                          
                          <Button
                            asChild
                            className="flex-1 bg-gradient-primary text-white hover:scale-105 rounded-full transition-all duration-200"
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;