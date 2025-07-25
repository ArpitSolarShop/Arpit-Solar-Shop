// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//   Menu,
//   X,
//   Sun,
//   Moon,
//   ChevronDown,
//   ShoppingCart,
//   Hammer,
//   Leaf,
//   Info,
//   Phone,
//   PackageCheck,
//   Facebook,
//   Linkedin,
//   Instagram,
//   Home,
// } from "lucide-react";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const location = useLocation();

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 100);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle("dark");
//   };

//   const navigationItems = [
//     { name: "Home", icon: Home, href: "/" },
//     {
//       name: "Solutions",
//       icon: PackageCheck,
//       dropdown: [
//         { 
//           name: "Residential", 
//           href: "/solutions/residential", 
//           image: "/logo.png",
//           description: "Solar solutions for homes"
//         },
//         { 
//           name: "Commercial/Industrial", 
//           href: "/solutions/commercial-industrial", 
//           image: "/reliance-industries-ltd.png",
//           description: "Large-scale solar systems"
//         },
//       ],
//     },
//     {
//       name: "Products",
//       icon: ShoppingCart,
//       href: "/products",
//       dropdown: [
//         { 
//           name: "Reliance Solar", 
//           href: "/reliance", 
//           image: "/reliance-industries-ltd.png",
//           description: "Leading renewable energy solutions",
//           recommended: "Recommended for commercial"
//         },
//         { 
//           name: "Shakti Solar", 
//           href: "/shakti-solar", 
//           image: "/Shakti%20Solar.png",
//           description: "Innovative solar solutions",
//           recommended: "Recommended for Residential"
//         },
//         { 
//           name: "Tata Solar", 
//           href: "/products?company=tata", 
//           image: "/Tata%20Power%20Solar.png",
//           description: "Trusted solar power systems"
//         },
//       ],
//     },
//     { name: "Services", icon: Hammer, href: "/services" },
//     {
//       name: "About",
//       icon: Info,
//       dropdown: [
//         { 
//           name: "Sustainability", 
//           href: "/about/sustainability", 
//           image: "/logo.png",
//           description: "Our commitment to environmental sustainability"
//         },
//         { 
//           name: "About Us", 
//           href: "/about/us", 
//           image: "/logo.png",
//           description: "Our company story and mission"
//         },
//       ],
//     },
//     { name: "Contact", icon: Phone, href: "/contact" },
//   ];

//   const socialLinks = [
//     { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/@arpitsolar" },
//     { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/arpit-solar-shop" },
//     { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/arpitsolarweb/" },
//     { 
//       name: "Pinterest", 
//       icon: () => (
//         <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12c1.018 0 2.006-.133 2.939-.379-1.339-.723-2.028-2.168-2.028-2.168s-.277-1.104-.277-2.615c0-1.53.874-2.676 1.96-2.676.926 0 1.375.695 1.375 1.528 0 .93-.593 2.322-.9 3.616-.256 1.083.544 1.966 1.613 1.966 1.938 0 3.432-2.043 3.432-4.991 0-2.612-1.878-4.439-4.555-4.439-3.103 0-4.924 2.326-4.924 4.732 0 .937.361 1.943.814 2.486.089.108.102.202.075.313-.08.336-.258 1.035-.293 1.181-.046.192-.149.233-.344.14-1.295-.603-2.106-2.494-2.106-4.016 0-3.273 2.378-6.278 6.854-6.278 3.599 0 6.398 2.565 6.398 5.996 0 3.578-2.255 6.456-5.386 6.456-1.051 0-2.041-.547-2.379-1.201 0 0-.52 1.982-.647 2.469-.234.897-.866 2.024-1.289 2.708.97.299 2 .458 3.063.458 6.626 0 12-5.374 12-12S18.626 0 12 0z"/>
//         </svg>
//       ), 
//       url: "https://in.pinterest.com/arpitsolar/" 
//     },
//   ];

//   const isActivePath = (path: string) => location.pathname === path;

//   return (
//     <>
//       {/* Main Navigation */}
//       <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}>
//         {scrolled ? (
//           /* Scrolled - White Background */
//           <div className="w-full bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
//             <div className="container mx-auto px-4 py-3">
//               <div className="flex items-center justify-between">
//                 {/* Logo - Left */}
//                 <Link to="/" className="flex items-center pl-4">
//                   <img
//                     src="/logo.png"
//                     alt="Arpit Solar Logo"
//                     className="w-12 h-12 object-contain"
//                   />
//                 </Link>

//                 {/* Desktop Navigation - Middle */}
//                 <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
//                   {navigationItems.map((item) => (
//                     <div 
//                       key={item.name} 
//                       className="relative"
//                       onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
//                       onMouseLeave={() => setActiveDropdown(null)}
//                     >
//                       {item.dropdown ? (
//                         <>
//                           <Button
//                             variant="ghost"
//                             className="flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 space-x-1 px-4 py-2 transition-all duration-200"
//                           >
//                             {item.icon && <item.icon className="w-4 h-4 mr-1" />}
//                             <span className="text-sm font-medium">{item.name}</span>
//                             <ChevronDown className="w-4 h-4 ml-1" />
//                           </Button>
                          
//                           {/* Banner Dropdown Content */}
//                           {activeDropdown === item.name && (
//                             <div className="fixed left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-xl z-40" 
//                                  style={{ 
//                                    top: '73px',
//                                    width: '100vw'
//                                  }}>
//                               <div className="container mx-auto px-4 py-6">
//                                 <div className={`${
//                                   item.name === "About" ? "max-w-4xl mx-auto" : 
//                                   item.name === "Solutions" ? "max-w-4xl mx-auto" : 
//                                   "max-w-6xl mx-auto"
//                                 }`}>
//                                   {item.name === "Products" || item.name === "Solutions" || item.name === "About" ? (
//                                     <div className={`gap-4 ${item.name === "Products" ? "flex" : "grid grid-cols-2"}`}>
//                                       {item.dropdown.map((dropdownItem) => (
//                                         <Link
//                                           key={`${item.name}-${dropdownItem.name}`}
//                                           to={dropdownItem.href}
//                                           className="flex flex-col items-center gap-3 p-4 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors duration-200 border border-transparent hover:border-blue-200 dark:hover:border-blue-700 group"
//                                         >
//                                           <div className="w-20 h-20 bg-white dark:bg-gray-700 rounded-lg p-2 shadow-sm group-hover:shadow-md transition-shadow duration-200">
//                                             <img
//                                               src={dropdownItem.image}
//                                               alt={dropdownItem.name}
//                                               className="w-full h-full object-contain"
//                                             />
//                                           </div>
//                                           <div className="text-center">
//                                             <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{dropdownItem.name}</div>
//                                             {dropdownItem.description && (
//                                               <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{dropdownItem.description}</div>
//                                             )}
//                                             {dropdownItem.recommended && (
//                                               <div className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full mt-2 inline-block">{dropdownItem.recommended}</div>
//                                             )}
//                                           </div>
//                                         </Link>
//                                       ))}
//                                     </div>
//                                   ) : (
//                                     item.dropdown.map((dropdownItem) => (
//                                       <Link
//                                         key={`${item.name}-${dropdownItem.name}`}
//                                         to={dropdownItem.href}
//                                         className="flex items-center gap-3 w-full cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg p-3 transition-colors duration-200"
//                                       >
//                                         <div className="flex-1">
//                                           <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{dropdownItem.name}</div>
//                                         </div>
//                                       </Link>
//                                     ))
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                         </>
//                       ) : (
//                         <Link
//                           to={item.href}
//                           className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-all duration-200 ${
//                             isActivePath(item.href)
//                               ? "text-blue-600 dark:text-blue-400"
//                               : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
//                           }`}
//                         >
//                           {item.icon && <item.icon className="w-4 h-4" />}
//                           {item.name}
//                         </Link>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Right Side Actions */}
//                 <div className="flex items-center space-x-4 pr-4">
//                   {/* Social Media Icons */}
//                   <div className="hidden md:flex items-center space-x-2">
//                     {socialLinks.map((social) => {
//                       const IconComponent = social.icon;
//                       return (
//                         <Button
//                           key={social.name}
//                           variant="ghost"
//                           size="icon"
//                           className="w-8 h-8 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
//                           onClick={() => window.open(social.url, '_blank')}
//                           aria-label={`Visit our ${social.name} page`}
//                         >
//                           <IconComponent />
//                         </Button>
//                       );
//                     })}
//                   </div>
                  
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={toggleDarkMode}
//                     className="w-9 h-9 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
//                     aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
//                   >
//                     {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
//                   </Button>
                  
//                   <Button
//                     asChild
//                     className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-200"
//                   >
//                     <Link to="/get-quote">Get Quote</Link>
//                   </Button>
//                 </div>

//                 {/* Mobile Menu Button */}
//                 <div className="lg:hidden">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="w-9 h-9 text-gray-700 dark:text-gray-200"
//                     aria-label="Toggle mobile menu"
//                   >
//                     {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           /* Not Scrolled - Transparent with White Text */
//           <div className="w-full px-4 py-4">
//             <div className="container mx-auto">
//               <div className="flex items-center justify-between">
//                 {/* Logo - Left Side with padding */}
//                 <Link to="/" className="flex items-center pl-4">
//                   <img
//                     src="/logo.png"
//                     alt="Arpit Solar Logo"
//                     className="w-12 h-12 object-contain"
//                   />
//                 </Link>

//                 {/* Desktop Navigation - Middle */}
//                 <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
//                   {navigationItems.map((item) => (
//                     <div 
//                       key={item.name} 
//                       className="relative"
//                       onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
//                       onMouseLeave={() => setActiveDropdown(null)}
//                     >
//                       {item.dropdown ? (
//                         <>
//                           <Button
//                             variant="ghost"
//                             className="flex items-center text-white hover:text-white/80 space-x-1 px-4 py-2 transition-all duration-200"
//                           >
//                             {item.icon && <item.icon className="w-4 h-4 mr-1" />}
//                             <span className="text-sm font-medium">{item.name}</span>
//                             <ChevronDown className="w-4 h-4 ml-1" />
//                           </Button>
                          
//                           {/* Banner Dropdown Content */}
//                           {activeDropdown === item.name && (
//                             <div className="fixed left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-white/20 shadow-xl z-40"
//                                  style={{ 
//                                    top: '73px',
//                                    width: '100vw'
//                                  }}>
//                               <div className="container mx-auto px-4 py-6">
//                                 <div className={`${
//                                   item.name === "About" ? "max-w-4xl mx-auto" : 
//                                   item.name === "Solutions" ? "max-w-4xl mx-auto" : 
//                                   "max-w-6xl mx-auto"
//                                 }`}>
//                                   {item.name === "Products" || item.name === "Solutions" || item.name === "About" ? (
//                                     <div className={`gap-4 ${item.name === "Products" ? "flex" : "grid grid-cols-2"}`}>
//                                       {item.dropdown.map((dropdownItem) => (
//                                         <Link
//                                           key={`${item.name}-${dropdownItem.name}`}
//                                           to={dropdownItem.href}
//                                           className="flex flex-col items-center gap-3 p-4 cursor-pointer hover:bg-primary/10 rounded-lg transition-colors duration-200 border border-transparent hover:border-primary/20 group"
//                                         >
//                                           <div className="w-20 h-20 bg-white rounded-lg p-2 shadow-sm group-hover:shadow-md transition-shadow duration-200">
//                                             <img
//                                               src={dropdownItem.image}
//                                               alt={dropdownItem.name}
//                                               className="w-full h-full object-contain"
//                                             />
//                                           </div>
//                                           <div className="text-center">
//                                             <div className="text-sm font-medium text-foreground">{dropdownItem.name}</div>
//                                             {dropdownItem.description && (
//                                               <div className="text-xs text-muted-foreground mt-1">{dropdownItem.description}</div>
//                                             )}
//                                             {dropdownItem.recommended && (
//                                               <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mt-2 inline-block">{dropdownItem.recommended}</div>
//                                             )}
//                                           </div>
//                                         </Link>
//                                       ))}
//                                     </div>
//                                   ) : (
//                                     item.dropdown.map((dropdownItem) => (
//                                       <Link
//                                         key={`${item.name}-${dropdownItem.name}`}
//                                         to={dropdownItem.href}
//                                         className="flex items-center gap-3 w-full cursor-pointer hover:bg-primary/10 rounded-lg p-3 transition-colors duration-200 border border-transparent hover:border-primary/20"
//                                       >
//                                         <div className="flex-1">
//                                           <div className="text-sm font-medium text-foreground">{dropdownItem.name}</div>
//                                         </div>
//                                       </Link>
//                                     ))
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                         </>
//                       ) : (
//                         <Link
//                           to={item.href}
//                           className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-all duration-200 ${
//                             isActivePath(item.href)
//                               ? "text-white"
//                               : "text-white hover:text-white/80"
//                           }`}
//                         >
//                           {item.icon && <item.icon className="w-4 h-4" />}
//                           {item.name}
//                         </Link>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Right Side Actions */}
//                 <div className="flex items-center space-x-4 pr-4">
//                   {/* Social Media Icons */}
//                   <div className="hidden md:flex items-center space-x-2">
//                     {socialLinks.map((social) => {
//                       const IconComponent = social.icon;
//                       return (
//                         <Button
//                           key={social.name}
//                           variant="ghost"
//                           size="icon"
//                           className="w-8 h-8 text-white/80 hover:text-white transition-all duration-200"
//                           onClick={() => window.open(social.url, '_blank')}
//                           aria-label={`Visit our ${social.name} page`}
//                         >
//                           <IconComponent />
//                         </Button>
//                       );
//                     })}
//                   </div>
                  
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={toggleDarkMode}
//                     className="w-9 h-9 text-white hover:text-white/80 transition-all duration-200"
//                     aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
//                   >
//                     {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
//                   </Button>
                  
//                   <Button
//                     asChild
//                     className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-2 rounded-full border border-white/30 transition-all duration-200"
//                   >
//                     <Link to="/get-quote">Get Quote</Link>
//                   </Button>
//                 </div>

//                 {/* Mobile Menu Button */}
//                 <div className="lg:hidden">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="w-9 h-9 text-white hover:text-white/80 transition-all duration-200"
//                     aria-label="Toggle mobile menu"
//                   >
//                     {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Mobile Menu Panel */}
//         {isOpen && (
//           <div className="lg:hidden absolute top-full left-0 right-0 mt-2 mx-2">
//             <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl overflow-hidden">
//               <div className="px-4 pt-4 pb-4 space-y-2">
//                 {navigationItems.map((item) => (
//                   <div key={item.name}>
//                     {item.dropdown ? (
//                       <div className="space-y-1">
//                         <div className="px-3 py-2 text-sm font-semibold text-foreground flex items-center gap-2">
//                           {item.icon && <item.icon className="w-4 h-4" />}
//                           {item.name}
//                         </div>
//                          {item.name === "Products" || item.name === "Solutions" || item.name === "About" ? (
//                            <div className={`gap-3 px-3 py-3 ${item.name === "Products" ? "flex" : "grid grid-cols-2"}`}>
//                              {item.dropdown.map((dropdownItem) => (
//                                <Link
//                                  key={dropdownItem.name}
//                                  to={dropdownItem.href}
//                                  className="flex flex-col items-center gap-2 p-3 cursor-pointer hover:bg-muted transition-colors duration-200 rounded-lg border border-transparent hover:border-primary/20"
//                                  onClick={() => setIsOpen(false)}
//                                >
//                                  <div className="w-16 h-16 bg-white rounded-lg p-2 shadow-sm">
//                                    <img
//                                      src={dropdownItem.image}
//                                      alt={dropdownItem.name}
//                                      className="w-full h-full object-contain"
//                                    />
//                                  </div>
//                                  <div className="text-center">
//                                    <div className="text-xs font-medium text-foreground">{dropdownItem.name}</div>
//                                    {dropdownItem.description && (
//                                      <div className="text-xs text-muted-foreground mt-1">{dropdownItem.description}</div>
//                                    )}
//                                    {dropdownItem.recommended && (
//                                      <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mt-2 inline-block">{dropdownItem.recommended}</div>
//                                    )}
//                                  </div>
//                                </Link>
//                              ))}
//                            </div>
//                          ) : (
//                            item.dropdown.map((dropdownItem) => (
//                              <Link
//                                key={dropdownItem.name}
//                                to={dropdownItem.href}
//                                className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors duration-200 rounded-lg ml-2 border border-transparent hover:border-primary/20"
//                                onClick={() => setIsOpen(false)}
//                              >
//                                <div className="flex-1">
//                                  <div className="font-medium text-foreground">{dropdownItem.name}</div>
//                                </div>
//                              </Link>
//                            ))
//                          )}
//                       </div>
//                     ) : (
//                       <Link
//                         to={item.href}
//                         className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
//                           isActivePath(item.href)
//                             ? "text-primary bg-primary/10"
//                             : "text-foreground hover:text-primary hover:bg-muted"
//                         }`}
//                         onClick={() => setIsOpen(false)}
//                       >
//                         {item.icon && <item.icon className="w-4 h-4" />}
//                         {item.name}
//                       </Link>
//                     )}
//                   </div>
//                 ))}
                
//                 {/* Mobile Footer */}
//                 <div className="border-t border-border pt-4 mt-4 space-y-3">
//                   {/* Social Media for Mobile */}
//                   <div className="flex items-center justify-center space-x-3">
//                     {socialLinks.map((social) => {
//                       const IconComponent = social.icon;
//                       return (
//                         <Button
//                           key={social.name}
//                           variant="ghost"
//                           size="icon"
//                           className="w-9 h-9 text-muted-foreground hover:text-foreground hover:bg-muted"
//                           onClick={() => window.open(social.url, '_blank')}
//                           aria-label={`Visit our ${social.name} page`}
//                         >
//                           <IconComponent />
//                         </Button>
//                       );
//                     })}
//                   </div>
                  
//                   <div className="flex items-center space-x-2">
//                     <Button
//                       variant="ghost"
//                       onClick={toggleDarkMode}
//                       className="flex-1 justify-start text-foreground hover:bg-muted"
//                     >
//                       {darkMode ? (
//                         <Sun className="w-4 h-4 mr-2" />
//                       ) : (
//                         <Moon className="w-4 h-4 mr-2" />
//                       )}
//                       {darkMode ? "Light Mode" : "Dark Mode"}
//                     </Button>
                    
//                     <Button
//                       asChild
//                       className="flex-1 bg-gradient-primary text-white hover:scale-105 rounded-full transition-all duration-200"
//                     >
//                       <Link to="/get-quote" onClick={() => setIsOpen(false)}>
//                         Get Quote
//                       </Link>
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Navbar;
















import { useState, useEffect, useRef } from "react";
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
  LucideIcon,
  Home,
  Building,
} from "lucide-react";

// Define a type for dropdown items
type DropdownItem = {
  name: string;
  href: string;
  description: string;
  image?: string;
  icon?: LucideIcon;
  iconClassName?: string; // For custom icon styling
  recommended?: string;
};

// Define a type for the main navigation items
type NavigationItem = {
  name: string;
  icon: LucideIcon;
  iconClassName?: string;
  href?: string;
  dropdown?: DropdownItem[];
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const menuCloseTimer = useRef<NodeJS.Timeout | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Handlers for dropdowns to add a delay
  const handleMenuEnter = (menuName: string) => {
    if (menuCloseTimer.current) {
      clearTimeout(menuCloseTimer.current);
    }
    setActiveDropdown(menuName);
  };

  const handleMenuLeave = () => {
    menuCloseTimer.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200); // 200ms delay before closing
  };

  const navigationItems: NavigationItem[] = [
    {
      name: "Solutions",
      icon: PackageCheck,
      dropdown: [
        {
          name: "Residential",
          href: "/solutions/residential",
          icon: Home,
          description: "Solar solutions for homes"
        },
        {
          name: "Commercial/Industrial",
          href: "/solutions/commercial-industrial",
          icon: Building,
          description: "Large-scale solar systems"
        },
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
          description: "Leading renewable energy solutions",
          recommended: "Recommended for commercial"
        },
        {
          name: "Shakti Solar",
          href: "/shakti-solar",
          image: "/Shakti%20Solar.png",
          description: "Innovative solar solutions",
          recommended: "Recommended for Residential"
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
    {
      name: "About",
      icon: Info,
      dropdown: [
        {
          name: "Sustainability",
          href: "/about/sustainability",
          icon: Leaf,
          iconClassName: "text-[#00FF00]",
          description: "Our commitment to environmental sustainability"
        },
        {
          name: "About Us",
          href: "/about/us",
          image: "/logo.png",
          description: "Our company story and mission"
        },
      ],
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
          <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12c1.018 0 2.006-.133 2.939-.379-1.339-.723-2.028-2.168-2.028-2.168s-.277-1.104-.277-2.615c0-1.53.874-2.676 1.96-2.676.926 0 1.375.695 1.375 1.528 0 .93-.593 2.322-.9 3.616-.256 1.083.544 1.966 1.613 1.966 1.938 0 3.432-2.043 3.432-4.991 0-2.612-1.878-4.439-4.555-4.439-3.103 0-4.924 2.326-4.924 4.732 0 .937.361 1.943.814 2.486.089.108.102.202.075.313-.08.336-.258 1.035-.293 1.181-.046.192-.149.233-.344.14-1.295-.603-2.106-2.494-2.106-4.016 0-3.273 2.378-6.278 6.854-6.278 3.599 0 6.398 2.565 6.398 5.996 0 3.578-2.255 6.456-5.386 6.456-1.051 0-2.041-.547-2.379-1.201 0 0-.52 1.982-.647 2.469-.234.897-.866 2.024-1.289 2.708.97.299 2 .458 3.063.458 6.626 0 12-5.374 12-12S18.626 0 12 0z" />
        </svg>
      ),
      url: "https://in.pinterest.com/arpitsolar/"
    },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  // Common classes for the underline hover effect
  const underlineEffect = "after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:transition-all after:duration-300";

  return (
    <>
      {/* Main Navigation */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}>
        {/* Show white bar if scrolled OR dropdown is active */}
        {(scrolled || activeDropdown) ? (
          /* Scrolled / Hovered - White Background */
          <div className="w-full bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                {/* Logo - Left */}
                <Link to="/" className="flex items-center pl-4">
                  <img
                    src="/logo.png"
                    alt="Arpit Solar Logo"
                    className="w-16 h-16 object-contain"
                  />
                </Link>

                {/* Desktop Navigation - Middle */}
                <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
                  {navigationItems.map((item) => (
                    <div
                      key={item.name}
                      className="relative group"
                      onMouseEnter={() => item.dropdown && handleMenuEnter(item.name)}
                      onMouseLeave={handleMenuLeave}
                    >
                      {item.dropdown ? (
                        <>
                          <Button
                            variant="ghost"
                            // FIX: Added hover:bg-transparent to override default button hover styles
                            className={`flex items-center text-gray-700 dark:text-gray-200 space-x-1 px-4 py-2 transition-colors duration-200 hover:bg-transparent dark:hover:bg-transparent ${underlineEffect} after:bg-blue-600 dark:after:bg-blue-400 group-hover:after:w-full`}
                          >
                            {item.icon && <item.icon className={`w-4 h-4 mr-1 ${item.iconClassName || ''}`} />}
                            <span className="text-sm font-medium">{item.name}</span>
                            <ChevronDown className="w-4 h-4 ml-1" />
                          </Button>

                          {/* Banner Dropdown Content */}
                          {activeDropdown === item.name && (
                            <div
                              className="fixed left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-xl z-40"
                              style={{ top: '89px', width: '100vw' }}
                              onMouseEnter={() => handleMenuEnter(item.name)}
                              onMouseLeave={handleMenuLeave}
                            >
                              <div className="container mx-auto px-4 py-6">
                                <div className={`${item.name === "About" ? "max-w-4xl mx-auto" :
                                    item.name === "Solutions" ? "max-w-4xl mx-auto" :
                                      "max-w-6xl mx-auto"
                                  }`}>
                                  {item.name === "Products" || item.name === "Solutions" || item.name === "About" ? (
                                    <div className={`gap-4 ${item.name === "Products" ? "flex justify-center" : "grid grid-cols-2"}`}>

                                      {(item.dropdown as DropdownItem[]).map((dropdownItem) => (
                                        <Link
                                          key={`${item.name}-${dropdownItem.name}`}
                                          to={dropdownItem.href}
                                          className="flex flex-col items-center gap-3 p-4 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors duration-200 border border-transparent hover:border-blue-200 dark:hover:border-blue-700 group"
                                        >
                                          <div className="w-20 h-20 bg-white dark:bg-gray-700 rounded-lg p-2 shadow-sm group-hover:shadow-md transition-shadow duration-200 flex items-center justify-center">
                                            {dropdownItem.icon ? (
                                                <dropdownItem.icon className={`w-10 h-10 ${dropdownItem.iconClassName || 'text-gray-700 dark:text-gray-200'}`} />
                                            ) : (
                                                <img
                                                  src={dropdownItem.image}
                                                  alt={dropdownItem.name}
                                                  className="w-full h-full object-contain"
                                                />
                                            )}
                                          </div>
                                          <div className="text-center">
                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{dropdownItem.name}</div>
                                            {dropdownItem.description && (
                                              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{dropdownItem.description}</div>
                                            )}
                                            {dropdownItem.recommended && (
                                              <div className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full mt-2 inline-block">{dropdownItem.recommended}</div>
                                            )}
                                          </div>
                                        </Link>
                                      ))}
                                    </div>
                                  ) : (
                                      (item.dropdown as DropdownItem[]).map((dropdownItem) => (
                                        <Link
                                          key={`${item.name}-${dropdownItem.name}`}
                                          to={dropdownItem.href}
                                          className="flex items-center gap-3 w-full cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg p-3 transition-colors duration-200"
                                        >
                                          <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{dropdownItem.name}</div>
                                          </div>
                                        </Link>
                                      ))
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                          <Link
                            to={item.href!}
                            className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-200 ${underlineEffect} after:bg-blue-600 dark:after:bg-blue-400
                              ${isActivePath(item.href!)
                                ? "text-blue-600 dark:text-blue-400 after:w-full"
                                : "text-gray-700 dark:text-gray-200 after:w-0 group-hover:after:w-full"
                              }`}
                          >
                            {item.icon && <item.icon className={`w-4 h-4 mr-1 ${item.iconClassName || ''}`} />}
                            {item.name}
                          </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center space-x-4 pr-4">
                  {/* Social Media Icons */}
                  <div className="hidden md:flex items-center space-x-2">
                    {socialLinks.map((social) => {
                      const IconComponent = social.icon;
                      return (
                        <Button
                          key={social.name}
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
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
                    className="w-9 h-9 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </Button>

                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-200"
                  >
                    <Link to="/get-quote">Get Quote</Link>
                  </Button>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-9 h-9 text-gray-700 dark:text-gray-200"
                    aria-label="Toggle mobile menu"
                  >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
            /* Not Scrolled & Not Hovered - Transparent with White Text */
            <div className="w-full px-4 py-4">
              <div className="container mx-auto">
                <div className="flex items-center justify-between">
                  {/* Logo - Left Side with padding */}
                  <Link to="/" className="flex items-center pl-4">
                    <img
                      src="/logo.png"
                      alt="Arpit Solar Logo"
                      className="w-16 h-16 object-contain"
                    />
                  </Link>

                  {/* Desktop Navigation - Middle */}
                  <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
                    {navigationItems.map((item) => (
                      <div
                        key={item.name}
                        className="relative group"
                        onMouseEnter={() => item.dropdown && handleMenuEnter(item.name)}
                        onMouseLeave={handleMenuLeave}
                      >
                        {item.dropdown ? (
                          <>
                            <Button
                              variant="ghost"
                              // FIX: Added hover:bg-transparent to override default button hover styles
                              className={`flex items-center text-white space-x-1 px-4 py-2 transition-colors duration-200 hover:bg-transparent ${underlineEffect} after:bg-white group-hover:after:w-full`}
                            >
                              {item.icon && <item.icon className={`w-4 h-4 mr-1 ${item.iconClassName || ''}`} />}
                              <span className="text-sm font-medium">{item.name}</span>
                              <ChevronDown className="w-4 h-4 ml-1" />
                            </Button>

                            {/* Banner Dropdown Content (will trigger the state change) */}
                            {activeDropdown === item.name && (
                              <div
                                className="fixed left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-white/20 shadow-xl z-40"
                                style={{ top: '97px', width: '100vw' }}
                                onMouseEnter={() => handleMenuEnter(item.name)}
                                onMouseLeave={handleMenuLeave}
                              >
                                <div className="container mx-auto px-4 py-6">
                                  <div className={`${item.name === "About" ? "max-w-4xl mx-auto" :
                                      item.name === "Solutions" ? "max-w-4xl mx-auto" :
                                        "max-w-6xl mx-auto"
                                    }`}>
                                    {item.name === "Products" || item.name === "Solutions" || item.name === "About" ? (

                                      <div className={`gap-4 ${item.name === "Products" ? "flex justify-center" : "grid grid-cols-2"}`}>

                                        {(item.dropdown as DropdownItem[]).map((dropdownItem) => (
                                          <Link
                                            key={`${item.name}-${dropdownItem.name}`}
                                            to={dropdownItem.href}
                                            className="flex flex-col items-center gap-3 p-4 cursor-pointer hover:bg-primary/10 rounded-lg transition-colors duration-200 border border-transparent hover:border-primary/20 group"
                                          >
                                            <div className="w-20 h-20 bg-white rounded-lg p-2 shadow-sm group-hover:shadow-md transition-shadow duration-200 flex items-center justify-center">
                                              {dropdownItem.icon ? (
                                                  <dropdownItem.icon className={`w-10 h-10 ${dropdownItem.iconClassName || 'text-foreground'}`} />
                                              ) : (
                                                  <img
                                                    src={dropdownItem.image}
                                                    alt={dropdownItem.name}
                                                    className="w-full h-full object-contain"
                                                  />
                                              )}
                                            </div>
                                            <div className="text-center">
                                              <div className="text-sm font-medium text-foreground">{dropdownItem.name}</div>
                                              {dropdownItem.description && (
                                                <div className="text-xs text-muted-foreground mt-1">{dropdownItem.description}</div>
                                              )}
                                              {dropdownItem.recommended && (
                                                <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mt-2 inline-block">{dropdownItem.recommended}</div>
                                              )}
                                            </div>
                                          </Link>
                                        ))}
                                      </div>
                                    ) : (
                                        (item.dropdown as DropdownItem[]).map((dropdownItem) => (
                                          <Link
                                            key={`${item.name}-${dropdownItem.name}`}
                                            to={dropdownItem.href}
                                            className="flex items-center gap-3 w-full cursor-pointer hover:bg-primary/10 rounded-lg p-3 transition-colors duration-200 border border-transparent hover:border-primary/20"
                                          >
                                            <div className="flex-1">
                                              <div className="text-sm font-medium text-foreground">{dropdownItem.name}</div>
                                            </div>
                                          </Link>
                                        ))
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                            <Link
                              to={item.href!}
                              className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-200 text-white ${underlineEffect} after:bg-white
                              ${isActivePath(item.href!)
                                  ? "after:w-full"
                                  : "after:w-0 group-hover:after:w-full"
                                }`}
                            >
                              {item.icon && <item.icon className={`w-4 h-4 mr-1 ${item.iconClassName || ''}`} />}
                              {item.name}
                            </Link>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Right Side Actions */}
                  <div className="flex items-center space-x-4 pr-4">
                    {/* Social Media Icons */}
                    <div className="hidden md:flex items-center space-x-2">
                      {socialLinks.map((social) => {
                        const IconComponent = social.icon;
                        return (
                          <Button
                            key={social.name}
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-white/80 hover:text-white transition-all duration-200"
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
                      className="w-9 h-9 text-white hover:text-white/80 transition-all duration-200"
                      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                    >
                      {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </Button>

                    <Button
                      asChild
                      className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-2 rounded-full border border-white/30 transition-all duration-200"
                    >
                      <Link to="/get-quote">Get Quote</Link>
                    </Button>
                  </div>

                  {/* Mobile Menu Button */}
                  <div className="lg:hidden">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-9 h-9 text-white hover:text-white/80 transition-all duration-200"
                      aria-label="Toggle mobile menu"
                    >
                      {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
        )}

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
                          {item.icon && <item.icon className={`w-4 h-4 ${item.iconClassName || ''}`} />}
                          {item.name}
                        </div>
                        {item.name === "Products" || item.name === "Solutions" || item.name === "About" ? (
                          <div className={`gap-3 px-3 py-3 ${item.name === "Products" ? "flex overflow-x-auto" : "grid grid-cols-2"}`}>
                            {(item.dropdown as DropdownItem[]).map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                to={dropdownItem.href}
                                className="flex flex-col items-center gap-2 p-3 cursor-pointer hover:bg-muted transition-colors duration-200 rounded-lg border border-transparent hover:border-primary/20 flex-shrink-0"
                                onClick={() => setIsOpen(false)}
                              >
                                <div className="w-16 h-16 bg-white rounded-lg p-2 shadow-sm flex items-center justify-center">
                                    {dropdownItem.icon ? (
                                      <dropdownItem.icon className={`w-8 h-8 ${dropdownItem.iconClassName || 'text-foreground'}`} />
                                    ) : (
                                      <img
                                          src={dropdownItem.image}
                                          alt={dropdownItem.name}
                                          className="w-full h-full object-contain"
                                      />
                                    )}
                                </div>
                                <div className="text-center">
                                  <div className="text-xs font-medium text-foreground">{dropdownItem.name}</div>
                                  {dropdownItem.description && (
                                    <div className="text-xs text-muted-foreground mt-1 max-w-[100px] whitespace-normal">{dropdownItem.description}</div>
                                  )}
                                  {dropdownItem.recommended && (
                                    <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mt-2 inline-block">{dropdownItem.recommended}</div>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                            (item.dropdown as DropdownItem[]).map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                to={dropdownItem.href}
                                className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors duration-200 rounded-lg ml-2 border border-transparent hover:border-primary/20"
                                onClick={() => setIsOpen(false)}
                              >
                                <div className="flex-1">
                                  <div className="font-medium text-foreground">{dropdownItem.name}</div>
                                </div>
                              </Link>
                            ))
                        )}
                      </div>
                    ) : (
                        <Link
                          to={item.href!}
                          className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${isActivePath(item.href!)
                              ? "text-primary bg-primary/10"
                              : "text-foreground hover:text-primary hover:bg-muted"
                            }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.icon && <item.icon className={`w-4 h-4 ${item.iconClassName || ''}`} />}
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
      </div>
    </>
  );
};

export default Navbar;