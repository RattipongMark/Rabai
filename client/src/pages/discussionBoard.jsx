import {React, useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'
import Navb from '../assets/Navbar';
import Bg from '../assets/bg';
import '../css/AnonyChat.css'
import '../App.css'
import useBoard from '../hooks/discussBoard/useBoard';

const DiscussionBoard = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  }

  const [selectedTag, setSelectedTag] = useState('')

  const { boards, loading, error } = useBoard();
  console.log(boards)

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
  }
  const filteredPosts = selectedTag ? boards.filter(board => board.tag === selectedTag) : boards

  const PostTemplate = ({ avatar, name, time, tag, content, likes, comments }) => {
    return (
      <div className="card bg-[#404664] p-6 lgt-txt w-full space-y-4">
        <div className="flex items-center">
          <img src={avatar} className="w-12 h-12 rounded-full mr-8" />
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-gray-400 text-sm">{time}</p>
          </div>
          <div className="ml-auto">
            <span className="bg-[#E1F3FF] text-xs font-semibold text-[#0095FF] px-5 py-0.5 rounded-full">{tag}</span>
          </div>
        </div>

        <p className="lgt-txt text-sm leading-relaxed">{content}</p>

        <div className="flex items-center space-x-6 text-gray-400 text-sm">
          <div className="flex items-center space-x-1">
            <span>{likes}</span>
            <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.2516 1.3969C16.7827 0.953812 16.226 0.602385 15.6133 0.362699C15.0005 0.123012 14.3439 -0.000234964 13.6807 3.36287e-07C13.0176 0.000235637 12.361 0.123949 11.7485 0.36407C11.1359 0.604191 10.5795 0.956014 10.1109 1.39943L9.4993 1.98442L8.89276 1.4007L8.88882 1.39697C8.42013 0.954095 7.86371 0.602786 7.25134 0.363103C6.63897 0.12342 5.98263 5.67646e-05 5.31981 5.67646e-05C4.65698 5.67646e-05 4.00064 0.12342 3.38827 0.363103C2.7759 0.602786 2.21948 0.954095 1.7508 1.39697L1.47832 1.65444C0.531768 2.54886 0 3.76195 0 5.02685C0 6.29175 0.531768 7.50485 1.47832 8.39927L8.66969 15.1945L9.4818 15.9985L9.50116 15.9801L9.52218 16L10.2831 15.2414L17.5241 8.39915C18.4692 7.50402 19 6.2912 19 5.02674C19 3.76229 18.4692 2.54946 17.5241 1.65433L17.2516 1.3969ZM16.6316 7.55607L9.50116 14.294L2.37051 7.55607C1.6606 6.88525 1.26178 5.97543 1.26178 5.02676C1.26178 4.07809 1.6606 3.16827 2.37051 2.49745L2.64303 2.23999C3.3526 1.5695 4.31487 1.19267 5.31834 1.19232C6.32182 1.19196 7.28439 1.56811 7.99449 2.23809L9.49658 3.6833L11.0058 2.23999C11.3573 1.90783 11.7746 1.64435 12.2339 1.46458C12.6932 1.28482 13.1854 1.1923 13.6826 1.1923C14.1797 1.1923 14.6719 1.28482 15.1312 1.46458C15.5905 1.64435 16.0078 1.90783 16.3593 2.23999L16.6318 2.49742C17.3406 3.16879 17.7387 4.07842 17.7387 5.02677C17.7387 5.97512 17.3405 6.88474 16.6316 7.55607Z" fill="#FFF9F0"/>
            </svg>
          </div>
          <div className="flex items-center space-x-1">
            <span>{comments}</span>
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9126 8C15.9126 9.30489 15.6018 10.5368 15.0508 11.6251L16.7423 15.9962L11.4672 15.181C10.4083 15.7054 9.2165 16 7.95628 16C3.56215 16 0 12.4183 0 8C0 3.58172 3.56215 0 7.95628 0C12.3504 0 15.9126 3.58172 15.9126 8ZM14.8404 8C14.8404 9.13091 14.4449 10.6124 13.9677 11.5556L15.5589 14.9301L11.4924 14.0444C10.5754 14.499 9.04191 14.9333 7.95062 14.9333C4.1455 14.9333 1.06084 11.8292 1.06084 8C1.06084 4.17083 4.1455 1.06667 7.95062 1.06667C11.7557 1.06667 14.8404 4.17083 14.8404 8Z" fill="#FFF9F0"/>
            </svg>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Bg>
      <Navb />
      <div className='justify-center p-28'>
          <div className='flex justify-end mb-4'>
            <div className='relative'>
              <input className='w-[460px] h-14 pl-6 bg-white bg-opacity-50 rounded-full lgt-txt mr-5 placeholder:text-gray-300' type='text' placeholder='Hinted search text'></input>
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute right-14 top-5 cursor-pointer'>
                <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" fill="#FFF9F0"/>
              </svg>
            </div>
            <div className='dropdown dropdown-end'>
              <button tabIndex={0} className='size-14 bg-white bg-opacity-50 rounded-full relative'>
                <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute right-4 top-5'>
                  <path d="M22 1H1L9.4 10.9856V17.8889L13.6 20V10.9856L22 1Z" stroke="#FFF9F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-300  rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <button onClick={() => handleTagChange('CPE')}>CPE</button>
                </li>
                <li>
                  <button onClick={() => handleTagChange('CHE')}>CHE</button>
                </li>
                <li>
                  <button onClick={() => handleTagChange('')}>All Tags</button>
                </li>
              </ul>
            </div>
          </div>
          <div className='space-y-4 overflow-y-auto p-6 h-[640px] scroller'>
          <div className="card bg-[#404664] w-full">
            <div className="flex justify-start items-center p-5">
              <img src="./profilegoose2.svg" className='w-12 h-12 rounded-full mr-8'/>
              <p className='lgt-txt'>What’s on your mind, Username</p>
            </div>
          </div>
          {filteredPosts.map((board, index) => (
            <PostTemplate
              key={index} 
              avatar={board.create_at}
              name={board.title}
              time={board.time}
              tag={board.tagId}
              content={board.description}
              likes={board.like}
              comments={board.comments}
            />
          ))}
        </div>
      </div>
    </Bg>
  );
}

export default DiscussionBoard;
