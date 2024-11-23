import { useState, useEffect } from "react";
import "/src/index.css";
import "/src/css/navbar.css";
import { useAuth } from "../contexts/AuthContext";
import useBoardNotifications from "../hooks/useBoardNoti"; // import custom hook
import useActNotifications from "../hooks/useActNoti";
import axios from "axios";
import { Spin, message  } from 'antd'; 
import 'antd/dist/reset.css'; 


export default function Navb() {
  const [activeTab, setActiveTab] = useState("Home");
  const [BoardNotifications, setBoardNotifications] = useState([]);
  const [ActNotifications, setActNotifications] = useState([]);

  const sections = ["DiscussionBoard", "Anonymous-Chat", "Activity"];
  const { logout } = useAuth();
  const storedData = JSON.parse(localStorage.getItem('user_data'));
  const userId = storedData?.user._id; // ดึง userId จาก storedData

  const { BoardNotifications: fetchedBoardNotifications, BoardNotiloading, BoardNotierror } =  useBoardNotifications(userId); 
  // console.log(fetchedBoardNotifications);
  const { ActNotifications: fetchedActNotifications, ActNotiloading, ActNotierror } =  useActNotifications(userId); 
  console.log("actnoti",fetchedActNotifications);

  // ฟังก์ชันการลบทั้งหมด
  const handleDeleteAllBoardNoti = async() => {
    try {
    await axios.delete(`https://rabai-server.onrender.com/api/noti/discussionboard/${userId}`);
    setBoardNotifications([]); 
    await axios.delete(`https://rabai-server.onrender.com/api/noti/activity/${userId}`);
    setActNotifications([]); 
    window.location.reload();
  } catch (error) {
    console.error("Error deleting Notifications:", error);

    // Show an error message
    message.error('Failed to delete Notifications.');
  }
  }

  const handleDeleteAllActNoti = async() => {
    try {
    await axios.delete(`https://rabai-server.onrender.com/api/noti/activity/${userId}`);
    setActNotifications([]); 
    window.location.reload();
  } catch (error) {
    console.error("Error deleting activity Notifications:", error);

    // Show an error message
    message.error('Failed to delete activity Notifications.');
  }
  }

  

  useEffect(() => {
    if (fetchedBoardNotifications) {
      setBoardNotifications(fetchedBoardNotifications); 
    }
    if (fetchedActNotifications) {
      setActNotifications(fetchedActNotifications); 
    }
  }, [fetchedBoardNotifications, fetchedActNotifications]);
  

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    const handleScroll = () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offset = 150; // ปรับค่านี้ตามความสูงของ navigation bar
          if (rect.top <= offset && rect.bottom >= offset) {
            setActiveTab(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  if (BoardNotiloading) {
    return <div>Loading board notifications...</div>;
  }

  if (BoardNotierror) {
    return <div>Error loading board notifications: {BoardNotierror}</div>;
  }

  if (ActNotiloading) {
    return <div>Loading activity notifications...</div>;
  }

  if (ActNotierror) {
    return <div>Error loading activity notifications: {ActNotierror}</div>;
  }

  return (
    <div className="fixed top-0 flex w-full justify-center items-center px-8 h-16 bg-[#20243C]/1 backdrop-blur-lg z-50 text-white lg:flex-row  lg:h-20">
      {/* Left Side - Logo and Mobile Menu */}
      <div className="navbar-start flex w-full items-center">
        <div className="dropdown lg:hidden ">
          <div
            tabIndex={0}
            role="button"
            aria-label="Toggle navigation"
            className="btn btn-ghost color-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-noti rounded-box z-[1] mt-3 w-52 p-2 shadow lg:hidden"
          >
            {sections.map((section) => (
              <li key={section}>
                <a
                  href={`/${section}`}
                  className={activeTab === section ? "active" : ""}
                >
                  {section.replace(/([A-Z])/g, " $1").trim()}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <a className="hidden lg:block">
          <img src="/public/Logo.svg" alt="Logo" className="size-32"/>
        </a>
      </div>

      {/* Center - Navbar Links for Desktop */}
      <ul className="hidden w-full h-full lg:flex lg:gap-10 lg:px-1 lg:justify-center lg:items-end pb-4">
        {sections.map((section) => (
          <li key={section}>
            <a
              className={`${
                activeTab === section ? "text-orange-400 font-semibold" : "text-white"
              } hover:text-orange-300`}
              onClick={() => setActiveTab(section)}
              href={`/${section}`}
            >
              {section.replace(/([A-Z])/g, " $1").trim()}
            </a>
          </li>
        ))}
      </ul>

      {/* Right Side - Notifications and User Profile */}
      <div className="navbar-end flex gap-4 lg:gap-8 w-full justify-end items-center">
        {/* Notifications Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button">
            <img src="/public/noti.svg" alt="Notifications" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-noti backdrop-blur-lg rounded-2xl z-[1] mt-3 w-64 flex flex-col lg:w-[446px] p-4 lg:shadow-lg lg:gap-4"
          >
            <div className="text-orange-400 font-medium">Notification</div>
            <div className="flex flex-col gap-2">
              <div className="text-gray-400 font-light pb-2">Discussion Board</div>
              <div className="flex flex-col gap-2 w-full min-h-[50px] h-auto max-h-[300px] overflow-y-auto">
                {/* แสดงรายการ notifications */}
                {BoardNotifications.map((BoardNotifications, index) => (
                  <NotificationCard
                    key={index}
                    avatar={BoardNotifications.commentId.userId.profile || "/public/Unknow.svg"}
                    title={BoardNotifications.commentId.userId.name || "Unknown User"}
                    message={`Comment : ${BoardNotifications.commentId?.content || "No content available"}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="text-gray-400 font-light pb-2">Acitivities Board</div>
              <div className="flex flex-col gap-2 w-full min-h-[50px] h-auto max-h-[300px] overflow-y-auto">
                {/* แสดงรายการ notifications */}
                {ActNotifications.map((ActNotifications, index) => (
                  <NotificationCard
                    key={index}
                    avatar={ActNotifications.actregistId?.userId?.profile || "/public/Unknow.svg"}
                    title={ActNotifications.actregistId?.userId?.name || "Unknown User"}
                    message={`Join : ${ActNotifications?.activityId?.title || "No content available"}`}
                  />
                ))}
              </div>
              <div className="flex justify-end pt-8">
                <button onClick={handleDeleteAllBoardNoti} className="w-[90px] h-[28px] bg-danger text-white rounded-lg hover:bg-red-600">
                  Delete All
                </button>
              </div>
            </div>
          </ul>
        </div>

        {/* User Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-8 lg:w-10 rounded-full">
              <img
                alt="User Avatar"
                src={storedData?.user?.profile}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-noti rounded-box z-[1] mt-3 w-40 lg:w-52 px-2 py-4 shadow flex flex-col gap-2"
          >
            <li>
              <a href="/Profile" className="justify-between hover:bg-white/10 ">
                {storedData?.user?.name}
              </a>
            </li>
            <li><a  href="/Profile">Edit Profile</a></li>
            <li><a onClick={handleLogout} className="text-danger">Logout</a></li>
          </ul>
        </div>
      </div>
      
    </div>
  );
}

// NotificationCard Component
function NotificationCard({ avatar, title, message }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // ฟังก์ชันที่จะทำการ toggle การแสดงข้อความ
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex items-start px-2 py-2 rounded-lg h-full w-full hover:border border-[#404664]">
      {/* Avatar Section */}
      <div className="relative w-8 h-8 lg:w-10 lg:h-10 mr-4">
        <img
          src={avatar}
          alt="Avatar"
          className="w-full h-full rounded-full"
        />
        <div className="absolute bottom-0 right-0 w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full border-2 border-[#282C45]">
          <img src="/public/incon_noti.svg" alt="" className="w-full h-full" />
        </div>
      </div>

      <div className="w-32 lg:w-72">
        <h3 className="text-white font-semibold text-sm lg:text-base">{title}</h3>
        {/* ข้อความการแจ้งเตือน */}
        <p
          className={`text-gray-400 text-xs lg:text-sm ${
            !isExpanded ? "truncate" : "text-ellipsis" // ใช้ truncate ถ้าไม่ได้กดแสดงข้อความเพิ่มเติม
          }`}
          style={{
            maxHeight: !isExpanded ? "40px" : "none", // จำกัดความสูงถ้าไม่ได้ขยาย
            overflow: "hidden", // ซ่อนข้อความที่เกิน
            textOverflow: "ellipsis", // แสดง "..." เมื่อข้อความยาวเกินไป
          }}
        >
          {message}
        </p>

        {/* ปุ่มสำหรับขยายข้อความ */}
        <button
          className="text-blue-400 text-xs mt-2"
          onClick={toggleExpand}
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
      </div>
    </div>
  );
}
