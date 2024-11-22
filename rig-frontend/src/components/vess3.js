import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Divider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentVesselFinalAction } from '../redux/actions/vesselAction';
import { fetchRigRequestData } from '../redux/actions/rigAction';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AddVesselJourney = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [vesselJourneyStops, setVesselJourneyStops] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate()
  const rigs = useSelector((state) => state.rigReducer.rigs || []);
  const currentVessel = useSelector((state) => state.vesselReducer.currentVessel);

  const [formValues, setFormValues] = useState({
    vesselJourneyStartLocation: {},
    vesselJourneyStops: [],
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchCurrentVesselFinalAction(id));
      dispatch(fetchRigRequestData());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentVessel?.currentVesselJourney?.vesselJourneyId) {
      const vesselJourneyId = currentVessel.currentVesselJourney.vesselJourneyId;

      axios
        .get(`http://localhost:8000/api/v1/vessel-journey-stops/vessel-journey/${vesselJourneyId}`)
        .then((response) => {
          console.log('Axios request successful:', response.data);
          setVesselJourneyStops(response.data);
        })
        .catch((error) => {
          console.error('Axios request failed:', error);
        });
      
      const startLocation = rigs.find((rig) => rig.rigName === currentVessel.currentVesselJourney.vesselJourneyStartLocation);
      setFormValues({
        ...formValues,
        vesselJourneyStartLocation: startLocation,
        vesselJourneyStops: vesselJourneyStops,
      });
    }
  }, [currentVessel]);

  const handleSubmit = () => {
    const convertToDTO = (vesselJourneyStop, idx) => ({
      vesselJourneyStopLocationId: vesselJourneyStop.rigId,
      vesselJourneyStopOrder: idx + 1,
      vesselJourneyId : parseInt(id)
    });

    const requestBody = vesselJourneyStops.map((vesselJourneyStop, idx) => convertToDTO(vesselJourneyStop, idx));
    console.log(requestBody);

    axios
      .delete(`http://localhost:8000/api/v1/vessel-journey-stops/vessel-journey/${id}`)
      .then((response) => {
        console.log('Delete request successful:', response.data);

        axios
          .post(`http://localhost:8000/api/v1/vessel-journey-stops/batch`,JSON.stringify(requestBody),{
            headers: {
              'Content-Type': 'application/json',
            }
          })
          .then((response2) => {
            console.log('Bulk post request successful:', response2.data);
            alert('Both requests completed successfully!');
            navigate('/vessels')
          })
          .catch((error2) => {
            console.error('Error in bulk post request:', error2);
            alert('Error occurred in the second request.');
          });
      })
      .catch((error) => {
        console.error('Error in delete request:', error);
        alert('Error occurred in the first request.');
      });
  };

  const handleSelectedLocationChange = (event) => {
    const selectedLocationTemp = rigs.find((rig) => rig.rigName === event.target.value);
    setSelectedLocation(selectedLocationTemp);
  };

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
    <Container maxWidth="md" style={{ padding: '0px' }}>
      <Box display="flex" justifyContent="space-between"  mb={2}>
        <Typography variant="h6">Add Vessel Journey</Typography>
        <Button
          variant="contained"
          style={{ backgroundColor: '#00796B' }}
          onClick={handleSubmit}
        >
          Save Journey
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom>
        Enter Journey Details for Vessel <strong style={{ color: '#00796B' }}>{id}</strong>
      </Typography>

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
