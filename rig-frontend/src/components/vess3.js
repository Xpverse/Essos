import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, Box, MenuItem, FormControl, Select, InputLabel, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentVesselFinalAction } from '../redux/actions/vesselAction';
import { fetchRigRequestData } from '../redux/actions/rigAction';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const AddVesselJourney = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [vesselJourneyStops, setVesselJourneyStops] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();

  const rigs = useSelector((state) => state.rigReducer.rigs || []);
  const currentVessel = useSelector((state) => state.vesselReducer.currentVessel);

  const [formValues, setFormValues] = useState({
    vesselJourneyStartLocation: {},
    vesselJourneyStops: []
  });

  useEffect( () =>  {
    if (id) {
      dispatch(fetchCurrentVesselFinalAction(id));
      dispatch(fetchRigRequestData());
    }
  }, [dispatch, id])

  useEffect( () => {
    if (currentVessel?.currentVesselJourney?.vesselJourneyId) {
      const vesselJourneyId = currentVessel.currentVesselJourney.vesselJourneyId;

      
      axios.get(`http://localhost:8000/api/v1/vessel-journey-stops/vessel-journey/${vesselJourneyId}`, {})
        .then((response) => {
          console.log('Axios request successful:', response.data);
          setVesselJourneyStops(response.data);
        })
        .catch((error) => {
          console.error('Axios request failed:', error);
        });

         setFormValues({
          ...formValues,
          vesselJourneyStartLocation:currentVessel.vesselJourneyStartLocation,
          vesselJourneyStops:vesselJourneyStops
        })
    }
  }, [currentVessel]);

  const handleSubmit = () => {
    
  }
  const handleSelectedLocationChange = (event) => {
    const selectedLocationTemp = rigs.find((rig) => rig.rigName === event.target.value);
    setSelectedLocation(selectedLocationTemp)
  }
  const handleStartLocationChange = (event) => {
    const selectedStartLocation = rigs.find((rig) => rig.rigName === event.target.value);
    setFormValues({
      ...formValues,
      vesselJourneyStartLocation: selectedStartLocation,
    });
  };

  const handleAddStop = () => {
    if (selectedLocation) {
      const newStops = [...formValues.vesselJourneyStops, selectedLocation];
      setFormValues({
        ...formValues,
        vesselJourneyStops: newStops,
      });
      setSelectedLocation('');
    }
  };

  const handleRemoveStop = (index) => {
    const newStops = formValues.vesselJourneyStops.filter((_, i) => i !== index);
    setFormValues({
      ...formValues,
      vesselJourneyStops: newStops,
    });
  };

  return (
    <Container maxWidth="md" style={{ padding: '20px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Add Vessel Journey</Typography>
        <Button variant="contained"
           style={{ backgroundColor: '#00796B' }}
           onClick={handleSubmit}
           >Save Journey</Button>
      </Box>

      <Typography variant="h5" gutterBottom>
        Enter Journey Details for Vessel <strong style={{ color: '#00796B' }}>{id}</strong>
      </Typography>

      {/* Start Location Selection */}
      <Box display="flex" gap={2} mb={3}>
        <FormControl fullWidth>
          <InputLabel>Starts From</InputLabel>
          <Select
            variant="outlined"
            name="vesselJourneyStartLocation"
            value={formValues.vesselJourneyStartLocation?.rigName || ''}
            onChange={handleStartLocationChange}
          >
            {rigs.map((rig) => (
              <MenuItem key={rig.rigId} value={rig.rigName}>
                {rig.rigName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Berthing Time"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Sailing Time"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
        />
      </Box>

      <Typography variant="body1" mb={2}>
        Total Stops: <strong>{formValues.vesselJourneyStops.length}</strong>
      </Typography>

      <Divider />

      {/* Add Stop UI */}
      <Box display="flex" alignItems="center" gap={2} mt={2}>
        <FormControl fullWidth>
          <InputLabel>Select Rig / Location for Stop</InputLabel>
          <Select
            value={selectedLocation && selectedLocation.rigName}
            onChange={handleSelectedLocationChange}
            variant="outlined"
            label="Select Rig / Location"
          >
            {rigs.map((rig) => (
              <MenuItem key={rig.rigId} value={rig.rigName}>
                {rig.rigName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleAddStop}
          style={{
            backgroundColor: '#00796B',
            padding: '10px 20px',
            borderRadius: '8px',
            textTransform: 'none',
          }}
        >
          Add Stop
        </Button>
      </Box>

      {/* Display List of Stops */}
      <Box mt={3}>
        {formValues.vesselJourneyStops.map((stop, index) => (
          <Box key={index} display="flex" alignItems="center" justifyContent="space-between" mb={1}>
            <Typography variant="body2">
              Stop {index + 1}: {stop.rigName}
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleRemoveStop(index)}
            >
              Remove
            </Button>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default AddVesselJourney;
