import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { message } from 'antd'; // Make sure to import message from antd

const useLogin = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Corrected the typo

    const loginUser = async (values) => {
        try {
            setError(null);
            setLoading(true); // Set loading to true when starting the request

            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify content type
                },
                body: JSON.stringify(values),
            });

            const data = await res.json();
            console.log(data);
            if (res.status === 200) {
                message.success(data.message);
                login(data.token, data.user);
            } else if (res.status === 401) {
                message.error(data.message);
            }else if (res.status === 404) {
                message.error(data.message);
            } else {
                message.error('Registration failed');
            }
        } catch (error) {
            message.error(error.message || 'An error occurred'); // Improved error handling
        } finally {
            setLoading(false); // Ensure loading is set to false
        }
    };

    return { loading, error, loginUser };
};

export default useLogin;

