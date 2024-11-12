import React, { useEffect, useState } from 'react';
import useAnony from "../../hooks/anonyChat/useAnony";
import useAnonyRoom from "../../hooks/anonyChat/useAnonyRoom"; // เพิ่มการนำเข้า useAnonyRoom
import { useNavigate } from "react-router-dom";
import Bg from "../../assets/bg";
import Navb from "../../assets/Navbar";
import "/src/css/AnonyChat.css";
import { Tag } from "antd";
import io from "socket.io-client";
import { Spin, message  } from 'antd'; 


const avatars = [
  "/public/anony/anony1",
  "/public/anony/anony2",
  "/public/anony/anony3",
  "/public/anony/anony4",
  "/public/anony/anony5",
  "/public/anony/anony6",
  "/public/anony/anony7",
  "/public/anony/anony8",
  "/public/anony/anony9",
];


const AnonyChat = () => {
  const { createFakeName, loading, error } = useAnony();
  const { rooms, loading: roomsLoading, error: roomsError } = useAnonyRoom(); // ใช้ useAnonyRoom เพื่อดึงข้อมูลห้อง
  const storedData = JSON.parse(localStorage.getItem("user_data"));
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [fakeName, setFakeName] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(""); 
  const [userCount, setUserCount] = useState({});
  

  const goToRoom = (roomName) => {
    setSelectedRoom(roomName);
    if (!selectedAvatar) {
      message.error('Please select an avatar before joining a room.');
      return;
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleJoin = async () => {
    if (fakeName.trim() && selectedAvatar) {
      const { success, message } = await createFakeName(
        storedData.user._id,
        fakeName,
        selectedAvatar
      );
      if (success) {
        setShowModal(false);
        navigate(`/room/${selectedRoom}`, { state: { fakeName, selectedAvatar } });
      } else {
        alert(message);
      }
    }
  };


  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on('allRoomUserCounts', (usersInRoom) => {
        console.log('User count in all rooms:', usersInRoom);
        setUserCount(usersInRoom);
    });
  }, []);

  

  return (
    <Bg>
      <Navb />
      {/* Desktop View */}
      <div className="flex w-full h-full py-5 justify-center items-center text-white px-48 gap-8 text-sm">
        {/* Avatar Selection Section */}
        <div className="w-1/2 flex flex-col justify-center item-center rounded-lg p-6 ">
          <div className="flex w-full justify-center gap-1 pb-5 text-3xl font-extrabold">
            <span className="text-orange-500">Select</span>
            <span>Avatar</span>
          </div>
          <div className='w-full flex justify-center'>
          <div className="grid grid-cols-3 justify-items-center gap-8 w-fit ">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`flex justify-center items-start pl-4 pt-4 w-[110px] h-[110px] bg-avatar rounded-full overflow-hidden cursor-pointer  hover:border border-white/20  ${
                  selectedAvatar === avatar ? "border boder-xl border-orange-500" : ""
                }`}
                onClick={() => setSelectedAvatar(avatar)}
              >
                <img
                  src={`${avatar}.svg`}
                  alt={`anonygoose ${index + 1}`}
                  className="w-[100px] object-cover"
                />
              </div>
            ))}
          </div>
          </div>
          
          <div className="pt-8 flex justify-center w-full">
            <img src="glass.svg" alt="" />
          </div>
        </div>

        {/* Room List Section */}
        <div className="w-1/2 flex justify-center">
        <div className="w-full rounded-lg p-6">
          <div className="flex justify-start">
            <a className="flex justify-center pt-4 px-4 w-[138px] py-2 bg-orange text-white rounded-t-3xl">
              Rooms
            </a>
            <a href="/CreateAnonymous-Chat" className="flex justify-center pt-4 px-4 w-[138px] py-2 bg-[#4a4a63] text-white rounded-t-3xl hover:bg-[#FB923C]">
              New Room
            </a>
          </div>

          {/* Room List */}
          <div className="flex flex-col gap-4 h-[490px] bg-[#282C45] rounded-b-3xl rounded-tr-3xl scroller overflow-y-auto p-6">
            {roomsLoading ? (
              <div className='w-full h-full flex justify-center items-center'><Spin size="medium" /></div>
            ) : roomsError ? (
              <div className="w-full h-full flex justify-center items-center text-orange">{roomsError}</div>
            ) : (
              rooms.map((room, index) => (
                <div
                  key={index}
                  onClick={() => goToRoom(room.roomName)}
                  className="cursor-pointer w-full flex justify-between items-center bg-[#3b3b51] p-4 py-6 rounded-xl hover:bg-[#3b3b51]/80"
                >
                  <span className="px-2 py-1 bg-[#FFE1FD] text-xs text-[#4a4a63] rounded-3xl h-fit w-14 flex justify-center">
                    {room.tagName}
                  </span>
                  <span className="flex-grow text-white ml-2">{room.roomName}</span>
                  <div className="flex gap-0.5">
                    <div className="text-white">{userCount[room.roomName] || 0}</div>
                    <div className="text-orange">/{room.maxParticipants}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        </div>

      </div>


      {/* Modal for Entering Username */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#282C45] border border-[#404664] p-[30px] rounded-2xl  flex flex-col items-center relative gap-5 w-72 lg:w-[400px]">
            <button onClick={closeModal} className="absolute top-2 right-2">
              <img src="close.svg" alt="" />
            </button>

            <h2 className="text-xl font-bold text-orange-500 mb-4 lg:text-2xl">
              Enter Your FakeName
            </h2>
            <input
              type="text"
              className="p-2 w-full mb-4 rounded-md text-black bg-white"
              placeholder="Enter name"
              value={fakeName}
              onChange={(e) => setFakeName(e.target.value)}
            />
            <button
              onClick={handleJoin}
              className="bg-orange-500 p-2 w-full rounded-md text-white font-bold"
              disabled={loading}
            >
              {loading ? "Joining..." : "Join"}
            </button>
            {error && <div className="text-red-500 mt-2">{error.message}</div>}
          </div>
        </div>
      )}
    </Bg>
  );
};

export default AnonyChat;
