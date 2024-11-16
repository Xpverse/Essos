import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl, Tabs, Tab, Paper, Box } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWellRequestData } from '../redux/actions/wellAction';
import { fetchSupplierRequestData } from '../redux/actions/supplierAction';
import { postMaterialRequestFinalAction } from '../redux/actions/materialRequestsAction';
import { useNavigate } from 'react-router-dom';
import { fetchRigWellMapRequestData } from '../redux/actions/rigwellmapAction';

function UpdateMaterialRequestForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [requestType, setRequestType] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const suppliers = useSelector((state) => state.supplierReducer.suppliers || []);
  const wells = useSelector((state) => state.wellReducer.wells || []);
  const rigWellMaps = useSelector((state) => state.rigWellMapReducer.rigWellMaps || []);
  
  const [formValues, setFormValues] = useState({
    materialRequestWell: '',
    materialRequestBlock: '',
    materialRequestSupplier: '',
    from: '',
    to: '',
    requestNumber: '',
    section: '',
    requiredBy: '',
    requestedBy: ''
  });
  
  const [errors, setErrors] = useState({});

  const eligibleRigs = rigWellMaps
    .map(rigWellMap => rigWellMap.well.wellId === formValues.materialRequestWell ? rigWellMap.rig : null)
    .filter(rig => rig !== null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: '' // Clear the error when the user starts typing
    });
  };

  const handleTabChange = (event, newValue) => {
    setRequestType(newValue);
  };

  useEffect(() => {
    dispatch(fetchWellRequestData());
    dispatch(fetchSupplierRequestData());
    dispatch(fetchRigWellMapRequestData());
  }, [dispatch]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); 
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation logic
    const newErrors = {};
    if (!formValues.materialRequestWell) newErrors.materialRequestWell = 'Required';
    if (!formValues.materialRequestBlock) newErrors.materialRequestBlock = 'Required';
    if (!formValues.materialRequestSupplier) newErrors.materialRequestSupplier = 'Required';
    if (!formValues.from) newErrors.from = 'Required';
    if (!formValues.to) newErrors.to = 'Required';
    if (!formValues.requestNumber) newErrors.requestNumber = 'Required';
    if (!formValues.section) newErrors.section = 'Required';
    if (!formValues.requiredBy) newErrors.requiredBy = 'Required';
    if (!formValues.requestedBy) newErrors.requestedBy = 'Required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors if any field is missing
    } else {
      dispatch(postMaterialRequestFinalAction(formValues, selectedFile));
      navigate('/test');
    }
  };

  return (
    <Container maxWidth="lg" style={{ padding: '10px 0' }}>
      

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

      <Paper style={{ padding: '40px', marginTop: '20px', borderRadius: '16px', backgroundColor: '#f9fafb', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }} elevation={0}>
        <Box display="flex" flexDirection="column" gap="32px">
          
          <Box display="flex" gap="30px">
            <FormControl fullWidth variant="outlined" size="medium" error={!!errors.materialRequestWell}>
              <InputLabel>Well</InputLabel>
              <Select
                label="Well"
                name="materialRequestWell"
                value={formValues.materialRequestWell}
                onChange={handleInputChange}
              >
                {wells.map((well, index) => (
                  <MenuItem key={index} value={well.wellName}>
                    {well.wellName}
                  </MenuItem>
                ))}
              </Select>
              {errors.materialRequestWell && <Typography color="error" variant="caption">{errors.materialRequestWell}</Typography>}
            </FormControl>

            <TextField
              fullWidth
              label="Block"
              variant="outlined"
              size="medium"
              name="materialRequestBlock"
              value={formValues.materialRequestBlock}
              onChange={handleInputChange}
              error={!!errors.materialRequestBlock}
              helperText={errors.materialRequestBlock}
            />

            <FormControl fullWidth variant="outlined" size="medium" error={!!errors.materialRequestSupplier}>
              <InputLabel>Supplier</InputLabel>
              <Select
                label="Supplier"
                name="materialRequestSupplier"
                value={formValues.materialRequestSupplier}
                onChange={handleInputChange}
              >
                {suppliers.map((supplier, index) => (
                  <MenuItem key={index} value={supplier.supplierName}>
                    {supplier.supplierName}
                  </MenuItem>
                ))}
              </Select>
              {errors.materialRequestSupplier && <Typography color="error" variant="caption">{errors.materialRequestSupplier}</Typography>}
            </FormControl>
          </Box>

          <Box display="flex" gap="30px">
            <TextField
              fullWidth
              label="From"
              variant="outlined"
              size="medium"
              name="from"
              value={formValues.from}
              onChange={handleInputChange}
              error={!!errors.from}
              helperText={errors.from}
            />

            <TextField
              fullWidth
              label="To"
              variant="outlined"
              size="medium"
              name="to"
              value={formValues.to}
              onChange={handleInputChange}
              error={!!errors.to}
              helperText={errors.to}
            />

            <TextField
              fullWidth
              label="Request Number"
              variant="outlined"
              size="medium"
              name="requestNumber"
              value={formValues.requestNumber}
              onChange={handleInputChange}
              error={!!errors.requestNumber}
              helperText={errors.requestNumber}
            />
          </Box>

          <Box display="flex" gap="30px">
            <TextField
              fullWidth
              label="Section"
              variant="outlined"
              size="medium"
              name="section"
              value={formValues.section}
              onChange={handleInputChange}
              error={!!errors.section}
              helperText={errors.section}
            />

            <TextField
              fullWidth
              label="Required By"
              variant="outlined"
              size="medium"
              type="date"
              name="requiredBy"
              InputLabelProps={{ shrink: true }}
              value={formValues.requiredBy}
              onChange={handleInputChange}
              error={!!errors.requiredBy}
              helperText={errors.requiredBy}
            />

            <TextField
              fullWidth
              label="Requested By"
              variant="outlined"
              size="medium"
              name="requestedBy"
              value={formValues.requestedBy}
              onChange={handleInputChange}
              error={!!errors.requestedBy}
              helperText={errors.requestedBy}
            />
          </Box>

          <Box textAlign="center" marginTop="32px">
            <label>
              <input type="file" accept=".csv" onChange={handleFileChange} style={{ display: 'none' }} />
              <Button
                variant="outlined"
                color="primary"
                startIcon={<CloudUpload />}
                style={{ borderRadius: '20px', padding: '14px 36px', color: '#00796B', borderColor: '#00796B' }}
                component="span"
              >
                {selectedFile ? 'Upload Another File' : 'Upload CSV File'}
              </Button>
            </label>
            {selectedFile && <p style={{ marginTop: '10px' }}>Selected file: {selectedFile.name}</p>}
            <Typography variant="body2" style={{ marginTop: '14px', color: '#00796B', cursor: 'pointer' }}>
              Download Template
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Box display="flex" justifyContent="flex-end" marginTop="40px">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
          style={{ borderRadius: '24px', padding: '12px 28px', backgroundColor: '#00796B', fontSize: '16px' }}
        >
          Update Request
        </Button>
      </Box>
    </Container>
  );
}

export default UpdateMaterialRequestForm;
