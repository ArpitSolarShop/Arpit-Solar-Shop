// Residential Solar Data Configuration for both companies

// Shakti Solar Residential Data
export interface ShaktiResidentialData {
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
}

export const shaktiResidentialData: ShaktiResidentialData[] = [
  {
    slNo: 1,
    systemSize: 2.14,
    noOfModules: 4,
    inverterCapacity: 2,
    phase: "Single",
    pricePerWatt: 60.75,
    totalPrice: 130000,
    monthlyGeneration: 257,
    roofAreaRequired: 160,
    monthlySavings: 2056,
    paybackPeriod: 5.3,
  },
  {
    slNo: 2,
    systemSize: 3.21,
    noOfModules: 6,
    inverterCapacity: 3,
    phase: "Single",
    pricePerWatt: 57.63,
    totalPrice: 185000,
    monthlyGeneration: 385,
    roofAreaRequired: 240,
    monthlySavings: 3080,
    paybackPeriod: 5.0,
  },
  {
    slNo: 3,
    systemSize: 4.28,
    noOfModules: 8,
    inverterCapacity: 4,
    phase: "Single",
    pricePerWatt: 57.24,
    totalPrice: 245000,
    monthlyGeneration: 514,
    roofAreaRequired: 320,
    monthlySavings: 4112,
    paybackPeriod: 5.0,
  },
  {
    slNo: 4,
    systemSize: 4.82,
    noOfModules: 9,
    inverterCapacity: 4,
    phase: "Single",
    pricePerWatt: 59.13,
    totalPrice: 285000,
    monthlyGeneration: 578,
    roofAreaRequired: 360,
    monthlySavings: 4624,
    paybackPeriod: 5.1,
  },
  {
    slNo: 5,
    systemSize: 5.35,
    noOfModules: 10,
    inverterCapacity: 5,
    phase: "Single",
    pricePerWatt: 55.14,
    totalPrice: 295000,
    monthlyGeneration: 642,
    roofAreaRequired: 400,
    monthlySavings: 5136,
    paybackPeriod: 4.8,
  },
  {
    slNo: 6,
    systemSize: 5.35,
    noOfModules: 10,
    inverterCapacity: 5,
    phase: "Single",
    pricePerWatt: 58.88,
    totalPrice: 315000,
    monthlyGeneration: 642,
    roofAreaRequired: 400,
    monthlySavings: 5136,
    paybackPeriod: 5.1,
  },
  {
    slNo: 7,
    systemSize: 5.89,
    noOfModules: 11,
    inverterCapacity: 6,
    phase: "Three",
    pricePerWatt: 56.03,
    totalPrice: 330000,
    monthlyGeneration: 707,
    roofAreaRequired: 440,
    monthlySavings: 5656,
    paybackPeriod: 4.9,
  },
  {
    slNo: 8,
    systemSize: 8.03,
    noOfModules: 15,
    inverterCapacity: 8,
    phase: "Three",
    pricePerWatt: 45.46,
    totalPrice: 365000,
    monthlyGeneration: 964,
    roofAreaRequired: 600,
    monthlySavings: 7712,
    paybackPeriod: 3.9,
  },
  {
    slNo: 9,
    systemSize: 9.63,
    noOfModules: 18,
    inverterCapacity: 9,
    phase: "Three",
    pricePerWatt: 50.36,
    totalPrice: 485000,
    monthlyGeneration: 1156,
    roofAreaRequired: 720,
    monthlySavings: 9248,
    paybackPeriod: 4.4,
  },
  {
    slNo: 10,
    systemSize: 10.0,
    noOfModules: 10,
    inverterCapacity: 10,
    phase: "Three",
    pricePerWatt: 60.5,
    totalPrice: 605000,
    monthlyGeneration: 1200,
    roofAreaRequired: 400,
    monthlySavings: 9600,
    paybackPeriod: 5.3,
  },
]

// Reliance Solar Residential Data
export interface RelianceResidentialData {
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
}

export const relianceResidentialData: RelianceResidentialData[] = [
  {
    slNo: 1,
    systemSize: 3.45,
    noOfModules: 5,
    inverterCapacity: 3,
    phase: "Single",
    pricePerWatt: 61.13,
    totalPrice: 210900,
    monthlyGeneration: 414,
    roofAreaRequired: 250,
    monthlySavings: 3312,
    paybackPeriod: 5.3,
  },
  {
    slNo: 2,
    systemSize: 5.52,
    noOfModules: 8,
    inverterCapacity: 5,
    phase: "Single",
    pricePerWatt: 60.22,
    totalPrice: 332410,
    monthlyGeneration: 662,
    roofAreaRequired: 400,
    monthlySavings: 5296,
    paybackPeriod: 5.2,
  },
  {
    slNo: 3,
    systemSize: 5.52,
    noOfModules: 8,
    inverterCapacity: 5,
    phase: "Three",
    pricePerWatt: 65.06,
    totalPrice: 359153,
    monthlyGeneration: 662,
    roofAreaRequired: 400,
    monthlySavings: 5296,
    paybackPeriod: 5.7,
  },
  {
    slNo: 4,
    systemSize: 8.28,
    noOfModules: 12,
    inverterCapacity: 10,
    phase: "Three",
    pricePerWatt: 58.55,
    totalPrice: 484822,
    monthlyGeneration: 994,
    roofAreaRequired: 600,
    monthlySavings: 7952,
    paybackPeriod: 5.1,
  },
  {
    slNo: 5,
    systemSize: 10.35,
    noOfModules: 15,
    inverterCapacity: 10,
    phase: "Three",
    pricePerWatt: 55.45,
    totalPrice: 573910,
    monthlyGeneration: 1242,
    roofAreaRequired: 750,
    monthlySavings: 9936,
    paybackPeriod: 4.8,
  },
  {
    slNo: 6,
    systemSize: 13.8,
    noOfModules: 20,
    inverterCapacity: 10,
    phase: "Three",
    pricePerWatt: 53.49,
    totalPrice: 738095,
    monthlyGeneration: 1656,
    roofAreaRequired: 1000,
    monthlySavings: 13248,
    paybackPeriod: 4.6,
  },
]

// Configuration constants
export const SHAKTI_COMPANY_NAME = "Shakti Solar"
export const SHAKTI_PRODUCT_DESCRIPTION = "DCR RIL 535 Wp Modules with String Inverter"
export const SHAKTI_WORK_SCOPE = "Complete Work Excluding Civil Material"

export const RELIANCE_COMPANY_NAME = "Reliance Solar"
export const RELIANCE_PRODUCT_DESCRIPTION = "RIL 690-720 Wp HJT Solar Modules"
export const RELIANCE_WORK_SCOPE = "Complete System Package"

export const RESIDENTIAL_SYSTEM_SIZE_LIMIT = 13.8 // kWp - largest residential system
