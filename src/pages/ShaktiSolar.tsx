import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Zap, CheckCircle, ArrowRight, Phone } from "lucide-react";

const ShaktiSolar = () => {
  const gridTieSystemData = [
    {
      slNo: 1,
      systemSize: "2.14",
      noOfModules: 4,
      inverterCapacity: 2,
      phase: "Single",
      priceWithGST: 130000
    },
    {
      slNo: 2,
      systemSize: "3.21",
      noOfModules: 6,
      inverterCapacity: 3,
      phase: "Single",
      priceWithGST: 185000
    },
    {
      slNo: 3,
      systemSize: "4.28",
      noOfModules: 8,
      inverterCapacity: 4,
      phase: "Single",
      priceWithGST: 245000
    },
    {
      slNo: 4,
      systemSize: "4.82",
      noOfModules: 9,
      inverterCapacity: 5,
      phase: "Single",
      priceWithGST: 285000
    },
    {
      slNo: 5,
      systemSize: "5.35",
      noOfModules: 10,
      inverterCapacity: 5,
      phase: "Three",
      priceWithGST: 295000
    },
    {
      slNo: 6,
      systemSize: "5.35",
      noOfModules: 10,
      inverterCapacity: 5,
      phase: "Three",
      priceWithGST: 300000
    },
    {
      slNo: 7,
      systemSize: "5.89",
      noOfModules: 11,
      inverterCapacity: 6,
      phase: "Three",
      priceWithGST: 315000
    },
    {
      slNo: 8,
      systemSize: "8.03",
      noOfModules: 15,
      inverterCapacity: 8,
      phase: "Three",
      priceWithGST: 485000
    },
    {
      slNo: 9,
      systemSize: "9.63",
      noOfModules: 18,
      inverterCapacity: 10,
      phase: "Three",
      priceWithGST: 605000
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const calculatePricePerKWp = (price: number, systemSize: string) => {
    const sizeNum = parseFloat(systemSize);
    return Math.round(price / sizeNum);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/Shakti%20Solar.png" 
                alt="Shakti Solar Logo" 
                className="h-16 w-auto bg-white rounded-lg p-2 mr-4"
              />
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Shakti Solar</h1>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  Recommended for Residential
                </Badge>
              </div>
            </div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Innovative solar solutions for homes with advanced DCR RIL 535 Wp modules and reliable string inverters
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Product Overview */}
        <div className="mb-12">
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl text-primary mb-4">
                Grid Tie System - DCR RIL 535 Wp Modules
              </CardTitle>
              <CardDescription className="text-lg">
                Complete solar installation with String Inverter (Excluding Civil Material)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">High Efficiency</h3>
                  <p className="text-muted-foreground">535 Wp DCR RIL modules for maximum power output</p>
                </div>
                <div className="text-center p-6 bg-green-50 dark:bg-green-950 rounded-lg">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Complete Solution</h3>
                  <p className="text-muted-foreground">Everything included except civil materials</p>
                </div>
                <div className="text-center p-6 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <ArrowRight className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Ready to Install</h3>
                  <p className="text-muted-foreground">Professional installation and support</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Table */}
        <div className="mb-12">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center mb-4">System Configurations & Pricing</CardTitle>
              <CardDescription className="text-center">
                Choose the perfect system size for your energy needs. All prices include GST.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-50 dark:bg-blue-950">
                      <TableHead className="text-center font-semibold">Sl. No.</TableHead>
                      <TableHead className="text-center font-semibold">System Size (kWp)</TableHead>
                      <TableHead className="text-center font-semibold">No. of Modules</TableHead>
                      <TableHead className="text-center font-semibold">Inverter Capacity (kW)</TableHead>
                      <TableHead className="text-center font-semibold">Phase</TableHead>
                      <TableHead className="text-center font-semibold">Price with GST</TableHead>
                      <TableHead className="text-center font-semibold">Price per kWp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gridTieSystemData.map((system) => (
                      <TableRow key={system.slNo} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <TableCell className="text-center font-medium">{system.slNo}</TableCell>
                        <TableCell className="text-center font-semibold text-blue-600">
                          {system.systemSize}
                        </TableCell>
                        <TableCell className="text-center">{system.noOfModules}</TableCell>
                        <TableCell className="text-center">{system.inverterCapacity}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={system.phase === "Single" ? "secondary" : "default"}>
                            {system.phase}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-bold text-green-600">
                          {formatPrice(system.priceWithGST)}
                        </TableCell>
                        <TableCell className="text-center text-muted-foreground">
                          {formatPrice(calculatePricePerKWp(system.priceWithGST, system.systemSize))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features & Benefits */}
        <div className="mb-12">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center mb-4">Key Features & Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">What's Included:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>DCR RIL 535 Wp Solar Modules</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>String Inverter (Single/Three Phase)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>DC & AC Cables</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>Mounting Structure</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>Safety Equipment & Accessories</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span>Professional Installation</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">Benefits:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span>Reduce electricity bills by up to 90%</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span>Net metering support</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span>25-year module warranty</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span>Low maintenance costs</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span>Environmentally friendly</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span>Government subsidies available</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Go Solar?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Get a free consultation and custom quote for your Shakti Solar system installation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="text-blue-600 hover:text-blue-800"
                  asChild
                >
                  <Link to="/get-quote">
                    Get Free Quote
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                  asChild
                >
                  <Link to="/contact">
                    <Phone className="mr-2 w-5 h-5" />
                    Contact Us
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShaktiSolar;