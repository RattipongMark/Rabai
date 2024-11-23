import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import useAnony from "../../hooks/anonyChat/useAnony";

const useRoom = () => {
  const { roomName } = useParams();
  const { getFakeName, loading, error: fetchError } = useAnony();
  const [fakedata, setFakeData] = useState([]);
  const [fakeName, setFakeName] = useState("");
  const [message, setMessage] = useState("");
  const [userCount, setUserCount] = useState(0);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const storedData = JSON.parse(localStorage.getItem("user_data"));
  const currentUserId = storedData?.user?._id;
  const socketRef = useRef(null);

  // Fetch fake name
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

  // Socket.IO setup and message fetching
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.emit("leaveRoom", roomName, fakeName, fakedata.userId);
    }

    socketRef.current = io("https://rabai-server.onrender.com");

    // Join the room
    socketRef.current.emit("joinRoom", roomName, fakeName);

    // Listen for user count updates
    socketRef.current.on("updateUserCount", (count) => {
      setUserCount(count);
    });

    // Listen for users in room updates
    socketRef.current.on("updateRoomUsers", (usersInRoom) => {
      setUsersInRoom(usersInRoom);
    });

    // Listen for new messages
    socketRef.current.on("newMessage", (newMessage) => {
      if (roomName === newMessage.roomName) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    // Fetch initial messages
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`https://rabai-server.onrender.com/api/messages/${roomName}`);
        setMessages(response.data.data.messages.reverse());
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();

    // Clean up on component unmount
    return () => {
      socketRef.current.emit("leaveRoom", roomName, fakeName, fakedata.userId);
      socketRef.current.disconnect();
    };
  }, [roomName, fakeName]);

  // Send message function
  const sendMessage = async (newMessage) => {
    if (!newMessage.content.trim()) return; // Avoid sending empty messages

    setSending(true);
    setError(null);

    try {
      const response = await axios.post("https://rabai-server.onrender.com/api/messages/", {
        userId: newMessage.user.userId,
        userName: newMessage.user.userName,
        room: newMessage.roomName,
        content: newMessage.content,
      });
      console.log("Message sent successfully", response.data);

      // Emit the message through socket
      socketRef.current.emit("sendMessage", newMessage);

      setMessage("");
    } catch (err) {
      setError("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  // Handle send message
  const handleSendMessage = () => {
    if (message.trim()) {
      if (!fakedata || !fakedata._id) {
        console.error("fakedata or fakedata._id is null or undefined");
        return;
      }

      const newMessage = {
        content: message,
        user: { userId: fakedata._id, userName: fakedata.fakeName, avatar: fakedata.avatar },
        roomName: roomName,
      };
      sendMessage(newMessage);
    }
  };

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
    usersInRoom,
  };
};

export default useRoom;
