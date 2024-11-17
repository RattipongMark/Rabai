import { useState, useEffect } from "react";

const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return; // ถ้าไม่มี userId ก็ไม่ดึงข้อมูล

    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/noti/discussionboard/${userId}`); // API endpoint ที่ดึงข้อมูล notifications
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data = await response.json();
        setNotifications(data); // เก็บข้อมูล notifications
        console.log(data)
      } catch (error) {
        setError(error.message); // เก็บข้อผิดพลาด
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]); // เรียกใช้ใหม่เมื่อ userId เปลี่ยนแปลง

  return { notifications, loading, error };
};

export default useNotifications;
