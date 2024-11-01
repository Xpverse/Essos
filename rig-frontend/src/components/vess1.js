import React from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, IconButton, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

const VesselsTable = () => {
  const rows = [
    { name: 'Vessel-1', bulk: '50%', fuel: '80%', deck: '20%', status: 'Cargo Loading', location: 'Rig 1', designation: 'Designation', manifest: 'Create', journey: 'Start' },
    { name: 'Vessel-1', bulk: '50%', fuel: '80%', deck: '20%', status: 'Cargo Loading', location: 'Rig 1', designation: 'Designation', manifest: 'View', journey: 'End' },
    { name: 'Vessel-1', bulk: '50%', fuel: '80%', deck: '20%', status: 'Cargo Loading', location: 'Rig 1', designation: 'Designation', manifest: 'Create', journey: 'Start' },
    { name: 'Vessel-1', bulk: '50%', fuel: '80%', deck: '20%', status: 'Cargo Loading', location: 'Rig 1', designation: 'Designation', manifest: 'View', journey: 'End' },
    { name: 'Vessel-1', bulk: '50%', fuel: '80%', deck: '20%', status: 'Cargo Loading', location: 'Rig 1', designation: 'Designation', manifest: 'Create', journey: 'End' },
  ];

  return (
    <Container>
      <Typography variant="h6" gutterBottom>Vessels</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#b2ece9' }}>
              <TableCell>Vessel Name</TableCell>
              <TableCell>Cargo</TableCell>
              <TableCell>Capacity Bulk</TableCell>
              <TableCell>Fuel</TableCell>
              <TableCell>Deck</TableCell>
              <TableCell>Current Status</TableCell>
              <TableCell>Current Location</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Manifest</TableCell>
              <TableCell>Journey</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} style={{ backgroundColor: index % 2 ? '#f9f5e6' : 'white' }}>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <VisibilityIcon style={{ color: '#008080', marginRight: 4 }} />
                    <Typography variant="body2" style={{ color: '#008080', cursor: 'pointer' }}>View</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.bulk}</TableCell>
                <TableCell>{row.fuel}</TableCell>
                <TableCell>{row.deck}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.designation}</TableCell>
                <TableCell>
                  <IconButton style={{ color: '#008080' }}>
                    {row.manifest === 'Create' ? <AddIcon /> : <VisibilityIcon />}
                  </IconButton>
                  <Typography variant="body2" style={{ color: '#008080', cursor: 'pointer' }}>{row.manifest}</Typography>
                </TableCell>
                <TableCell>
                  <IconButton style={{ color: '#008080' }}>
                    {row.journey === 'Start' ? <PlayArrowIcon /> : <StopIcon />}
                  </IconButton>
                  <Typography variant="body2" style={{ color: '#008080', cursor: 'pointer' }}>{row.journey}</Typography>
                </TableCell>
              </TableRow>
            ))}
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

export default VesselsTable;
