import React, { useState } from "react";
import Tooltips from "./Tooltip";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CircleNotificationsRoundedIcon from "@mui/icons-material/CircleNotificationsRounded";
import Logo from "../../assets/chatAppLogo.png";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";

const SideDrawer = ({ userData }) => {
  const userImage = userData.data.pic;
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = ()=>{
    localStorage.removeItem('userInfo');
    navigate('/');
  }
  return (
    <>
      <div className="flex justify-between bg-white p-4 ">
        <Tooltips message={"search the user"}>
          <button className="bg-white rounded-lg w-40 flex items-center justify-items-center gap-10 p-1 border-2 shadow-sm shadow-slate-500">
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
          <CircleNotificationsRoundedIcon fontSize='large' className="hover:cursor-pointer"/>
          <div className="">
            <button onClick={() => setShowModal(true)} className="text-orange-400 font-bold h-[75px] border-l-2 border-r rounded-md border-gray-100 px-2 hover:shadow-md  hover:shadow-gray-400">
              My Profile
            </button>
            {showModal ?<ProfileModal setModalStatus={setShowModal}/> :null}
            <button onClick={logoutHandler} className="text-orange-400 font-bold h-[75px] border-l-2 border-r rounded-md px-2 border-gray-100 hover:shadow-md hover:shadow-gray-400">
              SignOut
            </button>
          </div>
          <img
            src={userImage}
            className="h-8 w-9 rounded-[25px] shadow-md shadow-slate-500"
          ></img>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
