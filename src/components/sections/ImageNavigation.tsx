import { Link } from "react-router-dom";

const ImageNavigation = () => {
  const navigationImages = [
    {
      id: "products",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      alt: "monitor showing Java programming",
      link: "/products",
      title: "Products"
    },
    {
      id: "services", 
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      alt: "macro photography of black circuit board",
      link: "/services",
      title: "Services"
    },
    {
      id: "sustainability",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      alt: "two brown deer beside trees and mountain",
      link: "/sustainability", 
      title: "Sustainability"
    },
    {
      id: "about",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e425?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
      alt: "landscape photography of mountain hit by sun rays",
      link: "/about",
      title: "About"
    },
    {
      id: "contact",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      alt: "Colorful software or web code on a computer monitor", 
      link: "/contact",
      title: "Contact"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover what we offer by exploring our different sections
          </p>
        </div>

        {/* Image Navigation Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {navigationImages.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="group relative overflow-hidden rounded-xl bg-card shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg text-center">
                    {item.title}
                  </h3>
                </div>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-primary/50 rounded-xl transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageNavigation;