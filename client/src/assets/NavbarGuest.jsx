import { useState, useEffect } from "react";
import "/src/index.css";
import "/src/css/navbar.css";



export default function NavbGuest() {

  return (
    <div className="fixed top-0 flex w-full justify-center items-center px-8 h-16 bg-[#20243C]/1 backdrop-blur-lg z-50 text-white lg:flex-row  lg:h-20">
      {/* Left Side - Logo and Mobile Menu */}
      <div className="navbar-start flex w-full items-center">
        <a className="hidden lg:block">
          <img src="Logo.svg" alt="Logo" className="size-32"/>
        </a>
      </div>

      <div className="hidden  lg:w-full lg:flex lg:justify-center">
        <img src="anony/anony1.gif" alt="" className="size-12"/>
        <img src="anony/anony2.gif" alt="" className="size-12"/>
        <img src="anony/anony3.gif" alt="" className="size-12"/>
        <img src="anony/anony4.gif" alt="" className="size-12"/>
        <img src="anony/anony5.gif" alt="" className="size-12"/>
        <img src="anony/anony6.gif" alt="" className="size-12"/>
        <img src="anony/anony7.gif" alt="" className="size-12"/>
        <img src="anony/anony8.gif" alt="" className="size-12"/>
        <img src="anony/anony9.gif" alt="" className="size-12"/>
      </div>


      {/* Right Side - Notifications and User Profile */}
      <div className="navbar-end flex gap-4 lg:gap-8 w-full justify-end items-center">
        <a href="login" className="w-14 text-xs py-1 rounded-lg bg-orange text-center hover:bg-orange-600 lg:w-20 lg:text-md lg:py-2">SignIn</a>
      </div>
    </div>
  );
}
