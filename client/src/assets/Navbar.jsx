import { useState, useEffect } from "react";
import "/src/index.css";
import "/src/css/navbar.css";
import { useAuth } from "../contexts/AuthContext";


export default function Navb() {
  const [activeTab, setActiveTab] = useState("Home");

  const sections = ["DiscussionBoard", "Anonymous-Chat", "Activity"];

  const {logout } = useAuth();
  const storedData = JSON.parse(localStorage.getItem('user_data'));
  const handleLogout = async () => {
    await logout();
  };
  console.log(storedData)
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
    <div className="navbar nav-blur fixed px-4 lg:px-16 pt-2 py-2 text-white font-thin z-50  w-full top-0 right-0 left-0">
      {/* Left Side - Logo and Mobile Menu */}
      <div className="navbar-start flex w-full">
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
        <a className="hidden lg:block "><img src="/public/Logo.svg" alt="Logo" /></a>
      </div>

      {/* Center - Navbar Links for Desktop */}
      <ul className="hidden w-full lg:flex gap-10 px-1 justify-center">
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
      <div className="navbar-end flex gap-4 lg:gap-8 w-full justify-end">
        {/* Notifications Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button">
            <img src="/public/noti.svg" alt="Notifications" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-noti backdrop-blur-lg rounded-2xl z-[1] mt-3 w-52 lg:w-[446px] max-h-[442px] h-fit p-4 shadow-lg flex flex-col gap-4"
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
            <div className="w-8 lg:w-10 rounded-full">
              <img
                alt="User Avatar"
                src={storedData.user.profile}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-noti rounded-box z-[1] mt-3 w-40 lg:w-52 px-2 py-4 shadow flex flex-col gap-2"
          >
            <li>
              <a className="justify-between hover:bg-white/10 ">
                {storedData.user.name}
              </a>
            </li>
            <li><a>Edit Profile</a></li>
            <li><a onClick={handleLogout} className="text-danger">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function NotificationCard({ avatar, title, message }) {
  return (
    <div className="flex items-start px-2 py-2 rounded-lg h-[60px] w-full hover:border border-[#404664]">
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
      <div>
        <h3 className="text-white font-semibold text-sm lg:text-base">{title}</h3>
        <p className="text-gray-400 text-xs lg:text-sm">{message}</p>
      </div>
    </div>
  );
}
