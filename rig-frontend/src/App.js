import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import {BrowserRouter, Routes,Route, useLocation, useNavigate} from 'react-router-dom'
import Homepage from './components/homepage';
import MaterialRequestTable from './components/test';
import MaterialRequestForm from './components/test2';
import MaterialRequestSummary from './components/test3';
import BeautifulTable from './components/test4';
import LoginPage from './components/test5';
import {
  AppBar, Toolbar, Typography, Box, IconButton, Button,Drawer, List, ListItem, ListItemIcon, ListItemText,
} from '@mui/material';
import { Home as HomeIcon, AccountTree as AccountTreeIcon, Settings as SettingsIcon } from '@mui/icons-material';
import MaterialRequest2 from './components/test6';
import VesselsTable from './components/vess1';
import VesselMaterialRequest from './components/vess2';


const drawerWidth = 50;

function AppLayout() {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex' }}>
      {/* Header */}
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Home
          </Typography>
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
                <AccountTreeIcon onClick={()=>navigate("/test6")}/>
              </ListItemIcon>
              
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, ml: `${drawerWidth}px`, mt: '64px' }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/test" element={<MaterialRequestTable />} />
          <Route path="/test2" element={<MaterialRequestForm />} />
          <Route path="/test3/:id" element={<MaterialRequestSummary />} />
          <Route path="/test4" element={<BeautifulTable />} />
          <Route path="/test6" element={<MaterialRequest2/>}/>
          <Route path="/ves1" element={<VesselsTable/>} />
          <Route path="/ves2" element={<VesselMaterialRequest/>} />
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