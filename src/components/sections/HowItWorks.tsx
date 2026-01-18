import { Badge } from "@/components/ui/badge"
import { MessageCircle, Ruler, Wrench, BarChart3, CheckCircle } from "lucide-react"

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: MessageCircle,
      title: "Consultation",
      description: "Our solar experts visit your location for a free consultation and energy assessment.",
      highlight: "Free Assessment",
    },
    {
      step: "02",
      icon: Ruler,
      title: "Custom Design",
      description: "We create a tailored solar system design based on your energy needs and roof specifications.",
      highlight: "Tailored Solution",
    },
    {
      step: "03",
      icon: Wrench,
      title: "Professional Installation",
      description: "Our certified technicians install your solar system with precision and quality assurance.",
      highlight: "Expert Installation",
    },
    {
      step: "04",
      icon: BarChart3,
      title: "Monitoring & Support",
      description: "Enjoy 24/7 system monitoring and comprehensive support throughout the system's lifetime.",
      highlight: "Lifetime Support",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6 px-4 py-2 text-amber-600 border-amber-200">
            How We Work
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Simple. Fast. Reliable.</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Four easy steps to transform your home with clean, renewable solar energy
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            const isEven = index % 2 === 0

            return (
              <div key={index} className="relative">
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-32 w-px h-16 bg-gradient-to-b from-amber-300 to-transparent transform -translate-x-1/2 z-0"></div>
                )}

                <div
                  className={`flex flex-col lg:flex-row items-center gap-12 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  {/* Content */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="inline-flex items-center mb-4">
                      <span className="text-sm font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full mr-3">
                        STEP {step.step}
                      </span>
                      <span className="text-sm text-gray-500">{step.highlight}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">{step.description}</p>
                    <div className="flex items-center justify-center lg:justify-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-sm text-gray-500">Professional & Certified</span>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className="flex-1 flex justify-center">
                    <div className="relative">
                      {/* Main circle */}
                      <div className="w-48 h-48 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
                        <div className="w-24 h-24 bg-amber-500 rounded-full flex items-center justify-center">
                          <IconComponent className="w-12 h-12 text-white" />
                        </div>
                      </div>

                      {/* Floating elements */}
                      <div className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-amber-200">
                        <span className="text-sm font-bold text-amber-600">{step.step}</span>
                      </div>

                      {/* Decorative dots */}
                      <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-amber-200 rounded-full opacity-60"></div>
                      <div className="absolute -top-6 left-8 w-4 h-4 bg-amber-300 rounded-full opacity-40"></div>
                      <div className="absolute -right-6 bottom-8 w-6 h-6 bg-amber-100 rounded-full opacity-50"></div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gray-50 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-6">Join thousands of homeowners who've made the switch to solar</p>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-amber-600">1-2</div>
                <div className="text-sm text-gray-500">Days Install</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600">25+</div>
                <div className="text-sm text-gray-500">Year Warranty</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600">₹0</div>
                <div className="text-sm text-gray-500">Down Payment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
