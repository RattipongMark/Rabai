import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd'; // Import message จาก antd
import { useAuth } from '../contexts/AuthContext';

const useEditProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userData, setuserData] = useState(null);
    const storedData = JSON.parse(localStorage.getItem("user_data"));

    const updateProfile = async (userData) => {
        setLoading(true);
        setError(null); // รีเซ็ต error เมื่อเริ่มต้นการอัปเดต
        console.log("data",userData)
        try {
            const response = await axios.put('https://rabai-server.onrender.com/api/profile/updateprofile', userData);
            if (response.status === 200) {
                message.success(response.data.message);
                // Handle success case
                console.log("Updated User:", response.data.updatedUser);

                setuserData(response.data.updatedUser);

                localStorage.setItem(
                    'user_data',
                    JSON.stringify({
                        token: storedData.token, // สมมติว่า token จะไม่เปลี่ยน
                        user: response.data.updatedUser
                    })
                );
                return true;

            } else {
                message.error(response.data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error("Error Response:", error.response);
            if (error.response) {
                // Server responded but with an error status
                message.error(error.response.data.message || 'Server error occurred');
            } else if (error.request) {
                // Request made but no response received
                message.error('No response from server. Please try again later.');
            } else {
                // Something went wrong while setting up the request
                message.error(error.message || 'An unexpected error occurred');
            }
        }finally{
            setLoading(false);
        }
    };

    return { updateProfile, loading, error };
};

export default useEditProfile;
