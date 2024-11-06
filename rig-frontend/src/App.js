import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import {BrowserRouter, Routes,Route, useLocation, useNavigate} from 'react-router-dom'
import Homepage from './components/homepage';
import { useState } from 'react';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import MaterialRequestTable from './components/test';
import MaterialRequestForm from './components/test2';
import MaterialRequestSummary from './components/test3';
import BeautifulTable from './components/test4';
import LoginPage from './components/test5';
import {
  AppBar, Toolbar, Typography, Box, IconButton, Button,Drawer, List, ListItem, ListItemIcon, ListItemText,Menu,MenuItem
} from '@mui/material';
import { Home as HomeIcon, AccountTree as AccountTreeIcon, Settings as SettingsIcon } from '@mui/icons-material';
import MaterialRequest2 from './components/test6';
import VesselsTable from './components/vess1';
import VesselMaterialRequest from './components/vess2';


const drawerWidth = 50;

function AppLayout() {
  const navigate = useNavigate();
  const email = sessionStorage.getItem('email');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('email');
    navigate("/login"); 
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Header */}
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          {email && (
          <>
            <Button onClick={handleMenuClick}>
              <strong>{email}</strong>
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </>
        )}
          <Typography variant="body1" noWrap onClick={()=>navigate("/login")}>
           <Button><strong>log in</strong></Button>
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Left Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon  onClick={()=>navigate("/")}/>
              </ListItemIcon>
              
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AccountTreeIcon onClick={()=>navigate("/materialRequestsNew")}/>
              </ListItemIcon>
              
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DirectionsBoatIcon onClick={()=>navigate("/vessels")}/>
              </ListItemIcon>
              
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, ml: `${drawerWidth}px`, mt: '64px' }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/materialRequests" element={<MaterialRequestTable />} />
          <Route path="/createMaterialRequest" element={<MaterialRequestForm />} />
          <Route path="/materialRequestSummary/:id" element={<MaterialRequestSummary />} />
          <Route path="/test4" element={<BeautifulTable />} />
          <Route path="/materialRequest" element={<MaterialRequest2/>}/>
          <Route path="/vessels" element={<VesselsTable/>} />
          <Route path="/vesselDetails/:id" element={<VesselMaterialRequest/>} />
          <Route path="/materialRequestsNew" element={<MaterialRequest2/>} />id
        </Routes>
      </Box>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Content />
    </BrowserRouter>
  );
}

function Content() {
  const location = useLocation();

  const isLoginRoute = location.pathname === '/login';

  return (
    <div>
      {!isLoginRoute ? (
        <AppLayout />
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      )}
    </div>
  );
}

export default App;