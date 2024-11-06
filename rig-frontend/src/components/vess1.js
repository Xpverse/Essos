import {React,useEffect} from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, IconButton, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { useDispatch ,useSelector} from 'react-redux';
import { fetchVesselRequestData } from '../redux/actions/vesselAction';
import { useNavigate } from 'react-router-dom';

const VesselsTable = () => {
  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(fetchVesselRequestData())
  },[dispatch])
  const navigate = useNavigate()
  const vessels = useSelector((state) => state.vesselReducer.vessels)
  
  const createData = (vesselId,vesselName,vesselDeckCapacity,vesselFuelCapacity,vesselStatus,vesselLocation,vesselCreate,vesselStart) => {
    return {vesselId,vesselName,vesselDeckCapacity,vesselFuelCapacity,vesselStatus,vesselLocation,vesselCreate,vesselStart}   
  }
  const handleNavigation = (id) => {
    navigate(`/vesselDetails/${id}`); 
  }
  const records = vessels.map((vessel) => createData(
   vessel.vesselId,
   vessel.vesselName,
   vessel.vesselDeckCapacity,
   vessel.vesselFuelCapacity,
   vessel.vesselStatus,
   vessel.vesselLocation,
   'Create',
   'Start'
  ))
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
            {records.map((record, index) => (
              <TableRow key={index} style={{ backgroundColor: index % 2 ? '#f9f5e6' : 'white' }}>
                <TableCell>{record.vesselName}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <VisibilityIcon onClick= {() => handleNavigation(record.vesselId)} style={{ color: '#008080', marginRight: 4 }} />
                    <Typography variant="body2" style={{ color: '#008080', cursor: 'pointer' }}>View</Typography>
                  </Box>
                </TableCell>
                <TableCell>{record.vesselFuelCapacity}</TableCell>
                <TableCell>{record.vesselDeckCapacity}</TableCell>
                <TableCell>{record.vesselStatus}</TableCell>
                <TableCell>{record.vesselLocation}</TableCell>
                <TableCell>{record.designation}</TableCell>
                <TableCell>
                  <IconButton style={{ color: '#008080' }}>
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
  );
};

export default VesselsTable;
