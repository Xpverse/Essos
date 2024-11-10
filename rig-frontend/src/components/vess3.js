import React, { useState,useEffect } from 'react';
import { Container, Typography, Button, TextField, Box, MenuItem, FormControl, Select, InputLabel, Divider } from '@mui/material';
import { useDispatch ,useSelector} from 'react-redux';

const AddVesselJourney = ({ id }) => {
  const [stops, setStops] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  const dispatch = useDispatch()

  useEffect(() =>{
    //dispatch(fetchCurrentVesselFinalAction(id))
  },[dispatch])

  const currentVessel = useSelector((state)=> state.vesselReducer.currentVessel)

  const handleAddStop = () => {
    if (selectedLocation) {
      setStops([...stops, selectedLocation]);
      setSelectedLocation('');
    }
  };

  return (
    <Container maxWidth="md" style={{ padding: '20px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Add Vessel Journey</Typography>
        <Button variant="contained" style={{ backgroundColor: '#00796B' }}>Save Journey</Button>
      </Box>
      
      <Typography variant="h5" gutterBottom>
        Enter Journey Details for Vessel <strong style={{ color: '#00796B' }}>{id}</strong>
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <FormControl fullWidth>
          <InputLabel>Starts From</InputLabel>
          <Select variant="outlined" label="Starts From">
            <MenuItem value="Port A">Port A</MenuItem>
            <MenuItem value="Port B">Port B</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Berthing Time"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          placeholder="Please enter vessel berthing time"
        />

        <TextField
          fullWidth
          label="Sailing Time"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          placeholder="Please enter the sailing time"
        />
      </Box>

      <Typography variant="body1" mb={2}>
        Stops: <strong>{stops.length}</strong>
      </Typography>

      <Divider />

      <Box display="flex" alignItems="center" gap={2} mt={2}>
        <FormControl fullWidth>
          <InputLabel>Select Rig / Location</InputLabel>
          <Select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            variant="outlined"
            label="Select Rig / Location"
          >
            <MenuItem value="Rig A">Rig A</MenuItem>
            <MenuItem value="Rig B">Rig B</MenuItem>
            <MenuItem value="Rig C">Rig C</MenuItem>
            {/* Add more options as needed */}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleAddStop}
          style={{
            backgroundColor: '#00796B',
            padding: '10px 20px',
            borderRadius: '8px',
            textTransform: 'none'
          }}
        >
          Add Stop
        </Button>
      </Box>

      {/* Display the list of stops */}
      <Box mt={3}>
        {stops.map((stop, index) => (
          <Typography key={index} variant="body2">
            Stop {index + 1}: {stop}
          </Typography>
        ))}
      </Box>
    </Container>
  );
};

export default AddVesselJourney;
