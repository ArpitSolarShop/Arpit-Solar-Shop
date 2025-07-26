// Shakti Solar Data Configuration
export interface GridTieSystemData {
  slNo: number
  systemSize: number
  noOfModules: number
  inverterCapacity: number
  phase: string
  preGiElevatedWithGst: number
  preGiElevatedPrice: number
}

export const gridTieSystemData: GridTieSystemData[] = [
  {
    slNo: 1,
    systemSize: 2.14,
    noOfModules: 4,
    inverterCapacity: 2,
    phase: "Single",
    preGiElevatedWithGst: 65000,
    preGiElevatedPrice: 130000,
  },
  {
    slNo: 2,
    systemSize: 3.21,
    noOfModules: 6,
    inverterCapacity: 3,
    phase: "Single",
    preGiElevatedWithGst: 61666.67,
    preGiElevatedPrice: 185000,
  },
  {
    slNo: 3,
    systemSize: 4.28,
    noOfModules: 8,
    inverterCapacity: 4,
    phase: "Single",
    preGiElevatedWithGst: 61250,
    preGiElevatedPrice: 245000,
  },
  {
    slNo: 4,
    systemSize: 4.82,
    noOfModules: 9,
    inverterCapacity: 4,
    phase: "Single",
    preGiElevatedWithGst: 57000,
    preGiElevatedPrice: 285000,
  },
  {
    slNo: 5,
    systemSize: 5.35,
    noOfModules: 10,
    inverterCapacity: 5,
    phase: "Single",
    preGiElevatedWithGst: 59000,
    preGiElevatedPrice: 295000,
  },
  {
    slNo: 6,
    systemSize: 5.35,
    noOfModules: 10,
    inverterCapacity: 5,
    phase: "Single",
    preGiElevatedWithGst: 59000,
    preGiElevatedPrice: 315000,
  },
  {
    slNo: 7,
    systemSize: 5.89,
    noOfModules: 11,
    inverterCapacity: 6,
    phase: "Three",
    preGiElevatedWithGst: 60000,
    preGiElevatedPrice: 330000,
  },
  {
    slNo: 8,
    systemSize: 8.03,
    noOfModules: 15,
    inverterCapacity: 8,
    phase: "Three",
    preGiElevatedWithGst: 60833.33,
    preGiElevatedPrice: 365000,
  },
  {
    slNo: 9,
    systemSize: 9.63,
    noOfModules: 18,
    inverterCapacity: 9,
    phase: "Three",
    preGiElevatedWithGst: 60625,
    preGiElevatedPrice: 485000,
  },
  {
    slNo: 10,
    systemSize: 10,
    noOfModules: 10,
    inverterCapacity: 10,
    phase: "Three",
    preGiElevatedWithGst: 60500,
    preGiElevatedPrice: 605000,
  },
]

// Configuration constants
export const SYSTEM_SIZE_LIMIT = 10 // kWp
export const COMPANY_NAME = "Shakti Solar"
export const PRODUCT_DESCRIPTION = "DCR RIL 535 Wp Modules with String Inverter"
export const WORK_SCOPE = "Complete Work Excluding Civil Material"
