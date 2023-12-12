import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { getSender } from "./config/ChatLogic";

import GroupchatModal from "./miscellaneous/GroupchatModal";

const MyChats = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState({});
  const { user, chats, setChats, selectedChat, setSelectedChat } = ChatState();
  const [showModal ,setShowModal]  = useState(false);
  



  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.data.token}`,
        },
      };
      const { data } = await axios.get(`/api/chat`, config);

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
      });
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    setLoggedUser(userData.data);

    fetchChats();
  }, [fetchAgain]);
 
  // console.log(Object.keys(selectedChat).length);
 
  return (
    <div className={`h-full min-[769px]:w-1/3 shadow-2xl flex-2 rounded-2xl max-md:${Object.keys(selectedChat).length === 0 ? "w-[100%]" : "hidden"}`}>
      <div className="h-[100%] w-full rounded-2xl pt-5 pr-1 bg-white ">
        <div className="flex mx-5 justify-between">
          <span className="text-3xl">Chats</span>
          <button onClick={()=>setShowModal(true)} className="w-24 rounded-lg p-2 bg-orange-300 hover:bg-orange-200">
            Add group
          </button>
          {showModal && <GroupchatModal setModalStatus ={setShowModal} />}
        </div>

        <div className="mt-5 h-[88%] w-full overflow-scroll">
          {chats.map((chat, index) => (
            <div
              onClick={() => setSelectedChat(chat)}
              key={index}
              className={`relative group h-16 w-[98%] rounded-md  hover:cursor-pointer ${
                (!selectedChat ? selectedChat : selectedChat._id === chat._id)
                  ? "bg-violet-500"
                  : "hover:bg-gray-100 hover:shadow-sm"
              }  hover:shadow-green-300`}
            >
              <div className="flex w-full items-center h-full justify-evenly space-x-3">
                <div className="w-12 bg-gray-300 h-10 rounded-full  ">
                  <img
                    src={getSender(loggedUser, chat.users).pic}
                    alt=""
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <div
                  className={`flex  h-full flex-col w-[75%] border-b ${
                    index === 0 ? "border-t" : ""
                  } ${selectedChat._id === chat._id ? "border-none" : ""}  p-2`}
                >
                  <span className="w-fit h- 6 first-letter:capitalize rounded-md font-normal ">
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users).name
                      : chat.chatName}
                  </span>
                  {/* <span className="text-sm">{chat.users[1].email}</span> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyChats;
