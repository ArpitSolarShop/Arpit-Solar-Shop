import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap, Shield, Award } from "lucide-react";

const HeroSection = () => {
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video or Fallback Image */}
      <div className="absolute inset-0">
        {!videoError ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover"
          >
            <source src="/Solar_Video_Ready_Arpit_Solar.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src="/enhance-quality.png"
            alt="Fallback: solar house"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Powering Your Future with{" "}
                <span className="bg-gradient-to-r from-solar-orange to-solar-gold bg-clip-text text-transparent">
                  the Sun
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Transform your energy costs with premium solar solutions.
                Join thousands of satisfied customers who've made the switch to clean, renewable energy.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-slide-in">
              <Button asChild size="lg" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 rounded-xl">
                <Link to="/get-quote" className="flex items-center">
                  Get Free Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm bg-transparent rounded-xl"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 animate-scale-in">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-2">
                  <Zap className="w-6 h-6 text-solar-orange mr-2" />
                  <span className="text-2xl font-bold text-white">5000+</span>
                </div>
                <p className="text-gray-300 text-sm">Installations</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-2">
                  <Shield className="w-6 h-6 text-solar-orange mr-2" />
                  <span className="text-2xl font-bold text-white">25 Year</span>
                </div>
                <p className="text-gray-300 text-sm">Warranty</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-2">
                  <Award className="w-6 h-6 text-solar-orange mr-2" />
                  <span className="text-2xl font-bold text-white">Award</span>
                </div>
                <p className="text-gray-300 text-sm">Winning</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              <div className="w-64 h-64 rounded-full bg-white/5 backdrop-blur-sm opacity-20 animate-float border border-white/10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-sm">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">Save Up To</h3>
                    <div className="text-4xl font-bold text-solar-orange mb-2">90%</div>
                    <p className="text-gray-200">on your electricity bills</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
