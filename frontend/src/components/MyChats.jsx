import React,{useEffect, useState} from 'react'
import { ChatState } from '../Context/ChatProvider'
import { toast } from 'react-toastify';
import axios from 'axios';

const MyChats = () => {
  const [loggedUser , setLoggedUser ] = useState();
  const {user , chats,setChats,selectedChat, setSelectedChat}  = ChatState();
  
  const fetchChats = async()=>{
    try {
      const config = {
        headers: {
          "Content-type" : "application/json",
          Authorization : `Bearer ${user.data.token}`
        }
      };
      const {data} = await axios.get(`/api/chat` ,config);
      console.log(data);
      setChats(data);
    } catch (error) {
      toast.error("Error fetching the chats", {
        position: "top-right",
        autoClose: 400,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
      )
    }
  }

  useEffect(()=>{
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    fetchChats();
  },[])
  return (
    <div className='h-full w-1/3 shadow-2xl '>
      <div className='h-full w-full bg-white'>ChatPage</div>
    </div>
  )
}

export default MyChats