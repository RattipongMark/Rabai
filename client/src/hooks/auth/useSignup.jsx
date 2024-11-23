import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { message } from 'antd'; // Make sure to import message from antd

const useSignup = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Corrected the typo

    const registerUser = async (values) => {
        if (values.password !== values.confirmPassword) {
            message.error('Passwords do not match.'); // Use Ant Design message
            return;
        }
        try {
            setError(null);
            setLoading(true); // Set loading to true when starting the request

            const res = await fetch('https://rabai-server.onrender.com/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify content type
                },
                body: JSON.stringify(values),
            });

            const data = await res.json();
            if (res.status === 201) {
                message.success(data.message);
                login(data.token, data.user);
            } else if (res.status === 400) {
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

    return { loading, error, registerUser };
};

export default useSignup;

