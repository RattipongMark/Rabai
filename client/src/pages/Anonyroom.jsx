import { useAuth } from "../contexts/AuthContext";
import Navb from "../assets/Navbar";
import Bg from "../assets/bg";
import React, { useState } from "react";
import "/src/css/AnonyChat.css";
import { useNavigate } from "react-router-dom";

// Import SVGs
import anony1 from "/public/anony/anony1.svg";
import anony2 from "/public/anony/anony2.svg";
import anony3 from "/public/anony/anony3.svg";
import anony4 from "/public/anony/anony4.svg";
import anony5 from "/public/anony/anony5.svg";
import anony6 from "/public/anony/anony6.svg";
import anony7 from "/public/anony/anony7.svg";
import anony8 from "/public/anony/anony8.svg";
import anony9 from "/public/anony/anony9.svg";

const avatars = [
  anony1,
  anony2,
  anony3,
  anony4,
  anony5,
  anony6,
  anony7,
  anony8,
  anony9,
];

const AnonyChat = () => {
  const { logout } = useAuth();
  const storedData = JSON.parse(localStorage.getItem("user_data"));
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [fakeName, setFakenName] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  const handleLogout = async () => {
    await logout();
  };

  const goToRoom = (roomName) => {
    setSelectedRoom(roomName);
    setShowModal(true); // Show modal for entering name
  };

  const closeModal = () => {
    setShowModal(false); // ปิด modal
  };

  const handleJoin = () => {
    if (fakeName.trim()) {
      setShowModal(false);
      navigate(`/room/${selectedRoom}`, { state: { fakeName } });
    }
  };

  return (
    <Bg>
      <Navb />
      <div className="w-full h-full py-5 flex justify-center items-center text-white px-8 gap-8 text-sm b">
        {/* Avatar Selection Section */}
        <div className="w-[550px] ml-12 rounded-lg p-6 ">
          <div className="flex w-full justify-center gap-1 pb-5 text-3xl font-extrabold">
            <span className="text-orange-500">Select</span>
            <span>Avatar</span>
          </div>
          <div className="grid grid-cols-3 gap-4 w-full h-full mt-4 justify-items-center px-8">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className="flex justify-center items-start pl-4 pt-4 w-[110px] h-[110px] bg-avatar rounded-full overflow-hidden hover:border border-white/20"
              >
                <img
                  src={avatar}
                  alt={`anonygoose ${index + 1}`}
                  className=" w-[100px] object-cover"
                />
              </div>
            ))}
          </div>
          <div className="h-full flex items-start pt-4">
            <img src="./public/glass.svg" alt="" />
          </div>
        </div>

        {/* Room List Section */}
        <div className="w-[500px] mr-12 rounded-lg p-6 scb">
          <div className="flex">
            <a className="flex justify-center pt-4 px-4 w-[138px] py-2 bg-orange text-white rounded-t-3xl">
              Rooms
            </a>
            <a className="flex justify-center pt-4 px-4 w-[138px] py-2 bg-[#4a4a63] text-white rounded-t-3xl hover:bg-[#FB923C]">
              New Room
            </a>
          </div>

          {/* Room List */}
          <div className="flex flex-col gap-4 w-[520px] h-[490px] bg-[#282C45] rounded-b-3xl rounded-tr-3xl scroller overflow-y-auto p-6">
            {[
              "RoomName 1",
              "RoomName 2",
              "RoomName 3",
              "RoomName 4",
              "RoomName 5",
              "RoomName 6",
              "RoomName 7",
              "RoomName 8",
            ].map((room, index) => (
              <div
                key={index}
                onClick={() => goToRoom(room)}
                className="cursor-pointer w-full flex justify-between items-center bg-[#3b3b51] p-4 py-6 rounded-xl hover:bg-[#3b3b51]/80"
              >
                <span className="px-2 py-1 bg-[#FFE1FD] text-xs text-[#4a4a63] rounded-3xl h-fit w-14 flex justify-center">
                  CHE
                </span>
                <span className="flex-grow text-white ml-2">{room}</span>
                <div className="flex gap-0.5">
                  <div className="text-white">4</div>
                  <div className="text-orange">/5</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Entering Username */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#282C45] border border-[#404664] p-[30px] rounded-2xl w-[400px] flex flex-col items-center relative gap-5 ">
            {/* ปุ่มปิด */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 "
            >
              <img src="close.svg" alt="" />
            </button>

            <h2 className="text-2xl font-bold text-orange-500 mb-4">
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
            >
              Join
            </button>
          </div>
        </div>
      )}
    </Bg>
  );
};

export default AnonyChat;
