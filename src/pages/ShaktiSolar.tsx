import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Shakti_Price_Data from "@/assets/shakti-solar";

const ShaktiSolar = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Shakti_Price_Data />
      </main>
      <Footer />
    </div>
  );
};

export default ShaktiSolar;