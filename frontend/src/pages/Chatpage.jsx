import React, { useEffect } from 'react'
import axios from 'axios';

const Chatpage = () => {
  useEffect(()=>{
    const fetchChats = async()=>{
      const data = await axios.get('/api/chat')
      console.log(data);
    }
    fetchChats();
  } ,[]);
  
  return (
    <div>Chatpage</div>
  )
}

export default Chatpage