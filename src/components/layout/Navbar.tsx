// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//   Menu,
//   X,
//   Sun,
//   Moon,
//   ChevronDown,
//   Home,
//   ShoppingCart,
//   Hammer,
//   Leaf,
//   Info,
//   Phone,
//   PackageCheck,
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const location = useLocation();

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle("dark");
//   };

//   const navigationItems = [
//     { name: "Home", icon: Home, href: "/" },
//     {
//       name: "Solution",
//       icon: PackageCheck,
//       dropdown: [
//         { name: "Residential", href: "/solutions/residential" },
//         { name: "Commercial", href: "/solutions/commercial" },
//       ],
//     },
//     {
//       name: "Product",
//       icon: ShoppingCart,
//       dropdown: [
//         { name: "Reliance Solar", href: "/products/reliance" },
//         { name: "Sakti Solar", href: "/products/sakti" },
//         { name: "Tata Solar", href: "/products/tata" },
//       ],
//     },
//     { name: "Services", icon: Hammer, href: "/services" },
//     { name: "Sustainability", icon: Leaf, href: "/sustainability" },
//     {
//       name: "About",
//       icon: Info,
//       dropdown: [
//         { name: "About Solar Technology", href: "/about/technology" },
//         { name: "About Us", href: "/about/company" },
//       ],
//     },
//     { name: "Contact", icon: Phone, href: "/contact" },
//   ];

//   const isActivePath = (path: string) => location.pathname === path;

//   return (
//     <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-4">
//       {/* Circular Logo on Left */}
//       <Link
//         to="/"
//         className="bg-white/20 backdrop-blur-md border border-white/20 rounded-full p-2"
//       >
//         <img
//           src="/logo.png"
//           alt="Company Logo"
//           className="w-14 h-14 object-contain rounded-full"
//         />
//       </Link>

//       {/* Navigation Bar shifted right */}
//       <nav className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3 shadow-xl flex items-center justify-between w-full ml-4">
//         {/* Desktop Nav */}
//         <div className="hidden lg:flex items-center space-x-6 w-full justify-end">
//           {navigationItems.map((item) => (
//             <div key={item.name}>
//               {item.dropdown ? (
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       className="flex items-center text-white hover:bg-white/10 space-x-1"
//                     >
//                       {item.icon && <item.icon className="w-4 h-4 mr-1" />}
//                       <span>{item.name}</span>
//                       <ChevronDown className="w-4 h-4" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent className="w-48 bg-black/80 backdrop-blur-lg border border-white/20 rounded-xl">
//                     {item.dropdown.map((dropdownItem) => (
//                       <DropdownMenuItem key={dropdownItem.name} asChild>
//                         <Link
//                           to={dropdownItem.href}
//                           className="w-full cursor-pointer text-white hover:bg-white/10 rounded-lg px-2 py-1"
//                         >
//                           {dropdownItem.name}
//                         </Link>
//                       </DropdownMenuItem>
//                     ))}
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               ) : (
//                 <Link
//                   to={item.href}
//                   className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${
//                     isActivePath(item.href)
//                       ? "text-solar-orange"
//                       : "text-white hover:text-solar-orange"
//                   }`}
//                 >
//                   {item.icon && <item.icon className="w-4 h-4" />}
//                   {item.name}
//                 </Link>
//               )}
//             </div>
//           ))}

//           {/* Right Side Actions */}
//           <div className="flex items-center space-x-3 ml-6">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={toggleDarkMode}
//               className="w-9 h-9 text-white hover:bg-white/10 bg-transparent"
//             >
//               {darkMode ? (
//                 <Sun className="w-4 h-4" />
//               ) : (
//                 <Moon className="w-4 h-4" />
//               )}
//             </Button>
//             <Button
//               asChild
//               className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 rounded-xl"
//             >
//               <Link to="/get-quote">Get Quote</Link>
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Toggle */}
//         <div className="lg:hidden">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setIsOpen(!isOpen)}
//             className="w-9 h-9 text-white hover:bg-white/10 bg-transparent"
//           >
//             {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//           </Button>
//         </div>
//       </nav>

//       {/* Mobile Dropdown Menu */}
//       {isOpen && (
//         <div className="lg:hidden absolute top-[70px] right-4 left-4 bg-black/80 backdrop-blur-lg border border-white/20 rounded-2xl mt-2 z-50">
//           <div className="px-4 pt-4 pb-4 space-y-2">
//             {navigationItems.map((item) => (
//               <div key={item.name}>
//                 {item.dropdown ? (
//                   <div className="space-y-1">
//                     <div className="px-3 py-2 text-sm font-medium text-white flex items-center gap-1">
//                       {item.icon && <item.icon className="w-4 h-4" />}
//                       {item.name}
//                     </div>
//                     {item.dropdown.map((dropdownItem) => (
//                       <Link
//                         key={dropdownItem.name}
//                         to={dropdownItem.href}
//                         className="block px-6 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/10"
//                         onClick={() => setIsOpen(false)}
//                       >
//                         {dropdownItem.name}
//                       </Link>
//                     ))}
//                   </div>
//                 ) : (
//                   <Link
//                     to={item.href}
//                     className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
//                       isActivePath(item.href)
//                         ? "text-solar-orange bg-white/10"
//                         : "text-white hover:text-solar-orange hover:bg-white/10"
//                     }`}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     {item.icon && <item.icon className="w-4 h-4" />}
//                     {item.name}
//                   </Link>
//                 )}
//               </div>
//             ))}
//             <div className="border-t border-white/20 pt-4 mt-4 space-y-2">
//               <Button
//                 variant="ghost"
//                 onClick={toggleDarkMode}
//                 className="w-full justify-start text-white hover:bg-white/10 bg-transparent"
//               >
//                 {darkMode ? (
//                   <Sun className="w-4 h-4 mr-2" />
//                 ) : (
//                   <Moon className="w-4 h-4 mr-2" />
//                 )}
//                 {darkMode ? "Light Mode" : "Dark Mode"}
//               </Button>
//               <Button
//                 asChild
//                 className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-xl"
//               >
//                 <Link to="/get-quote" onClick={() => setIsOpen(false)}>
//                   Get Quote
//                 </Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;
















import { useState } from "react";
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
  const location = useLocation();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const navigationItems = [
    {
      name: "Solution",
      icon: PackageCheck,
      dropdown: [
        { name: "Residential", href: "/solutions/residential" },
        { name: "Commercial", href: "/solutions/commercial" },
      ],
    },
    {
      name: "Product",
      icon: ShoppingCart,
      dropdown: [
        { name: "Reliance Solar", href: "/products/reliance" },
        { name: "Sakti Solar", href: "/products/sakti" },
        { name: "Tata Solar", href: "/products/tata" },
      ],
    },
    { name: "Services", icon: Hammer, href: "/services" },
    { name: "Sustainability", icon: Leaf, href: "/sustainability" },
    {
      name: "About",
      icon: Info,
      dropdown: [
        { name: "About Solar Technology", href: "/about/technology" },
        { name: "About Us", href: "/about/company" },
      ],
    },
    { name: "Contact", icon: Phone, href: "/contact" },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center">
      <div className="flex items-center gap-x-4 px-4 w-full max-w-7xl">
        {/* Logo (acts as Home) */}
        <Link
          to="/"
          className="bg-white/20 backdrop-blur-md border border-white/20 rounded-full p-2"
        >
          <img
            src="/logo.png"
            alt="Company Logo"
            className="w-14 h-14 object-contain rounded-full"
          />
        </Link>

        {/* Navigation Bar */}
        <nav className="flex-1">
          <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3 shadow-xl flex items-center justify-between">
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="flex items-center text-white hover:bg-white/10 space-x-1"
                        >
                          {item.icon && <item.icon className="w-4 h-4 mr-1" />}
                          <span>{item.name}</span>
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-48 bg-black/80 backdrop-blur-lg border border-white/20 rounded-xl">
                        {item.dropdown.map((dropdownItem) => (
                          <DropdownMenuItem key={dropdownItem.name} asChild>
                            <Link
                              to={dropdownItem.href}
                              className="w-full cursor-pointer text-white hover:bg-white/10 rounded-lg px-2 py-1"
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
                      className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${
                        isActivePath(item.href)
                          ? "text-solar-orange"
                          : "text-white hover:text-solar-orange"
                      }`}
                    >
                      {item.icon && <item.icon className="w-4 h-4" />}
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Buttons */}
              <div className="flex items-center space-x-3 ml-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleDarkMode}
                  className="w-9 h-9 text-white hover:bg-white/10 bg-transparent"
                >
                  {darkMode ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  asChild
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 rounded-xl"
                >
                  <Link to="/get-quote">Get Quote</Link>
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="w-9 h-9 text-white hover:bg-white/10 bg-transparent"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          {isOpen && (
            <div className="lg:hidden bg-black/80 backdrop-blur-lg border border-white/20 rounded-2xl mx-2 mt-2">
              <div className="px-4 pt-4 pb-4 space-y-2">
                {navigationItems.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div className="space-y-1">
                        <div className="px-3 py-2 text-sm font-medium text-white flex items-center gap-1">
                          {item.icon && <item.icon className="w-4 h-4" />}
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
                        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                          isActivePath(item.href)
                            ? "text-solar-orange bg-white/10"
                            : "text-white hover:text-solar-orange hover:bg-white/10"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.icon && <item.icon className="w-4 h-4" />}
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="border-t border-white/20 pt-4 mt-4 space-y-2">
                  <Button
                    variant="ghost"
                    onClick={toggleDarkMode}
                    className="w-full justify-start text-white hover:bg-white/10 bg-transparent"
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
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-xl"
                  >
                    <Link to="/get-quote" onClick={() => setIsOpen(false)}>
                      Get Quote
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

