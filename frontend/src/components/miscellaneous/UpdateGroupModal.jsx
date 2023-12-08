import React, { useState } from "react";
import ModalSheet from "./modalsheet";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import axios from "axios";
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from "react-toastify";
import { ChatState } from "../../Context/ChatProvider";
import ChatSearchItem from "./ChatSearchList";

const UpdateGroupModal = ({
  fetchAgain,
  setFetchAgain,
  setModalStatus,
  fetchMessages
}) => {
  const [updateGroupName, setUpdateGroupName] = useState(false);
  const [addMembers, setAddMembers] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const {user,selectedChat,setSelectedChat} = ChatState();


    const handleSearch = async (value) => {
      setSearch(value);
      if (!value) {
        return;
      }
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        };
  
        const { data } = await axios.get(`/api/user?search=${search}`, config);
  
        setLoading(false);
        setSearchResults(data);
      } catch (err) {
        toast.error("Failed to load results", {
          position: "top-right",
          autoClose: 400,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    };
  
    const handleGroup = async(userToAdd) => {
      const existingUser = selectedUsers.findIndex((curr)=>{
        return curr._id === userToAdd._id;
      })
      
      if(existingUser !== -1){
        toast.warn("User already added", {
              position: "top-right",
              autoClose: 400,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            return;
      }
      if(selectedChat.groupAdmin._id !== user.data._id){
        toast.error("Only Admin can add members", {
          position: "top-right",
          autoClose: 400,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
      try {
        
        const config = {
          headers : {
            Authorization : `Bearer ${user.data.token}`
          }
        };

        const {data} = await axios.put('api/chat/groupadd' ,{
          chatId : selectedChat._id,
          userId : userToAdd._id
        },config);

        setSelectedChat(data);
        setFetchAgain(!fetch);

      } catch (error) {
         toast.error("Unable to add user", {
          position: "top-right",
          autoClose: 400,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
     
    };

  const handleRemove = async(userId)=>{
    if(selectedChat.groupAdmin._id !== user.data._id && userId !== user.data._id){
      toast.error("Only Admin can remove members", {
        position: "top-right",
        autoClose: 400,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    try{
      const config =  {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };
  
      const {data} = await axios.put('/api/chat/groupremove' ,{
        chatId : selectedChat._id,
        userId
      },config);
      
      
      userId === user.data._id ? setSelectedChat({}) : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
    }catch(err){
      toast.error("Failed to change name", {
        position: "top-right",
        autoClose: 400,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    setFetchAgain(!fetchAgain);
  }

  const handleRename = async()=>{ 
    if(!groupName.length){
      
      toast.error("Name is empty", {
        position: "top-right",
        autoClose: 400,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    try{
    const config =  {
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
    };

    const {data} = await axios.put('/api/chat/rename' ,{
      chatName : groupName,
      chatId  : selectedChat._id
    },config);
    
    setSelectedChat(data);
    setFetchAgain(!fetchAgain);
  }catch(err){
    toast.error("Failed to change name", {
      position: "top-right",
      autoClose: 400,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
  setGroupName("");
  }
  return (
    <ModalSheet setModalStatus={setModalStatus}>

      <div className="relative max-w-md z-30 mx-auto p-6  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] animate-slide-in-elliptic-top-fwd from-amber-300 via-orange-300 to-rose-300 rounded-xl shadow-md">
       <ClearIcon className="absolute right-1 top-1 text-red-600 bg-white rounded-2xl cursor-pointer" onClick={()=>setModalStatus(false )}/>
        <h2 className="text-2xl font-bold mb-4">{selectedChat.chatName}</h2>

        <div className="mb-4">
          <label className="text-gray-600">Group Members:</label>
          <div className="mt-2 flex gap-2 flex-wrap">
            {selectedChat.users.map((curr,index) => (
              <div className="mb-2 bg-green-300 w-fit p-2 flex gap-2 rounded-lg" key={index}>
                <span> {curr.name}</span>
                <CancelIcon onClick={()=>handleRemove(curr._id)} className="cursor-pointer"/>
              </div>
            ))}
          </div>
        </div>
        
        {updateGroupName && (
          <div className="flex mb-2">
            <div class="relative w-[80%]">
              <input
                type="text"
                className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-s-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder=""
                onChange={(e)=>setGroupName(e.target.value)} 
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <EditIcon />
              </div>
            </div>
            <button onClick={handleRename} className="w-[20%] bg-violet-600 rounded-e-lg p-1">
              UPDATE
            </button>
          </div>
        )}
        {addMembers && (
          <form >
            <div class="relative mb-2">
              <input
                type="email"
                className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Enter name"
                onChange={(e)=>handleSearch(e.target.value)}
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <GroupAddIcon />
              </div>
            </div>
          </form>
        )}
        {loading ? (
          <span className="block">LOADING.....</span>
        ) : (!updateGroupName) && (
          <div
            className={`${
              searchResults.length === 0 ? "h-0" : "h-56"
            } mt-2 mb-2 overflow-scroll scroll overflow-x-hidden`}
          >
            {
            searchResults.map((curr, index) => (
              <ChatSearchItem
                key={index}
                user={curr}
                handleFunction={() => handleGroup(curr)}
              />
            ))}
          </div>
        )}
        <button
          onClick={() =>{ setUpdateGroupName(true);
          setAddMembers(false)}}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
        >
          Edit Group Name
        </button>
        <button
          onClick={()=>{setAddMembers(true);
          setUpdateGroupName(false)}}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          
        >
          Add Members
        </button>
        <div className="mt-4">
          <button className="bg-red-500 rounded-md p-2 hover:bg-red-600 text-white" onClick={()=>handleRemove(user.data._id)}>Leave Group</button>
        </div>
      </div>
    </ModalSheet>
  );
};

export default UpdateGroupModal;
