import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useBoardNotifications = (userId) => {
  const [BoardNotifications, setBoardNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return; // ถ้าไม่มี userId ก็ไม่ดึงข้อมูล

    // สร้าง socket connection
    const socket = io('https://rabai-server.onrender.com');

    const fetchBoardNotifications = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://rabai-server.onrender.com/api/noti/discussionboard/${userId}`); // API endpoint สำหรับดึงข้อมูล
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        setBoardNotifications(data);
      } catch (error) {
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchBoardNotifications(); // ดึงข้อมูล Notifications

    // เข้าร่วมห้องสำหรับรับ Notification
    socket.emit('joinBoardNotifications', userId);

    // ฟัง Event notification จาก socket
    socket.on('BoardNotification', (newBoardNotification) => {
      setBoardNotifications((prev) => [newBoardNotification, ...prev]); // อัปเดต Notification ใหม่
    });

    // Cleanup socket connection เมื่อ component ถูก unmount
    return () => {
      socket.disconnect();
    };

  }, [userId]);

  return { BoardNotifications, loading, error }; // คืนค่า state
};

export default useBoardNotifications;
