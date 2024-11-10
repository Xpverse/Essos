import React, { useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, IconButton, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVesselRequestData } from '../redux/actions/vesselAction';
import { useNavigate } from 'react-router-dom';

const VesselsTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVesselRequestData());
  }, [dispatch]);

  const navigate = useNavigate();
  const vessels = useSelector((state) => state.vesselReducer.vessels);

  const createData = (vesselId, vesselName, vesselDeckCapacity, vesselFuelCapacity, vesselStatus, vesselLocation, vesselCreate, vesselStart) => {
    return { vesselId, vesselName, vesselDeckCapacity, vesselFuelCapacity, vesselStatus, vesselLocation, vesselCreate, vesselStart };
  };
  
  const handleNavigation = (id) => {
    navigate(`/vesselDetails/${id}`);
  };

  const handleCreateClick = (record) => {
    const id = record.vesselId
    navigate(`/createOrEditVesselJourney/${id}`)
  };

  const records = vessels.map((vessel) =>
    createData(
      vessel.vesselId,
      vessel.vesselName,
      vessel.vesselDeckCapacity,
      vessel.vesselFuelCapacity,
      vessel.vesselStatus,
      vessel.vesselLocation,
      'Create',
      'Start'
    )
  );

  return (
    <Box sx={{ paddingTop: '10px' }}>
      <Container maxWidth="xl" sx={{ padding: 0 }}>
        <Typography variant="h6" gutterBottom>Vessels</Typography>
        <TableContainer component={Paper} sx={{ margin: '0 auto', width: '95%' }}> {/* Adjust width to control the left margin */}
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#b2ece9' }}>
                <TableCell>Vessel Name</TableCell>
                <TableCell>Cargo</TableCell>              
                <TableCell>Bulk Occupied</TableCell>
                <TableCell>Deck Occupied</TableCell>
                <TableCell>Last Location</TableCell>
                <TableCell>Journey</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Journey Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record, index) => (
                <TableRow key={index} style={{ backgroundColor: index % 2 ? '#f9f5e6' : 'white' }}>
                  <TableCell>{record.vesselName}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <VisibilityIcon onClick={() => handleNavigation(record.vesselId)} style={{ color: '#008080', marginRight: 4 }} />
                      <Typography variant="body2" style={{ color: '#008080', cursor: 'pointer' }}>View</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{record.vesselFuelCapacity}</TableCell>
                  <TableCell>{record.vesselDeckCapacity}</TableCell>
                  <TableCell>{record.vesselStatus}</TableCell>
                  <TableCell>{record.vesselLocation}</TableCell>
                  <TableCell>{record.designation}</TableCell>
                  <TableCell>
                    <IconButton 
                    style={{ color: '#008080' }}
                    onClick={() => {
                      if (record.vesselCreate === 'Create') {
                        handleCreateClick(record);
                      } else {
                        handleViewClick(record);
                      }
                    }}
                    >
                      {record.vesselCreate === 'Create' ? <AddIcon /> : <VisibilityIcon />}
                    </IconButton>
                    <Typography variant="body2" style={{ color: '#008080', cursor: 'pointer' }}>{record.vesselCreate}</Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton style={{ color: '#008080' }}>
                      {record.vesselStart === 'Start' ? <PlayArrowIcon /> : <StopIcon />}
                    </IconButton>
                    <Typography variant="body2" style={{ color: '#008080', cursor: 'pointer' }}>{record.vesselStart}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default VesselsTable;
