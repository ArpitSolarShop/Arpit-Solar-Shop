import { AnimatedStat } from "@/components/animated-stat"





// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { IndianRupee, Leaf, Sun, Zap, Home } from "lucide-react"
// import { AnimatedStat } from "@/components/animated-stat"

// export default function Component() {
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <section className="container mx-auto px-4 py-16 md:py-24">
//         <div className="text-center space-y-8">
//           {/* Headline */}
//           <div className="space-y-4">
//             <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
//               <Sun className="h-4 w-4" />
//               Clean Energy Solution
//             </div>
//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
//               Go Solar & Save <span className="text-yellow-500">Thousands</span>
//               <br />
//               on Your Energy Bills!
//             </h1>
//             <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
//               Power Your Home with Clean, Affordable Solar Energy
//             </p>
//           </div>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 text-lg font-semibold">
//               <Zap className="h-5 w-5 mr-2" />
//               Get Free Quote
//             </Button>
//             <Button
//               variant="outline"
//               size="lg"
//               className="px-8 py-4 text-lg border-yellow-500 text-yellow-600 hover:bg-yellow-50 bg-transparent"
//             >
//               <Home className="h-5 w-5 mr-2" />
//               Calculate Savings
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Benefits Section with Animated Numbers */}
//       <section className="bg-gray-50 py-16">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Solar Energy?</h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Discover the incredible benefits of switching to solar power for your home
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//             {/* Savings Benefit */}
//             <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
//               <CardContent className="p-8 text-center">
//                 <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <IndianRupee className="h-8 w-8 text-yellow-600" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-6">Massive Savings</h3>

//                 {/* Animated Stats for Savings */}
//                 <div className="grid grid-cols-1 gap-4 mb-6">
//                   <AnimatedStat value={90} suffix="%" label="Bill Reduction" duration={2500} />
//                   <AnimatedStat value={15} prefix="₹" suffix="L+" label="20-Year Savings" duration={3000} />
//                 </div>

//                 <ul className="text-left space-y-2 text-gray-600">
//                   <li className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                     Eliminate or drastically reduce monthly bills
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                     Protection from rising energy costs
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                     Increase your home's value
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>

//             {/* Eco-Friendly Benefit */}
//             <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
//               <CardContent className="p-8 text-center">
//                 <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <Leaf className="h-8 w-8 text-green-600" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-6">Eco-Friendly</h3>

//                 {/* Animated Stats for Environmental Impact */}
//                 <div className="grid grid-cols-2 gap-4 mb-6">
//                   <AnimatedStat value={15} label="Tons CO₂ Saved/Year" duration={2200} />
//                   <AnimatedStat value={375} label="Trees Equivalent" duration={2800} />
//                 </div>

//                 <ul className="text-left space-y-2 text-gray-600">
//                   <li className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                     Zero emissions during operation
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                     Reduce dependence on fossil fuels
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                     Clean, renewable energy source
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>

//             {/* Energy Independence Benefit */}
//             <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
//               <CardContent className="p-8 text-center">
//                 <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <Zap className="h-8 w-8 text-blue-600" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-6">Energy Independence</h3>

//                 {/* Animated Stats for Energy Independence */}
//                 <div className="grid grid-cols-2 gap-4 mb-6">
//                   <AnimatedStat value={24} suffix="/7" label="Hours Power Available" duration={2400} />
//                   <AnimatedStat value={99} suffix="%" label="Grid Independence" duration={2600} />
//                 </div>

//                 <ul className="text-left space-y-2 text-gray-600">
//                   <li className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     Generate your own clean electricity
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     Reduce dependence on utility companies
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     Backup power during outages (with battery)
//                   </li>
//                 </ul>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section with White Background and Sun Color Text */}
//       <section className="bg-white py-16">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div className="text-center">
//               <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">25+</div>
//               <div className="text-lg font-medium text-yellow-600">Years Warranty</div>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">90%</div>
//               <div className="text-lg font-medium text-yellow-600">Bill Reduction</div>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">₹15L+</div>
//               <div className="text-lg font-medium text-yellow-600">Average Savings</div>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">30%</div>
//               <div className="text-lg font-medium text-yellow-600">Tax Credit</div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }



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
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Solar Energy?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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

      {/* Stats Section with White Background and Sun Color Text */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">3453</div>
              <div className="text-lg font-medium text-yellow-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">4234</div>
              <div className="text-lg font-medium text-yellow-600">Projects Done</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">3123</div>
              <div className="text-lg font-medium text-yellow-600">Awards Won</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">1831</div>
              <div className="text-lg font-medium text-yellow-600">Expert Workers</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
