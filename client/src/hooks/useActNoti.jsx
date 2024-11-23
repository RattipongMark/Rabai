import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useActNotifications = (userId) => {
  const [ActNotifications, setActNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return; // ถ้าไม่มี userId ก็ไม่ดึงข้อมูล

    // สร้าง socket connection
    const socket = io('https://rabai-server.onrender.com');

    const fetchActNotifications = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://rabai-server.onrender.com/api/noti/activity/${userId}`);
         // API endpoint สำหรับดึงข้อมูล
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        console.log("fnot",data)
        setActNotifications(data);
      } catch (error) {
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchActNotifications(); // ดึงข้อมูล Notifications

    // เข้าร่วมห้องสำหรับรับ Notification
    socket.emit('joinActNotifications', userId);

    // ฟัง Event notification จาก socket
    socket.on('ActNotification', (newActNotification) => {
      setActNotifications((prev) => [newActNotification, ...prev]); // อัปเดต Notification ใหม่
    });

    // Cleanup socket connection เมื่อ component ถูก unmount
    return () => {
      socket.disconnect();
    };

  }, [userId]);

  return { ActNotifications, loading, error }; // คืนค่า state
};

export default useActNotifications;
