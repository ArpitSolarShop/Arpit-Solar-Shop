import { AnimatedStat } from "@/components/animated-stat"
import { Card, CardContent } from "@/components/ui/card"
import { IndianRupee, Leaf, Sun, Zap } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-8">
          {/* Headline */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
              <Sun className="h-4 w-4" />
              Clean Energy Solution
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Go Solar & Save <span className="text-yellow-500">Thousands</span>
              <br />
              on Your Energy Bills!
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Power Your Home with Clean, Affordable Solar Energy
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section with Animated Numbers */}
      <section className="bg-yellow-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-black">Why Choose </span>
              <span className="text-yellow-500">Solar Energy?</span>
            </h2>
            <p className="text-lg text-black max-w-2xl mx-auto">
              Discover the incredible benefits of switching to solar power for your home
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Savings Benefit */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
              <CardContent className="p-8 text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <IndianRupee className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Massive Savings</h3>

                {/* Animated Stats for Savings */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <AnimatedStat value={90} suffix="%" label="Bill Reduction" duration={2500} />
                  <AnimatedStat value={15} prefix="₹" suffix="L+" label="20-Year Savings" duration={3000} />
                </div>

                <ul className="text-left space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    Eliminate or drastically reduce monthly bills
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    Protection from rising energy costs
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    Increase your home's value
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Eco-Friendly Benefit */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Eco-Friendly</h3>

                {/* Animated Stats for Environmental Impact */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <AnimatedStat value={15} label="Tons CO₂ Saved/Year" duration={2200} />
                  <AnimatedStat value={375} label="Trees Equivalent" duration={2800} />
                </div>

                <ul className="text-left space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Zero emissions during operation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Reduce dependence on fossil fuels
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Clean, renewable energy source
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Energy Independence Benefit */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Energy Independence</h3>

                {/* Animated Stats for Energy Independence */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <AnimatedStat value={24} suffix="/7" label="Hours Power Available" duration={2400} />
                  <AnimatedStat value={99} suffix="%" label="Grid Independence" duration={2600} />
                </div>

                <ul className="text-left space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Generate your own clean electricity
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Reduce dependence on utility companies
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Backup power during outages (with battery)
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      
    </div>
  )
}