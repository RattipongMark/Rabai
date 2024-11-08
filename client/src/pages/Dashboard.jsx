import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import Navb from '../assets/Navbar';
import Bg from '../assets/bg';

const Dashboard = () => {
  const { logout } = useAuth();

  const handlelogout = async () => {
    await logout();
  }

  const storedData = JSON.parse(localStorage.getItem('user_data'));
  
  return (

    <Bg>
      <Navb/>
      <div className='pt-20 text-white'>
        <div className='flex flex-col h-full  item-center'>
          <div className='flex w-full justify-center'>dashboard</div>
          <div className='flex flex-col'>
            <div>{storedData.user.name}</div>
            <div>{storedData.user.email}</div>
          </div>
          <button onClick={handlelogout}> logout </button>
        </div>
      </div>
    </Bg>
  )
}

export default Dashboard