import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import Tooltips  from "../components/miscellaneous/Tooltip";
import MyChats from "../components/miscellaneous/MyChats";
import ChatBox from "../components/miscellaneous/ChatBox";

const Chatpage = () => {
  const { user } = ChatState();
  // const User = data.user;
  return (
    <div className="h-screen">
      {user && <SideDrawer />}
      <Tooltips message={"searchh the user"} >
        <input placeholder="search user" />
      </Tooltips>

      <div className="flex justify-between"> 
        {user && <MyChats/>}
        {user && <ChatBox/>}  
      </div> 
    </div>
  );
};

export default Chatpage;
