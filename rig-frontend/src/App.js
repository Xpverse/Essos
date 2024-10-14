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
  AppBar, Toolbar, Typography, Box, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import { Home as HomeIcon, AccountTree as AccountTreeIcon, Settings as SettingsIcon } from '@mui/icons-material';


const drawerWidth = 80;

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
            Logged in as <strong>Base Coordinator</strong>
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
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AccountTreeIcon />
              </ListItemIcon>
              <ListItemText primary="" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="" />
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