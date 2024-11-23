import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { message, Spin } from 'antd';
import useEditProfile from '../hooks/useEditProfile'; // ใช้ hook ที่สร้างขึ้นมา
import Navb from "../assets/Navbar";
import Bg from "../assets/bg";

const profiles = [
    "/profile/profile1.svg",
    "/profile/profile2.svg",
    "/profile/profile3.svg",
    "/profile/profile4.svg",
    "/profile/profile5.svg",
    "/profile/profile6.svg",
    "/profile/profile7.svg",
    "/profile/profile8.svg",
    "/profile/profile9.svg",
  ];

const EditProfile = () => {
  const { userData, setUserData } = useAuth(); // ดึงข้อมูลผู้ใช้จาก context
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profile: '', // เริ่มต้นโปรไฟล์จะเป็นค่าที่มีอยู่
  });
  const [isEditing, setIsEditing] = useState(false); // สถานะเพื่อควบคุมการแสดงผลฟอร์มแก้ไข
  const { updateProfile, loading } = useEditProfile(); // เรียกใช้ฟังก์ชันอัปเดตโปรไฟล์จาก hook

 
  // เมื่อโหลด component ครั้งแรกจะใช้ข้อมูลเก่าจาก userData
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        profile: userData.profile || '', // โหลดโปรไฟล์เก่า
      });
    }
  }, [userData]); // เมื่อ userData เปลี่ยน, ก็จะอัปเดต formData

  
  // ฟังก์ชันจัดการการเปลี่ยนแปลงในฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ฟังก์ชันสำหรับการอัปเดตโปรไฟล์
  const handleProfileUpdate = async (e) => {
    e.preventDefault(); // ป้องกันการโหลดหน้าใหม่
    const updatedUserData = {
      id: userData._id, // ส่ง ID ของผู้ใช้ที่ต้องการอัปเดต
      ...formData, // ข้อมูลที่ผู้ใช้แก้ไข
    };

    try {
      console.log(updatedUserData);
      const updatedUser = await updateProfile(updatedUserData);
      if (updatedUser) {
        setIsEditing(false); // หลังจากอัปเดตสำเร็จ ให้ปิดโหมดการแก้ไข
      }
    } catch (error) {
      message.error('Error updating profile');
    }
  };


  const [selectedProfile, setSelectedProfile] = useState(formData.profile);

  // ฟังก์ชันเพื่อให้สามารถแก้ไขได้
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const selectProfile = (profile) => {
    setSelectedProfile(profile); // เลือกโปรไฟล์ใหม่
    setFormData((prevData) => ({
      ...prevData,
      profile: profile, // อัปเดตฟิลด์ `profile` ใน `formData`
    }));
    closeModal(); // ปิด Modal
  };

  return (
    <Bg>
        <Navb/>
        <div className="flex flex-col w-full h-svh justify-center items-center text-white px-2 gap-16 lg:px-8 ">
            <div className='bg-[#282C45]/80 backdrop-blur-lg border border-[#404664] w-4/5 h-fit rounded-3xl mt-6 lg:mt-16 lg:w-2/5'>
                 {/* เมื่อยังไม่ได้กด Edit จะแสดงข้อมูลในรูปแบบที่ไม่สามารถแก้ไขได้ */}
                {!isEditing ? (
                    <div className='flex flex-col gap-12 w-full h-full'>
                        <div className='w-full h-24 bg-art fixed top-0 rounded-t-3xl z-0 lg:h-40 '></div>
                        <div className='flex justify-start items-center w-full pt-12 z-50 lg:pt-12 pl-12'> 
                            <img
                            src={formData.profile}
                            className="size-20 rounded-full lg:size-40"
                            />
                        </div>
                        <div className='flex flex-col gap-6 px-4 pb-12 h-full justify-end text-sm lg:px-12 lg:text-md'>
                            <div className='flex gap-2 items-center lg:gap-4'>
                                <div className='w-12'>Name</div>
                                <div className='w-full bg-white/1 h-12 flex items-center border border-white/50 px-4 rounded-xl truncate lg:h-14'>{formData.name}</div>
                            </div>
                            <div className='flex gap-2 items-center lg:gap-4'>
                                <div className='w-12'>Email</div>
                                <div className='w-full bg-white/1 h-12 flex items-center border border-white/50 px-4 rounded-xl truncate lg:h-14'>{formData.email}</div>
                            </div>
                            <div className='w-full flex justify-end'>
                                <button onClick={handleEditClick} className='bg-danger text-white rounded-lg hover:bg-red-600 w-1/5 h-8 text-white'>Edit</button> {/* ปุ่ม Edit */}
                            </div>
                        </div>
                        
                    </div>
                ) : (
                    // ฟอร์มสำหรับการแก้ไขข้อมูลโปรไฟล์
                    <form onSubmit={handleProfileUpdate}>
                    <div className='flex flex-col gap-12 w-full h-full'>
                        <div className='w-full h-24 bg-art fixed top-0 rounded-t-3xl z-0 lg:h-40 '></div>
                        <div onClick={openModal} className='flex justify-start items-center w-full pt-12 z-50 lg:pt-12 pl-12'> 
                            <img
                            src={selectedProfile ? selectedProfile:formData.profile}
                            className="size-20 rounded-full lg:size-40"
                            />
                        </div>
                        <div className='flex flex-col gap-6 px-4 pb-12 h-full justify-end text-sm lg:px-12 lg:text-md'>
                            <div className='flex gap-2 items-center lg:gap-4'>
                                <div className='w-12'>Name</div>
                                <input 
                                    type="text"
                                    name="name"
                                    value={formData.name} // แสดงค่าปัจจุบันจาก state
                                    onChange={handleChange} // ฟังก์ชันจัดการการเปลี่ยนแปลง
                                    className='w-full bg-white/1 h-12 flex items-center border border-white/50 px-4 rounded-xl truncate lg:h-14'/>
                            </div>
                            <div className='flex gap-2 items-center lg:gap-4'>
                                <div className='w-12'>Email</div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email} // แสดงค่าปัจจุบันจาก state
                                    onChange={handleChange}
                                    className='w-full bg-white/1 h-12 flex items-center border border-white/50 px-4 rounded-xl truncate lg:h-14'/>
                            </div>
                            <div className='w-full flex justify-end gap-4'>
                                <button onClick={handleEditClick} className='bg-danger text-white rounded-lg hover:bg-red-600 w-1/5 h-8 text-white'>Cancel</button>
                                {loading ? (
                                <Spin size="small" /> // เมื่อมีการโหลดข้อมูลหรือการอัปเดต, แสดง spinner
                                ) : (
                                <button type="submit" className='bg-green-400 text-white rounded-lg hover:bg-green-600 w-1/5 h-8 text-white'>Update</button> // ปุ่มอัปเดตข้อมูล
                                )}
                            </div>
                        </div>
                        
                    </div>
                    </form>
                )}
            </div>
            <div className="flex justify-center w-full px-8">
            <img src="glass.svg" alt="" />
          </div>   
            

     
        </div>
        {isModalVisible && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 '>
            <div className='bg-[#282C45]/90 flex flex-col justify-center gap-8 py-8 px-8 rounded-xl border border-[#404664] w-[300px]  lg:w-[700px] lg:px-28'>
              
              <div className=" text-center text-sm font-bold text-orange-500 w-full  lg:text-2xl">
                Select Your Profile
              </div>
              <div className="grid grid-cols-3 gap-8 ">
                {profiles.map((profile, index) => (
                  <img
                    key={index}
                    src={profile}
                    alt={`Profile ${index + 1}`}
                    className="w-full h-full cursor-pointer rounded-full hover:opacity-50"
                    onClick={() => selectProfile(profile)}
                  />
                ))}
              </div>
            </div>

          </div>
          
          )}
    </Bg>

  );
};

export default EditProfile;
