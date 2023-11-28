import React ,{useState} from "react";
import ModalSheet from "./modalsheet";
import { toast } from "react-toastify";
import { ChatState } from "../../Context/ChatProvider";

const GroupchatModal = ({setShowModal}) => {

  const [groupName , setGroupName] =useState();
  const [selectedUsers , setSelectedUsers] = useState([]);
  const [search , setSearch] = useState("");
  const [searchResults, setSearchResults]  = useState();
  const [loading,setLoading] = useState(false);
  const {user, chats,setChats} = ChatState();

  
  return (
    <ModalSheet title={"NEW GROUP"} setModalStatus={setShowModal}>
      <button
        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(false)}
      >
        Close
      </button>
    </ModalSheet>
  );
};

export default GroupchatModal;
