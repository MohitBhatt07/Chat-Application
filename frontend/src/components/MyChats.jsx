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
    <div className='h-full w-1/3 shadow-2xl flex-2 rounded-2xl max-md:flex-1'>
      <div className='h-full w-full rounded-2xl pt-5 p-2 bg-white'>
        <div className='flex mx-5 justify-between'> 
          <span className='text-3xl'>Chats</span>
          <button className="w-24 rounded-lg p-2 bg-orange-300 hover:bg-orange-200">Add group</button>
        </div>

        <div className='mt-5 w-full'>
          {chats.map((chat,index)=>(
            <div onClick={()=>setSelectedChat(chat)} key={index} className={`relative group h-16 w-[98%] rounded-md  hover:cursor-pointer ${(selectedChat == chat ) ?"bg-violet-500" :"hover:bg-gray-100 hover:shadow-sm"}  hover:shadow-green-300`}>
            <div className="flex w-full items-center h-full justify-evenly space-x-3">
              <div className="w-12 bg-gray-300 h-10 rounded-full  ">
                <img
                  src={chat.users[1].pic}
                  alt=""
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
              <div className={`flex  h-full flex-col w-[75%] border-b ${(index == 0 ) ? "border-t" : ""} ${selectedChat ==chat ? "border-none" : ""}  p-2`}>
                <span className="w-36 h-6 rounded-md font-bold   ">{chat.users[1].name}</span>
                {/* <span className="text-sm">{chat.users[1].email}</span> */}
              </div>
              
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyChats