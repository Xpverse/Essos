import React, { useEffect,useState } from 'react';

import { Container, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl, Tabs, Tab, Paper, Box } from '@mui/material';
import { CloudUpload, InsertDriveFile } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWellRequestData } from '../redux/actions/wellAction';
import { fetchSupplierRequestData } from '../redux/actions/supplierAction';
import { postMaterialRequestFinalAction } from '../redux/actions/materialRequestsAction';
import { useNavigate } from 'react-router-dom';
import { fetchRigWellMapRequestData } from '../redux/actions/rigwellmapAction';

function MaterialRequestForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [requestType, setRequestType] = React.useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const suppliers = useSelector((state) => state.supplierReducer.suppliers || [])
  const wells = useSelector((state) => state.wellReducer.wells || [])
  const rigWellMaps = useSelector((state) => state.rigWellMapReducer.rigWellMaps || [])
  const rigs = useSelector((state) => state.rigReducer.rigs || [])
  const [formValues, setFormValues] = useState({
    materialRequestWell: {},
    materialRequestSupplier:{},
    materialRequestFromLocation:{},
    materialRequestToLocation:{},
    materialRequestType:'MATERIAL_REQUEST'
  });

  const eligibleRigs = rigWellMaps.map(rigWellMap => 
    rigWellMap.well.wellId === formValues["materialRequestWell"].wellId ? rigWellMap.rig : null
  ).filter(rig => rig !== null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleWellChange =  (event) => {
    const selectedWell = wells.find(well => well.wellName === event.target.value);
    console.log(selectedWell)
    setFormValues({
      ...formValues,
      materialRequestWell: selectedWell 
    });
    console.log(formValues)
  };

  const handleSupplierChange = (event) => {
    const selectedSupplier = suppliers.find(supplier => supplier.supplierName === event.target.value);
    setFormValues({
      ...formValues,
      materialRequestSupplier: selectedSupplier 
    });
    console.log(formValues)
  };

  const handleFromLocationChange = (event) => {
    const selectedFromLocation = rigs.find(rig => rig.rigName === event.target.value);
    setFormValues({
      ...formValues,
      materialRequestFromLocation: selectedFromLocation 
    });
    console.log(formValues)
  };

  const handleToLocationChange = (event) => {
    const selectedToLocation = rigs.find(rig => rig.rigName === event.target.value);
    setFormValues({
      ...formValues,
      materialRequestToLocation: selectedToLocation 
    });
    console.log(formValues)
  };


  const handleTabChange = (event, newValue) => {
    setRequestType(newValue); // Update the currently selected tab index
  
    const requestTypeValue = ['MATERIAL_REQUEST', 'TRANSFER_REQUEST', 'BACKLOAD_REQUEST'][newValue];
  
    setFormValues((prevValues) => ({
      ...prevValues,
      materialRequestType: requestTypeValue,
    }));
  };
  

  useEffect(() => {

    dispatch(fetchWellRequestData())
    dispatch(fetchSupplierRequestData())
    dispatch(fetchRigWellMapRequestData())

  },[dispatch])

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); 
      console.log('Selected file:', file);
    }
    console.log('Checkpoint 2');
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    dispatch(postMaterialRequestFinalAction(formValues,selectedFile))
    navigate('/test')
    console.log("Button clicked and form submitted!");
  };
  return (
    <Container maxWidth="lg" style={{ padding: '30px 0' }}>


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
              <Select
                label="Well"
                name="materialRequestWell"
                value={formValues.materialRequestWell ? formValues.materialRequestWell.wellName : ''}
                onChange={handleWellChange}
              >
                {wells.map((well, index) => (
                  <MenuItem key={index} value={well.wellName}>
                    {well.wellName}
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
          <Typography
            fullWidth
            size="medium"
            variant="body1"
            style={{ padding: '16px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}
          >
          {formValues["materialRequestWell"]?.wellBlock || 'N/A'}
          </Typography>


            <FormControl fullWidth variant="outlined" size="medium">
              <InputLabel>Supplier</InputLabel>
              <Select label="Supplier" 
              name="materialRequestSupplier"
              value={formValues.materialRequestSupplier ? formValues.materialRequestSupplier.supplierName : ''} 
              onChange={handleSupplierChange}
              >
                {suppliers && suppliers.map((supplier, index) => (
                  <MenuItem key={index} value={supplier.supplierName}>
                    {supplier.supplierName}
                  </MenuItem>
                ))}

              </Select>
            </FormControl>                
          </Box>


          <Box display="flex" gap="30px">
            <FormControl fullWidth variant="outlined" size="medium">
              <InputLabel>From</InputLabel>
              <Select label="From"
              name="materialRequestFromLocation"
              value={formValues.materialRequestFromLocation ? formValues.materialRequestFromLocation.rigName : ''} 
              onChange={handleFromLocationChange}
              >
              
              {eligibleRigs && eligibleRigs.map((eligibleRig, index) => (
                  <MenuItem key={index} value={eligibleRig.rigName}>
                    {eligibleRig.rigName}
                  </MenuItem>
              ))} 
                
              </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined" size="medium">
              <InputLabel>To</InputLabel>
              <Select label="To"
              name="materialRequestToLocation"
              value={formValues.materialRequestToLocation ? formValues.materialRequestToLocation.rigName : ''} 
              onChange={handleToLocationChange}
              >
                {eligibleRigs && eligibleRigs.map((eligibleRig, index) => (
                  <MenuItem key={index} value={eligibleRig.rigName}>
                    {eligibleRig.rigName}
                  </MenuItem>
                ))}
                
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
              type='date'
              InputLabelProps={{
                shrink: true, 
              }}

            />

            <TextField fullWidth label="Requested By" variant="outlined" size="medium" />
          </Box>


          <Box textAlign="center" marginTop="32px">
          <div>
          <label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              style={{ display: 'none' }} // Hide the file input
            />
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
              component="span"  
            >
              {selectedFile ? 'Upload Another File' : 'Upload CSV File'}
            </Button>
            </label>
            {selectedFile && (
            <p style={{ marginTop: '10px' }}>Selected file: {selectedFile.name}</p>
            )}
            </div>
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
          type="submit"
        onClick={handleSubmit}
          style={{
            borderRadius: '24px',
            padding: '12px 28px',
            backgroundColor: '#00796B',
            fontSize: '16px',
          }}
        >
          Submit Request
        </Button>
      </Box>
    </Container>
  );
}
export default MaterialRequestForm;