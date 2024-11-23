import { useState, useEffect } from 'react';
import axios from "axios";

const useJoinedActivities = (userId) => {
  const [joinedActivities, setJoinedActivities] = useState([]);

  useEffect(() => {
    const fetchJoinedActivities = async () => {
      try {
        const response = await axios.get(`https://rabai-server.onrender.com/api/join/${userId}`);
        console.log("a",response.data)
        setJoinedActivities(response.data); // ตั้งค่าข้อมูล join ที่ได้มา
      } catch (error) {
        console.error("Error fetching joined activities:", error);
      }
    };

    if (userId) {
      fetchJoinedActivities();
    }
  }, [userId]); // ดึงข้อมูลใหม่หาก userId เปลี่ยนแปลง

  
  return joinedActivities;
};

export default useJoinedActivities;
