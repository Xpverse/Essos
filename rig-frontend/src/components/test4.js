import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from '@mui/material';

function BeautifulTable() {
  const itemDetails = [
    { id: 1, matCode: "H115904-37 REF", description: "HP WELLHEAD HSG UNIT, ASSEMBLY", qty: 1, uom: "Each", psl: "Each", packingDetails: "Each", dimensions: { L: 30, W: 30, H: 50 }, weight: "Weight" },
    { id: 2, matCode: "H115904-37 REF", description: "HP WELLHEAD HSG UNIT, ASSEMBLY", qty: 1, uom: "Each", psl: "Each", packingDetails: "Each", dimensions: { L: 30, W: 30, H: 50 }, weight: "Weight" },
    { id: 3, matCode: "H115904-37 REF", description: "HP WELLHEAD HSG UNIT, ASSEMBLY", qty: 1, uom: "Each", psl: "Each", packingDetails: "Each", dimensions: { L: 30, W: 30, H: 50 }, weight: "Weight" },
  ];

  return (
    <TableContainer
      component={Paper}
      elevation={4}
      sx={{
        borderRadius: 3,
        backgroundColor: '#ffffff',
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#00796B' }}> 
            <TableCell padding="checkbox">
              <Checkbox sx={{ color: 'white' }} />
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>Sr No</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>Mat Code</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>Description</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>Qty</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>UOM</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>PSL/Owner</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>Packing Details</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>Dimensions (L x W x H)</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>Wt.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemDetails.map((item, index) => (
            <TableRow
              key={item.id}
              sx={{
                '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },  
                '&:hover': { backgroundColor: '#e0f2f1', transition: 'all 0.3s ease-in-out' }, 
              }}
            >
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.matCode}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.qty}</TableCell>
              <TableCell>{item.uom}</TableCell>
              <TableCell>{item.psl}</TableCell>
              <TableCell>{item.packingDetails}</TableCell>
              <TableCell>{`${item.dimensions.L} x ${item.dimensions.W} x ${item.dimensions.H}`}</TableCell>
              <TableCell>{item.weight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BeautifulTable;
