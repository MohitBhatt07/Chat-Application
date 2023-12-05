import React from "react";
import { ChatState } from "../Context/ChatProvider";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import SingleChat from "./miscellaneous/SingleChat";
const ChatBox = ({fetchAgain,setFetchAgain}) => {
  const { user, selectedChat ,setSelectedChat} = ChatState();

  return (
    <div
      className={`w-[80%] flex flex-4 shadow-2xl  max-md:${
        Object.keys(selectedChat).length === 0 ? "hidden" : ""
      } max-md:w-[100%] bg-white rounded-lg`}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default ChatBox;
