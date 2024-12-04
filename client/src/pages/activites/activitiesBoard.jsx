import { React, useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Navb from "../../assets/Navbar";
import Bg from "../../assets/bg";
import "../../css/AnonyChat.css";
import "../../App.css";
import useActivies from "../../hooks/activites/useActivities";
import useTags from "../../hooks/useTags";
import useJoinActivity from "../../hooks/activites/useJoin";
import useJoinedActivities from "../../hooks/activites/useJoined";
import Select from "react-select";
import CreateBoard from "./createBoard";
import Comment from "../discussBoard/comment";
import { formatDistanceToNow, parseISO, format  } from 'date-fns';


const ActivitiesBoard = () => {
  const { logout } = useAuth();
  const { tags, loading: tagsLoading, error: tagsError } = useTags();
  const storedData = JSON.parse(localStorage.getItem("user_data"));
  const [showModal, setShowModal] = useState(false);

  const [activePost, setActivePost] = useState(null);
  const { activities, loading, error } = useActivies();

  const handleLogout = async () => {
    await logout();
  };

  const [selectedTag, setSelectedTag] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [sKey, setSKey] = useState("");
  const [Myboard, SetMyBoard] = useState(false);

  const handleTagOneChange = (tag) => {
    setSelectedTag(tag);
  };

  const handleTagChange = (tag) => {
    setSelectedTags(tag || []);
  };

  const tagOptions = tags.map((tag) => ({
    value: tag._id, // Assuming the tag object has an _id field
    label: tag.tagName, // Assuming the tag object has a tagName field
  }));

  const handleMyB = () => {
    SetMyBoard((prevState) => !prevState);
  };

  const filteredPosts = activities.filter((board) => {
    const matchMyboard = Myboard
      ? board.userId._id === storedData.user._id
      : true;
    const matchesTagOne = selectedTag
      ? board.tagId.tagName === selectedTag
      : true;
    const matchesTag =
      selectedTags && selectedTags.length > 0
        ? selectedTags.some((tag) => tag.label === board.tagId.tagName)
        : true;
    const matchesSearch = board.detail
      .toLowerCase()
      .includes(sKey.toLowerCase());
    return matchMyboard && matchesTagOne && matchesTag && matchesSearch;
  });
  

  // const filteredPosts = selectedTag ? boards.filter(board => board.tag === selectedTag) : boards

  const PostTemplate = ({
    key,
    avatar,
    name,
    time,
    tag,
    title,
    tagColor,
    content,
    startDate,
    endDate,
    location,
    participant,
    max_participant,
    RegisDead,
    activityId,
    ownerId,
  }) => {
    const timeAgo = formatDistanceToNow(parseISO(time), { addSuffix: true });
    const formattedStartDate = format(new Date(startDate), '[HH:mm] dd MMMM yyyy');
    const formattedEndDate = format(new Date(endDate), '[HH:mm] dd MMMM yyyy');
    const formattedRegisDead = format(new Date(RegisDead), 'dd MMMM yyyy');
    const { joinActivity, hasJoined, loading, error } = useJoinActivity(activityId, storedData.user._id, ownerId);

    const joinedActivities = useJoinedActivities(storedData.user._id);
    const hasUserJoined = (activityId) => {
      return joinedActivities.some(activity => activity.activityId.toString() === activityId.toString());
    };

    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const openModalConfirm = () => setShowModalConfirm(true);
    const closeModalConfirm = () => setShowModalConfirm(false);

    const handleJoinConfirmation = () => {
      joinActivity();
      closeModalConfirm(); // ปิด Modal หลังจากยืนยัน
    };

    return (
      <div>
      <div className="card bg-[#404664] p-4 lgt-txt w-full space-y-4 lg:p-6 ">
        <div className="flex items-center gap-4">
          <img src={avatar} className="size-8 rounded-full lg:size-12" />
          <div className="flex flex-col">
            <div className="lg:font-semibold font-normal text-sm lg:text-lg">{name}</div>
            <div className="text-gray-400 text-xs">{timeAgo}</div>
          </div>
          <div className="min-w-12 ml-auto">
            <div
              className="flex justify-center text-xs font-light text-white px-2 py-0.5 rounded-full"
              style={{ backgroundColor: tagColor }}
            >
              {tag}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-6  pt-2  lg:min-h-40 lg:max-h-72 lg:flex-row">
          <div className="w-full min-h-20 lg:w-1/3 bg-white/5 rounded-xl text-lg lg:text-xl flex justify-center items-center">
            <div>{title}</div>
          </div>
          <div className="flex flex-col pt-2 gap-4 w-full lg:w-2/3 font-light text-xs lg:text-base">
            <div className="flex gap-2 w-full">
              <div className="text-[#8A8A8E]">Date and Time : </div>
              <div className="w-3/5 lg:w-4/5">{formattedStartDate} to {formattedEndDate}</div>
            </div>

            <div className="flex gap-2">
              <div className="text-[#8A8A8E]">Location : </div>
              <div className="">{location}</div>
            </div>

            <div className="flex gap-2">
              <div className="text-[#8A8A8E]">Participation : </div>
              <div className="">{participant} / {max_participant}</div>
            </div>


            <div className="flex gap-2 w-full">
              <div className="text-[#8A8A8E] w-fit leading-loose">Eventent Details : </div>
              <div className = "tracking-wide w-3/5 leading-loose">{content}</div>
            </div>

          </div>
          
        </div>
        <div className="flex justify-between w-full pt-1 lg:pt-4 text-xs lg:text-sm">
            <div className="flex flex-col gap-1 font-light lg:flex-row text-xs lg:text-sm">
              <div>Registration Deadline:</div>
              <div className="text-orange">{formattedRegisDead}</div>
            </div>
            <button
          onClick={openModalConfirm}
          disabled={loading || hasJoined || hasUserJoined(activityId) || storedData.user._id === ownerId || participant >= max_participant}
          className={`h-6 w-12 rounded-md lg:h-10 lg:w-20 lg:rounded-xl  text-xs lg:text-sm ${hasJoined || hasUserJoined(activityId) || storedData.user._id === ownerId || participant >= max_participant ? 'bg-gray-400' : 'bg-orange hover:bg-orange-500'}`}
        >
          {hasJoined || hasUserJoined(activityId) ? "Joined" : "Join"}
        </button>
            {/* <div className="flex justify-center items-center h-10 w-20 rounded-xl bg-orange hover:bg-orange-500 ">Join</div> */}
        </div>
      </div>

      {showModalConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-15 px-8 z-[50] text-white">
          <div className="bg-[#282C45] border border-[#404664] p-4 rounded-2xl  flex flex-col items-center justify-center relative gap-5 w-full lg:w-[450px] h-56   lg:p-[30px]">
          <div className="flex flex-col gap-8 justify-center items-center px-8">
              <div className="flex justify-center text-base font-bold text-orange-500 lg:text-xl text-center">Confirm Attendance for the Event/Activity</div>
              <div className="flex justify-between w-full gap-4">
                <div onClick={closeModalConfirm} className="flex justify-center  items-center h-6 w-full rounded-md lg:h-10 lg:rounded-xl  text-xs lg:text-sm bg-gray-400 hover:bg-gray-500 cursor-pointer">Cancel</div>
                <div onClick={handleJoinConfirmation} className="flex justify-center  items-center h-6 w-full rounded-md lg:h-10  lg:rounded-xl  text-xs lg:text-sm bg-orange hover:bg-orange-500 cursor-pointer">Join</div>
              </div>
          </div>
          </div>
        </div>
      )}
      </div>
      
    );
  };

  // ฟังก์ชันเลือกแท็ก
  const handleSelectTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // ฟังก์ชันลบแท็กที่เลือก
  const handleRemoveTag = (tagToRemove) => {
    setSelectedTags(
      selectedTags.filter((tag) => tag.value !== tagToRemove.value)
    );
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#404664", // พื้นหลังของ Select
      color: "white",
      borderColor: "#404664", // สีขอบ
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#2d2f45", // พื้นหลังของเมนู dropdown
      color: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#FB923C" // สีพื้นหลังเมื่อเลือก
        : state.isFocused
        ? "#3e4a63" // สีพื้นหลังเมื่อ hover ตัวเลือก
        : "transparent", // สีพื้นหลังปกติ
      color: state.isSelected ? "white" : "white", // สีข้อความ
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#3e4a63", // สีพื้นหลังเมื่อ hover ตัวเลือก
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#FB923C", // พื้นหลังของแท็กที่เลือก
      color: "white",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white", // สีข้อความของแท็กที่เลือก
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "white",
      "&:hover": {
        backgroundColor: "#ff6b6b", // สีพื้นหลังเมื่อคลิกปุ่มลบแท็ก
        color: "white",
      },
    }),
  };

  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearchClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleCreateBoard = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModalConfirm(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeModalConfirm = () => {
    setShowModalConfirm(false);
  };


  return (
    <Bg>
      <Navb />
      <div className="flex flex-col justify-center w-full h-svh gap-4 lg:flex-row  ">
        <div className="hidden lg:flex lg:flex-col lg:gap-4 lg:block lg:items-center lg:w-1/5 lg:bg-[#20243C] lg:pt-24">
          <div
            onClick={handleMyB}
            className="flex items-center gap-4 w-4/5 py-2 px-2 rounded-xl hover:bg-white/10 cursor-pointer"
          >
            <img
              src={storedData.user.profile}
              className="w-10 h-10 rounded-full "
            />
            <div className="text-white text-md">My Activities</div>
          </div>
          <div
            onClick={handleCreateBoard}
            className="flex items-center gap-4 w-4/5 py-2 px-2 rounded-xl hover:bg-white/10 cursor-pointer"
          >
            <img src="newDC.svg" className="w-10 h-10 rounded-full " />
            <div className="text-white text-md">New Activity</div>
          </div>
          <div
            onClick={handleSearchClick}
            className="flex items-center gap-4 w-4/5 py-2 px-2 rounded-xl hover:bg-white/10 cursor-pointer"
          >
            <img src="Search2.svg" className="w-10 h-10 rounded-full " />
            <div className="text-white text-md">Search</div>
          </div>
          {isSearchVisible && (
            <div className=" px-2 w-4/5">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 px-4 rounded-lg bg-[#404664] text-white"
                onChange={(e) => setSKey(e.target.value)}
              />
            </div>
          )}

          <div className="w-4/5 px-2 flex justify-start pt-4">
            <div className="text-white/60 text-md font-thin">Search Filter</div>
          </div>

          <div className="w-4/5 px-2">
            {/* React-Select Dropdown */}
            <Select
              options={tagOptions}
              value={selectedTags}
              onChange={handleTagChange}
              placeholder="Pick your tag"
              isMulti // เปิดใช้งานการเลือกหลายแท็ก
              isClearable // ลบแท็กทั้งหมด
              styles={customStyles} // เพิ่ม custom styles
              className="text-black"
            />
            
          </div>
        </div>

        <div className="flex flex-col justify-start items-center w-full  px-8 h-svh overflow-y-auto  lg:px-28 lg:w-4/5 lg:pt-24">
         <div className="pt-20 lg:hidden"></div>
         <div className="flex justify-end w-full items-center gap-2 mb-4">
            <div className="flex  justify-end items-center relative lg:w-1/4">
              <input
                className="w-full h-12 px-4 bg-white bg-opacity-50 rounded-full lgt-txt  placeholder:text-gray-300"
                type="text"
                placeholder="Hinted search text"
                value={sKey}
                onChange={(e) => setSKey(e.target.value)}
              ></input>
              <div className="flex justify-end pr-4 w-fit  absolute cursor-pointer">
                <svg
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className=" size-4"
                >
                  <path
                    d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z"
                    fill="#FFF9F0"
                  />
                </svg>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="flex justify-center items-center size-12 bg-white bg-opacity-50 rounded-full relative"
              >
                <svg

                  viewBox="0 0 23 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute size-4 "
                >
                  <path
                    d="M22 1H1L9.4 10.9856V17.8889L13.6 20V10.9856L22 1Z"
                    stroke="#FFF9F0"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-300  rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {tags.map((tag) => (
                  <li>
                    <button onClick={() => handleTagOneChange(tag.tagName)}>
                      {tag.tagName}
                    </button>
                  </li>
                ))}
                <li>
                  <button onClick={() => handleTagOneChange("")}>
                    All Tags
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col w-full gap-3 h-full scroller lg:gap-4">
            <div onClick={handleCreateBoard} className="card bg-[#404664] w-full hover:bg-[#404664]/80">
              <div className="flex justify-start items-center p-5 cursor-pointer gap-3 lg:gap-2">
                <img
                  src={storedData.user.profile}
                  className="size-8 rounded-full lg:mr-8 lg:size-12"
                />
                <div className="text-sm text-white/60 lg:text-lg">What’s on your mind, {storedData.user.name}</div>
              </div>
            </div>
            {filteredPosts.map((board, index) => (
            <PostTemplate
                key= {index}
                avatar={board.userId.profile}
                name={board.userId.name}
                time={board.create_at}
                tag={board.tagId.tagName}
                title = {board.title}
                tagColor={board.tagId.tagColor}
                content={board.detail}
                startDate = {board.start_time}
                endDate = {board.end_time}
                location = {board.location}
                participant={board.participantCount}
                max_participant = {board.participant}
                RegisDead = {board.deadline}
                activityId={board._id}
                ownerId = {board.userId._id}
              />
            ))}
            <div className="pt-32 lg:hidden"></div>
          </div>
          
        </div>

        <div className="fixed bottom-0 flex flex-col w-full justify-start pt-4 pb-10 px-8 h-fit bg-[#20243C]/1 backdrop-blur-lg  rounded-t-3xl lg:hidden">
          <div className="flex items-center justify-between w-full">
            <div
              onClick={handleMyB}
              className="flex justify-center w-full py-2 px-2 rounded-xl hover:bg-white/10 cursor-pointer"
            >
              <img
                src={storedData.user.profile}
                className="size-8 rounded-full "
              />
            </div>
            <div
              onClick={handleCreateBoard}
              className="flex justify-center w-full py-2 px-2 rounded-xl hover:bg-white/10 cursor-pointer"
            >
              <img src="newDC.svg" className="size-8 rounded-full " />
            </div>
            <div
              onClick={handleSearchClick}
              className="flex justify-center items-center w-full  rounded-xl hover:bg-white/10 cursor-pointer"
            >
              <img src="Search2.svg" className="size-8 rounded-full " />
              
            </div>
          </div>
          {isSearchVisible && (
            <div className="flex flex-col pt-10 h-48 gap-8">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 px-4 rounded-lg bg-[#404664] text-white"
                onChange={(e) => setSKey(e.target.value)}
              />
              <div className="w-full h-full">
                {/* React-Select Dropdown */}
                <Select
                  options={tagOptions}
                  value={selectedTags}
                  onChange={handleTagChange}
                  placeholder="Pick your tag"
                  isMulti // เปิดใช้งานการเลือกหลายแท็ก
                  isClearable // ลบแท็กทั้งหมด
                  styles={customStyles} // เพิ่ม custom styles
                  className="text-black"
                  menuPlacement="top"
                />
                
              </div>

            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-8 z-[50]">
          <div className="bg-[#282C45] border border-[#404664] p-1 rounded-2xl  flex flex-col items-center relative gap-5 w-full lg:w-2/5 h-fit lg:p-[30px]">
            <button onClick={closeModal} className="absolute top-2 right-2">
              <img src="close.svg" alt="" className="size-6"/>
            </button>
           <CreateBoard closeModal={closeModal}/>
          </div>
        </div>
      )}



    </Bg>
  );
};

export default ActivitiesBoard;
