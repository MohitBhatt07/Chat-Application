import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ChatState } from '../Context/ChatProvider';

const Chatpage = () => {
  const {user } = ChatState();
  
  return (
    <div className='h-screen'>
      {user}
      <div>
        { user}
        {user }  
      </div> 
    </div>
    
  )
}

export default Chatpage