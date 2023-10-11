import React, { useState } from "react";
import Signup from "../components/Authentication/Signup";
import Login from "../components/Authentication/Login";
import Logo from '../assets/chatAppLogo.jpg';

const Homepage = () => {
  const [isSignup ,setIsSignup] = useState(true);
  return (
    <section className="bg-white w-[600px] h-3/4  mx-auto mt-5 dark:bg-gray-900 rounded-lg">
      <div className="container flex justify-center min-h-screen px-6 mx-auto">
        
          <div className="flex items-center flex-col justify-center gap-4 mx-auto">
            <img             
              className="scale-[3] sm:h-8"
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
            onClick={()=>setIsSignup(false)}
              className={`w-1/3 pb-4 font-medium text-center text-gray-500 capitalize ${isSignup && "border-b-2 border-blue-500"} dark:border-gray-400 dark:text-gray-300`}
            >
              sign in
            </button>
            
          </div>

          {isSignup ?<Signup/> : <Login/>}
      </div>
    </section>
  );
};

export default Homepage;
