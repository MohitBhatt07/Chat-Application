import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const ChatSearchItem = ({ user ,handleFunction}) => {
  const [load,setLoad] = useState(false);
  
  return (
    <div onClick={handleFunction} className="relative group w-[85%] bg-gray-200 border-blue-400 h-16 border rounded-md mx-3 mt-2 hover:cursor-pointer hover:bg-blue-400 hover:shadow-lg hover:shadow-green-300">
      <div className="flex  items-center h-full justify-evenly space-x-3">
        <div className="w-12 bg-gray-300 h-10 rounded-full  ">
          <img
            src={user.pic}
            alt=""
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <span className="w-36 h-6 rounded-md font-bold  text-green-400 group-hover:text-white">{user.name}</span>
          <span className="text-sm">{user.email}</span>
        </div>
        {load && <LoadingSpinner/>}
      </div>
    </div>
  );
};

export default ChatSearchItem;
