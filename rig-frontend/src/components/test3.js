import React from 'react';
import { Container, Typography, Box, Grid, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from '@mui/material';
import { Send } from '@mui/icons-material';

function MaterialRequestSummary() {
  const materialRequestData = {
    requestName: "Well-1 Drilling 36\"",
    phase: "Drilling 36\" hole",
    requiredBy: "24-jul-24",
    requestedBy: "Supplier User-1",
    from: "Base, Kakinada, Andhra Pradesh",
    to: "Rig-1",
    well: "Well-1",
    block: "Block-1",
    coordinates: "Lat: 11°35'36.608\" N, Lon: 80°19'54.877E",
  };

  const itemDetails = [
    { id: 1, matCode: "H115904-37 REF", description: "HP WELLHEAD HSG UNIT, ASSEMBLY", qty: 1, uom: "Each", psl: "Each", packingDetails: "Each", dimensions: { L: 30, W: 30, H: 50 }, weight: "Weight" },
    { id: 2, matCode: "H115904-37 REF", description: "HP WELLHEAD HSG UNIT, ASSEMBLY", qty: 1, uom: "Each", psl: "Each", packingDetails: "Each", dimensions: { L: 30, W: 30, H: 50 }, weight: "Weight" },
    { id: 3, matCode: "H115904-37 REF", description: "HP WELLHEAD HSG UNIT, ASSEMBLY", qty: 1, uom: "Each", psl: "Each", packingDetails: "Each", dimensions: { L: 30, W: 30, H: 50 }, weight: "Weight" },
  ];

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
     
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: '#1e293b', 
          marginBottom: 4,
        }}
      >
        Material Requests
      </Typography>

      
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          borderRadius: 3,
          marginBottom: 4,
          backgroundColor: '#ffffff',
        }}
      >
        <Grid container spacing={4}>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#00796B', marginBottom: 2 }}>
              {materialRequestData.requestName}
            </Typography>

            <Typography variant="body2" sx={{ color: 'gray' }}>Phase</Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>{materialRequestData.phase}</Typography>

            <Typography variant="body2" sx={{ color: 'gray' }}>Required by</Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>{materialRequestData.requiredBy}</Typography>

            <Typography variant="body2" sx={{ color: 'gray' }}>Requested by</Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>{materialRequestData.requestedBy}</Typography>
          </Grid>

          
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ color: 'gray' }}>Well</Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>{materialRequestData.well}</Typography>

            <Typography variant="body2" sx={{ color: 'gray' }}>Block</Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>{materialRequestData.block}</Typography>

            <Typography variant="body2" sx={{ color: 'gray' }}>Coordinates</Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>{materialRequestData.coordinates}</Typography>
          </Grid>
        </Grid>
      </Paper>

     
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: '#00796B',
          marginBottom: 2,
        }}
      >
        Required Item Details
      </Typography>

      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          borderRadius: 3,
          backgroundColor: '#f9fafb',
          padding: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e0f7fa' }}>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>Sr No</TableCell>
              <TableCell>Mat Code</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>UOM</TableCell>
              <TableCell>PSL/Owner</TableCell>
              <TableCell>Packing Details</TableCell>
              <TableCell>Dimensions (L x W x H)</TableCell>
              <TableCell>Wt.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemDetails.map((item, index) => (
              <TableRow key={item.id} hover sx={{ transition: 'all 0.3s ease-in-out', '&:hover': { backgroundColor: '#e0f2f1' } }}>
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

      
      <Box display="flex" justifyContent="flex-end" sx={{ marginTop: 4 }}>
        <Button
          variant="contained"
          startIcon={<Send />}
          sx={{
            borderRadius: '24px',
            padding: '12px 28px',
            backgroundColor: '#00796B',
            fontSize: '16px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#004d40',
              transition: 'all 0.3s ease',
            },
          }}
        >
          Send Material Request
        </Button>
      </Box>
    </Container>
  );
}

export default MaterialRequestSummary;
