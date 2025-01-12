import React,{useEffect,useState} from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Box, Grid, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox ,IconButton,Select,MenuItem,TextField} from '@mui/material';
import { Send } from '@mui/icons-material';
import { fetchCurrentMaterialRequestFinalAction } from '../redux/actions/materialRequestsAction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function MaterialRequestSummary() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [selectedVessel, setSelectedVessel] = useState();
  useEffect(() => {
    
    dispatch(fetchCurrentMaterialRequestFinalAction(id))
  },[dispatch,id])
  const currentRequest = useSelector((state)=> state.materialRequestReducer.currentMaterialRequest)
  const currentRequestItems =  useSelector((state)=> state.materialRequestReducer.currentMaterialRequestItems)
  const vessels = useSelector((state) => state.vesselReducer.vessels || []);

  const handleSelectedVesselChange = (event) => {
    //setSelectedVessel(event.target.value); 
    const requiredVessel = vessels.find(vessel => vessel.vesselName==event.target.value)
    setSelectedVessel(requiredVessel)
  };

  const handleAssignVessel = () => {
    console.log("****BUTTON CLICKED****")
    try{
      const response = axios.post(
        `${BASE_URL}/api/v1/vessel-assignment/assign`,
        {
          materialRequestId: currentRequest.materialRequestId,
          vesselId: selectedVessel.vesselId,
          rigId: selectedRigId
          
        },
        {
          headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        }
      );
    }catch(error){

    }
  };
  
  const materialRequestData = {
    requestName: "Well-1 Drilling 36\"",
    phase: "Drilling 36\" hole",
    requiredBy: "24-jul-24",
    requestedBy: "Supplier User-1",
    from: "Base, Kakinada, Andhra Pradesh",
    to: "Rig-1",
    well: "Well-1",
    block: "Block-1",
    coordinates: "Lat: 11°35'36.608\" N, Lon: 80°19'54.877E",
  };

  const itemDetails = [
    { id: 1, matCode: "H115904-37 REF", description: "HP WELLHEAD HSG UNIT, ASSEMBLY", qty: 1, uom: "Each", psl: "Each", packingDetails: "Each", dimensions: { L: 30, W: 30, H: 50 }, weight: "Weight" },
    { id: 2, matCode: "H115904-37 REF", description: "HP WELLHEAD HSG UNIT, ASSEMBLY", qty: 1, uom: "Each", psl: "Each", packingDetails: "Each", dimensions: { L: 30, W: 30, H: 50 }, weight: "Weight" },
    { id: 3, matCode: "H115904-37 REF", description: "HP WELLHEAD HSG UNIT, ASSEMBLY", qty: 1, uom: "Each", psl: "Each", packingDetails: "Each", dimensions: { L: 30, W: 30, H: 50 }, weight: "Weight" },
  ];

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
  <IconButton onClick={() => navigate(-1)} sx={{ marginRight: 2 }}>
    <ArrowBackIcon />
  </IconButton>

  <Box display="flex" alignItems="center" justifyContent="flex-end" ml="auto">
    <Select
      label="Vessel"
      name="selectedVessel"
      value={selectedVessel ? selectedVessel.vesselName : ''}
      onChange={handleSelectedVesselChange}
      sx={{ minWidth: 200 }}
    >
      {vessels && vessels.map((vessel, index) => (
                  <MenuItem key={index} value={vessel.vesselName}>
                    {vessel.vesselName}
                  </MenuItem>
                ))}
    </Select>

    <Button
      variant="contained"
      color="primary"
      type="submit"
      onClick={handleAssignVessel}
      sx={{
        borderRadius: '24px',
        padding: '12px 28px',
        backgroundColor: '#00796B',
        fontSize: '16px',
        marginLeft: 2,
      }}
    >
      Assign Vessel
    </Button>
  </Box>
</Box>

      
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          borderRadius: 3,
          marginBottom: 4,
          backgroundColor: '#ffffff',
        }}
      >
        <Grid container spacing={4}>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#00796B', marginBottom: 2 }}>
              {currentRequest && currentRequest.materialRequestName}
            </Typography>

            <Typography variant="body2" sx={{ color: 'gray' }}>Phase</Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}> {currentRequest && currentRequest.materialRequestPhase.phaseName  }</Typography>

            <Typography variant="body2" sx={{ color: 'gray' }}>Required by</Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}> {currentRequest && currentRequest.materialRequestRequiredBy}</Typography>

            <Typography variant="body2" sx={{ color: 'gray' }}>Requested by</Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}> {currentRequest && currentRequest.materialRequestRequestedByUser.userName}</Typography>
          </Grid>

          
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ color: 'gray' }}>Well</Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}> {currentRequest && currentRequest.materialRequestWell.wellName}</Typography>

            <Typography variant="body2" sx={{ color: 'gray' }}>Block</Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>{currentRequest && currentRequest.materialRequestWell.wellBlock}</Typography>

            <Typography variant="body2" sx={{ color: 'gray' }}>Coordinates</Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>{materialRequestData.coordinates}</Typography>
          </Grid>
        </Grid>
      </Paper>

     
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: '#00796B',
          marginBottom: 2,
        }}
      >
        Required Item Details
      </Typography>

      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          borderRadius: 3,
          backgroundColor: '#f9fafb',
          padding: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e0f7fa' }}>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>Sr No</TableCell>
              <TableCell>Mat Code</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>UOM</TableCell>
              <TableCell>PSL/Owner</TableCell>
              <TableCell>Packing Details</TableCell>
              <TableCell>Dimensions (L x W x H)</TableCell>
              <TableCell>Wt.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRequestItems && currentRequestItems.map((item, index) => (
              <TableRow key={item.id} hover sx={{ transition: 'all 0.3s ease-in-out', '&:hover': { backgroundColor: '#e0f2f1' } }}>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.matCode}</TableCell>
                <TableCell>{item.materialRequestItemDescription}</TableCell>
                <TableCell>{item.materialRequestItemQuantity}</TableCell>
                <TableCell>{item.materialRequestItemUom}</TableCell>
                <TableCell>{item.psl}</TableCell>
                <TableCell>{item.packingDetails}</TableCell>
                <TableCell>{`${item.materialRequestItemLength} x ${item.materialRequestItemWidth} x ${item.materialRequestItemHeight}`}</TableCell>
                <TableCell>{item.weight}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default MaterialRequestSummary;
