import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Select from "react-select";
import useTags from "../../hooks/useTags";
import useCreatePost from "../../hooks/activites/useCreateAct";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateBoard = ({ closeModal }) => {
  const storedData = JSON.parse(localStorage.getItem("user_data"));
  const { tags, loading: tagsLoading, error: tagsError } = useTags();
  const { createPost, loading, error, success } = useCreatePost();
  const [selectedTag, setSelectedTag] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [maxParticipants, setMaxParticipants] = useState("");

  const handleTagChange = (selectedOption) => {
    setSelectedTag(selectedOption);
  };

  const handleMaxParticipantsChange = (e) => {
    const value = e.target.value;
    if (value >= 2 && value <= 50) {
      setMaxParticipants(value);
    } else {
      alert("The number of participants must be between 2 and 50.");
    }
  };

  const tagOptions = tags.map((tag) => ({
    value: tag._id,
    label: tag.tagName,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (description && selectedTag && title && location) {
      const result = await createPost(
        storedData.user._id, // userId
        description, // description
        selectedTag.value, // tagId
        title, // title
        location, // location
        startDate, // startDate
        endDate, // endDate
        maxParticipants // maxParticipants
      );
      
      if (result) {
        closeModal();
      }
    else{
      console.log("das",description , selectedTag , title , location)
    }
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "rgba(255, 255, 255, 0.05)", // พื้นหลังโปร่งใส 5%
      color: "white", // สีข้อความใน control (เมื่อไม่ได้เลือก) เป็นสีขาว
      height: "48px", // ความสูงเท่ากับอินพุตอื่นๆ
      border: "none", // ไม่มีขอบ
      boxShadow: "none", // ไม่มีเงา
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white", // สีข้อความเมื่อเลือกแล้ว (แสดงใน control)
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#282C45", // พื้นหลังของเมนู dropdown
      color: "white", // สีข้อความใน dropdown เป็นสีขาว
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "white", // สีข้อความในตัวเลือก
      backgroundColor: state.isSelected
        ? "#FB923C" // สีพื้นหลังเมื่อเลือก
        : state.isFocused
        ? "#3e4a63" // สีพื้นหลังเมื่อ hover ตัวเลือก
        : "transparent", // สีพื้นหลังปกติ
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#3e4a63", // สีพื้นหลังเมื่อ hover ตัวเลือก
      },
    }),
  };
  

  return (
    <div className="flex flex-col w-full h-full gap-4 text-white">
      <div className="flex justify-center text-xl font-bold text-orange-500">
        Create Activity
      </div>
      <div className="flex pt-4 gap-6 items-center">
        <img
          src={storedData.user.profile}
          className="size-8 rounded-full lg:size-12"
        />
        <div className="text-white">{storedData.user.name}</div>
      </div>
      <div className="flex w-full h-fit pt-4 font-light text-sm gap-4">
        <div className="flex flex-col h-full w-1/2 gap-6">
          <div className="flex flex-col w-full gap-2">
            <label className="block text-sm font-light tracking-wider">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="text-white/60 pl-4 bg-white/5 rounded-md  w-full text-white/60 lg-12 h-8 lg:h-12 focus:outline-none focus:border-orange-400 "
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="block text-sm font-light tracking-wider">
              Location
            </label>
            <input
              id="location"
              name="location"
              value={location}  // Add state for location
              onChange={(e) => setLocation(e.target.value)} // Bind location state
              required
              className="text-white/60 pl-4 bg-white/5 rounded-md  w-full text-white/60 lg-12 h-8 lg:h-12 focus:outline-none focus:border-orange-400"
            />
          </div>
          <div className="flex w-full gap-4">
            <div className="w-1/2 flex flex-col gap-2">
              <label className="block text-sm font-light tracking-wider">
                Start Date:
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Select start date"
                className="w-full h-8 bg-white/5 rounded-md px-2  h-8 lg:h-12"
              />
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <label className="block text-sm font-light tracking-wider">
                End Date:
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Select end date"
                className="w-full h-8 bg-white/5 rounded-md px-2  h-8 lg:h-12"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="inputText"
              className="block text-sm font-light tracking-wider"
            >
              Max Participants
            </label>
            <input
              type="number"
              value={maxParticipants}
              onChange={handleMaxParticipantsChange}
              placeholder="Max Participants"
              className="text-white/60 pl-4 bg-white/5 rounded-md  w-full text-white/60 lg-12 h-8 lg:h-12 focus:outline-none focus:border-orange-400" // ใช้ bg เดียวกัน
              min="2" // ค่าต่ำสุด
              max="50" // ค่าสูงสุด
            />
          </div>
        </div>
        <div className="text-white flex flex-col w-1/2 gap-4">
            <div className="h-full w-full flex flex-col gap-2">
                <label  className="block text-sm font-light tracking-wider">
                Event Details
                    </label>
                <textarea
                    className="bg-white/0 w-full h-full max-h-full  rounded-md p-2 bg-white/5 focus:outline-none"
                    placeholder="What’s on your mind"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <div className="w-full flex flex-col gap-2 ">
                    <label htmlFor="tags" className="block text-sm font-light tracking-wider">
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
                            styles={customStyles} 
                            className="text-white"
                        />
                    )}
        </div>
        </div>
       
      </div>

      <button
        onClick={handleSubmit}
        className="bg-orange-500 p-2 w-full rounded-md text-white font-bold  mt-8"
        disabled={loading}
      >
        {loading ? "Creating Post..." : "Create Board"}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {success && (
        <div className="text-green-500 mt-2">Post created successfully!</div>
      )}
    </div>
  );
};

export default CreateBoard;
