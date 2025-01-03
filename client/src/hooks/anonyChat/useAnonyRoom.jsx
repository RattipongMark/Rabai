import { useState, useEffect } from "react";
import axios from "axios";

const useAnonyRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        // Fetch all rooms
        const roomResponse = await axios.get("https://rabai-server.onrender.com/api/room/");
        const roomsData = roomResponse.data;

        // Fetch all tags once
        const tagsResponse = await axios.get("https://rabai-server.onrender.com/api/tag/tags");
        const tagsData = tagsResponse.data;

        // Create a map of tagId to tagName for easy lookup
        const tagMap = new Map();
        tagsData.forEach(tag => {
          tagMap.set(tag._id, tag.tagName);  // Map tagId -> tagName
        });

        // Fetch user counts for each room and map each room's tagId to tag name
        const roomsWithTags= await Promise.all(
          roomsData.map(async (room) => {
            const tagName = room.tagId ? tagMap.get(room.tagId) || "Unknown Tag" : "No Tag";
            return { ...room, tagName: tagName};  // Add the tagName and userCount
          })
        );
        setRooms(roomsWithTags);  // Update rooms state with new rooms that have tagNames and userCount
      } catch (err) {
        console.log(err);
        if(err.status == 404){
          setError("No Room Available")
        } else{
          setError(err.message);  // Handle errors
        }
       
      } finally {
        setLoading(false);  // Finish loading
      }
    };

    fetchRooms();  // Run fetchRooms when component mounts
  }, []);

  return { rooms, loading, error };  // Return rooms, loading status, and error state
};


export default useAnonyRoom;
