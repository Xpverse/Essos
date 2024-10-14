 //import { Navigate, useNavigate } from "react-router-dom"

// const Homepage = () =>{
//     const navigate = useNavigate();
//  return (
//     <div class="parent">
//     <h1>Homepage</h1>
//     <h2 onClick={()=>navigate("/login")}>Go to login page</h2>
//     </div>
//  )
// }
// export default Homepage

import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';

const Homepage = () => {
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
              <Typography variant="h3">0 ↗</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#b2fefa' }}>
            <CardContent>
              <Typography variant="h6">Material Requests loaded</Typography>
              <Typography variant="h3">1 ↗</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#add8e6' }}>
            <CardContent>
              <Typography variant="h6">Backloads received</Typography>
              <Typography variant="h3">0 ↗</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Homepage;
