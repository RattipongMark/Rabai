import { useState } from 'react';
import axios from 'axios';

const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createPost = async (userId, description, tagId, title, location, startDate, endDate, maxParticipants) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post('https://rabai-server.onrender.com/api/activity/create', {
        userId,
        title,
        detail: description,
        location,
        participant: maxParticipants,
        start_time: startDate,
        end_time: endDate,
        deadline: startDate, // ปรับตามความเหมาะสม
        tagId,
      });

      if (response.status === 201) {
        setSuccess(true);
      }

      return response.data;
    } catch (err) {
      setError('Error creating post. Please try again.');
      setSuccess(false);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createPost, loading, error, success };
};

export default useCreatePost;
