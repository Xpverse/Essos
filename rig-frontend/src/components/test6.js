import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMaterialRequestData } from "../redux/actions/materialRequestsAction";
import { fetchRigRequestData } from "../redux/actions/rigAction";
import { fetchVesselRequestData } from "../redux/actions/vesselAction";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';
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
  Paper
} from "@mui/material";

const MaterialRequest2 = () => {
  const [selectedStatuses, setSelectedStatuses] = useState([]); // Multi-select status array
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const materialRequests = useSelector(
    (state) => state.materialRequestReducer.materialRequests
  );
  const rigs = useSelector((state) => state.rigReducer.rigs || []);
  const vessels = useSelector((state) => state.vesselReducer.vessels || []);
  const [currentRig, setCurrentRig] = useState({});

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 
  useEffect(() => {
    dispatch(fetchMaterialRequestData());
    dispatch(fetchRigRequestData());
    dispatch(fetchVesselRequestData());
  }, [dispatch]);

  const handleCreateClick = () => {
    navigate("/createMaterialRequest");
  };

  const handleNavigation = (id) => {
    navigate(`/materialRequestSummary/${id}`);
  };

  const handleRigChange = (event) => {
    setCurrentRig(event.target.value);
  };

  // Multi-select status filter logic
  const handleStatusChange = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((item) => item !== status) // Remove status if already selected
        : [...prev, status] // Add status if not selected
    );
  };

  const clearStatusFilter = () => {
    setSelectedStatuses([]); // Clear all selected statuses
  };

  // Filter records based on selected statuses
  const filteredRecords =
    selectedStatuses.length > 0
      ? materialRequests.filter((item) =>
          selectedStatuses.includes(item.materialRequestStatus)
        )
      : materialRequests;
  
  const statusMap = {
    "REQUEST_CREATED":"CREATED",
    "REQUEST_LOADING":"LOADING",
    "REQUEST_OFFLOADING":"OFFLOADING",
    "REQUEST_LOADED":"LOADED",
    "REQUEST_OFFLOADED":"OFFLOADED"
  }

  const statusReverseMap = {
      "CREATED": "REQUEST_CREATED",
      "LOADING": "REQUEST_LOADING",
      "OFFLOADING": "REQUEST_OFFLOADING",
      "LOADED": "REQUEST_LOADED",
      "OFFLOADED": "REQUEST_OFFLOADED"
  }
  

  const statusActionMap = {
    "REQUEST_CREATED":"LOADING",
    "REQUEST_LOADING":"OFFLOADING",
    "REQUEST_OFFLOADING":"LOADED",
    "REQUEST_LOADED":"OFFLOADED",
    "REQUEST_OFFLOADED":""
  }
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const createData = (
    requestId,
    requestDate,
    requestName,
    section,
    requiredBy,
    vessel,
    supplier,
    remarks,
    numberOfLifts,
    weightInTons,
    status
  ) => {
    return {
      requestId,
      requestDate,
      requestName,
      section,
      requiredBy,
      vessel,
      supplier,
      remarks,
      numberOfLifts,
      weightInTons,
      status,
    };
  };

  const records = filteredRecords.map((materialRequest) =>
    createData(
      materialRequest.materialRequestId,
      "12/12/2024",
      materialRequest.materialRequestName,
      "Section-1",
      materialRequest.materialRequestRequiredBy,
      materialRequest.materialRequestVessel.vesselName,
      materialRequest.materialRequestSupplier.supplierName,
      "sample remark",
      1,
      10,
      materialRequest.materialRequestStatus
    )
  );
  const handleStatusAction = (action, requestId) => {
    handleStatusActionFunction(
      action,
      requestId,
      setSnackbarSeverity,
      setSnackbarMessage,
      setSnackbarOpen,
      dispatch,
    );
  };
  
  const handleStatusActionFunction = async (action, requestId , setSnackbarSeverity,
    setSnackbarMessage,
    setSnackbarOpen,
    dispatch) => {
    const actionPayload = statusReverseMap[action];
  
    const role = sessionStorage.getItem("role");
    let requiredRole = "";
    if (role) {
      const roleString = String(role);
      requiredRole = roleString.substring(5);
      console.log("REQUIRED ROLE****:", requiredRole);
      console.log("sessionStorage ROLE****:", role);
  
    } else {
      console.log("Role is not present in sessionStorage");
      return; // Or handle the lack of a role appropriately
    }
  
    const accessToken = sessionStorage.getItem('accessToken');
  
    console.log("Access Token:", accessToken);
    console.log("API URL: ",`${BASE_URL}/api/v1/role-actions/${requestId}/update-status?role=${requiredRole}&newStatus=${actionPayload}`);
  
  
    try {
        const response = await axios.put(
          `${BASE_URL}/api/v1/role-actions/${requestId}/update-status?role=${requiredRole}&newStatus=${actionPayload}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
  
  
        if (response.status === 200) {
          dispatch(fetchMaterialRequestData());
          window.alert(`Status updated to ${action} successfully!`);
          setSnackbarSeverity("success");
          setSnackbarMessage(`Status updated to ${action} successfully!`);
          setSnackbarOpen(true);
        } else if (response.status === 400) {
          window.alert("Action not allowed for role. Please try again.");
          setSnackbarSeverity("error");
          setSnackbarMessage("Action not allowed for role. Please try again.");
          setSnackbarOpen(true);
        }
        else if (response.status===403){
          window.alert("You are not authorized to perform this action.");
          setSnackbarSeverity("error");
          setSnackbarMessage("You are not authorized to perform this action.");
          setSnackbarOpen(true);
        }
        else{
          window.alert("Error while updating the status. Please try again.");
          console.log("Unexpected Status Code: ", response.status)
          setSnackbarSeverity("error");
          setSnackbarMessage("Error while updating the status. Please try again.");
          setSnackbarOpen(true);
  
        }
    } catch(error){

      console.error("Error during API call:", error)
      

      if (error.response && error.response.status === 400) {
        window.alert("Action not allowed for role. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarMessage("Action not allowed for role. Please try again.");
        setSnackbarOpen(true);

     } else {
      window.alert("Error while updating the status. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarMessage("Error while updating the status. Please try again.");
       setSnackbarOpen(true);
   }
    }
  
  };
  
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
            {rigs &&
              rigs.map((rig) => (
                <MenuItem value={rig.rigName}>{rig.rigName} </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <InputLabel sx={{ fontWeight: "bold" }}>Select Vessel</InputLabel>
          <Select label="Select Vessel">
            {vessels &&
              vessels.map((vessel) => (
                <MenuItem value={vessel.vesselName}>
                  {vessel.vesselName}{" "}
                </MenuItem>
              ))}
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
        {[
          "Created",
          "Requested",
          "Loading requested",
          "Loaded",
          "Offloading requested",
        ].map((status) => (
          <Button
            key={status}
            variant={selectedStatuses.includes(status) ? "contained" : "outlined"}
            onClick={() => handleStatusChange(status)}
            sx={{
              backgroundColor: selectedStatuses.includes(status)
                ? "#ADE9EB"
                : "#FFFFFF",
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
            {status}
          </Button>
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="text"
          onClick={clearStatusFilter}
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

      {/* Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="material request table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#b2ece9" }}>
              <TableCell>Request Date</TableCell>
              <TableCell>Request Number</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Required by</TableCell>
              <TableCell>Vessel</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Number of Lifts</TableCell>
              <TableCell>Weight In Tons</TableCell>
              <TableCell>Current Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.requestDate}</TableCell>
                <TableCell onClick={() => handleNavigation(row.requestId)}>
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
                <TableCell>{row.vessel}</TableCell>
                <TableCell>{row.supplier}</TableCell>
                <TableCell>{row.remarks}</TableCell>
                <TableCell>{row.numberOfLifts}</TableCell>
                <TableCell>{row.weightInTons}</TableCell>
                <TableCell>{statusMap[row.status]}</TableCell>
                <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={() => handleStatusAction(statusActionMap[row.status],row.requestId)}
                  sx={{
                    padding: '12px 28px',
                    backgroundColor: '#00796B',
                    fontSize: '10px',
                    marginLeft: 2,
                  }}
                >
                  {statusActionMap[row.status]}
                </Button>
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
