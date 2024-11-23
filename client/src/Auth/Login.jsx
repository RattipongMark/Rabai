import React, { useState } from 'react';
import useLogin from '../hooks/auth/useLogin'; // Assume you have a hook for login
import { Spin, message  } from 'antd'; // Import Spin for the loading spinner
import '../App.css'
import Bg from '../assets/bg';

const Login = () => {
  const { loading, loginUser } = useLogin(); // Assume you have login logic in useLogin hook
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = (event) => {
    event.preventDefault();
    const values = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    loginUser(values);
  };

  return (
    <Bg>
    <div className="flex min-h-screen flex-col justify-center items-center gap-14 py-8 lg:px-8 w-full">
      <div className="flex justify-center w-full ">
        <img src="jrb.svg" alt="" />
      </div>

      <div className="flex justify-center items-center w-3/5 lg:w-1/5">
        <form onSubmit={handleLogin} className="flex flex-col gap-8 w-full ">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 lgt-txt baloo2">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="pl-4 bg-white/0 border-b-2 border-[#8A8A8E] w-full text-white/60 lg-12 lg:h-16 focus:outline-none focus:border-orange-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 lgt-txt baloo2">
              Password
            </label>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                className="pl-4 bg-white/0 border-b-2 border-[#8A8A8E] w-full text-white/60 lg-12 lg:h-16 focus:outline-none focus:border-orange-400"
              />
               <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 text-gray-500 lg:mt-6"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
            </div>
          </div>
          <div className="baloo2">
          <div className="flex items-center justify-center w-full">
            {loading ? (
              <div className='w-full flex justify-center'><Spin size="small" /></div>
              
            ) : (
              <button
                type="submit"
                className="w-full mt-4 px-4 py-2 rounded-2xl bg-orange text-sm font-semibold leading-6 lgt-txt shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Sign in
              </button>
            )}
          </div>
  
          <div className='w-full flex justify-center'> 
            <div className=' flex gap-2 text-sm items-center pt-6 w-fit'>
            <div className="text-gray-500">Don't have an account?</div>
            <a href="/register" className="font-semibold text-orange hover:text-orange-300">
            Register here
            </a>
          </div>
          </div>


      </div>
        </form>
      </div>

    </div>
    </Bg>
  );
};

export default Login;
