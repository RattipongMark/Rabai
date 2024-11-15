import {React, useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'
import Navb from '../assets/Navbar';
import Bg from '../assets/bg';
import '../css/AnonyChat.css'
import '../App.css'
import useBoard from '../hooks/discussBoard/useBoard';

const DiscussionBoard = () => {
  const { logout } = useAuth();
  const storedData = JSON.parse(localStorage.getItem('user_data'));
  const handleLogout = async () => {
    await logout();
  }

  const [selectedTag, setSelectedTag] = useState('')
  const [like, setLike] = useState(false)
  const [sKey, setSKey] = useState('')

  const { boards, loading, error } = useBoard();
  console.log(boards)

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
  }

  const handleLikeToggle = (postId) => {
    setLike((prevLike) => ({
      ...prevLike,
      [postId]: !prevLike[postId]
    }));
  }

  const filteredPosts = boards.filter((board) => {
    const matchesTag = selectedTag ? board.tag === selectedTag : true;
    const matchesSearch = board.description.toLowerCase().includes(sKey.toLowerCase());
    return matchesTag && matchesSearch;
  });

  // const filteredPosts = selectedTag ? boards.filter(board => board.tag === selectedTag) : boards

  const PostTemplate = ({ avatar, name, time, tag, content, likes, comments, id }) => {
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
          <div className="flex items-center space-x-1 cursor-pointer" onClick={()=>handleLikeToggle(id)}>
            <span>{likes}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFF9F0" class="size-6">
              <path fill={like[id] ? "#FF2D55" : "none"} stroke={like[id] ? "none" : "#FFF9F0"} stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <span>{comments}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFF9F0" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
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
              <input className='w-[460px] h-14 pl-6 bg-white bg-opacity-50 rounded-full lgt-txt mr-5 placeholder:text-gray-300' type='text' placeholder='Hinted search text' value={sKey} onChange={(e) => setSKey(e.target.value)}></input>
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
              <img src={storedData.user.profile} className='w-12 h-12 rounded-full mr-8'/>
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
              id={index}
            />
          ))}
        </div>
      </div>
    </Bg>
  );
}

export default DiscussionBoard;