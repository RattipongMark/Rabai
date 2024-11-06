import React from 'react';
import useSignup from '../hooks/useSignup';
import '../App.css'
import { Spin } from 'antd'; // Import Spin from Ant Design

const Register = () => {
  const { loading, registerUser } = useSignup();

  const handleRegister = (event) => {
    event.preventDefault();
    const values = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      confirmPassword: event.target.confirmPassword.value,
    };

    registerUser(values);
  };

  return (
    <div className="min-h-screen py-12 lg:px-8">
      <div className="flex justify-center items-center space-x-3 mt-10 lg:mt-36 md:mt-24 mb-10 font-bold text-4xl sm:mx-auto sm:w-full sm:max-w-xl sm:text-6xl md:text-7xl lg:text-8xl">
        <span className="lgt-txt baloo2">
          Create
        </span>
        <span className="text-orange baloo2">
          Your
        </span>
        <p className="text-orange baloo2">
          Profile
        </p>
      </div>

      <div className="baloo2 min-w-fit min-h-fit flex flex-col lg:flex-row justify-center items-center mb-10 relative sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="mb-6 lg:mb-0 lg:mr-36 flex justify-center">
          <img src="" alt="" className="rounded-full size-56" />
        </div>
        <form onSubmit={handleRegister} className="gap-4 grid grid-cols-1 sm:grid-cols-2 sm:gap-6 w-72 md:w-auto lg:w-auto">
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 lgt-txt">
              Username
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="block w-full bg-white rounded-md px-2 py-1.5 text-gray-900 shadow-sm ring-4 ring-inset ring-gray-200 focus:ring-4 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
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
                required
                autoComplete="email"
                className="block w-full bg-white rounded-md px-2 py-1.5 text-gray-900 shadow-sm ring-4 ring-inset ring-gray-200 focus:ring-4 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 lgt-txt">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                className="block w-full bg-white rounded-md px-2 py-1.5 text-gray-900 shadow-sm ring-4 ring-inset ring-gray-200 focus:ring-4 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 lgt-txt">
              Confirm password
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                autoComplete="new-password"
                className="block w-full bg-white rounded-md px-2 py-1.5 text-gray-900 shadow-sm ring-4 ring-inset ring-gray-200 focus:ring-4 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div> 
          <div className="flex flex-col sm:flex-row justify-center items-center mt-6 sm:mt-4 sm:space-x-4 lg:space-x-20 md:space-x-20 lg:absolute lg:-bottom-5 lg:right-0 lg:items-end md:items-end space-y-4 sm:space-y-0">
            <p className="text-center text-sm text-gray-500">
              Already a member?{' '}
              <a href="/login" className="font-semibold leading-6 text-orange hover:text-orange-300">
                Sign in here
              </a>
            </p>
            {loading ? (
              <Spin size="small" /> // Show loading spinner
            ) : (
              <button
                type="submit"
                className="w-full sm:w-auto mt-4 sm:mt-0 px-4 py-2 rounded-xl bg-orange text-sm font-semibold leading-6 lgt-txt shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Submit
              </button>
            )}
            
        </div>
          

        </form>

      </div>
    </div>
  );
};

export default Register;
