// import { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';
// import { Avatar } from 'antd';

// const useChat = (roomName, fakedata, message, setMessage) => {
//   const [sending, setSending] = useState(false);
//   const [error, setError] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const socketRef = useRef(null);

  
//   // Socket.IO setup
//   useEffect(() => {
//     socketRef.current = io('https://rabai-server.onrender.com'); // เชื่อมต่อกับเซิร์ฟเวอร์
  
//     // ฟังข้อความใหม่จากเซิร์ฟเวอร์
//     socketRef.current.on('newMessage', (newMessage) => {
//       console.log(newMessage.roomName);
//       if(roomName == newMessage.roomName){
//         setMessages((prevMessages) => [...prevMessages,newMessage]);
//       }
//     });
  
//     // Fetch initial messages when joining the room
//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get(`https://rabai-server.onrender.com/api/messages/${roomName}`);
//         console.log("fetch",response)
//         setMessages(response.data.data.messages.reverse());
//       } catch (err) {
//         console.error('Error fetching messages:', err);
//       }
//     };
//     fetchMessages();

//     // Clean up the socket connection when the component is unmounted
//     return () => {
//       // socketRef.current.emit("leaveRoom", roomName, fakeName,fakedata.userId);
//       socketRef.current.disconnect();
//     };
//   }, [roomName]);

//   // ฟังก์ชันสำหรับส่งข้อความ
//   const sendMessage = async (newMessage) => {
//     if (!newMessage.content.trim()) return; // ไม่ให้ส่งข้อความว่าง

//     setSending(true);
//     setError(null);

//     try {
//       const response = await axios.post('https://rabai-server.onrender.com/api/messages/', {
//         userId: newMessage.user.userId,
//         userName: newMessage.user.userName,
//         room: newMessage.roomName,
//         content: newMessage.content,
//       });
//       console.log("Message sent successfully", response.data);

//       // Emit the message through socket
//       socketRef.current.emit('sendMessage', newMessage);

//       setMessage('');
//     } catch (err) {
//       setError('Failed to send message');
//     } finally {
//       setSending(false);
//     }
//   };

//   // handleSendMessage moved here
//   const handleSendMessage = () => {
//     if (message.trim()) {
//       if (!fakedata || !fakedata._id) {
//         console.error('fakedata or fakedata._id is null or undefined');
//         return;
//       }

//       const newMessage = {
//         content: message,
//         user: { userId: fakedata._id, userName: fakedata.fakeName ,avatar:fakedata.avatar},
//         roomName: roomName,
//       };
//       sendMessage(newMessage);
//     }
//   };

//   return {
//     sending,
//     error,
//     messages,
//     handleSendMessage,  // Return handleSendMessage for use in the component
//   };
// };

// export default useChat;


