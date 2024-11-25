import React, { useState } from 'react';
import useSignup from '../hooks/auth/useSignup';
import { Modal, Spin } from 'antd';
import Bg from '../assets/bg';

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

const Register = () => {
  const { loading, registerUser } = useSignup();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState("/profile/profile1.svg");


  const handleRegister = (event) => {
    event.preventDefault();
    const values = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      confirmPassword: event.target.confirmPassword.value,
      profile: selectedProfile, // Include selected profile
    };

    registerUser(values);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const selectProfile = (profile) => {
    setSelectedProfile(profile);
    closeModal();
  };

  return (
    <Bg>
      <div className=" w-full flex flex-col justify-center items-center  gap-8 h-svh lg:px-8 lg:gap-24">
        <div className="flex justify-center items-center space-x-3 font-bold text-4xl sm:mx-auto sm:w-full sm:max-w-xl sm:text-6xl md:text-7xl lg:text-8xl">
          <div className="lgt-txt baloo2">Create</div>
          <div className="text-orange baloo2">Your</div>
          <div className="text-orange baloo2">Profile</div>
        </div>

        <div className="flex flex-col w-full h-fit justify-center items-center gap-8 lg:flex-row lg:gap-8 lg:items-center lg:px-[200px]">
          <div className='flex flex-col items-center justify-center w-full gap-4 h-fit lg:gap-4 lg:w-1/3'>   
            {/* <div className='w-full text-center text-2xl text-orange'>Select Profile</div>    */}
            <div className="flex justify-center items-center bg-regis rounded-full size-32  lg:size-72 " onClick={openModal}>
              <img src={selectedProfile || "/profile/profile1.svg"} alt="Profile" className="rounded-full size-10/12 hover:opacity-80 hover:cursor-pointer" />
            </div>
            <img src="glass.svg" alt="" className='hidden lg:block lg:w-2/3 lg:w-full'/>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full px-14  lg:grid grid-cols-2 lg:gap-16 lg:w-2/3">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 lgt-txt">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  // placeholder="N'Sun"
                  required
                  autoComplete="name"
                  className="text-white/60 pl-4 flex justify-center bg-white/0 border-b-2 border-[#8A8A8E] w-full h-8 lg:h-16 focus:outline-none focus:border-orange-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 lgt-txt">
                E-mail
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  // placeholder="Enter your email"
                  required
                  autoComplete="email"
                  className="text-white/60 pl-4 bg-white/0 border-b-2 border-[#8A8A8E] w-full text-white/60 h-8 lg:h-16 focus:outline-none focus:border-orange-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 lgt-txt">
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  // placeholder="Enter your password"
                  required
                  autoComplete="new-password"
                  className="text-white/60 pl-4 bg-white/0 border-b-2 border-[#8A8A8E] w-full text-white/60 h-8 lg:h-16 focus:outline-none focus:border-orange-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2  text-gray-500 lg:mt-6"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 lgt-txt">
                Confirm password
              </label>
              <div className="mt-2 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  // placeholder="Confirm your password"
                  required
                  autoComplete="new-password"
                  className="text-white/60 pl-4 bg-white/0 border-b-2 border-[#8A8A8E] w-full text-white/60 h-8 lg:h-16 focus:outline-none focus:border-orange-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className=" absolute right-2  text-gray-500 lg:mt-6"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div> 

            <div className="col-span-2 flex justify-between items-center w-full">
              <div className='flex flex-col gap-0.5 lg:gap-2  lg:flex-row text-sm'>
                <div className="text-center text-sm text-gray-500">
                  Already a member?
                </div>
                <a href="/login" className="font-semibold text-orange hover:text-orange-300">
                    Sign in here
                  </a>
              </div>
              
              <div>
                {loading ? (
                  <Spin size="small" /> // Show loading spinner
                ) : (
                  <button
                    type="submit"
                    className="text-center w-28 sm:mt-0 px-4 py-2 rounded-xl bg-orange text-sm font-semibold leading-6 lgt-txt shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </form>
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
                    className="w-full cursor-pointer rounded-full hover:opacity-50"
                    onClick={() => selectProfile(profile)}
                  />
                ))}
              </div>
            </div>

          </div>
          
          )}

      </div>
    </Bg>
  );
};

export default Register;
