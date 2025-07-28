// Commercial Solar Data Configuration for both companies

// Reliance Solar Commercial Data
export interface RelianceCommercialData {
  slNo: number
  systemSize: number
  noOfModules: number
  inverterCapacity: number
  phase: string
  pricePerWatt: number
  totalPrice: number
  monthlyGeneration: number
  roofAreaRequired: number
  monthlySavings: number
  paybackPeriod: number
  co2Reduction: number
}

export const relianceCommercialData: RelianceCommercialData[] = [
  {
    slNo: 1,
    systemSize: 19.32,
    noOfModules: 28,
    inverterCapacity: 15,
    phase: "Three",
    pricePerWatt: 32.07,
    totalPrice: 619560,
    monthlyGeneration: 2318,
    roofAreaRequired: 1400,
    monthlySavings: 18544,
    paybackPeriod: 2.8,
    co2Reduction: 28.98,
  },
  {
    slNo: 2,
    systemSize: 33.12,
    noOfModules: 48,
    inverterCapacity: 20,
    phase: "Three",
    pricePerWatt: 31.08,
    totalPrice: 1029460,
    monthlyGeneration: 3974,
    roofAreaRequired: 2400,
    monthlySavings: 31792,
    paybackPeriod: 2.7,
    co2Reduction: 49.68,
  },
  {
    slNo: 3,
    systemSize: 52.44,
    noOfModules: 76,
    inverterCapacity: 40,
    phase: "Three",
    pricePerWatt: 30.12,
    totalPrice: 1579480,
    monthlyGeneration: 6293,
    roofAreaRequired: 3800,
    monthlySavings: 50344,
    paybackPeriod: 2.6,
    co2Reduction: 78.66,
  },
  {
    slNo: 4,
    systemSize: 65.55,
    noOfModules: 95,
    inverterCapacity: 50,
    phase: "Three",
    pricePerWatt: 29.39,
    totalPrice: 1926550,
    monthlyGeneration: 7866,
    roofAreaRequired: 4750,
    monthlySavings: 62928,
    paybackPeriod: 2.5,
    co2Reduction: 98.33,
  },
  {
    slNo: 5,
    systemSize: 105.57,
    noOfModules: 153,
    inverterCapacity: 80,
    phase: "Three",
    pricePerWatt: 28.37,
    totalPrice: 2995520,
    monthlyGeneration: 12668,
    roofAreaRequired: 7650,
    monthlySavings: 101344,
    paybackPeriod: 2.5,
    co2Reduction: 158.36,
  },
  {
    slNo: 6,
    systemSize: 124.2,
    noOfModules: 180,
    inverterCapacity: 100,
    phase: "Three",
    pricePerWatt: 28.21,
    totalPrice: 3503200,
    monthlyGeneration: 14904,
    roofAreaRequired: 9000,
    monthlySavings: 119232,
    paybackPeriod: 2.4,
    co2Reduction: 186.3,
  },
  {
    slNo: 7,
    systemSize: 165.6,
    noOfModules: 240,
    inverterCapacity: 125,
    phase: "Three",
    pricePerWatt: 27.62,
    totalPrice: 4573400,
    monthlyGeneration: 19872,
    roofAreaRequired: 12000,
    monthlySavings: 158976,
    paybackPeriod: 2.4,
    co2Reduction: 248.4,
  },
]

// Configuration constants
export const RELIANCE_COMPANY_NAME = "Reliance Solar"
export const RELIANCE_PRODUCT_DESCRIPTION = "Non DCR RIL 690 Wp HJT Solar Modules"
export const RELIANCE_WORK_SCOPE = "Complete System Package (Excluding GST & Net Metering)"

export const COMMERCIAL_SYSTEM_SIZE_LIMIT = 1000 // kWp - largest commercial system
