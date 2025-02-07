import React, { useState,useEffect } from 'react';
import { Box, Button, Checkbox, Container, IconButton, MenuItem, Chip, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Divider, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BoltIcon from '@mui/icons-material/Bolt';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import { useParams ,useNavigate} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { fetchCurrentVesselFinalAction } from '../redux/actions/vesselAction';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { format } from 'date-fns';
const VesselMaterialRequest = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [vesselJourneyStops, setVesselJourneyStops] = useState(null);
  const [materialRequests,setMaterialRequests]=useState([])
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if(id){
      dispatch(fetchCurrentVesselFinalAction(id))


    }
  
  }, [dispatch,id]);

  const currentVessel = useSelector((state)=> state.vesselReducer.currentVessel)
  
  useEffect(() => {
    const vesselId = currentVessel?.vesselId
    if (currentVessel?.currentVesselJourney?.vesselJourneyId) {
      const vesselJourneyId = currentVessel.currentVesselJourney?.vesselJourneyId;

      
      axios.get(`${BASE_URL}/api/v1/vessel-journey-stops/vessel-journey/${vesselJourneyId}`,{
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      })
        .then((response) => {
          console.log('Axios request successful:', response.data);
          setVesselJourneyStops(response.data);
        })
        .catch((error) => {
          console.error('Axios request failed:', error);
        });

        axios.get(`${BASE_URL}/api/v1/material-requests/vessel/${vesselId}`,{
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
          }
        })
        .then((response) => {
          console.log('Axios request successful:', response.data);
          setMaterialRequests(response.data);
        })
        .catch((error) => {
          console.error('Axios request failed:', error);
        });
    }

    
  }, [currentVessel]);

  
  
  const vessels = [
    "Vessel Name 1 (Capacity)",
    "Vessel Name 2 (Capacity)",
    "Vessel Name 3 (Capacity)",
    "Vessel Name 4 (Capacity)",
    "Vessel Name 5 (Capacity)"
  ];

  const handleVesselChange = (event) => {
    //setSelectedVessel(event.target.value);
  };

  const rows = [
    { srNo: 1, matCode: 'H115904-37 REF', description: 'HP WELLHEAD HSG UNIT, ASSEMBLY', qty: 1, uom: 'Each', owner: 'Each', packingDetails: 'Each', dimensions: '30 x 30 x 50', weight: 'weight', remarks: 'Test1' },
    { srNo: 2, matCode: 'H115904-37 REF', description: 'HP WELLHEAD HSG UNIT, ASSEMBLY', qty: 1, uom: 'Each', owner: 'Each', packingDetails: 'Each', dimensions: '30 x 30 x 50', weight: 'weight', remarks: 'Test1' },
  ];

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedRows = rows.map((row) => row.srNo);
      setSelectedRows(newSelectedRows);
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowClick = (srNo) => {
    const selectedIndex = selectedRows.indexOf(srNo);
    let newSelectedRows = [];

    if (selectedIndex === -1) {
      newSelectedRows = newSelectedRows.concat(selectedRows, srNo);
    } else if (selectedIndex === 0) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedRows = newSelectedRows.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelectedRows);
  };

  const isSelected = (srNo) => selectedRows.indexOf(srNo) !== -1;
  const list = [
    {col1:' mr_20240925105600',col2:'43 Lifts',col3:'Rig_2'},
    {col1:' mr_20240925105600',col2:'43 Lifts',col3:'Rig_2'},
    {col1:' mr_20240925105600',col2:'43 Lifts',col3:'Rig_2'},
    ];
  return (
    <Container >
      {/* Navigation */}
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton  onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      {/* Material Requests, Bulk Occupied, and Details Section */}
      <Grid container spacing={4}>
        {/* Material Requests */}
        <Grid item xs={4}>
          <Typography variant="subtitle1"> Material Requests</Typography>
         

            <TableContainer component={Paper} sx={{maxHeight:200}}>
      <Table sx={{ minWidth: 300}} aria-label="simple table">
       
        <TableBody>
          {materialRequests.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="right">{row.materialRequestName}</TableCell>
              
              <TableCell align="right"><Chip label={row.col2} variant="outlined" color="warning" /></TableCell>
              <TableCell align="right"><Chip label={row.col3} variant="outlined" color="primary" /></TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
         
        </Grid>

        {/* Bulk Occupied Section */}
        <Grid item xs={4}>
          <Typography variant="subtitle1">Bulk Occupied</Typography>
          <Paper elevation={3} style={{ padding: '16px', borderRadius: '8px' }}>
            <Box display="flex" justifyContent="space-around">
              {['Fuel', 'Water', 'Brine', 'Deck', 'Mud'].map((item) => (
                <Box
                  key={item}
                  border="1px solid #FFD700"
                  borderRadius="4px"
                  width="60px"
                  height="60px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  flexDirection="column"
                >
                  <Typography variant="subtitle2">{item}</Typography>
                  <Typography variant="body2">-</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Details Section */}
        <Grid item xs={4}>
          <Typography variant="subtitle1">Details</Typography>
          <Paper elevation={3} style={{ padding: '16px', borderRadius: '8px' }}>
        
           
            <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="space-between">
              <Box display="flex" justifyContent="space-between" width="100%" mb={2}>
                <Typography variant="body2" style={{ fontWeight: 'bold' }}>VESSEL BERTHING TIME</Typography>
                <Box textAlign="right">
                  <Typography variant="body1" color="primary">{currentVessel && currentVessel.currentVesselJourney && currentVessel.currentVesselJourney.vesselJourneyBerthingOn ? format(new Date(currentVessel.currentVesselJourney.vesselJourneyBerthingOn), 'yyyy-MM-dd HH:mm:ss') :'N/A'}</Typography>
                </Box>
              </Box>

            
              <Box display="flex" justifyContent="space-between" width="100%" mb={2}>
                <Typography variant="body2" style={{ fontWeight: 'bold' }}>VESSEL SAILING TIME</Typography>
                <Box textAlign="right">
                <Typography variant="body1" color="primary">{currentVessel && currentVessel.currentVesselJourney && currentVessel.currentVesselJourney.vesselJourneySailingOn ? format(new Date(currentVessel.currentVesselJourney.vesselJourneySailingOn),'yyyy-MM-dd HH:mm:ss'):'N/A'}</Typography>
                </Box>
              </Box>

             
              <Box display="flex" justifyContent="space-between" width="100%" mb={2}>
                <Typography variant="body2" style={{ fontWeight: 'bold' }}>TOTAL WEIGHT IN TONS</Typography>
                <Typography variant="body1" color="primary">{currentVessel && currentVessel.currentVesselJourney.vesselJourneyDeckCapacity}</Typography>
              </Box>

            
              <Box display="flex" justifyContent="space-between" width="100%">
                <Typography variant="body2" style={{ fontWeight: 'bold' }}>NO. OF LIFTS</Typography>
                <Typography variant="body1" color="primary">43 Lifts</Typography>
              </Box>
            </Box>
           
          </Paper>
        </Grid>
        {/* Shipment Tracking Section */}
        <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Shipment Tracking</Typography>
        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
          {vesselJourneyStops?.map((stop, index) => (
          <React.Fragment key={index}>
            <Box textAlign="center">
              <CheckCircleIcon sx={{ color: '#008080' }} fontSize="large" />
              <Typography variant="body2" style={{ color: '#6c757d', marginTop: '4px' }}>{stop.rigName}</Typography>
            </Box>
          {index < vesselJourneyStops.length - 1 && (
            <Divider flexItem orientation="horizontal" sx={{ width: '100px', height: '2px', backgroundColor: '#008080', mx: 4 }} />
          )}
          </React.Fragment>
        ))}
        </Box>
        </Grid>

        <Box mt={4} mb={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Divider
            sx={{
              width: '80%', // Adjusts the length of the line
              borderColor: '#e0e0e0',
              borderWidth: '1.5px',
            }}
          />
        </Box>
      </Grid>
      <Box display="flex" alignItems="center" mb={1} mt={3}>
        {/* File Icon */}
        <InsertDriveFileIcon sx={{ color: '#008080', fontSize: '20px' }} />

        {/* Text */}
        <Typography variant="body1" sx={{ color: '#008080', fontWeight: 'bold', ml: 1 }}>
          Downloaded Tables
        </Typography>

        {/* Download Icon */}
        <DownloadIcon sx={{ color: '#008080', ml: 1, fontSize: '20px' }} />
      </Box>
      {/* Required Item Details Table */}
      <Typography variant="subtitle1" style={{ marginTop: 40 }}>Required Item Details</Typography>
      <TableContainer component={Paper} style={{ marginTop: 16 }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#b2ece9' }}>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                  checked={rows.length > 0 && selectedRows.length === rows.length}
                  onChange={handleSelectAllClick}
                />
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
              <TableCell>Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              const isItemSelected = isSelected(row.srNo);
              return (
                <TableRow
                  key={index}
                  hover
                  onClick={() => handleRowClick(row.srNo)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                  style={{ backgroundColor: index % 2 ? '#f9f5e6' : 'white' }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" checked={isItemSelected} />
                  </TableCell>
                  <TableCell>{row.srNo}</TableCell>
                  <TableCell>{row.matCode}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.qty}</TableCell>
                  <TableCell>{row.uom}</TableCell>
                  <TableCell>{row.owner}</TableCell>
                  <TableCell>{row.packingDetails}</TableCell>
                  <TableCell>{row.dimensions}</TableCell>
                  <TableCell>{row.weight}</TableCell>
                  <TableCell>{row.remarks}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

     
    </Container>
  );
};

export default VesselMaterialRequest;