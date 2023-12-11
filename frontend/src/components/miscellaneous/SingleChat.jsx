import React, { useEffect, useRef, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import ProfileModal from "./ProfileModal";
import UpdateGroupModal from "./UpdateGroupModal";
import SendIcon from "@mui/icons-material/Send";
import TagFacesOutlinedIcon from "@mui/icons-material/TagFacesOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingChatSpinner from "./LoadingChatSpinner";
import ScrollableChats from "./ScrollableChats";
import io from "socket.io-client";


const ENDPOINT = "http://localhost:8000";
let socket ,selectedChatCompare;


const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [showProfile, setShowProfile] = useState(false);
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  

  const fetchMessages = async () => {
    if (Object.keys(selectedChat).length === 0) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      
      setMessages(data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch message", {
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
    console.log('fetching');
    fetchMessages();
  }, [selectedChat]);

  useEffect(()=>{
    socket = io(ENDPOINT ,{ transports : ['websocket'] });
    socket.emit('setup',user.data);
    socket.on('connection',()=>{setSocketConnected(true);});
    // socket = io(ENDPOINT, {
    //   transports: ["websocket"],
    // });
    // socket.on("connect", () => {
    //   socket.emit("join", selectedChat._id);
    // });
    // socket.on("message", (message) => {
    //   setMessages([...messages, message]);
    // });
  }, []);

  const sendMessage = async (event) => {
    if ((event.key === "Enter" || event.type === "click") && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.data.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        setMessages([...messages, data]);
        socket.emit("join chat" , selectedChat._id);
      } catch (error) {
        toast.error("Failed to send message", {
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
    }
  };

  const typingHandler = (event) => {
    setNewMessage(event.target.value);
  };
  return (
    <>
      {Object.keys(selectedChat).length !== 0 ? (
        <div className="flex-1  px-2 py-[1px] sm:py-3 sm:px-6 justify-between flex flex-col ">
          <div className="flex sm:items-center justify-between pb-2 border-b-2 border-gray-200">
            <div className="relative h-12 flex items-center space-x-4 ">
              <button
                className="min-[769px]:hidden hover:bg-slate-300 hover:cursor-pointer p-2 rounded-lg"
                onClick={() => setSelectedChat({})}
              >
                <ArrowBackSharpIcon />
              </button>

              {!selectedChat.isGroupChat ? (
                <div className="h-10" onClick={() => setShowProfile(true)}>
                  <img
                    src={selectedChat.users[1].pic}
                    alt=""
                    className="w-10 shadow-md hover:cursor-pointer shadow-slate-700 sm:w-12 h-10 sm:h-12 rounded-full"
                  />
                </div>
              ) : (
                <div className="h-10" onClick={() => setShowGroupInfo(true)}>
                  <img
                    src={selectedChat.users[1].pic}
                    alt=""
                    className="w-10 shadow-md hover:cursor-pointer shadow-slate-700 sm:w-12 h-10 sm:h-12 rounded-full"
                  />
                </div>
              )}
              {showGroupInfo && (
                <UpdateGroupModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  setModalStatus={setShowGroupInfo}
                  fetchMessages={fetchMessages}
                />
              )}
              {showProfile && (
                <ProfileModal
                  setModalStatus={setShowProfile}
                  currUser={selectedChat.users[1]}
                />
              )}
              <div className="flex flex-col leading-tight">
                <div className="text-xl mt-1 flex items-center">
                  <span className="text-gray-700 mr-3">
                    {selectedChat.isGroupChat
                      ? selectedChat.chatName
                      : selectedChat.users[1].name}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="h-[85%] flex flex-col">
            {loading ? (
              <LoadingChatSpinner />
            ) : 
           
              <ScrollableChats messages={messages}/>
            }
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 mt-2 sm:mb-0">
              <div className="relative flex">
                <span className="absolute inset-y-0 flex items-center">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      ></path>
                    </svg>
                  </button>
                </span>
                <input
                  type="text"
                  value={newMessage}
                  placeholder="Write your message!"
                  className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                  onChange={(e) => typingHandler(e)}
                  onKeyDown={(e) => sendMessage(e)}
                />
                <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                  >
                    <AttachmentOutlinedIcon className="-rotate-45 text-gray-600" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                  >
                    <CameraAltOutlinedIcon className=" text-gray-600" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                  >
                    <TagFacesOutlinedIcon className=" text-gray-600" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => sendMessage(e)}
                    className="inline-flex gap-2 items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-orange-500 hover:bg-orange-400 focus:outline-none"
                  >
                    <span className="font-bold">Send</span>
                    <SendIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="m-auto text-4xl w-full max-md:hidden">
          Click on user to start chatting
        </div>
      )}
    </>
  );
};

export default SingleChat;
