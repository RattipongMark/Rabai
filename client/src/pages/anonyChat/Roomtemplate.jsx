import React, { useEffect, useState ,  useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Navb from "../../assets/Navbar";
import Bg from "../../assets/bg";
import "../../css/AnonyChat.css";
import "../../App.css";
import { Spin } from 'antd'; 
import { useParams } from 'react-router-dom';
import useAnony from '../../hooks/anonyChat/useAnony';
import useChat from '../../hooks/anonyChat/useChat';
import useRoom from '../../hooks/anonyChat/useRoom';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';



const RoomTemplate = () => {
  const navigate = useNavigate(); 
  const { roomName } = useParams();
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  const {
    loading,
    fetchError,
    fakeName,
    fakedata,
    userCount,
    message,
    setMessage,
    sending,
    error,
    messages,
    handleSendMessage
  } = useRoom();

  const handleLogoutRoom = async () => {
    // Emit leaveRoom event before logging out
    if (roomName && fakeName && fakedata?.userId) {
      const socket = io('http://localhost:3000');
      socket.emit("leaveRoom", roomName, fakeName, fakedata.userId);
      socket.disconnect();
    }
    navigate('/Anonymous-Chat'); // Redirect to the login page after logging out
  };

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <Bg>
      <Navb />
      <div className="flex w-full h-full py-5 justify-center items-center text-white px-48 gap-32 text-sm">

        <div className="w-1/2 h-4/6 bg-chat flex justify-end items-center">
            <div className="pl-8"> <img src="/public/shark.gif" alt="" className="w-[150px]" /></div>
        </div>



        <div className="w-1/2 flex flex-col gap-4 h-4/5 bg-[#404664] rounded-3xl  p-8 text-lg">
          <div className="flex flex-col gap-4">
            {loading ? (
                <div className="text-center text-gray-600 flex w-full justify-center"><Spin size="medium" /></div>
            ) : fetchError ? (
                <div className="text-center text-red-600">{fetchError.message}</div>
            ) : (
                <div className="flex justify-between">
                    <div className="flex w-1/3 gap-4">
                    <div>
                        <img src="./public/Users.svg" alt="" />
                    </div>
                    <div>{userCount.count} / 5</div>
                    </div>
                    <div className="w-1/3 flex justify-center">{roomName}</div>
                    <div className="w-1/3 flex justify-end">
                    <button onClick={handleLogoutRoom}><img src="/public/Log out.svg" alt="Logout" /></button>
                    </div>
                </div>
            )}
           

            <div className="w-full px-8 pt-2 opacity-20">
              <hr />
            </div>
          </div>

          <div className="h-full py-8 px-4  overflow-y-auto scroller">
            {messages.map((msg, index) => (
                <div key={index} className={`${msg.userName === fakeName ? 'chat chat-end' : 'chat chat-start'}`}>
                    <div className={`${msg.userName === fakeName ? 'hidden' : 'flex justify-center items-end w-[60px] h-full'}`}> 
                      <div className={`${msg.userName === fakeName ? 'hidden' : 'flex justify-center items-start pl-2 pt-2 w-[50px] h-[50px] bg-avatar rounded-full overflow-hidden cursor-pointer'}`}>
                        <img
                            alt="Avatar"
                            src={msg.avatar || '/Unknow.svg'}
                            className="w-[100px] object-cover"
                          />
                      </div>
                    </div>
                    <div className="pt-4">
                      <div className={`${msg.userName === fakeName ? 'hidden' : 'chat-header mb-2 '}`}>{msg.avatar ? msg.userName : 'Unknow'}</div>
                      <div className="chat-bubble text-md mr-2">
                          {msg.content}
                      </div>
                    </div>
                    
                    <div className="chat-footer opacity-50">
                        <time className={`${msg.userName === fakeName ? 'hidden' : 'text-xs opacity-50'}`}>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
                    </div>
                </div>
            ))}<div ref={messagesEndRef} />
          </div>


          <div className="w-full flex items-center gap-4 bg-[#3D4362] p-4 rounded-xl">
            <div className="flex justify-center items-center w-[60px] h-[60px]"> <div className="flex justify-center items-start pl-2 pt-2 w-[50px] h-[50px] bg-black/20 rounded-full overflow-hidden cursor-pointer ">
              <img
                alt="Avatar"
                src={fakedata.avatar || '/anony/Unknow.svg'}
                className="w-[80px] object-cover"
              />
            </div>
</div>
           
            <input
              type="text"
              placeholder="Type here"
              className="input w-2/3 bg-white/0 text-white"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="w-8 hover:opacity-20 px-2 flex justify-center">
            {error && <p className="text-red-600 text-sm">{error}</p>}
              <button onClick={handleSendMessage}><img src="/paper-airplane.svg" alt="Send" className="w-8" /></button>
            </div>
          </div>
        </div>
      </div>
    </Bg>
  );
};

export default RoomTemplate;



  