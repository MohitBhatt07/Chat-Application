import React, { useState } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const showHandler = () => {
    setShow((prev) => !prev);
  };
  
  const submitHandler = async(event) => {
    event.preventDefault();
    setLoading(true);
    
    if (!email || !password) {
      toast.error("Please fill all the fields");
      setLoading(false);
      return;
    }
    
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      
      const data = await axios.post(
        "/api/user/login",
        {email,password},
        config
      );
      
      toast.success("LOGIN SUCCESSFULL");
      localStorage.setItem('userInfo',JSON.stringify(data));
      setLoading(false);
      navigate("/chatpage");
    } catch (err) {
      toast.error(`Invalid emailid or Password`);
      setLoading(false);
    }
  };
  return (
    <form className="w-full max-w-md mx-auto" onSubmit={submitHandler}>
      <div className="relative flex items-center mt-8">
        <span className="absolute">
          <EmailOutlinedIcon className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
        </span>

        <input
          type="email"
          className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="relative flex items-center mt-4">
        <span className="absolute">
          <HttpsOutlinedIcon className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
        </span>

        <input
          type={show ? "text" : "password"}
          className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 "
          onClick={showHandler}
        >
          {show ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        >
          Sign in
        </button>
      </div>
      
      
    </form>
  );
};

export default Login;
