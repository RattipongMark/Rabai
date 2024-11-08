import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './pages/Dashboard';
import AnonyChat from './pages/anonyChat/Anonyroom';
import RoomTemplate from './pages/anonyChat/Roomtemplate';
import { useAuth } from './contexts/AuthContext';
import Activity from './pages/Activity';

const App = () => {
  // ตรวจสอบข้อมูลจาก localStorage และตรวจสอบว่าเป็น null หรือไม่
  const storedData = JSON.parse(localStorage.getItem('user_data'));

  // ใช้ optional chaining เพื่อตรวจสอบว่า storedData มีค่าไหมก่อนที่จะเข้าถึง token
  const check = storedData?.token;

  return (
    <Router>
      <Routes>
        {/* ถ้าไม่มี token จะไปที่หน้า Register หรือ Login */}
        <Route path='/register' element={!check ? <Register /> : <Navigate to="/DiscussionBoard" />} />
        <Route path='/login' element={!check ? <Login /> : <Navigate to="/DiscussionBoard" />} />

        {/* ถ้ามี token จะเข้าถึงหน้า DiscussionBoard หรือ Anonymous-Chat ได้ */}
        <Route path='/' element={check ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path='/DiscussionBoard' element={check ? <Dashboard /> : <Navigate to="/login" />} />
        
        <Route path='/Anonymous-Chat' element={check ? <AnonyChat /> : <Navigate to="/login" />} />
        <Route path="/room/:roomName" element={<RoomTemplate />} />

        <Route path='/Activity' element={check ? <Activity /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
