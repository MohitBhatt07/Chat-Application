import React, { useState } from "react";
import Signup from "../components/Authentication/Signup";
import Login from "../components/Authentication/Login";
import Logo from '../assets/chatAppLogo.jpg';
import { ToastContainer, toast } from "react-toastify";

const Homepage = () => {
  const [isSignup ,setIsSignup] = useState(true);

  return (
    <section className="bg-white w-1/2 max-sm:w-3/4 relative h-3/4  mx-auto mt-5 dark:bg-gray-900 rounded-lg">
      <div className="container flex flex-col justify-center min-h-screen px-6 mx-auto">
          <div className="flex h-1/3 items-center flex-col justify-center gap-4 mx-auto">
            <img             
              className="max-w-[200px]"
              src= {Logo}
              alt=""
            />
          </div>

          <div className="flex items-center justify-center mt-6">
            <button
              onClick={()=>setIsSignup(false)}
              className={`w-1/3 pb-4 font-medium text-center text-gray-500 capitalize ${!isSignup && "border-b-2 border-blue-500"} dark:border-gray-400 dark:text-gray-300`}
            >
              sign in
            </button>
            <button
            onClick={()=>setIsSignup(true)}
              className={`w-1/3 pb-4 font-medium text-center text-gray-500 capitalize ${isSignup && "border-b-2 border-blue-500"} dark:border-gray-400 dark:text-gray-300`}
            >
              sign up
            </button>
            
          </div>

          {isSignup ?<Signup/> : <Login/>}
      </div>
      
    </section>
  );
};

export default Homepage;
