import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

const Chatpage = () => {
  const { user } = ChatState();
  
  return (
    <div className="h-screen">
      {user && <SideDrawer userData = {user}/>}
      

      <div className="flex h-[90%] justify-between"> 
        {user && <MyChats/>}
        {user && <ChatBox/>}  
      </div> 
    </div>
  );
};

export default Chatpage;
