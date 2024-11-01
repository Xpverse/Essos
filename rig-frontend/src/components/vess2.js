import React, { useState } from 'react';
import { Box, Button, Checkbox, Container, IconButton, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const VesselMaterialRequest = () => {
  const [selectedVessel, setSelectedVessel] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  
  const vessels = [
    "Vessel Name 1 (Capacity)", 
    "Vessel Name 2 (Capacity)", 
    "Vessel Name 3 (Capacity)", 
    "Vessel Name 4 (Capacity)", 
    "Vessel Name 5 (Capacity)"
  ];

  const handleVesselChange = (event) => {
    setSelectedVessel(event.target.value);
  };

  const rows = [
    { srNo: 1, matCode: 'H115904-37 REF', description: 'HP WELLHEAD HSG UNIT, ASSEMBLY', qty: 1, uom: 'Each', owner: 'Each', packingDetails: 'Each', dimensions: '30 x 30 x 50', weight: 'weight' },
    { srNo: 2, matCode: 'H115904-37 REF', description: 'HP WELLHEAD HSG UNIT, ASSEMBLY', qty: 1, uom: 'Each', owner: 'Each', packingDetails: 'Each', dimensions: '30 x 30 x 50', weight: 'weight' },
  ];

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedRows = rows.map((row) => row.srNo);
      setSelectedRows(newSelectedRows);
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowClick = (srNo) => {
    const selectedIndex = selectedRows.indexOf(srNo);
    let newSelectedRows = [];

    if (selectedIndex === -1) {
      newSelectedRows = newSelectedRows.concat(selectedRows, srNo);
    } else if (selectedIndex === 0) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedRows = newSelectedRows.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelectedRows);
  };

  const isSelected = (srNo) => selectedRows.indexOf(srNo) !== -1;

  return (
    <Container>
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" style={{ marginLeft: 8 }}>Material Requests</Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} style={{ color: '#008080', borderColor: '#008080' }}>
          Create Material Request
        </Button>

        <Box display="flex" alignItems="center">
          <Select
            value={selectedVessel}
            onChange={handleVesselChange}
            displayEmpty
            variant="outlined"
            style={{ marginRight: 8, minWidth: 180, height: 40 }}
            MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
          >
            <MenuItem value="" disabled>Select Vessel</MenuItem>
            {vessels.map((vessel, index) => (
              <MenuItem key={index} value={vessel}>{vessel}</MenuItem>
            ))}
          </Select>
          <Button variant="contained" color="primary" style={{ backgroundColor: '#008080', height: 40 , borderRadius: 20}}>
            Assign
          </Button>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box>
          <Typography variant="subtitle2" color="textSecondary">Material Request</Typography>
          <Typography variant="body1" color="primary">Well-1 Drilling 36"</Typography>

          <Typography variant="subtitle2" color="textSecondary">Phase</Typography>
          <Typography variant="body1" color="primary">Drilling 36" hole</Typography>

          <Typography variant="subtitle2" color="textSecondary">Required by</Typography>
          <Typography variant="body1" color="primary">24-jul-24</Typography>

          <Typography variant="subtitle2" color="textSecondary">Requested by</Typography>
          <Typography variant="body1" color="primary">Supplier User-1</Typography>

          <Typography variant="subtitle2" color="textSecondary">From</Typography>
          <Typography variant="body1" color="primary">Base, Kakinada, Andhra Pradesh</Typography>

          <Typography variant="subtitle2" color="textSecondary">To</Typography>
          <Typography variant="body1" color="primary">Rig-1</Typography>
        </Box>

        <Box textAlign="right">
          <Box mt={2}>
            <Typography variant="subtitle2" color="textSecondary">Well</Typography>
            <Typography variant="body1" color="primary">Well-1</Typography>

            <Typography variant="subtitle2" color="textSecondary">Block</Typography>
            <Typography variant="body1" color="primary">Block-1</Typography>

            <Typography variant="subtitle2" color="textSecondary">Coordinates</Typography>
            <Typography variant="body1" color="primary">
              Lat: 11° 35' 36.608" N, Lon: 80°19'54.877E
            </Typography>
          </Box>
        </Box>
      </Box>

      <Typography variant="subtitle1" style={{ marginTop: 16 }}>Required Item Details</Typography>
      <TableContainer component={Paper} style={{ marginTop: 16 }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#b2ece9' }}>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                  checked={rows.length > 0 && selectedRows.length === rows.length}
                  onChange={handleSelectAllClick}
                />
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
            {rows.map((row, index) => {
              const isItemSelected = isSelected(row.srNo);
              return (
                <TableRow
                  key={index}
                  hover
                  onClick={() => handleRowClick(row.srNo)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                  style={{ backgroundColor: index % 2 ? '#f9f5e6' : 'white' }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" checked={isItemSelected} />
                  </TableCell>
                  <TableCell>{row.srNo}</TableCell>
                  <TableCell>{row.matCode}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.qty}</TableCell>
                  <TableCell>{row.uom}</TableCell>
                  <TableCell>{row.owner}</TableCell>
                  <TableCell>{row.packingDetails}</TableCell>
                  <TableCell>{row.dimensions}</TableCell>
                  <TableCell>{row.weight}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="flex-end" mt={1}>
        <Typography variant="body2" color="textSecondary">
          Logged in as <strong>System Admin</strong>
        </Typography>
      </Box>
    </Container>
  );
};

export default VesselMaterialRequest;
