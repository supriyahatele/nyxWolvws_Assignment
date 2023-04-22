import React from 'react'
import NavBar from "./components/NavBar";
import UpdateEmployee from "./components/UpdateEmployee";
import AddEmployee from "./components/AddEmployee";
import AllEmployee from "./components/AllEmployee";
import { BrowserRouter, Routes,Route} from 'react-router-dom';
import NotFound from './components/NotFound';
import io from "socket.io-client"
function App() {
  const socket=io.connect("http://localhost:4000");
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
       <Route path="/allEmployee" element={<AllEmployee/> } />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/edit/:employeeId" element={<UpdateEmployee />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;