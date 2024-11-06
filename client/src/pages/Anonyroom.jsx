import { useAuth } from '../contexts/AuthContext';
import Navb from '../assets/Navbar';
import Bg from '../assets/bg';
import React, { useState, useEffect } from 'react';
import "/src/css/AnonyChat.css";

// Import SVGs
const anony1 = './public/anony/anony1.svg';
const anony2 = './public/anony/anony2.svg';
const anony3 = './public/anony/anony3.svg';
const anony4 = './public/anony/anony4.svg';
const anony5 = './public/anony/anony5.svg';
const anony6 = './public/anony/anony6.svg';
const anony7 = './public/anony/anony7.svg';
const anony8 = './public/anony/anony8.svg';
const anony9 = './public/anony/anony9.svg';

const avatars = [anony1, anony2, anony3, anony4, anony5, anony6, anony7, anony8, anony9];

const AnonyChat = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const storedData = JSON.parse(localStorage.getItem('user_data'));

  return (
    <Bg>
      <Navb />
      <div className="w-full h-full py-5 flex items-center text-white px-8 gap-5 text-sm">
        {/* Avatar Selection Section */}
        <div className="w-1/2 ml-12 rounded-lg p-6 ">
          <div className="flex w-full justify-center gap-1 pb-5 text-3xl font-extrabold">
            <span className="text-orange-500">Select</span>
            <span>Avatar</span>
          </div>
          <div className="grid grid-cols-3 gap-4 w-full h-full mt-4 justify-items-center px-8">
            {avatars.map((avatar, index) => (
              <div key={index} className="flex justify-center items-start pl-4 pt-4 w-[110px] h-[110px] bg-avatar rounded-full  overflow-hidden hover:border border-white/20">
                <img src={avatar} alt={`anonygoose ${index + 1}`} className=" w-[100px] object-cover" />
              </div>
            ))}
          </div>
          <div className='h-full flex items-start pt-4'>
            <img src="./public/glass.svg" alt="" />
          </div>
        </div>

        {/* Room List Section */}
        <div className="w-1/2 mr-12 rounded-lg p-6 scb">
          <div className="flex">
            <button className="px-4 w-[138px] py-2 bg-orange text-white rounded-t-3xl">Rooms</button>
            <button className="px-4 w-[138px] py-2 bg-[#4a4a63] text-white rounded-t-3xl">New Room</button>
          </div>
          
          {/* Room List */}
          <div className=" flex flex-col gap-4 w-[520px] h-[490px] bg-[#282C45] rounded-b-3xl rounded-tr-3xl scroller  overflow-y-auto p-6">
            {['RoomName 1', 'RoomName 2', 'RoomName 3', 'RoomName 4', 'RoomName 5', 'RoomName 6', 'RoomName 7', 'RoomName 8'].map((room, index) => (
              <div key={index} className="w-full flex justify-between items-center bg-[#3b3b51] p-4 py-6 rounded-xl hover:bg-[#3b3b51]/80">
                <span className="px-2 py-1 bg-[#FFE1FD] text-xs text-[#4a4a63] rounded-3xl h-fit w-14 flex justify-center">CHE</span>
                <span className="flex-grow text-white ml-2">{room}</span>
                <div className="flex gap-0.5">
                  <div className='text-white'>4</div>
                  <div className='text-orange'>/5</div>
                </div>
              </div>
            ))}
            </div>
        </div>
      </div>
    </Bg>
  );
};

export default AnonyChat;
