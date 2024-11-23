import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { useState, useEffect } from 'react';

const Homepage = () => {

  const [materialRequestsReceived, setMaterialRequestsReceived] = useState(0);
  const [materialRequestsLoaded, setMaterialRequestsLoaded] = useState(0);
  const [backloadsReceived, setBackloadsReceived] = useState(0);

  // Fetch data on component load
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/material-requests'); // Update with your API endpoint
      const data = await response.json();
      // Process and update state
      const receivedCount = data.filter(req => req.materialRequestStatus === 'REQUESTED').length;
      const loadedCount = data.filter(req => req.materialRequestStatus === 'LOADED').length;
      const backloadCount = data.filter(req => req.materialRequestStatus === 'BACKLOADED').length;

      setMaterialRequestsReceived(receivedCount);
      setMaterialRequestsLoaded(loadedCount);
      setBackloadsReceived(backloadCount);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };
  return (
    <Box sx={{ padding: 4 }}>
      <Card sx={{ backgroundColor: '#A0522D', color: 'white', marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6">Pending Actions</Typography>
          <Typography variant="body2">
            You have pending actions. Click the tabs below to know more.
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#b2fefa' }}>
            <CardContent>
              <Typography variant="h6">Material Requests received</Typography>
              <Typography variant="h3">{materialRequestsReceived} ↗</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#b2fefa' }}>
            <CardContent>
              <Typography variant="h6">Material Requests loaded</Typography>
              <Typography variant="h3">{materialRequestsLoaded} ↗</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#add8e6' }}>
            <CardContent>
              <Typography variant="h6">Backloads received</Typography>
              <Typography variant="h3">{backloadsReceived} ↗</Typography>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Homepage;
