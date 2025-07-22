import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const Certifications = () => {
  const certifications = [
    { name: "ISO 9001:2015", logo: "🏆", description: "Quality Management" },
    { name: "IEC 61215", logo: "⚡", description: "Solar Panel Standards" },
    { name: "BIS Certification", logo: "🇮🇳", description: "Bureau of Indian Standards" },
    { name: "CE Marking", logo: "🌍", description: "European Conformity" },
    { name: "UL Listed", logo: "✅", description: "Safety Standards" },
    { name: "MNRE Approved", logo: "☀️", description: "Ministry of New & Renewable Energy" },
  ];

  const partners = [
    { name: "Tata Power Solar", logo: "🔋" },
    { name: "Adani Solar", logo: "🌞" },
    { name: "Waaree Energies", logo: "⚡" },
    { name: "Vikram Solar", logo: "☀️" },
    { name: "Premier Energies", logo: "🔆" },
    { name: "Goldi Solar", logo: "✨" },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 text-sm font-semibold px-4 py-2">
            Trust & Quality
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Certifications & Partnerships
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trusted by industry leaders and certified to the highest standards
          </p>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            Quality Certifications
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {certifications.map((cert, index) => (
              <Card 
                key={index} 
                className="p-6 text-center border-0 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {cert.logo}
                </div>
                <div className="font-semibold text-sm mb-1 line-clamp-2">
                  {cert.name}
                </div>
                <div className="text-xs text-muted-foreground line-clamp-2">
                  {cert.description}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">
            Trusted Partners
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner, index) => (
              <Card 
                key={index} 
                className="p-6 text-center border-0 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {partner.logo}
                </div>
                <div className="font-semibold text-sm line-clamp-2">
                  {partner.name}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-gradient-primary rounded-3xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Why Trust Matters
            </h3>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Our certifications and partnerships ensure you receive the highest quality 
              solar solutions backed by industry standards
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">25+</div>
              <div className="text-sm opacity-90">Years Warranty</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-sm opacity-90">Quality Assured</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-sm opacity-90">Certified Engineers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">5000+</div>
              <div className="text-sm opacity-90">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;