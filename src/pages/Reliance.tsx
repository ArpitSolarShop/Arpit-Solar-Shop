import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reliance_Price_Data from "@/assets/reliance";

const Reliance = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Reliance_Price_Data />
      </main>
      <Footer />
    </div>
  );
};

export default Reliance;