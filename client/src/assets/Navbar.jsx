import { useState, useEffect } from "react";
import "/src/index.css";
import "/src/css/navbar.css";

export default function Navb() {
  const [activeTab, setActiveTab] = useState("Home");

  const sections = ["DiscussionBoard", "Anonymous-Chat", "Activity"];

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

  return (
    <div className="navbar nav-blur fixed px-4 lg:px-16 py-4 text-white font-thin z-50">
      {/* Left Side - Logo and Mobile Menu */}
      <div className="navbar-start w-full">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            aria-label="Toggle navigation"
            className="btn btn-ghost lg:hidden"
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
            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {sections.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className={activeTab === section ? "active" : ""}
                >
                  {section.replace(/([A-Z])/g, " $1").trim()}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <a><img src="./public/Logo.svg" alt="Logo" /></a>
      </div>

      {/* Center - Navbar Links */}
      <ul className="flex gap-10 px-1 w-full">
        {sections.map((section) => (
          <li key={section}>
            <a
              className={`${
                activeTab === section ? "text-orange-400 font-semibold" : "text-white"
              } hover:text-orange-300`}
              onClick={() => setActiveTab(section)}
              href={`#${section}`}
            >
              {section.replace(/([A-Z])/g, " $1").trim()}
            </a>
          </li>
        ))}
      </ul>

      {/* Right Side - Notifications and User Profile */}
      <div className="navbar-end flex gap-8 w-full">
        {/* Notifications Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button">
            <img src="/public/noti.svg" alt="Notifications" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-noti backdrop-blur-lg rounded-2xl z-[1] mt-3 w-[446px] max-h-[442px] h-fit p-4 shadow-lg flex flex-col gap-4"
          >
            <div className="text-orange-400 font-medium">Notification</div>
            <div className="text-gray-400 font-light">Discussion Board</div>
            <div className="flex flex-col gap-2 min-h-[50px]">
                {/* Notification Items */}
                <NotificationCard
                  avatar="/public/profilegoose2.svg"
                  title="The cat of home"
                  message="Comment on your post : ซาหวัดดีรึค้าบวัยรุ่น..."
                />
                <NotificationCard
                  avatar="/public/profilegoose2.svg"
                  title="The cat of home"
                  message="Comment on your post : ซาหวัดดีรึค้าบวัยรุ่น..."
                /><NotificationCard
                avatar="/public/profilegoose2.svg"
                title="The cat of home"
                message="Comment on your post : ซาหวัดดีรึค้าบวัยรุ่น..."
              />
            </div>
            <div className="flex justify-end">
              <button className="w-[90px] h-[28px] bg-danger text-white rounded-lg hover:bg-red-600">
                Delete All
              </button>
            </div>
            
          </ul>
        </div>

        {/* User Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="/public/goose2.svg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function NotificationCard({ avatar, title, message }) {
  return (
    <div className="flex items-start px-2 py-2  rounded-lg  h-[60px] w-full hover:border border-[#404664]">
      {/* Avatar Section */}
      <div className="relative w-10 h-10 mr-4">
        <img
          src={avatar}
          alt="Avatar"
          className="w-full h-full rounded-full"
        />
        {/* Icon Badge */}
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[#282C45]">
          <span className="text-white text-xs flex justify-center items-center">
            <img src="/public/incon_noti.svg" alt="" />
          </span>
        </div>
      </div>

      {/* Text Section */}
      <div>
        <h3 className="text-white font-semibold">{title}</h3>
        <p className="text-gray-400 text-sm">{message}</p>
      </div>
    </div>
  );
}
