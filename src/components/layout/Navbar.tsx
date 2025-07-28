"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
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
  Building,
  Zap,
} from "lucide-react"

// Pinterest Icon Component (inline to avoid import issues)
const PinterestIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12c1.018 0 2.006-.133 2.939-.379-1.339-.723-2.028-2.168-2.028-2.168s-.277-1.104-.277-2.615c0-1.53.874-2.676 1.96-2.676.926 0 1.375.695 1.375 1.528 0 .93-.593 2.322-.9 3.616-.256 1.083.544 1.966 1.613 1.966 1.938 0 3.432-2.043 3.432-4.991 0-2.612-1.878-4.439-4.555-4.439-3.103 0-4.924 2.326-4.924 4.732 0 .937.361 1.943.814 2.486.089.108.102.202.075.313-.08.336-.258 1.035-.293 1.181-.046.192-.149.233-.344.14-1.295-.603-2.106-2.494-2.106-4.016 0-3.273 2.378-6.278 6.854-6.278 3.599 0 6.398 2.565 6.398 5.996 0 3.578-2.255 6.456-5.386 6.456-1.051 0-2.041-.547-2.379-1.201 0 0-.52 1.982-.647 2.469-.234.897-.866 2.024-1.289 2.708.97.299 2 .458 3.063.458 6.626 0 12-5.374 12-12S18.626 0 12 0z" />
  </svg>
)

// Types
type DropdownItem = {
  name: string
  href: string
  description: string
  image?: string
  icon?: any
  iconClassName?: string
  recommended?: string
}

type NavigationItem = {
  name: string
  icon: any
  iconClassName?: string
  href?: string
  dropdown?: DropdownItem[]
}

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [dropdownHoverActive, setDropdownHoverActive] = useState(false)
  const location = useLocation()
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current)
    }
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  // Handle menu interactions
  const handleMenuEnter = useCallback((menuName: string) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }
    setActiveDropdown(menuName)
    setDropdownHoverActive(true)
  }, [])

  const handleMenuLeave = useCallback(() => {
    leaveTimerRef.current = setTimeout(() => {
      setActiveDropdown(null)
      setDropdownHoverActive(false)
    }, 100)
  }, [])

  const handleSocialClick = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }, [])

  // Helper functions
  const isActivePath = useCallback((path: string) => location.pathname === path, [location.pathname])

  // Navigation configuration
  const navigationItems: NavigationItem[] = useMemo(() => [
    {
      name: "Products",
      icon: PackageCheck,
      iconClassName: "text-blue-600 dark:text-blue-400",
      dropdown: [
        {
          name: "Reliance Solar",
          href: "/reliance",
          description: "Premium solar panels with cutting-edge technology",
          icon: Sun,
          iconClassName: "text-orange-500",
          recommended: "Recommended"
        },
        {
          name: "Shakti Solar",
          href: "/shakti-solar", 
          description: "Affordable and efficient solar solutions",
          icon: Zap,
          iconClassName: "text-yellow-500"
        }
      ]
    },
    {
      name: "Solutions",
      icon: Building,
      iconClassName: "text-green-600 dark:text-green-400",
      dropdown: [
        {
          name: "Residential",
          href: "/solutions/residential",
          description: "Perfect solar solutions for your home",
          icon: Home,
          iconClassName: "text-blue-500"
        },
        {
          name: "Commercial & Industrial",
          href: "/solutions/commercial-industrial",
          description: "Large-scale solar installations",
          icon: Building,
          iconClassName: "text-purple-500"
        }
      ]
    },
    {
      name: "Services",
      icon: Hammer,
      iconClassName: "text-purple-600 dark:text-purple-400",
      href: "/services"
    },
    {
      name: "About",
      icon: Info,
      iconClassName: "text-emerald-600 dark:text-emerald-400",
      dropdown: [
        {
          name: "About Us",
          href: "/about/us",
          description: "Learn about our company and mission",
          icon: Info,
          iconClassName: "text-blue-500"
        },
        {
          name: "Sustainability",
          href: "/about/sustainability",
          description: "Our commitment to clean energy",
          icon: Leaf,
          iconClassName: "text-green-500"
        }
      ]
    },
    {
      name: "Contact",
      icon: Phone,
      iconClassName: "text-red-600 dark:text-red-400",
      href: "/contact"
    }
  ], [])

  // Dropdown Content Component
  const DropdownContent = useCallback(
    ({ item, isTransparent }: { item: NavigationItem; isTransparent: boolean }) => {
      if (!item.dropdown) return null

      const baseClasses = isTransparent
        ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-white/20"
        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"

      const topPosition = isTransparent ? "97px" : "89px"

      return (
        <div
          className={`fixed left-0 right-0 ${baseClasses} border-b shadow-xl z-40`}
          style={{ top: topPosition, width: "100vw" }}
          onMouseEnter={() => handleMenuEnter(item.name)}
          onMouseLeave={handleMenuLeave}
        >
          <div className="container mx-auto px-4 py-6">
            <div className={`${item.name === "Products" ? "max-w-6xl mx-auto" : "max-w-4xl mx-auto"}`}>
              <div
                className={`gap-4 ${
                  item.name === "Products"
                    ? "flex justify-center flex-wrap"
                    : item.name === "Solutions" || item.name === "About"
                      ? "grid grid-cols-1 sm:grid-cols-2"
                      : "space-y-2"
                }`}
              >
                {item.dropdown.map((dropdownItem) => (
                  <Link
                    key={`${item.name}-${dropdownItem.name}`}
                    to={dropdownItem.href}
                    className={`${
                      item.name === "Products" || item.name === "Solutions" || item.name === "About"
                        ? "flex flex-col items-center gap-3 p-4 min-w-[200px]"
                        : "flex items-center gap-3 p-3"
                    } cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-200 dark:hover:border-blue-700 group`}
                  >
                    {(item.name === "Products" || item.name === "Solutions" || item.name === "About") && (
                      <div className="w-20 h-20 bg-white dark:bg-gray-700 rounded-lg p-2 shadow-sm group-hover:shadow-md transition-shadow duration-200 flex items-center justify-center">
                        {dropdownItem.icon ? (
                          <dropdownItem.icon
                            className={`w-10 h-10 ${dropdownItem.iconClassName || "text-gray-700 dark:text-gray-200 group-hover:text-gray-800 dark:group-hover:text-gray-100"}`}
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <PackageCheck className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </div>
                    )}
                    <div className={`${item.name === "Products" || item.name === "Solutions" || item.name === "About" ? "text-center" : ""}`}>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                          {dropdownItem.name}
                        </h4>
                        {dropdownItem.recommended && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200">
                            {dropdownItem.recommended}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {dropdownItem.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    [handleMenuEnter, handleMenuLeave]
  )

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="/logo.png"
                  alt="Arpit Solar"
                  className="h-10 w-auto"
                />
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Arpit Solar
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigationItems.map((item) => (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => item.dropdown && handleMenuEnter(item.name)}
                    onMouseLeave={() => item.dropdown && handleMenuLeave()}
                  >
                    {item.href ? (
                      <Link
                        to={item.href}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                          isActivePath(item.href)
                            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50"
                            : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        <item.icon className={`w-4 h-4 ${item.iconClassName || ""}`} />
                        {item.name}
                      </Link>
                    ) : (
                      <button
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                          activeDropdown === item.name
                            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50"
                            : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        <item.icon className={`w-4 h-4 ${item.iconClassName || ""}`} />
                        {item.name}
                        {item.dropdown && (
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              activeDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button & Mobile menu button */}
            <div className="flex items-center space-x-4">
              <Link
                to="/get-quote"
                className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Get Quote
              </Link>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {mobileMenuOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.href ? (
                    <Link
                      to={item.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center gap-3 ${
                        isActivePath(item.href)
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className={`w-5 h-5 ${item.iconClassName || ""}`} />
                      {item.name}
                    </Link>
                  ) : (
                    <div className="space-y-1">
                      <div className="px-3 py-2 text-base font-medium text-gray-900 dark:text-gray-100 flex items-center gap-3">
                        <item.icon className={`w-5 h-5 ${item.iconClassName || ""}`} />
                        {item.name}
                      </div>
                      {item.dropdown && (
                        <div className="pl-8 space-y-1">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA */}
              <Link
                to="/get-quote"
                className="block w-full text-center px-3 py-2 mt-4 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Quote
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Dropdown Content */}
      {activeDropdown && dropdownHoverActive && (
        <DropdownContent
          item={navigationItems.find(item => item.name === activeDropdown)!}
          isTransparent={false}
        />
      )}
    </>
  )
}

export default Navbar