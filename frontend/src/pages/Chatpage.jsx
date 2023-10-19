import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Chatpage = () => {
  // const [chats,setChats] = useState([]);
  // useEffect(()=>{
  //   const fetchChats = async()=>{
  //     const data = await axios.get('/api/chat');
  //     setChats(data.data);
  //   }
  //   fetchChats();
  // } ,[]);
  
  return (
    <div className='h-screen'> Chat page</div>
    // <div>
    //   <ul>
    //     {chats.map((chat)=>(
    //       <li key={chat._id}>{chat.chatName}</li>
    //     ))}
    //   </ul>
    // </div>
  )
}

export default Chatpage