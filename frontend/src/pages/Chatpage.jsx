import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/miscellaneous/MyChats";
import ChatBox from "../components/miscellaneous/ChatBox";

const Chatpage = () => {
  const { user } = ChatState();
  console.log(user);
  return (
    <div className="h-screen">
      {user && <SideDrawer userData = {user}/>}
      

      <div className="flex justify-between"> 
        {user && <MyChats/>}
        {user && <ChatBox/>}  
      </div> 
    </div>
  );
};

export default Chatpage;
