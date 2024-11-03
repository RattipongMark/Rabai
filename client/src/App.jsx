import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from './contexts/AuthContext';

const App = () => {
  const {isAuthenticated} = useAuth();
  return (
    <Router>
      <Routes>
        <Route path= '/register' element={ !isAuthenticated ? <Register/> : <Navigate to = "/" />} />
        <Route path= '/login' element={!isAuthenticated ? <Login/> : <Navigate to = "/" />} />
        <Route path= '/' element={isAuthenticated ? <Dashboard/> : <Navigate to = "/login" />} />
      </Routes>
    </Router>
  )
}

export default App