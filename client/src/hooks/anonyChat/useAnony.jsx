import { useState } from 'react';
import axios from 'axios';

// Custom hook for handling fake name operations
const useAnony = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create a new fake name
  const createFakeName = async (userId, fakeName , avatar) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3000/api/anony/setfake', { userId, fakeName,avatar });

      if (response.status === 201) {
        return { success: true, message: 'Fake name saved successfully!' };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      setError(err);
      return { success: false, message: 'Server error' };
    } finally {
      setLoading(false);
    }
  };

  // Get fake name by user ID
  const getFakeName = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3000/api/anony/${userId}`);

      if (response.status === 200) {
        return { success: true, fakedata: response.data};
      } else {
        return { success: false, message: response.data};
      }
    } catch (err) {
      setError(err);
      return { success: false, message: 'Server error' };
    } finally {
      setLoading(false);
    }
  };

  return { createFakeName, getFakeName, loading, error };
};

export default useAnony;
