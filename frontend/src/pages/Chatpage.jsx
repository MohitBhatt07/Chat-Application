import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

const Chatpage = () => {
  const { user } = ChatState();
  const [fetchAgain,setFetchAgain] = useState(false);
  return (
    <div className="h-screen">
      {user && <SideDrawer userData = {user}/>}
      

      <div className="flex h-[85%] gap-5 mt-2 px-4"> 
        {user && <MyChats fetchAgain = {fetchAgain}/>}
        {user && <ChatBox fetchAgain = {fetchAgain} setFetchAgain= {setFetchAgain}/>}  
      </div> 
    </div>
  );
};

export default Chatpage;
