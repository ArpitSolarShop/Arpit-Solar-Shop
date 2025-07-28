import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Sun,
  Zap,
  Leaf,
  DollarSign,
  Shield,
  Home,
  Building,
  Factory,
  Lightbulb,
  Recycle,
  TrendingUp,
  Globe,
} from "lucide-react"

export default function SolarPowerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <Sun className="w-16 h-16 text-orange-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Solar Power: A Deep Dive into Technology and the Pursuit of True Sustainability
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Exploring the rapid technological evolution of solar energy while examining the complex challenges of
            achieving true sustainability throughout its entire lifecycle.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Introduction */}
        <section className="mb-16">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Solar energy, hailed as a cornerstone of the global transition to renewable power, is undergoing rapid
                technological evolution while simultaneously grappling with the complex challenges of achieving true
                sustainability throughout its lifecycle. While solar panels offer a clean source of electricity during
                operation, a comprehensive assessment of their environmental impact, from manufacturing to disposal,
                reveals a more nuanced picture.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* How Solar Works */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Engine of Clean Energy: How Solar Panels Work</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Understanding the photovoltaic effect and the latest technological innovations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Zap className="w-8 h-8 text-blue-500" />
                  <CardTitle>Photovoltaic Process</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  At its core, solar panel technology harnesses the photovoltaic effect, where semiconductor materials,
                  most commonly silicon, convert sunlight directly into electricity. This process produces no greenhouse
                  gas emissions, making it a vital tool in the fight against climate change.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-green-500" />
                  <CardTitle>Long-term Impact</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  A typical residential solar installation can offset a significant amount of carbon dioxide over its 25
                  to 30-year lifespan, making it one of the most effective renewable energy solutions available today.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Emerging Technologies */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Key Technological Advancements</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Perovskite Solar Cells</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Higher efficiencies at lower manufacturing costs with lightweight and flexible properties for
                    diverse surface integration.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Bifacial Solar Panels</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Capture sunlight from both sides, increasing energy generation by harnessing reflected light from
                    surfaces below.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Tandem Solar Cells</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Layer different photovoltaic materials to capture broader sunlight spectrum for significantly higher
                    conversion efficiencies.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Floating Solar Farms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Floatovoltaics conserve land and improve panel performance through water's cooling effect on
                    reservoirs and lakes.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Building-Integrated PV</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Seamlessly integrate solar cells into roofing tiles, windows, and facades, turning entire structures
                    into power generators.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">AI-Powered Systems</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Smart tracking systems and predictive maintenance using artificial intelligence to optimize energy
                    generation and system performance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Environmental Footprint */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Environmental Footprint: A Lifecycle Perspective
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Understanding and mitigating environmental impact across the entire solar panel lifecycle
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-orange-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Factory className="w-8 h-8 text-orange-500" />
                  <CardTitle>Manufacturing</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 text-sm leading-relaxed">
                  Energy-intensive production involving mining of raw materials like quartz for silicon and various
                  metals. Can contribute to greenhouse gas emissions if facilities use fossil fuels.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">
                    Energy Payback: 1-4 years
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Water recycling systems
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Reduced hazardous materials
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Leaf className="w-8 h-8 text-green-500" />
                  <CardTitle>Operation</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 text-sm leading-relaxed">
                  Overwhelmingly positive environmental impact. Generate clean electricity with no direct emissions,
                  contributing to improved air quality and reduced fossil fuel reliance.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">
                    Zero emissions
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Minimal water usage
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    25-30 year lifespan
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Recycle className="w-8 h-8 text-blue-500" />
                  <CardTitle>End-of-Life</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 text-sm leading-relaxed">
                  Highly recyclable with glass and aluminum frames readily recoverable. Advanced processes needed for
                  silicon and precious metals recovery to create circular economy.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">
                    95% recyclable materials
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Circular economy potential
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Resource recovery
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Choose Solar */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Solar Energy?</h2>
            <p className="text-lg text-gray-600">
              Comprehensive benefits for the environment, economy, and energy security
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Globe className="w-8 h-8 text-green-600" />
                  <CardTitle className="text-green-800">Environmental Benefits</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Zero greenhouse gas emissions during operation</li>
                  <li>• Reduces dependence on fossil fuels</li>
                  <li>• No air or water pollution</li>
                  <li>• Contributes to cleaner air quality</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-blue-600" />
                  <CardTitle className="text-blue-800">Economic Advantages</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• Significant reduction in electricity bills</li>
                  <li>• Government incentives and tax benefits</li>
                  <li>• Increases property value</li>
                  <li>• Job creation in green energy sector</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-orange-600" />
                  <CardTitle className="text-orange-800">Energy Independence</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-orange-700">
                  <li>• Reduces reliance on grid electricity</li>
                  <li>• Protection against rising energy costs</li>
                  <li>• Energy storage solutions available</li>
                  <li>• Predictable energy costs for decades</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Solar Applications */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Solar Applications</h2>
            <p className="text-lg text-gray-600">
              From residential rooftops to utility-scale installations, solar technology adapts to every need
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Home className="w-8 h-8 text-purple-500" />
                  <CardTitle>Residential Solar</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Rooftop installations for homes and apartments</li>
                  <li>• Reduced electricity bills</li>
                  <li>• Net metering benefits</li>
                  <li>• Increased home value</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Building className="w-8 h-8 text-indigo-500" />
                  <CardTitle>Commercial & Industrial</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Large-scale installations for businesses</li>
                  <li>• Lower operational costs</li>
                  <li>• Corporate sustainability goals</li>
                  <li>• Tax incentives</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Zap className="w-8 h-8 text-yellow-500" />
                  <CardTitle>Utility-Scale Projects</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Massive solar farms feeding into power grid</li>
                  <li>• Grid stability</li>
                  <li>• Renewable energy targets</li>
                  <li>• Clean power generation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Future Technology */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Future of Solar Technology</h2>
            <p className="text-lg text-gray-600">
              Exciting innovations that will shape the next generation of solar energy solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Perovskite solar cells with higher efficiency",
              "Bifacial panels capturing light from both sides",
              "Floating solar farms on water bodies",
              "Building-integrated photovoltaics (BIPV)",
              "Solar paint and transparent solar cells",
              "AI-powered solar tracking systems",
            ].map((tech, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-orange-500 flex-shrink-0" />
                    <p className="text-sm font-medium text-gray-800">{tech}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <section>
          <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-2xl text-center">The Verdict: A Sustainable Path Forward</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                Solar panel technology is a powerful and essential tool for building a sustainable energy future. While
                challenges related to manufacturing and end-of-life management exist, the industry is actively working
                towards solutions. The ongoing advancements in solar cell efficiency, coupled with a growing focus on
                sustainable manufacturing practices and robust recycling infrastructure, are paving the way for a truly
                circular and sustainable solar industry.
              </p>
              <Separator className="my-6" />
              <p className="text-gray-600">
                The journey towards perfectly "green" solar power is ongoing, but the trajectory is one of continuous
                improvement and innovation, solidifying its role as a critical pillar of a decarbonized global economy.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
