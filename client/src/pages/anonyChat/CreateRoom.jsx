import React, { useState } from "react";
import useAnony from "../../hooks/anonyChat/useAnony";
import useCreateAnonyRoom from "../../hooks/anonyChat/useCreateAnonyRoom"; // Import the hook
import useTags from "../../hooks/useTags"; // Import the useTags hook
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

const CreateAnonyChat = () => {
  const { createFakeName, loading, error } = useAnony();
  const { createRoom, loading: roomLoading, error: roomError } = useCreateAnonyRoom(); // Use the custom hook for creating room
  const { tags, loading: tagsLoading, error: tagsError } = useTags(); // Use the custom hook for fetching tags
  const storedData = JSON.parse(localStorage.getItem("user_data"));
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [fakeName, setFakeName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  const handleTagChange = (selectedOption) => {
    setSelectedTag(selectedOption);
  };

  const tagOptions = tags.map((tag) => ({
    value: tag._id, // Assuming the tag object has an _id field
    label: tag.tagName, // Assuming the tag object has a tagName field
  }));

  const goToRoom = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCreateRoom = async () => {
    if (fakeName.trim() && selectedAvatar) {
      if (!roomName || !maxParticipants || !selectedTag) {
        alert("Please fill in all fields.");
        return;
      }
      const { success, message } = await createFakeName(
        storedData.user._id,
        fakeName,
        selectedAvatar
      );
      try {
        const tagId = selectedTag.value; // Assuming 'selectedTag' has 'value'
        const response = await createRoom(roomName, maxParticipants, tagId);
        console.log(response); // Handle success (e.g., navigate to the room)
        setShowModal(true);
        navigate(`/room/${roomName}`); // Example, navigate to the room
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleMaxParticipantsChange = (e) => {
    const value = e.target.value;
    if (value >= 2 && value <= 50) {
      setMaxParticipants(value);
    } else {
      alert("The number of participants must be between 2 and 50.");
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
            <a href="/Anonymous-Chat" className="flex justify-center pt-4 px-4 w-[138px] py-2 bg-[#4a4a63] text-white rounded-t-3xl hover:bg-[#FB923C]">
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
                {tagsLoading ? (
                  <span>Loading tags...</span>
                ) : (
                  <Select
                    options={tagOptions}
                    value={selectedTag}
                    onChange={handleTagChange}
                    placeholder="Pick your tag"
                    isClearable={true}
                    className="text-black"
                  />
                )}
              </div>
              <div className="w-1/2 flex flex-col gap-2">
                <label htmlFor="inputText" className="px-1">
                  Max Participants
                </label>
                <input
                  type="number"
                  value={maxParticipants}
                  onChange={handleMaxParticipantsChange}
                  placeholder="Max Participants"
                  className="input rounded-md max-w-xs h-[38px] bg-white text-black" // ใช้ bg เดียวกัน
                  min="2" // ค่าต่ำสุด
                  max="50" // ค่าสูงสุด
                />
              </div>
            </div>
            <div className="flex justify-center">
              {roomLoading ? (
                <span>Loading...</span> // Replace with your spinner or loading indicator
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
              disabled={roomLoading}
            >
              {roomLoading ? "Creating..." : "Join"}
            </button>
            {roomError && <div className="text-red-500 mt-2">{error.message}</div>}
          </div>
        </div>
      )}
    </Bg>
  );
};

export default CreateAnonyChat;
