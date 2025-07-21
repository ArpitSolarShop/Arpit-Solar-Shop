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
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 sunset-gradient rounded-lg flex items-center justify-center">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-solar-orange to-solar-gold bg-clip-text text-transparent">
              Arpit Solar
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-1">
                        <span>{item.name}</span>
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 bg-card/90 backdrop-blur-lg">
                      {item.dropdown.map((dropdownItem) => (
                        <DropdownMenuItem key={dropdownItem.name} asChild>
                          <Link
                            to={dropdownItem.href}
                            className="w-full cursor-pointer"
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
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Side - CTA & Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="w-9 h-9"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button asChild className="sunset-gradient text-white font-medium">
              <Link to="/get-quote">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-card/95 backdrop-blur-lg border-b border-border/50">
          <div className="px-2 pt-2 pb-3 space-y-1 max-w-7xl mx-auto">
            {navigationItems.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                      {item.name}
                    </div>
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        to={dropdownItem.href}
                        className="block px-6 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActivePath(item.href)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="border-t border-border/50 pt-4 mt-4 space-y-2">
              <Button
                variant="ghost"
                onClick={toggleDarkMode}
                className="w-full justify-start"
              >
                {darkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </Button>
              <Button asChild className="w-full sunset-gradient text-white">
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