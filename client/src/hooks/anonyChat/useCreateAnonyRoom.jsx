import { useState } from "react";
import axios from "axios";

const useCreateAnonyRoom = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createRoom = async (roomName, maxParticipants, tagId) => {
    setLoading(true);
    console.log(roomName, maxParticipants, tagId);
    try {
      // Sending request to backend to create the room
      const response = await axios.post("https://rabai-server.onrender.com/api/room/create", {
        roomName,
        maxParticipants,
        tagId,
      });

      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response ? err.response.data.message : err.message);
      throw err;
    }
  };

  return {
    createRoom,
    loading,
    error,
  };
};

export default useCreateAnonyRoom;
