import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Register from './Auth/Register';
import Login from './Auth/Login';
import DiscussionBoard from './pages/discussBoard/discussionBoard';
import AnonyChat from './pages/anonyChat/Anonyroom';
import RoomTemplate from './pages/anonyChat/Roomtemplate';
import CreateAnonyChat from './pages/anonyChat/CreateRoom';
import { useAuth } from './contexts/AuthContext';
import Activity from './pages/Activity';
import UserProfile from './pages/userProfile';
import GuestView from './pages/guestView';
import ActivitiesBoard from './pages/activites/activitiesBoard';

const App = () => {
  // ตรวจสอบข้อมูลจาก localStorage และตรวจสอบว่าเป็น null หรือไม่
  const storedData = JSON.parse(localStorage.getItem('user_data'));

  // ใช้ optional chaining เพื่อตรวจสอบว่า storedData มีค่าไหมก่อนที่จะเข้าถึง token
  const check = storedData?.token;

  return (
    <Router>
      <Routes>
        {/* ถ้าไม่มี token จะไปที่หน้า Register หรือ Login */}
        <Route path='/' element={!check ? <GuestView /> : <Navigate to="/DiscussionBoard" />} />
        <Route path='/register' element={!check ? <Register /> : <Navigate to="/DiscussionBoard" />} />
        <Route path='/login' element={!check ? <Login /> : <Navigate to="/DiscussionBoard" />} />

        {/* ถ้ามี token จะเข้าถึงหน้า DiscussionBoard หรือ Anonymous-Chat ได้ */}
        <Route path='/' element={check ? <DiscussionBoard /> : <Navigate to="/login" />} />
        <Route path='/DiscussionBoard' element={check ? <DiscussionBoard /> : <Navigate to="/login" />} />
        
        <Route path='/Anonymous-Chat' element={check ? <AnonyChat /> : <Navigate to="/login" />} />
        <Route path="/room/:roomName" element={check ? <RoomTemplate /> : <Navigate to="/login" />} />
        <Route path='/CreateAnonymous-Chat' element={check ? <CreateAnonyChat /> : <Navigate to="/login" />} />

        <Route path='/Activities' element={check ? <ActivitiesBoard /> : <Navigate to="/login" />} />

        <Route path='/Profile' element={check ? <UserProfile/> : <Navigate to="/login" />} />

      </Routes>
    </Router>
  );
}

export default App;
