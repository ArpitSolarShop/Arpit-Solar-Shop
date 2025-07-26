// Reliance Solar Data Configuration
export interface GridTieSystemData {
  slNo: number
  systemSize: number
  noOfModules: number
  inverterCapacity: number
  phase: string
  hdgElevatedWithGst: number
  hdgElevatedPrice: number
}

export interface LargeSystemData {
  slNo: number
  systemSizeKWp: number
  systemSizeKW: number
  noOfModules: number
  inverterCapacity: number
  phase: string
  shortRailTinShedPricePerWatt: number
  shortRailTinShedPrice: number
  hdgElevatedRccPricePerWatt: number
  hdgElevatedRccPrice: number
  preGiMmsPricePerWatt: number
  preGiMmsPrice: number
  priceWithoutMmsPricePerWatt: number
  priceWithoutMmsPrice: number
}

export interface DCCableData {
  srNo: number
  productDescription: string
  uom: string
  quantity: number
  price: number
  total: number
}

export interface KitItem {
  srNo: number
  item: string
  description: string
}

// Data
export const gridTieSystemData: GridTieSystemData[] = [
  {
    slNo: 1,
    systemSize: 3.45,
    noOfModules: 5,
    inverterCapacity: 3,
    phase: "Single",
    hdgElevatedWithGst: 61.13,
    hdgElevatedPrice: 210900,
  },
  {
    slNo: 2,
    systemSize: 5.52,
    noOfModules: 8,
    inverterCapacity: 5,
    phase: "Single",
    hdgElevatedWithGst: 60.22,
    hdgElevatedPrice: 332410,
  },
  {
    slNo: 3,
    systemSize: 5.52,
    noOfModules: 8,
    inverterCapacity: 5,
    phase: "Three",
    hdgElevatedWithGst: 65.06,
    hdgElevatedPrice: 359153,
  },
  {
    slNo: 4,
    systemSize: 8.28,
    noOfModules: 12,
    inverterCapacity: 10,
    phase: "Three",
    hdgElevatedWithGst: 58.55,
    hdgElevatedPrice: 484822,
  },
  {
    slNo: 5,
    systemSize: 10.35,
    noOfModules: 15,
    inverterCapacity: 10,
    phase: "Three",
    hdgElevatedWithGst: 55.45,
    hdgElevatedPrice: 573910,
  },
  {
    slNo: 6,
    systemSize: 13.8,
    noOfModules: 20,
    inverterCapacity: 10,
    phase: "Three",
    hdgElevatedWithGst: 53.49,
    hdgElevatedPrice: 738095,
  },
]

export const largeSystemData: LargeSystemData[] = [
  {
    slNo: 1,
    systemSizeKWp: 19.32,
    systemSizeKW: 15,
    noOfModules: 28,
    inverterCapacity: 15,
    phase: "Three",
    shortRailTinShedPricePerWatt: 33.91,
    shortRailTinShedPrice: 655060,
    hdgElevatedRccPricePerWatt: 38.91,
    hdgElevatedRccPrice: 751660,
    preGiMmsPricePerWatt: 36.57,
    preGiMmsPrice: 706500,
    priceWithoutMmsPricePerWatt: 32.0761956,
    priceWithoutMmsPrice: 619560,
  },
  {
    slNo: 2,
    systemSizeKWp: 33.12,
    systemSizeKW: 25,
    noOfModules: 48,
    inverterCapacity: 20,
    phase: "Three",
    shortRailTinShedPricePerWatt: 32.92,
    shortRailTinShedPrice: 1090460,
    hdgElevatedRccPricePerWatt: 37.92,
    hdgElevatedRccPrice: 1256060,
    preGiMmsPricePerWatt: 36.08,
    preGiMmsPrice: 1195060,
    priceWithoutMmsPricePerWatt: 31.08102946,
    priceWithoutMmsPrice: 1029460,
  },
  {
    slNo: 3,
    systemSizeKWp: 52.44,
    systemSizeKW: 40,
    noOfModules: 76,
    inverterCapacity: 40,
    phase: "Three",
    shortRailTinShedPricePerWatt: 31.96,
    shortRailTinShedPrice: 1676180,
    hdgElevatedRccPricePerWatt: 36.96,
    hdgElevatedRccPrice: 1938380,
    preGiMmsPricePerWatt: 35.62,
    preGiMmsPrice: 1867900,
    priceWithoutMmsPricePerWatt: 30.12157948,
    priceWithoutMmsPrice: 1579480,
  },
  {
    slNo: 4,
    systemSizeKWp: 65.55,
    systemSizeKW: 50,
    noOfModules: 95,
    inverterCapacity: 50,
    phase: "Three",
    shortRailTinShedPricePerWatt: 31.23,
    shortRailTinShedPrice: 2047350,
    hdgElevatedRccPricePerWatt: 36.23,
    hdgElevatedRccPrice: 2375100,
    preGiMmsPricePerWatt: 34.39,
    preGiMmsPrice: 2254300,
    priceWithoutMmsPricePerWatt: 29.39192655,
    priceWithoutMmsPrice: 1926550,
  },
  {
    slNo: 5,
    systemSizeKWp: 105.57,
    systemSizeKW: 80,
    noOfModules: 153,
    inverterCapacity: 80,
    phase: "Three",
    shortRailTinShedPricePerWatt: 30.22,
    shortRailTinShedPrice: 3190020,
    hdgElevatedRccPricePerWatt: 35.22,
    hdgElevatedRccPrice: 3717870,
    preGiMmsPricePerWatt: 34.87,
    preGiMmsPrice: 3681725,
    priceWithoutMmsPricePerWatt: 28.37299552,
    priceWithoutMmsPrice: 2995520,
  },
  {
    slNo: 6,
    systemSizeKWp: 124.2,
    systemSizeKW: 100,
    noOfModules: 180,
    inverterCapacity: 100,
    phase: "Three",
    shortRailTinShedPricePerWatt: 30.04,
    shortRailTinShedPrice: 3731500,
    hdgElevatedRccPricePerWatt: 35.04,
    hdgElevatedRccPrice: 4352500,
    preGiMmsPricePerWatt: 34.21,
    preGiMmsPrice: 4248400,
    priceWithoutMmsPricePerWatt: 28.2135032,
    priceWithoutMmsPrice: 3503200,
  },
  {
    slNo: 7,
    systemSizeKWp: 165.6,
    systemSizeKW: 125,
    noOfModules: 240,
    inverterCapacity: 125,
    phase: "Three",
    shortRailTinShedPricePerWatt: 29.46,
    shortRailTinShedPrice: 4878300,
    hdgElevatedRccPricePerWatt: 34.46,
    hdgElevatedRccPrice: 5706300,
    preGiMmsPricePerWatt: 34.62,
    preGiMmsPrice: 5732600,
    priceWithoutMmsPricePerWatt: 27.6245734,
    priceWithoutMmsPrice: 4573400,
  },
]

export const dcCableData: DCCableData[] = [
  {
    srNo: 1,
    productDescription: "DC Cable ble Insulated X",
    uom: "Mtrs",
    quantity: 500,
    price: 46.67,
    total: 23333.33,
  },
  {
    srNo: 2,
    productDescription: "DC Cable ble Insulated XL",
    uom: "Mtrs",
    quantity: 500,
    price: 46.67,
    total: 23333.33,
  },
]

export const kitItems: KitItem[] = [
  { srNo: 1, item: "Module", description: "RIL 690-720 Wp Module - Silicon" },
  { srNo: 2, item: "Inverter", description: "3 String Inverter (According to system size)" },
  { srNo: 3, item: "ACDB", description: "ACDB, IP65 Protected with MCB 4P-1 Nos." },
  { srNo: 4, item: "MC4 Connector", description: "Male & female (both)" },
  { srNo: 5, item: "Monitoring Device", description: "Network device, with 5 year of network service" },
  { srNo: 6, item: "MMS", description: "Mounting & Monitoring System" },
]

// Configuration constants
export const RESIDENTIAL_SYSTEM_SIZE_LIMIT = 13.8 // kWp - largest residential system
export const COMMERCIAL_SYSTEM_SIZE_LIMIT = 165.6 // kWp - largest commercial system
export const COMPANY_NAME = "Reliance Solar"
export const PRODUCT_DESCRIPTION = "RIL 690-720 Wp HJT Solar Modules"
export const WORK_SCOPE = "Complete System Package"
