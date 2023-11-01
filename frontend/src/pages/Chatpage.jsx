import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider';
import SideDrawer from '../components/miscellaneous/SideDrawer';

const Chatpage = () => {
  const {user} = ChatState();
  console.log(user);
  return (
    <div className='h-screen'>
      {user.user && <SideDrawer/>}
      <div>
        { user}
        {user }  
      </div> 
    </div>
    
  )
}

export default Chatpage