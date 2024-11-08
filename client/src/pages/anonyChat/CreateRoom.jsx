import React, { useState } from "react";
import useAnony from "../../hooks/anonyChat/useAnony";
import { useNavigate } from "react-router-dom";
import Bg from "../../assets/bg";
import Navb from "../../assets/Navbar";
import "/src/css/AnonyChat.css";
import Select from "react-select";

const avatars = [
  "/public/anony/anony1.svg",
  "/public/anony/anony2.svg",
  "/public/anony/anony3.svg",
  "/public/anony/anony4.svg",
  "/public/anony/anony5.svg",
  "/public/anony/anony6.svg",
  "/public/anony/anony7.svg",
  "/public/anony/anony8.svg",
  "/public/anony/anony9.svg",
];

const tags = ["CPE", "CHE", "ENE", "ME", "ALL", "ENG"];

const CreateAnonyChat = () => {
  const { createFakeName, loading, error } = useAnony();
  const storedData = JSON.parse(localStorage.getItem("user_data"));
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [fakeName, setFakeName] = useState("");

  const [roomName, setRoomName] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(""); // New state for selected avatar
  const [selectedTag, setSelectedTag] = useState(null);

  // ฟังก์ชันสำหรับการเลือก tag
  const handleTagChange = (selectedOption) => {
    setSelectedTag(selectedOption);
  };

  // แปลง tags ให้เป็นรูปแบบที่ react-select ต้องการ
  const tagOptions = tags.map((tag) => ({
    value: tag,
    label: tag,
  }));

  const goToRoom = (roomName) => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCreateRoom = async () => {
  };

  const handleTagSelect = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  // ฟังก์ชันตรวจสอบค่าที่กรอก
  const handleMaxParticipantsChange = (e) => {
    const value = e.target.value;

    // ตรวจสอบว่า value อยู่ในช่วงที่กำหนด
    if (value >= 2 && value <= 50) {
      setMaxParticipants(value);
      setError(""); // รีเซ็ตข้อผิดพลาด
    } else {
      setError("The number of participants must be between 2 and 50.");
    }
  };

  return (
    <Bg>
      <Navb />
      <div className="hidden lg:flex w-full h-full py-5 justify-center items-center text-white px-48 gap-8 text-sm">
        {/* Avatar Selection Section */}
        <div className="w-full sm:w-1/2 rounded-lg p-6">
          <div className="flex w-full justify-center gap-1 pb-5 text-3xl font-extrabold">
            <span className="text-orange-500">Select</span>
            <span>Avatar</span>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`flex justify-center items-start pl-4 pt-4 w-[110px] h-[110px] bg-avatar rounded-full overflow-hidden cursor-pointer ${
                  selectedAvatar === avatar ? "border border-orange-500" : ""
                }`}
                onClick={() => setSelectedAvatar(avatar)}
              >
                <img
                  src={avatar}
                  alt={`anonygoose ${index + 1}`}
                  className="w-[100px] object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Room List Section */}
        <div className="w-full sm:w-1/2 rounded-lg p-6">
          <div className="flex justify-start">
            <a className="flex justify-center pt-4 px-4 w-[138px] py-2 bg-[#4a4a63] text-white rounded-t-3xl hover:bg-[#FB923C]">
              Rooms
            </a>
            <a className="flex justify-center pt-4 px-4 w-[138px] py-2 bg-[#FB923C] text-white rounded-t-3xl hover:bg-[#FB923C]">
              New Room
            </a>
          </div>

          {/* Room List */}
          <div className="flex flex-col gap-8 justify-center gap-4 h-[490px] bg-[#282C45] rounded-b-3xl px-12">
            <div className="w-full h-24 flex justify-center">
              <input
                type="text"
                className="bg-white/0 border-b-2 border-[#8A8A8E] w-full text-3xl text-center "
                placeholder="Enter Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </div>
            <div className="flex gap-2 pt-8">
              <div className="w-1/2 flex flex-col gap-2">
                <label htmlFor="tags" className="px-1">
                  Choose a Tag
                </label>
                <Select
                  options={tagOptions}
                  value={selectedTag}
                  onChange={handleTagChange}
                  placeholder="Pick your tag"
                  isClearable={true}
                />
              </div>
              <div className="w-1/2 flex flex-col gap-2">
                <label htmlFor="inputText" className="px-1">
                  Max Participants
                </label>
                <input
                  type="number"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(e.target.value)}
                  placeholder="Max Participants"
                  className="input rounded-md max-w-xs h-[38px] bg-white text-black" // ใช้ bg เดียวกัน
                  min="2" // ค่าต่ำสุด
                  max="50" // ค่าสูงสุด
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            </div>
            <div className="flex justify-center">
              {loading ? (
                <Spin size="small" /> // Show loading spinner while logging in
              ) : (
                <button
                  type="submit"
                  onClick={goToRoom}
                  className="w-full  px-4 py-2 rounded-2xl bg-orange text-sm font-semibold leading-6 lgt-txt shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Create Room
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Entering Username */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#282C45] border border-[#404664] p-[30px] rounded-2xl  flex flex-col items-center relative gap-5 w-72 lg:w-[400px]">
            {/* Close button */}
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
              onClick={handleCreateRoom}
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

export default CreateAnonyChat;
