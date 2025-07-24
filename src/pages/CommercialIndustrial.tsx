import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const CommercialIndustrial = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Commercial & Industrial Solar Solutions
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Power your business with scalable solar energy solutions that reduce operational costs and enhance sustainability.
              </p>
            </div>
          </div>
        </section>

        {/* Business Benefits */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Business Advantages</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Cost Reduction</h3>
                <p className="text-muted-foreground">
                  Significantly reduce operational costs with up to 70% savings on electricity bills.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏭</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Scalable Solutions</h3>
                <p className="text-muted-foreground">
                  From small offices to large industrial facilities, we scale to your needs.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌿</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">CSR Benefits</h3>
                <p className="text-muted-foreground">
                  Enhance your corporate social responsibility and sustainability goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Industries We Serve */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Industries We Serve</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-background p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">🏭</div>
                <h3 className="font-semibold">Manufacturing</h3>
              </div>
              <div className="bg-background p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">🏢</div>
                <h3 className="font-semibold">Office Buildings</h3>
              </div>
              <div className="bg-background p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">🏪</div>
                <h3 className="font-semibold">Retail</h3>
              </div>
              <div className="bg-background p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">🏥</div>
                <h3 className="font-semibold">Healthcare</h3>
              </div>
              <div className="bg-background p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">🏫</div>
                <h3 className="font-semibold">Education</h3>
              </div>
              <div className="bg-background p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">🏨</div>
                <h3 className="font-semibold">Hospitality</h3>
              </div>
              <div className="bg-background p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">📦</div>
                <h3 className="font-semibold">Warehouses</h3>
              </div>
              <div className="bg-background p-6 rounded-lg text-center">
                <div className="text-3xl mb-3">🚜</div>
                <h3 className="font-semibold">Agriculture</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Types */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Solutions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-muted/30 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Rooftop Solar</h3>
                <p className="text-muted-foreground mb-4">
                  Maximize your existing roof space with high-efficiency solar panels designed for commercial and industrial applications.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Quick installation with minimal disruption</li>
                  <li>• Optimal space utilization</li>
                  <li>• Professional maintenance included</li>
                </ul>
              </div>
              <div className="bg-muted/30 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Ground-Mounted Systems</h3>
                <p className="text-muted-foreground mb-4">
                  Large-scale ground installations perfect for facilities with available land area and high energy requirements.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Scalable from MW to GW capacity</li>
                  <li>• Optimal panel positioning</li>
                  <li>• Advanced monitoring systems</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Transform Your Business with Solar</h2>
            <p className="text-lg mb-8 opacity-90">
              Contact us for a comprehensive energy audit and customized solar solution for your business.
            </p>
            <button className="bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors">
              Request Business Consultation
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CommercialIndustrial;