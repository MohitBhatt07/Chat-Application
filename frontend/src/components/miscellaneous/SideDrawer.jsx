import React, { useState } from "react";
import Tooltips from "./Tooltip";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CircleNotificationsRoundedIcon from "@mui/icons-material/CircleNotificationsRounded";
import Logo from "../../assets/chatAppLogo.png";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import Drawer from "./Drawer";
import { toast } from "react-toastify";
import axios from "axios";
import ChatLoadingMultiple from "./ChatLoading";
import ChatSearchItem from "./ChatSearchList";
import { ChatState } from "../../Context/ChatProvider";

const SideDrawer = ({ userData }) => {
  const userImage = userData.data.pic;
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {setSelectedChat, chats,setChats} =ChatState();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const searchUsers = async () => {
    if (!search) {
      toast.warn("Enter something in search", {
        position: "top-right",
        autoClose: 400,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return ;
    }

    try {
      setLoading(true);
      
      const config = {
        headers: {
          Authorization: `Bearer ${userData.data.token}`,
        },
      };
     
      const  {data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false)
      
      setSearchResult(data);
      
    } catch (error) {
      setLoading(false);
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
  const accessChat = async(userId)=>{
      try {
        setLoadingChat(true);
        
        const config = {
          headers: {
            "Content-type" : "application/json",
            Authorization : `Bearer ${userData.data.token}`
          }
        };
        
        const {data} = await axios.post("/api/chat" , {userId} ,config);
        
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
    <>
      <div className="flex justify-between bg-white p-4 ">
        <Tooltips message={"search the user"}>
          <button
            className="bg-white rounded-lg w-40 flex items-center justify-items-center gap-10 p-1 border-2 shadow-sm shadow-slate-500"
            onClick={() => setIsDrawerOpen(true)}
          >
            <SearchRoundedIcon fontSize="small" className="" />
            <span className="text-gray-500 ">Search</span>
          </button>
        </Tooltips>

        <div className="flex justify-center items-center">
          <img src={Logo} alt="" className="h-10 w-20" />
          <span className="text-lg font-bold text-orange-400  justify-self-center">
            LET'S CHAT
          </span>
        </div>

        <div className="flex justify-center items-center h-9 gap-6">
          <CircleNotificationsRoundedIcon
            fontSize="large"
            className="hover:cursor-pointer"
          />
          <div className="">
            <button
              onClick={() => setShowModal(true)}
              className="text-orange-400 font-bold h-[75px] border-l-2 border-r rounded-md border-gray-100 px-2 hover:shadow-md  hover:shadow-gray-400"
            >
              My Profile
            </button>
            {showModal ? <ProfileModal setModalStatus={setShowModal} /> : null}
            <button
              onClick={logoutHandler}
              className="text-orange-400 font-bold h-[75px] border-l-2 border-r rounded-md px-2 border-gray-100 hover:shadow-md hover:shadow-gray-400"
            >
              SignOut
            </button>
          </div>
          <img
            src={userImage}
            className="h-8 w-9 rounded-[25px] shadow-md shadow-slate-500"
          ></img>
        </div>
      </div>
      <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
        <div className="flex gap-4 m-4">
          <input
            className="block px-10 py-3 text-gray-700 bg-white border border-gray-400 rounded-lg focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="search user"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="button"
            onClick={searchUsers}
            className="w-20 rounded-lg bg-orange-300 hover:bg-orange-200"
          >
            Search
          </button>
        </div>
        {loading ? <ChatLoadingMultiple /> :
          <div className="m-0 h-full overflow-scroll scroll overflow-x-hidden">
          {searchResult.map((curr,index)=>(
            <ChatSearchItem key={index} isLoading={loadingChat} user ={curr} handleFunction = {()=>accessChat(curr._id)}/>
          ))}
          </div>
        }
        
      </Drawer>
    </>
  );
};

export default SideDrawer;
