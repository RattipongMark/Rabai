// import { useState } from 'react';
// import axios from 'axios';

// const useChat = () => {
//   const [message, setMessage] = useState('');
//   const [sending, setSending] = useState(false);
//   const [error, setError] = useState(null);

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
//       console.log("Message sent successfully =>", response.data);

//       // Reset message after sending
//       setMessage('');
//     } catch (err) {
//       setError('Failed to send message');
//     } finally {
//       setSending(false);
//     }
//   };

//   return {
//     message,
//     setMessage,
//     sending,
//     error,
//     sendMessage,
//   };
// };

// export default useChat;
