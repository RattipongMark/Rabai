import React from 'react';
import useLogin from '../hooks/useLogin'; // Assume you have a hook for login
import { Spin } from 'antd'; // Import Spin for the loading spinner
import '../App.css'

const Login = () => {
  const { loading, loginUser } = useLogin(); // Assume you have login logic in useLogin hook

  const handleLogin = (event) => {
    event.preventDefault();
    const values = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    loginUser(values);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center py-12 lg:px-8 w-screen">
      <div className="flex justify-center space-x-2 sm:space-x-4 text-4xl font-bold baloo2 sm:mx-auto sm:w-full sm:max-w-xl sm:text-6xl md:text-7xl lg:text-8xl">
        <span className="lgt-txt">
          Just
        </span>
        <span className="text-orange">
          Rabai !
        </span>
      </div>

      <div className="mt-10 flex justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm">
        <div onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 lgt-txt baloo2">
              Username
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-80 bg-white rounded-md px-2 py-1.5 text-gray-900 shadow-sm ring-4 ring-inset ring-gray-200 focus:ring-4 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 lgt-txt baloo2">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-80 bg-white rounded-md px-2 py-1.5 text-gray-900 shadow-sm ring-4 ring-inset ring-gray-200 focus:ring-4 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="baloo2">
        
        <div className="flex justify-center">
            {loading ? (
              <Spin size="small" /> // Show loading spinner while logging in
            ) : (
              <button
                type="submit"
                className="w-80 mt-10 px-4 py-2 rounded-2xl bg-orange text-lg font-semibold leading-6 lgt-txt shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Sign in
              </button>
            )}
        </div>
        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <a href="#" className="font-semibold leading-6 text-orange hover:text-orange-300">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
