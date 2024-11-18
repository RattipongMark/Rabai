import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return; // ถ้าไม่มี userId ก็ไม่ดึงข้อมูล

    // สร้าง socket connection
    const socket = io('http://localhost:3000');

    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/noti/discussionboard/${userId}`); // API endpoint สำหรับดึงข้อมูล
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        setNotifications(data);
        console.log(data)
      } catch (error) {
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchNotifications(); // ดึงข้อมูล Notifications

    // เข้าร่วมห้องสำหรับรับ Notification
    socket.emit('joinNotifications', userId);

    // ฟัง Event notification จาก socket
    socket.on('notification', (newNotification) => {
      setNotifications((prev) => [newNotification, ...prev]); // อัปเดต Notification ใหม่
    });

    // Cleanup socket connection เมื่อ component ถูก unmount
    return () => {
      socket.disconnect();
    };

  }, [userId]);

  return { notifications, loading, error }; // คืนค่า state
};

export default useNotifications;
