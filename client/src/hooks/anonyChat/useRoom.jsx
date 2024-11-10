import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import useAnony from "../../hooks/anonyChat/useAnony";
import useChat from "../../hooks/anonyChat/useChat";

const useRoom = () => {
  const { roomName } = useParams();
  const { getFakeName, loading, error: fetchError } = useAnony();
  const [fakedata, setFakeData] = useState([]);
  const [fakeName, setFakeName] = useState("");
  const [message, setMessage] = useState("");
  const [userCount, setUserCount] = useState(0);
  const storedData = JSON.parse(localStorage.getItem("user_data"));
  const currentUserId = storedData?.user?._id;

  useEffect(() => {
    const fetchFakeName = async () => {
      if (storedData && storedData.user._id) {
        const { success, fakedata, message } = await getFakeName(storedData.user._id);
        setFakeData(fakedata);
        if (success) {
          setFakeName(fakedata.fakeName);
        } else {
          alert(message || 'Failed to fetch fake name');
        }
      }
    };
    fetchFakeName();
  }, []);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    
    socket.emit('joinRoom', roomName, fakeName);
    
    socket.on('updateUserCount', (count) => {
      setUserCount(count);
      
    });

    return () => {
      socket.emit("leaveRoom", roomName, fakeName,fakedata.userId);
      socket.disconnect();
    };
  }, [roomName, fakeName]);

  const { sending, error, messages, handleSendMessage } = useChat(roomName, fakedata, message, setMessage);

  return {
    loading,
    fetchError,
    fakedata,
    fakeName,
    userCount,
    message,
    setMessage,
    sending,
    error,
    messages,
    handleSendMessage,
  };
};

export default useRoom;
