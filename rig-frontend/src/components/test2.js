import React from 'react';
import { Container, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl, Tabs, Tab, Paper, Box } from '@mui/material';
import { CloudUpload, InsertDriveFile } from '@mui/icons-material';

function MaterialRequestForm() {
  const [requestType, setRequestType] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setRequestType(newValue);
  };

  return (
    <Container maxWidth="lg" style={{ padding: '40px 0' }}>
      
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: '#333', marginBottom: '30px' }}>
        Create Material Request
      </Typography>

      
      <Tabs
        value={requestType}
        onChange={handleTabChange}
        TabIndicatorProps={{ style: { display: 'none' } }} 
        centered
        style={{ marginBottom: '20px' }}
      >
        <Tab
          label="Material Request"
          style={{
            textTransform: 'none',
            fontWeight: requestType === 0 ? 'bold' : 'normal',
            color: requestType === 0 ? '#fff' : '#00796B',
            backgroundColor: requestType === 0 ? '#00796B' : 'transparent',
            borderRadius: '12px',
            padding: '12px 36px',
            boxShadow: requestType === 0 ? '0px 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
            marginRight: '10px',
            transition: 'all 0.3s ease',
          }}
        />
        <Tab
          label="Transfer Request"
          style={{
            textTransform: 'none',
            fontWeight: requestType === 1 ? 'bold' : 'normal',
            color: requestType === 1 ? '#fff' : '#00796B',
            backgroundColor: requestType === 1 ? '#00796B' : 'transparent',
            borderRadius: '12px',
            padding: '12px 36px',
            boxShadow: requestType === 1 ? '0px 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
            marginRight: '10px',
            transition: 'all 0.3s ease',
          }}
        />
        <Tab
          label="Backload Request"
          style={{
            textTransform: 'none',
            fontWeight: requestType === 2 ? 'bold' : 'normal',
            color: requestType === 2 ? '#fff' : '#00796B',
            backgroundColor: requestType === 2 ? '#00796B' : 'transparent',
            borderRadius: '12px',
            padding: '12px 36px',
            boxShadow: requestType === 2 ? '0px 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
            transition: 'all 0.3s ease',
          }}
        />
      </Tabs>

      
      <Paper
        style={{
          padding: '40px',
          marginTop: '20px',
          borderRadius: '16px',
          backgroundColor: '#f9fafb',
          boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
        }}
        elevation={0}
      >
        <Box display="flex" flexDirection="column" gap="32px">
          
          <Box display="flex" gap="30px">
            <FormControl fullWidth variant="outlined" size="medium">
              <InputLabel>Well</InputLabel>
              <Select label="Well" defaultValue="">
                <MenuItem value="">Please Select Well</MenuItem>
                <MenuItem value="Well 1">Well 1</MenuItem>
               
              </Select>
            </FormControl>

            <TextField fullWidth label="Block" variant="outlined" size="medium" />

            <TextField fullWidth label="Coordinates" variant="outlined" size="medium" />
          </Box>

          
          <Box display="flex" gap="30px">
            <FormControl fullWidth variant="outlined" size="medium">
              <InputLabel>From</InputLabel>
              <Select label="From" defaultValue="">
                <MenuItem value="">Place Holder</MenuItem>
                
              </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined" size="medium">
              <InputLabel>To</InputLabel>
              <Select label="To" defaultValue="">
                <MenuItem value="">Place Holder</MenuItem>
                
              </Select>
            </FormControl>

            <TextField fullWidth label="Request Number" variant="outlined" size="medium" />
          </Box>

          
          <Box display="flex" gap="30px">
            <TextField fullWidth label="Section" variant="outlined" size="medium" />

            <TextField
              fullWidth
              label="Required By"
              variant="outlined"
              size="medium"
              InputProps={{
                endAdornment: <InsertDriveFile fontSize="small" style={{ color: '#00796B' }} />,
              }}
            />

            <TextField fullWidth label="Requested By" variant="outlined" size="medium" />
          </Box>

          
          <Box textAlign="center" marginTop="32px">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<CloudUpload />}
              style={{
                borderRadius: '20px',
                padding: '14px 36px',
                color: '#00796B',
                borderColor: '#00796B',
              }}
            >
              Upload Excel File
            </Button>
            <Typography variant="body2" style={{ marginTop: '14px', color: '#00796B', cursor: 'pointer' }}>
              Download Template
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Create Request Button */}
      <Box display="flex" justifyContent="flex-end" marginTop="40px">
        <Button
          variant="contained"
          color="primary"
          style={{
            borderRadius: '24px',
            padding: '12px 28px',
            backgroundColor: '#00796B',
            fontSize: '16px',
          }}
        >
          Create Material Request
        </Button>
      </Box>
    </Container>
  );
}

export default MaterialRequestForm;
