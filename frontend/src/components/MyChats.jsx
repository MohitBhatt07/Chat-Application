import React from 'react'
import { ChatState } from '../Context/ChatProvider'

const MyChats = () => {
  const [loggedUser , setLoggedUser ] = useState();
  const {user , chats,setChats,selectedChat, setSelectedChat}  = ChatState();
  
  const fetchChats = async()=>{
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type" : "application/json",
          Authorization : `Bearer ${userData.data.token}`
        }
      };
      const {data} = await axios.post(`/api/chat` , {userId} ,config);
      setSelectedChat(data);
      setLoadingChat(false);
      setIsDrawerOpen(false);
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
  return (
    <div>MyChats</div>
  )
}

export default MyChats