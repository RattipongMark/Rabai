import { useState } from "react";
import axios from "axios";

const useJoinActivity = (activityId, userId, ownerId) => {
  const [hasJoined, setHasJoined] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const joinActivity = async () => {

    console.log("aaaa",activityId, userId, ownerId)
    // Prevent the owner from joining their own activity
    if (userId === ownerId) {
      setError("You cannot join your own activity.");
      console.log("You cannot join your own activity.")
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("https://rabai-server.onrender.com/api/join/create", {
        userId,
        activityId,
      });

      if (response.status === 201) {
        setHasJoined(true);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to join activity.");
    } finally {
      setLoading(false);
    }
  };

  return { joinActivity, hasJoined, loading, error };
};

export default useJoinActivity;
