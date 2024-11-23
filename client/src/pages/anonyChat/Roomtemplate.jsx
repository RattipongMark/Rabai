import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Navb from "../../assets/Navbar";
import Bg from "../../assets/bg";
import "../../css/AnonyChat.css";
import "../../App.css";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
import useAnony from "../../hooks/anonyChat/useAnony";
import useRoom from "../../hooks/anonyChat/useRoom";
import io from "socket.io-client";
import { useNavigate,useLocation } from "react-router-dom";

const RoomTemplate = () => {
  const navigate = useNavigate();
  const { roomName } = useParams();
  const location = useLocation();
  const { maxp } = location.state || {};
  const { logout } = useAuth();

  console.log("maxp:",maxp)
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
    handleSendMessage,
    usersInRoom,
  } = useRoom();

  console.log(usersInRoom);
  const handleLogoutRoom = async () => {

    // if (roomName && fakeName && fakedata?.userId) {
    //   const socket = io("https://rabai-server.onrender.com");
    //   socket.emit("leaveRoom", roomName, fakeName, fakedata.userId);
    //   socket.disconnect();
    //   navigate("/Anonymous-Chat");
    // }

    navigate("/Anonymous-Chat");
  };

  const messagesEndRef = useRef(null);
  const messagesEndRef2 = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    messagesEndRef2.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [userPositions, setUserPositions] = useState({});
  const [userFlips, setUserFlips] = useState({}); 

  useEffect(() => {
    // Check if this is a new user
    if (usersInRoom.length > 0) {
      const newPositions = { ...userPositions };
      const newFlips = { ...userFlips };

      usersInRoom.forEach(user => {
        if (!newPositions[user.userName]) {
          // Generate a random position for the new user
          const randomX = Math.random() * 80; // Random X between 0-80%
          const randomY = Math.random() * 80; // Random Y between 0-80%

          // Randomly decide if the image should be flipped (horizontally or not)
          const flipDirection = Math.random() > 0.1 ? 'flip-horizontal' : '';

          newPositions[user.userName] = { x: randomX, y: randomY };
          newFlips[user.userName] = flipDirection; // Store flip direction
        }
      });

      setUserPositions(newPositions);
      setUserFlips(newFlips);
    }
  }, [usersInRoom]); // Rerun effect if usersInRoom changes

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage(); // เรียกฟังก์ชัน handleSendMessage เมื่อกด Enter
    }
  };
  
  return (
    <Bg>
      <Navb />
      {/* desktop view */}
      <div className="hidden lg:flex w-full h-full py-5 justify-center items-center text-white px-32 gap-12 text-sm">
        <div className="w-1/2 h-4/6 bg-chat flex justify-end items-center relative overflow-hidden  px-4">
          <div className="w-full px-12 flex justify-end">
            <img src="/shark.gif" alt="" className="w-[150px]" />
          </div>

          {usersInRoom.map((user, index) => {
            const position = userPositions[user.userName] || { x: 0, y: 0 };
            const flip = userFlips[user.userName] || ''; 

            return (
              <div
                key={index}
                className="absolute"
                style={{ top: `${position.y}%`, left: `${position.x}%` }}
              >
                <img
                  src={user.avatar + ".gif"} // เพิ่ม .svg ให้กับ path ของ avatar
                  alt={user.userName}
                  className={`w-[150px] h-[150px] rounded-full ${flip}`}
                />
              </div>
            );
          })}
        </div>

        <div className="w-1/2 flex flex-col gap-4 h-4/5 bg-[#404664] rounded-3xl  p-8 text-lg">
          <div className="flex flex-col gap-4">
            {loading ? (
              <div className="text-center text-gray-600 flex w-full justify-center">
                <Spin size="medium" />
              </div>
            ) : fetchError ? (
              <div className="text-center text-red-600">
                {fetchError.message}
              </div>
            ) : (
              <div className="flex justify-between">
                <div className="flex w-1/3 gap-4">
                  <div>
                    <img src="Users.svg" alt="" />
                  </div>
                  <div>{userCount.count} / {maxp}</div>
                </div>
                <div className="w-1/3 flex justify-center">{roomName}</div>
                <div className="w-1/3 flex justify-end">
                  <button onClick={handleLogoutRoom}>
                    <img src="/Logout.svg" alt="Logout" />
                  </button>
                </div>
              </div>
            )}

            <div className="w-full px-8 pt-2 opacity-20">
              <hr />
            </div>
          </div>

          <div className="h-full py-1 px-4  overflow-y-auto scroller">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.userName === fakeName
                    ? "chat chat-end"
                    : "chat chat-start"
                }`}
              >
                <div
                  className={`${
                    msg.userName === fakeName
                      ? "hidden"
                      : "flex justify-center items-end w-[60px] h-full"
                  }`}
                >
                  <div
                    className={`${
                      msg.userName === fakeName
                        ? "hidden"
                        : "flex justify-center items-start pl-2 pt-2 w-[50px] h-[50px] bg-avatar rounded-full overflow-hidden cursor-pointer"
                    }`}
                  >
                    <img
                      alt="Avatar"
                      src={msg.avatar ? `${msg.avatar}.svg` : "/Unknow.svg"}
                      className="w-[100px] object-cover"
                    />
                  </div>
                </div>
                <div
                  className={`${
                    msg.userName === fakeName
                      ? "flex justify-end pt-4 w-full "
                      : "pt-4 w-full"
                  }`}
                >
                  <div
                    className={`${
                      msg.userName === fakeName ? "hidden" : "chat-header mb-2 "
                    }`}
                  >
                    {msg.avatar ? msg.userName : "Unknown"}
                  </div>
                  <div
                    className={`${
                      msg.userName === fakeName
                        ? "chat-bubble text-md chat-end font-light"
                        : "chat-bubble text-md chat-start font-light"
                    } break-words whitespace-normal max-w-sm`}
                  >
                    {msg.content}
                  </div>
                </div>

                {/* <div className="chat-footer opacity-50">
                  <time
                    className={`${
                      msg.userName === fakeName
                        ? "hidden"
                        : "text-xs opacity-50"
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div> */}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>


          <div className="w-full flex items-center gap-4 bg-[#3D4362] p-4 rounded-xl">
            <div className="flex justify-center items-center w-[60px] h-[60px]">
              {" "}
              <div className="flex justify-center items-start pl-2 pt-2 w-[50px] h-[50px] bg-black/20 rounded-full overflow-hidden cursor-pointer ">
                <img
                  alt="Avatar"
                  src={
                    fakedata.avatar ? `${fakedata.avatar}.svg` : "/Unknow.svg"
                  }
                  className="w-[80px] object-cover"
                />
              </div>
            </div>

            <input
              type="text"
              placeholder="Type here"
              className="input w-full bg-white/0 text-white font-light"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <div className="w-8 hover:opacity-20 px-2 flex justify-center">
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button onClick={handleSendMessage} className="w-16">
                <img src="/paper-airplane.svg" alt="Send" className="w-full" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden flex flex-col  w-full h-full justify-center items-center text-white px-4 text-sm">

        <div className="w-full flex flex-col gap-4 h-3/5 bg-[#404664] rounded-xl p-4 text-sm">
          <div className="flex flex-col gap-4 pt-2">
            {loading ? (
              <div className="text-center text-gray-600 flex w-full justify-center">
                <Spin size="medium" />
              </div>
            ) : fetchError ? (
              <div className="text-center text-red-600">
                {fetchError.message}
              </div>
            ) : (
              <div className="flex justify-between">
                <div className="flex w-1/3 gap-4">
                  <div>
                    <img src="/Users.svg" alt="" />
                  </div>
                  <div>{userCount.count} / {maxp}</div>
                </div>
                <div className="w-1/3 flex justify-center">{roomName}</div>
                <div className="w-1/3 flex justify-end">
                  <button onClick={handleLogoutRoom}>
                    <img src="/Logout.svg" alt="Logout" />
                  </button>
                </div>
              </div>
            )}

            <div className="w-full px-8 pt-1 opacity-20">
              <hr />
            </div>
          </div>

          <div className="h-full py-1 px-4  overflow-y-auto scroller">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.userName === fakeName
                    ? "chat chat-end"
                    : "chat chat-start"
                }`}
              >
                <div
                  className={`${
                    msg.userName === fakeName
                      ? "hidden"
                      : "flex justify-center items-end w-[60px] h-full"
                  }`}
                >
                  <div
                    className={`${
                      msg.userName === fakeName
                        ? "hidden"
                        : "flex justify-center items-start pl-2 pt-2 w-[50px] h-[50px] bg-avatar rounded-full overflow-hidden cursor-pointer"
                    }`}
                  >
                    <img
                      alt="Avatar"
                      src={msg.avatar ? `${msg.avatar}.svg` : "/Unknow.svg"}
                      className="w-[100px] object-cover"
                    />
                  </div>
                </div>
                <div
                  className={`${
                    msg.userName === fakeName
                      ? "flex justify-end pt-4 w-full "
                      : "pt-4 w-full"
                  }`}
                >
                  <div
                    className={`${
                      msg.userName === fakeName ? "hidden" : "chat-header mb-2 "
                    }`}
                  >
                    {msg.avatar ? msg.userName : "Unknow"}
                  </div>
                  <div
                    className={`${
                      msg.userName === fakeName
                        ? "chat-bubble text-md chat-end font-light"
                        : "chat-bubble text-md chat-start font-light"
                    } break-words whitespace-normal max-w-sm`}
                  >
                    {msg.content}
                  </div>
                </div>

                {/* <div className="chat-footer opacity-50">
                  <time
                    className={`${
                      msg.userName === fakeName
                        ? "hidden"
                        : "text-xs opacity-50"
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div> */}
              </div>
            ))}
            <div ref={messagesEndRef2} />
          </div>

          <div className="w-full flex items-center justify-between gap-4 bg-[#3D4362] px-4 py-2 rounded-xl">
            <div className="flex justify-center items-center w-fit ">
              {" "}
              <div className="flex justify-center items-start pl-1 pt-1 w-[30px] h-[30px] bg-black/20 rounded-full overflow-hidden cursor-pointer ">
                <img
                  alt="Avatar"
                  src={
                    fakedata.avatar ? `${fakedata.avatar}.svg` : "/Unknow.svg"
                  }
                  className="w-[80px] object-cover"
                />
              </div>
            </div>

            <input
              type="text"
              placeholder="Type here"
              className="input w-full  bg-white/0 text-white font-light"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <div className="w-8 hover:opacity-20 px-2 flex justify-center">
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button onClick={handleSendMessage} className="w-16">
                <img src="/paper-airplane.svg" alt="Send" className="w-full" />
              </button>
            </div>
          </div>

        </div>
        <div className="w-full pt-8">
          {usersInRoom.map((user, index) => {
              const position = userPositions[user.userName] || { x: 0, y: 0 };
              const flip = userFlips[user.userName] || ''; 

              return (
                <div
                  key={index}
                  className="absolute"
                  style={{ left: `${position.x}%` }}
                >
                  <img
                    src={user.avatar + ".gif"} // เพิ่ม .svg ให้กับ path ของ avatar
                    alt={user.userName}
                    className={`w-[100px] h-100px] rounded-full ${flip}`}
                  />
                </div>
              );
            })}
            <img src="/glass.svg" alt="" />
        </div>


      </div>

    </Bg>
  );
};

export default RoomTemplate;
