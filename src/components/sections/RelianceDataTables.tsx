import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
} from '@mui/material';

// Data types
interface GridTieSystemData {
  slNo: number;
  systemSize: number;
  noOfModules: number;
  inverterCapacity: number;
  phase: string;
  hdgElevatedWithGst: number;
  hdgElevatedPrice: number;
}

interface LargeSystemData {
  slNo: number;
  systemSizeKWp: number;
  systemSizeKW: number;
  noOfModules: number;
  inverterCapacity: number;
  phase: string;
  shortRailTinShedPricePerWatt: number;
  shortRailTinShedPrice: number;
  hdgElevatedRccPricePerWatt: number;
  hdgElevatedRccPrice: number;
  preGiMmsPricePerWatt: number;
  preGiMmsPrice: number;
}

interface DCCableData {
  srNo: number;
  productDescription: string;
  uom: string;
  quantity: number;
  price: number;
  total: number;
}

interface KitItem {
  srNo: number;
  item: string;
  description: string;
}

// Sample data based on user input
const gridTieSystemData: GridTieSystemData[] = [
  { slNo: 1, systemSize: 3.45, noOfModules: 5, inverterCapacity: 3, phase: 'Single', hdgElevatedWithGst: 61.13, hdgElevatedPrice: 210900 },
  { slNo: 2, systemSize: 5.52, noOfModules: 8, inverterCapacity: 5, phase: 'Single', hdgElevatedWithGst: 60.22, hdgElevatedPrice: 332410 },
  { slNo: 3, systemSize: 5.52, noOfModules: 8, inverterCapacity: 5, phase: 'Three', hdgElevatedWithGst: 65.06, hdgElevatedPrice: 359153 },
  { slNo: 4, systemSize: 8.28, noOfModules: 12, inverterCapacity: 10, phase: 'Three', hdgElevatedWithGst: 58.55, hdgElevatedPrice: 484822 },
  { slNo: 5, systemSize: 10.35, noOfModules: 15, inverterCapacity: 10, phase: 'Three', hdgElevatedWithGst: 55.45, hdgElevatedPrice: 573910 },
  { slNo: 6, systemSize: 13.8, noOfModules: 20, inverterCapacity: 10, phase: 'Three', hdgElevatedWithGst: 53.49, hdgElevatedPrice: 738095 },
];

const largeSystemData: LargeSystemData[] = [
  { slNo: 1, systemSizeKWp: 19.32, systemSizeKW: 15, noOfModules: 28, inverterCapacity: 15, phase: 'Three', shortRailTinShedPricePerWatt: 33.91, shortRailTinShedPrice: 655060, hdgElevatedRccPricePerWatt: 38.91, hdgElevatedRccPrice: 751660, preGiMmsPricePerWatt: 36.57, preGiMmsPrice: 706500 },
  { slNo: 2, systemSizeKWp: 33.12, systemSizeKW: 25, noOfModules: 48, inverterCapacity: 20, phase: 'Three', shortRailTinShedPricePerWatt: 32.92, shortRailTinShedPrice: 1090460, hdgElevatedRccPricePerWatt: 37.92, hdgElevatedRccPrice: 1256060, preGiMmsPricePerWatt: 36.08, preGiMmsPrice: 1195060 },
  { slNo: 3, systemSizeKWp: 52.44, systemSizeKW: 40, noOfModules: 76, inverterCapacity: 40, phase: 'Three', shortRailTinShedPricePerWatt: 31.96, shortRailTinShedPrice: 1676180, hdgElevatedRccPricePerWatt: 36.96, hdgElevatedRccPrice: 1938380, preGiMmsPricePerWatt: 35.62, preGiMmsPrice: 1867900 },
  { slNo: 4, systemSizeKWp: 65.55, systemSizeKW: 50, noOfModules: 95, inverterCapacity: 50, phase: 'Three', shortRailTinShedPricePerWatt: 31.23, shortRailTinShedPrice: 2047350, hdgElevatedRccPricePerWatt: 36.23, hdgElevatedRccPrice: 2375100, preGiMmsPricePerWatt: 34.39, preGiMmsPrice: 2254300 },
  { slNo: 5, systemSizeKWp: 105.57, systemSizeKW: 80, noOfModules: 153, inverterCapacity: 80, phase: 'Three', shortRailTinShedPricePerWatt: 30.22, shortRailTinShedPrice: 3190020, hdgElevatedRccPricePerWatt: 35.22, hdgElevatedRccPrice: 3717870, preGiMmsPricePerWatt: 34.87, preGiMmsPrice: 3681725 },
  { slNo: 6, systemSizeKWp: 124.2, systemSizeKW: 100, noOfModules: 180, inverterCapacity: 100, phase: 'Three', shortRailTinShedPricePerWatt: 30.04, shortRailTinShedPrice: 3731500, hdgElevatedRccPricePerWatt: 35.04, hdgElevatedRccPrice: 4352500, preGiMmsPricePerWatt: 34.21, preGiMmsPrice: 4248400 },
  { slNo: 7, systemSizeKWp: 165.6, systemSizeKW: 125, noOfModules: 240, inverterCapacity: 125, phase: 'Three', shortRailTinShedPricePerWatt: 29.46, shortRailTinShedPrice: 4878300, hdgElevatedRccPricePerWatt: 34.46, hdgElevatedRccPrice: 5706300, preGiMmsPricePerWatt: 34.62, preGiMmsPrice: 5732600 },
];

const dcCableData: DCCableData[] = [
  { srNo: 1, productDescription: 'DC Cable ble Insulated X', uom: 'Mtrs', quantity: 500, price: 46.67, total: 23333.33 },
  { srNo: 2, productDescription: 'DC Cable ble Insulated XL', uom: 'Mtrs', quantity: 500, price: 46.67, total: 23333.33 },
];

const kitItems: KitItem[] = [
  { srNo: 1, item: 'Module', description: 'RIL 690-720 Wp Module - Silicon' },
  { srNo: 2, item: 'Inverter', description: '3 String Invert (According to system size)' },
  { srNo: 3, item: 'ACDB', description: 'ACDB, IP65 Protected with MCB 4P-1 Nos.,' },
  { srNo: 4, item: 'MC4 Connector', description: 'Male & female (both)' },
  { srNo: 5, item: 'Sig Device', description: 'Network device, with 5 year of network' },
  { srNo: 6, item: 'MMS', description: '' },
];

// Column helpers
const gridTieColumnHelper = createColumnHelper<GridTieSystemData>();
const largeSystemColumnHelper = createColumnHelper<LargeSystemData>();
const dcCableColumnHelper = createColumnHelper<DCCableData>();
const kitColumnHelper = createColumnHelper<KitItem>();

// Grid Tie System Table
const GridTieSystemTable: React.FC = () => {
  const columns = [
    gridTieColumnHelper.accessor('slNo', {
      header: 'Sl No.',
      cell: info => info.getValue(),
    }),
    gridTieColumnHelper.accessor('systemSize', {
      header: 'System Size (kWp)',
      cell: info => info.getValue(),
    }),
    gridTieColumnHelper.accessor('noOfModules', {
      header: 'No of Modules',
      cell: info => info.getValue(),
    }),
    gridTieColumnHelper.accessor('inverterCapacity', {
      header: 'Inverter Capacity Kw',
      cell: info => info.getValue(),
    }),
    gridTieColumnHelper.accessor('phase', {
      header: 'Phase',
      cell: info => (
        <Chip 
          label={info.getValue()} 
          color={info.getValue() === 'Single' ? 'primary' : 'secondary'}
          size="small"
        />
      ),
    }),
    gridTieColumnHelper.accessor('hdgElevatedWithGst', {
      header: 'HDG Elevated with Gst',
      cell: info => info.getValue().toFixed(2),
    }),
    gridTieColumnHelper.accessor('hdgElevatedPrice', {
      header: 'HDG Elevated with Gst',
      cell: info => `₹${info.getValue().toLocaleString()}`,
    }),
  ];

  const table = useReactTable({
    data: gridTieSystemData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box mb={4}>
      <Typography variant="h5" component="h3" gutterBottom color="primary" fontWeight="bold">
        Grid Tie with Non DCR RIL 690 Wp HJT Modules (Excluding GST & Net Metering)
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} sx={{ backgroundColor: '#1976d2' }}>
                {headerGroup.headers.map(header => (
                  <TableCell 
                    key={header.id} 
                    sx={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id} hover>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// Large System Table
const LargeSystemTable: React.FC = () => {
  const columns = [
    largeSystemColumnHelper.accessor('slNo', {
      header: 'Sl No.',
      cell: info => info.getValue(),
    }),
    largeSystemColumnHelper.accessor('systemSizeKWp', {
      header: 'System Size (kWp)',
      cell: info => info.getValue(),
    }),
    largeSystemColumnHelper.accessor('systemSizeKW', {
      header: 'System Size (kW)',
      cell: info => info.getValue(),
    }),
    largeSystemColumnHelper.accessor('noOfModules', {
      header: 'No. of Modules',
      cell: info => info.getValue(),
    }),
    largeSystemColumnHelper.accessor('inverterCapacity', {
      header: 'Inverter Capacity (Kw)',
      cell: info => info.getValue(),
    }),
    largeSystemColumnHelper.accessor('phase', {
      header: 'Phase',
      cell: info => (
        <Chip 
          label={info.getValue()} 
          color="secondary"
          size="small"
        />
      ),
    }),
    largeSystemColumnHelper.accessor('shortRailTinShedPricePerWatt', {
      header: 'Short Rail for tin Shed Final Pricing/watt',
      cell: info => info.getValue().toFixed(2),
    }),
    largeSystemColumnHelper.accessor('shortRailTinShedPrice', {
      header: 'Short Rail for tin Shed (Price Wo GST)',
      cell: info => `₹${info.getValue().toLocaleString()}`,
    }),
    largeSystemColumnHelper.accessor('hdgElevatedRccPricePerWatt', {
      header: 'Price HDG Elevated for Rcc Final Pricing/watt',
      cell: info => info.getValue().toFixed(2),
    }),
    largeSystemColumnHelper.accessor('hdgElevatedRccPrice', {
      header: 'Price HDG Elevated for Rcc (Price Wo GST)',
      cell: info => `₹${info.getValue().toLocaleString()}`,
    }),
    largeSystemColumnHelper.accessor('preGiMmsPricePerWatt', {
      header: 'Pre GI MMS NOC required Final Pricing/watt',
      cell: info => info.getValue().toFixed(2),
    }),
    largeSystemColumnHelper.accessor('preGiMmsPrice', {
      header: 'Pre GI MMS NOC required (Price Wo GST)',
      cell: info => `₹${info.getValue().toLocaleString()}`,
    }),
  ];

  const table = useReactTable({
    data: largeSystemData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box mb={4}>
      <Typography variant="h5" component="h3" gutterBottom color="primary" fontWeight="bold">
        Grid Tie with Non DCR RIL 690 Wp HJT Modules (Excluding GST& Net Metering)
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table size="small">
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} sx={{ backgroundColor: '#1976d2' }}>
                {headerGroup.headers.map(header => (
                  <TableCell 
                    key={header.id} 
                    sx={{ color: 'white', fontWeight: 'bold', fontSize: '12px', padding: '8px 4px' }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id} hover>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} sx={{ fontSize: '13px', padding: '8px 4px' }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// DC Cable Table
const DCCableTable: React.FC = () => {
  const columns = [
    dcCableColumnHelper.accessor('srNo', {
      header: 'Sr No',
      cell: info => info.getValue(),
    }),
    dcCableColumnHelper.accessor('productDescription', {
      header: 'Product Description',
      cell: info => info.getValue(),
    }),
    dcCableColumnHelper.accessor('uom', {
      header: 'UOM',
      cell: info => info.getValue(),
    }),
    dcCableColumnHelper.accessor('quantity', {
      header: 'Quantity',
      cell: info => info.getValue(),
    }),
    dcCableColumnHelper.accessor('price', {
      header: 'Price',
      cell: info => `₹${info.getValue().toFixed(2)}`,
    }),
    dcCableColumnHelper.accessor('total', {
      header: 'Total',
      cell: info => `₹${info.getValue().toLocaleString()}`,
    }),
  ];

  const table = useReactTable({
    data: dcCableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalAmount = dcCableData.reduce((sum, item) => sum + item.total, 0);

  return (
    <Box mb={4}>
      <Typography variant="h5" component="h3" gutterBottom color="primary" fontWeight="bold">
        Bulk Supply - DC Cables
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} sx={{ backgroundColor: '#1976d2' }}>
                {headerGroup.headers.map(header => (
                  <TableCell 
                    key={header.id} 
                    sx={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id} hover>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell colSpan={5} sx={{ fontWeight: 'bold', textAlign: 'right' }}>
                Total Amount:
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                ₹{totalAmount.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// Kit Items Table
const KitItemsTable: React.FC = () => {
  const columns = [
    kitColumnHelper.accessor('srNo', {
      header: 'Sr No.',
      cell: info => info.getValue(),
    }),
    kitColumnHelper.accessor('item', {
      header: 'Item',
      cell: info => info.getValue(),
    }),
    kitColumnHelper.accessor('description', {
      header: 'Description',
      cell: info => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: kitItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box mb={4}>
      <Typography variant="h5" component="h3" gutterBottom color="primary" fontWeight="bold">
        Items provided under above mention kit (Our Scope)
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} sx={{ backgroundColor: '#1976d2' }}>
                {headerGroup.headers.map(header => (
                  <TableCell 
                    key={header.id} 
                    sx={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id} hover>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// Terms and Conditions Component
const TermsAndConditions: React.FC = () => {
  const terms = [
    "This pricing is effective from 22st May 2025 to 30th June 2025 subject, to material availability.",
    "All prices are subject to change without notice and are not guaranteed, except that prices for an order that have been accepted by RIL.",
    "Published prices are basic and are exclusive of taxes. Goods and Services Tax (GST) as applicable will be extra.",
    "Above prices are Ex- Work prices",
    "Full payment (100%) is required in advance upon placing the order.",
    "Orders to be placed on specified Purchase Order template issued by RIL in favour of Reliance Industries Limited.",
    "NDCR Modules supplied will have a capacity of 690-720 Wp subject to availability.",
    "Delivery of material will occur within approx. 5 weeks on receipt of accepted purchase order and full payment, depending on distance and availability of material.",
    "Materials not supplied directly by RIL must be sourced from approved manufacturers and specifications as shared by RIL.",
    "Warranty terms and conditions as specified in the warranty certificate issued on QA check.",
    "Before installation of the system at the customer premises, site survey form, site layout and array layout supported with photographs must be approved by RIL. Any modifications/changes suggested by RIL shall have to be followed and implemented mandatorily, without which warranty certificate will not be applicable.",
    "Installation and commissioning of the system are the responsibility of the Channel Partner, following RIL guidelines. All installed systems must be offered for RIL quality inspection for issuing the warranty certification with the specified completed installation & commissioning checklist and photographs. Proper personal protective equipment (PPE) and safety protocols must be followed during installation.",
    "All site-related activities, including net metering and DISCOM synchronization approvals, are the responsibility of the Channel Partners.",
    "Cancellation of any previous orders will attract 2% of Purchase order value.",
    "Any information, suggestions, or ideas transmitted by RIL connection with this price list a secret or confidential or submitted in confidence to Channel Partner, except as may be specifically agreed to in writing by Channel Partner.",
    "All terms and conditions will be valid as per the Channel Partner Agreement."
  ];

  return (
    <Box mb={4}>
      <Typography variant="h5" component="h3" gutterBottom color="primary" fontWeight="bold">
        Terms and Conditions
      </Typography>
      <Paper elevation={2} sx={{ p: 3 }}>
        <ol>
          {terms.map((term, index) => (
            <li key={index} style={{ marginBottom: '8px', fontSize: '14px', lineHeight: '1.5' }}>
              {term}
            </li>
          ))}
        </ol>
      </Paper>
    </Box>
  );
};

// Main component that exports all tables
const RelianceDataTables: React.FC = () => {
  return (
    <Box sx={{ p: 2 }}>
      <GridTieSystemTable />
      <LargeSystemTable />
      <DCCableTable />
      <KitItemsTable />
      <TermsAndConditions />
    </Box>
  );
};

export default RelianceDataTables;