import './App.css';
import React from 'react';
import {Routes,Route} from "react-router-dom"
import Signup from './components/Signup';
import Login from './components/Login';
import DashBoard from './components/Dashboard';





function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Signup />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<DashBoard />}></Route>
        
      </Routes>
    </div>
  );
}

export default App;
