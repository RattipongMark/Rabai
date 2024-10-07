import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const Dashboard = () => {
  const { userData, logout } = useAuth();

  const handlelogout = async () => {
    await logout();
  }
  return (
    <div className='flex flex-col h-full justify-center item-center'>
      <div className='flex w-full justify-center'>dashboard</div>
      <div className='flex flex-col'>
        <div>{userData.name}</div>
        <div>{userData.email}</div>
      </div>
      <button onClick={handlelogout}> logout </button>
    </div>
  )
}

export default Dashboard