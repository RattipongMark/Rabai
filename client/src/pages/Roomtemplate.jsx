import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client'; // import socket.io-client
import useAnony from '../hooks/useAnony';
import useChat from '../hooks/useChat';

const RoomTemplate = () => {
  const { roomName } = useParams();
  const { getFakeName, loading, error: fetchError } = useAnony();
  const { message, setMessage, sending, error, sendMessage } = useChat(roomName);
  const [fakedata, setFakeData] = useState([]);
  const [fakeName, setFakeName] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null); // ใช้ useRef เพื่อเก็บ socket connection

  const storedData = JSON.parse(localStorage.getItem("user_data"));
  const currentUserId = storedData?.user?._id;

  // Socket.IO setup
useEffect(() => {
    socketRef.current = io('http://localhost:3000'); // เชื่อมต่อกับเซิร์ฟเวอร์
  
    // Listen for new messages from the server
    socketRef.current.on('newMessage', (newMessage) => {
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
    });
  
    // Fetch initial messages when joining the room
    const fetchMessages = async () => {
      const response = await fetch(`http://localhost:3000/api/messages/${roomName}`);
      const data = await response.json();
      setMessages(data.data.messages);
      console.log(messages)
    };
    fetchMessages();
  
    // Clean up the socket connection when the component is unmounted
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomName]);
  

  // Fetch fake name for the user
  useEffect(() => {
    const fetchFakeName = async () => {
      if (storedData && storedData.user._id) {
        const { success, fakedata, message } = await getFakeName(storedData.user._id);
        setFakeData(fakedata);
        console.log("client",fakedata);
        if (success) {
          setFakeName(fakedata.fakeName);
        } else {
          alert(message || 'Failed to fetch fake name');
        }
      }
    };
    fetchFakeName();
  }, []);

  // Send message through socket
  const handleSendMessage = () => {
    if (message.trim()) {
      if (!fakedata || !fakedata._id) {
        console.error('fakedata or fakedata._id is null or undefined');
        return; // Exit the function if no valid user data
      }
  
      const newMessage = {
        content: message,
        user: {userId:fakedata._id,userName:fakedata.fakeName},
        roomName: roomName,
      };
      // ส่งข้อความไปยัง backend และ emit ผ่าน socket
      sendMessage(newMessage);
      socketRef.current.emit('sendMessage', newMessage);
  
      // Clear the message input after sending
      setMessage('');
    }
  };
  

  return (
    <div className="room-template max-w-3xl mx-auto my-6 p-4 border rounded-lg shadow-lg">
      {/* Display loading, error or fake name */}
      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : fetchError ? (
        <div className="text-center text-red-600">{fetchError.message}</div>
      ) : (
        <div className="fake-name text-center">
          <h1 className="text-2xl font-semibold">Welcome to {roomName}</h1>
          <h3 className="text-xl text-gray-700">Welcome, {fakeName}!</h3>
        </div>
      )}

      {/* Display messages */}
      <div className="room-content mt-6">
  <div className="message-list space-y-4">
    {messages.map((msg, index) => (
      <div
        key={index}
        
      >
        <div className={`message-content p-4 rounded-lg bg-white`}>
          <strong>{msg.userName}: </strong> {/* แก้ไขตรงนี้ */}
          <p>{msg.content}</p>
        </div>
      </div>
    ))}
  </div>


        {/* Message form */}
        <div className="message-form flex flex-col space-y-4">
          <textarea
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="3"
          />
          <div className="flex justify-between items-center">
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              onClick={handleSendMessage}
              disabled={sending}
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomTemplate;
