import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Homepage from './components/homepage';
import MaterialRequestTable from './components/test';
import MaterialRequestForm from './components/test2';
import MaterialRequestSummary from './components/test3';
import BeautifulTable from './components/test4';
import LoginPage from './components/test5';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<Homepage/>}/>
      <Route path ="/test" element={<MaterialRequestTable/>}/>
      <Route path = "/login" element={<LoginPage/>}/>
      <Route path ="/test2" element={<MaterialRequestForm/>}/>
      <Route path ="/test3" element={<MaterialRequestSummary/>}/>
      <Route path ="/test4" element={<BeautifulTable/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
