import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import Tooltips  from "../components/miscellaneous/Tooltip";

const Chatpage = () => {
  const { user } = ChatState();
  // const User = data.user;
  return (
    <div className="h-screen">
      {user && <SideDrawer />}
      
      <Tooltips message={"searchh the user"} >
        <button>Search</button>
      </Tooltips>
      {/* <div>
        {User }
        {User }  
      </div>  */}
    </div>
  );
};

export default Chatpage;
