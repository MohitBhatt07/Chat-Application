import {createContext,useEffect, useContext ,useState} from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({children}) =>{
  const [user , setUser] = useState();
  const navigate = useNavigate();

  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo.data._id);

    if(!userInfo){
      navigate('/');
    }
  },[navigate])
  return <ChatContext.Provider value={[user]}>
    {children}
  </ChatContext.Provider>
}

export const ChatState = ()=>{
  return useContext(ChatContext);
}


export default ChatProvider;