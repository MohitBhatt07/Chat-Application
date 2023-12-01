import React, { useState } from "react";
import ModalSheet from "./modalsheet";
import { toast } from "react-toastify";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import ChatSearchItem from "./ChatSearchList";
import LoadingSpinner from "./LoadingSpinner";
import AddedUserItem from "./addedUserItem";

const GroupchatModal = ({ setModalStatus }) => {
  const [groupName, setGroupName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, chats, setChats } = ChatState();

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
  const handleSubmit = async() => {
    if(!groupName || !selectedUsers){
      toast.error("Please fill all the fields!", {
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
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      const {data} = await axios.post('/api/chat/group' ,{
        name : groupName,
        users : JSON.stringify(selectedUsers.map(curr => curr._id))
      } , config);
      
      setChats([data,...chats]);
      setModalStatus(false);
      toast.success("GroupChat created",{
        position: "top-right",
        autoClose: 400,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    } catch (error) {
      toast.error("Failed to create the chat", {
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

  const handleRemove = (userToRemove) => {
    const users = selectedUsers.filter((curr, index) => {
      return curr._id !== userToRemove._id;
    });
  
    setSelectedUsers(users);
  };

  const handleGroup = (userToAdd) => {
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
  
    const usersSelected = [...selectedUsers, userToAdd];
    
    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  return (
    <ModalSheet setModalStatus={setModalStatus}>
      <div
        className={`
         z-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] animate-slide-in-elliptic-top-fwd from-amber-300 via-orange-300 to-rose-300 shadow-2xl shadow-slate-500 opacity-80 p-10 rounded-2xl`}
      >
        <h1 className="text-4xl font-bold text-violet-600 drop-shadow-[2px_4px_2px_var(--tw-shadow-color)] shadow-white  mb-6">
          Create New Group
        </h1>
        <form>
          <input
            placeholder="Group Name"
            type="text"
            name="groupName"
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full p-2 mb-2 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-violet-300 transition-colors duration-300"
          />
        </form>

        <form>
          <input
            placeholder="Search users"
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            name="search users"
            className="w-full p-2 mb-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-violet-300 transition-colors duration-300"
          />
        </form>
        {selectedUsers && <div className="w-4/5 flex flex-wrap">
          {selectedUsers.map((curr) => (
         <AddedUserItem name={curr.name} handleRemove={()=>handleRemove(curr)}/>
        ))}
        </div>}
        
        {loading ? (
          <span>LOADING.....</span>
        ) : (
          <div
            className={`${
              searchResults.length === 0 ? "h-0" : "h-56"
            } mt-2 overflow-scroll scroll overflow-x-hidden`}
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

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className=" bg-gradient-to-r from-violet-300 to-indigo-300  border border-fuchsia-00 hover:border-violet-100 text-white font-semibold py-2 px-4 rounded-md mr-2"
          >
            Create
          </button>
          <button
            className="bg-gradient-to-r from-gray-100 to-slate-200  border border-fuchsia-00 hover:border-violet-100 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors duration-300"
            onClick={() => setModalStatus(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalSheet>
  );
};

export default GroupchatModal;
