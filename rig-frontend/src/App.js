import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import {BrowserRouter, Routes,Route, useLocation} from 'react-router-dom'
import Homepage from './components/homepage';
import MaterialRequestTable from './components/test';
import MaterialRequestForm from './components/test2';
import MaterialRequestSummary from './components/test3';
import BeautifulTable from './components/test4';
import LoginPage from './components/test5';
function AppLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: '50px', width: '100%', backgroundColor: 'red' }}>heading</div>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ height: '700px', width: '50px', backgroundColor: 'yellow' }}>nav left</div>
        <div style={{ width: '100%' }}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/test" element={<MaterialRequestTable />} />
            <Route path="/test2" element={<MaterialRequestForm />} />
            <Route path="/test3/:id" element={<MaterialRequestSummary />} />
            <Route path="/test4" element={<BeautifulTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Content />
    </BrowserRouter>
  );
}

function Content() {
  const location = useLocation();

  // Check if the current path is "/login"
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