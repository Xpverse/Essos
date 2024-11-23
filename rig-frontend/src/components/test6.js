import React, { useState ,useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux'
import { fetchMaterialRequestData } from '../redux/actions/materialRequestsAction';
import { fetchRigRequestData } from '../redux/actions/rigAction';
import { fetchVesselRequestData } from '../redux/actions/vesselAction';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { red } from "@mui/material/colors";

const MaterialRequest2 = () => {
  const [statusFilter, setStatusFilter] = useState("");

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

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
    navigate('/createMaterialRequest')
  }

  const handleNavigation = (id) => {
   
    navigate(`/materialRequestSummary/${id}`); 
  };

  const handleRigChange = (event) => {
    setCurrentRig(event.target.value);
  };


  // const filteredMaterialRequests = materialRequests.filter((request) =>
  //    (request.materialRequestFromLocationType=="RIG" && request.materialRequestFromLocation))
  const createData = (requestId,requestDate,requestName,section,requiredBy,requestFromLocation,requestToLocation,vessel,supplier,remarks,numberOfLifts,weightInTons,status) => {
      return {requestId,requestDate,requestName,section,requiredBy,requestFromLocation,requestToLocation,vessel,supplier,remarks,numberOfLifts,weightInTons,status}   
  }

  const records = materialRequests.map((materialRequest) => createData(
    materialRequest.materialRequestId,
   '12/12/2024',
   materialRequest.materialRequestName,
   'Section-1',
   materialRequest.materialRequestRequiredBy,
   materialRequest.materialRequestFromLocation.locationName,
   materialRequest.materialRequestToLocation.locationName,
   materialRequest.materialRequestVessel.vesselName,
   materialRequest.materialRequestSupplier.supplierName,
   1,
   10,
   materialRequest.materialRequestRemarks,
   materialRequest.materialRequestStatus,


  ))

  // Table Data
  const tableData = [
    {
      requestDate: "14 Oct 2024",
      requestNumber: "MR_Baroid_001",
      section: '24" drilling',
      requiredBy: "16 Oct 2024",
      from: "Base",
      to: "Rig_1",
      vessel: "Vessel-1",
      supplier: "HLB Baroid",
      remarks: "",
      numberOfLifts: 6,
      weightInTons: 15,
      currentStatus: "Loaded",
    },
  ];

  return (
    <Container>
      {/* Create Material Request Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#008080",
            color: "#008080",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#E0F7FA", borderColor: "#008080" },
          }}
          onClick={handleCreateClick}
        >
          + Create Material Request
        </Button>
      </Box>

      {/* Filters */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel sx={{ fontWeight: "bold" }}>Select Rig</InputLabel>
          <Select label="Select Rig">
            {
              rigs && rigs.map((rig) => (<MenuItem value={rig.rigName}>{rig.rigName} </MenuItem>))
            }
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <InputLabel sx={{ fontWeight: "bold" }}>Select Vessel</InputLabel>
          <Select label="Select Vessel">
            {
              vessels && vessels.map((vessel) => (<MenuItem value={vessel.vesselName}>{vessel.vesselName} </MenuItem>))
            }
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <InputLabel sx={{ fontWeight: "bold" }}>Select Type</InputLabel>
          <Select label="Select Type">
            <MenuItem value={"BackLoad Request"}>BackLoad Request</MenuItem>
            <MenuItem value={"Transfer Request"}>Transfer Request</MenuItem>
            <MenuItem value={"Material Request"}>Material Request</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Status Filter Buttons */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Button
          variant={statusFilter === "Created" ? "contained" : "outlined"}
          onClick={() => handleStatusChange("Created")}
          sx={{
            backgroundColor: statusFilter === "Created" ? "#ADE9EB" : "#FFFFFF",
            color: "#000",
            borderColor: "#ADE9EB",
            textTransform: "none",
            borderRadius: 4,
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#ADE9EB" },
            width: 180,
            height: 50,
          }}
        >
          Created
        </Button>
        <Button
          variant={statusFilter === "Requested" ? "contained" : "outlined"}
          onClick={() => handleStatusChange("Requested")}
          sx={{
            backgroundColor: statusFilter === "Requested" ? "#ADE9EB" : "#FFFFFF",
            color: "#000",
            borderColor: "#ADE9EB",
            textTransform: "none",
            borderRadius: 4,
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#ADE9EB" },
            width: 180,
            height: 50,
          }}
        >
          Requested
        </Button>
        <Button
          variant={statusFilter === "Loading requested" ? "contained" : "outlined"}
          onClick={() => handleStatusChange("Loading requested")}
          sx={{
            backgroundColor: statusFilter === "Loading requested" ? "#ADE9EB" : "#FFFFFF",
            color: "#000",
            borderColor: "#ADE9EB",
            textTransform: "none",
            borderRadius: 4,
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#ADE9EB" },
            width: 180,
            height: 50,
          }}
        >
          Loading requested
        </Button>
        <Button
          variant={statusFilter === "Loaded" ? "contained" : "outlined"}
          onClick={() => handleStatusChange("Loaded")}
          sx={{
            backgroundColor: statusFilter === "Loaded" ? "#ADE9EB" : "#FFFFFF",
            color: "#000",
            borderColor: "#ADE9EB",
            textTransform: "none",
            borderRadius: 4,
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#ADE9EB" },
            width: 180,
            height: 50,
          }}
        >
          Loaded
        </Button>
        <Button
          variant={statusFilter === "Offloading requested" ? "contained" : "outlined"}
          onClick={() => handleStatusChange("Offloading requested")}
          sx={{
            backgroundColor: statusFilter === "Offloading requested" ? "#ADE9EB" : "#FFFFFF",
            color: "#000",
            borderColor: "#ADE9EB",
            textTransform: "none",
            borderRadius: 4,
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#ADE9EB" },
            width: 180,
            height: 50,
          }}
        >
          Offloading requested
        </Button>
        <Button
          variant="outlined"
          disabled
          sx={{
            textTransform: "none",
            borderRadius: 4,
            fontWeight: "bold",
            color: "#A9A9A9",
            width: 180,
            height: 50,
            borderColor: "#A9A9A9",
          }}
        >
          Offloaded
        </Button>
      </Box>

     
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="text"
          onClick={() => handleStatusChange("")}
          sx={{
            textTransform: "none",
            color: "#008080",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          Clear Status Filter
        </Button>
      </Box>

    
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", cursor: "pointer" }}
        >
          Downloaded Tables
        </Typography>
      </Box>

      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="material request table">
          <TableHead >
            <TableRow sx={{  backgroundColor: '#b2ece9' }}>
              <TableCell>Request Date</TableCell>
              <TableCell>Request Number</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Required by</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Vessel</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Number of Lifts</TableCell>
              <TableCell>Weight In Tons</TableCell>
              <TableCell>Current Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.requestDate}</TableCell>
                <TableCell  onClick={() => handleNavigation(row.requestId)}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#008080",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    {row.requestName}
                  </Typography>
                </TableCell>
                <TableCell>{row.section}</TableCell>
                <TableCell>{row.requiredBy}</TableCell>
                <TableCell>{row.from}</TableCell>
                <TableCell>{row.to}</TableCell>
                <TableCell>{row.vessel}</TableCell>
                <TableCell>{row.supplier}</TableCell>
                <TableCell>{row.remarks}</TableCell>
                <TableCell>{row.numberOfLifts}</TableCell>
                <TableCell>{row.weightInTons}</TableCell>
                <TableCell
                  sx={{ color: row.currentStatus === "Loaded" ? "red" : "black" }}
                >
                  {row.currentStatus}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MaterialRequest2;
