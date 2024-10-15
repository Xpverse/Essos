import React ,{useEffect, useState} from 'react';
import { Container,Typography,Button,Table,TableBody,TableCell,TableContainer,TableHead, TableRow,Paper,Select,MenuItem,
  FormControl,InputLabel,IconButton,Tooltip} from '@mui/material';
import { Add, ArrowForward, Event, ErrorOutline } from '@mui/icons-material'; 
import {useDispatch,useSelector} from 'react-redux'
import { fetchMaterialRequestData } from '../redux/actions/materialRequestsAction';
import { fetchRigRequestData } from '../redux/actions/rigAction';
import { fetchVesselRequestData } from '../redux/actions/vesselAction';
import { useNavigate } from 'react-router-dom';
function MaterialRequestTable() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const materialRequests = useSelector((state) => state.materialRequestReducer.materialRequests)
  const rigs = useSelector((state) => state.rigReducer.rigs || [])
  const vessels = useSelector((state) => state.vesselReducer.vessels || [])
  const [currentRig,setCurrentRig] = useState({})
  
  useEffect(() =>{
    dispatch(fetchMaterialRequestData())
    dispatch(fetchRigRequestData())
    dispatch(fetchVesselRequestData())
  },[dispatch])

  const handleCreateClick = () => {
    navigate('/test2')
  }

  const handleNavigation = (id) => {
   
    navigate(`/test3/${id}`); 
  };

  const handleRigChange = (event) => {
    setCurrentRig(event.target.value);
  };

  // const filteredMaterialRequests = materialRequests.filter((request) =>
  //    (request.materialRequestFromLocationType=="RIG" && request.materialRequestFromLocation))
  const createData = (requestId,requestDate,requestName,requiredBy,supplier,vessel,remarks,status) => {
      return {requestId ,requestDate,requestName,requiredBy,supplier,vessel,remarks,status}   
  }

  const records = materialRequests.map((materialRequest) => createData(
    materialRequest.materialRequestId,
   '12/12/2024',
   materialRequest.materialRequestName,
   materialRequest.materialRequestRequiredBy,
   materialRequest.materialRequestSupplier.supplierName,
   materialRequest.materialRequestVessel.vesselName,
   materialRequest.materialRequestRemarks,
   materialRequest.materialRequestStatus,


  ))
  const rows = [
    {
      requestDate: '12/12/2024',
      requestName: 'Request Name',
      requiredBy: '25 May 2024 13:00',
      supplier: 'Supplier',
      rigNameId: 'Rig 1',
      remarks: 'Remarks - 123',
      currentStatus: 'status',
      action: 'Request Material',
    },
    {
        requestDate: '12/12/2024',
        requestName: 'Request Name',
        requiredBy: '25 May 2024 13:00',
        supplier: 'Supplier',
        rigNameId: 'Rig 1',
        remarks: 'Remarks - 123',
        currentStatus: 'status',
        action: 'Request Material',
      },
      {
        requestDate: '12/12/2024',
        requestName: 'Request Name',
        requiredBy: '25 May 2024 13:00',
        supplier: 'Supplier',
        rigNameId: 'Rig 1',
        remarks: 'Remarks - 123',
        currentStatus: 'status',
        action: 'Request Material',
      },
      {
        requestDate: '12/12/2024',
        requestName: 'Request Name',
        requiredBy: '25 May 2024 13:00',
        supplier: 'Supplier',
        rigNameId: 'Rig 1',
        remarks: 'Remarks - 123',
        currentStatus: 'status',
        action: 'Request Material',
      },
    
  ];

  return (
    <Container maxWidth="lg" style={{ padding: '20px' }}>
      
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>
        Material Requests
      </Typography>

      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        
        <FormControl variant="outlined" size="small" style={{ minWidth: 200 }}>
          <InputLabel>Rig</InputLabel>
          <Select
            label="Rig"
            value={currentRig}
            onChange={handleRigChange}
          
          >
          {rigs && rigs.map((rig) => (
              <MenuItem key={rig.rigId} value={rig.rigName}>
              {rig.rigName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        
        <Button
          variant="contained"
          color="primary"
          style={{ borderRadius: '20px', padding: '8px 16px', backgroundColor: '#009688' }} 
          onClick={handleCreateClick}
        >
          + Create Material Request
        </Button>
      </div>

      
      <TableContainer component={Paper} elevation={3} style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <Table>
          <TableHead style={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Request Date</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Request Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Required By</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Supplier</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>VesselName</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Remarks</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Current Status</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((row, index) => (
              <TableRow key={index} hover style={index % 2 === 0 ? { backgroundColor: '#fafafa' } : {}}>
                <TableCell>
                  <Typography style={{ display: 'flex', alignItems: 'center' }}>
                    <Event fontSize="small" style={{ marginRight: '8px', color: '#009688' }} />
                    {row.requestDate}
                  </Typography>
                </TableCell>
                <TableCell onClick={() => handleNavigation(row.requestId)}>
                  <Typography style={{ display: 'flex', alignItems: 'center', color: '#009688' }}>
                    {row.requestName}
                    <ArrowForward fontSize="small" style={{ marginLeft: '8px' }} />
                  </Typography>
                </TableCell>
                <TableCell>{row.requiredBy}</TableCell>
                <TableCell>{row.supplier}</TableCell>
                <TableCell>{row.vessel}</TableCell>
                <TableCell>{row.remarks}</TableCell>
                <TableCell>
                  <Typography color="error" style={{ display: 'flex', alignItems: 'center' }}>
                    <ErrorOutline fontSize="small" style={{ marginRight: '8px' }} />
                    {row.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    style={{ borderRadius: '12px', backgroundColor: '#00796B', color: '#fff' }}
                  >
                    {row.action}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default MaterialRequestTable;
