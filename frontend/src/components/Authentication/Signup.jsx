import React, { useState } from "react";
import Person from "@mui/icons-material/Person";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pic, setPic] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);
  const cloudinaryApi = import.meta.env.VITE_CLOUDINARY_API;
  const navigate = useNavigate();
  const showHandler = () => {
    setShow((prev) => !prev);
  };
  const showConfirmHandler = () => {
    setShowConfirm((prev) => !prev);
  };
  const postDetails = (pic) => {
    setLoading(true);
    if (pic === undefined) {
      toast.error("invalid picture");
      return;
    }
    console.log(pic);
    if (
      pic.type === "image/jpeg" ||
      pic.type === "image/png" ||
      pic.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "Chat-app");
      data.append("cloud_name", "mohitbhatt");

      const fetchHandler = async () => {
        const fetchData = await fetch(cloudinaryApi, {
          method: "post",
          body: data,
        });

        const jsonData = await fetchData.json();
        console.log(jsonData);
        setPic(jsonData.url.toString());
        setLoading(false);
      };

      try {
        fetchHandler();
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      toast.error("please select image");
      setLoading(false);
    }
  };
  const submitHandler = async(event) => {
    event.preventDefault();
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all the fields");
      setLoading(false);
      return;
    }
    if (password != confirmPassword) {
      toast.error("Passwords doesn't match");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      toast.success("REGISTRATION IS SUCCESSFULL");
      localStorage.setItem('userInfo',JSON.stringify(data));
      setLoading(false);
      navigate("/chatpage");
    } catch (err) {
      toast.error(err);
      setLoading(false);
    }
  };
  return (
    <form className="w-full h-full max-w-md mx-auto" onSubmit={submitHandler}>
      <div className="relative flex items-center mt-4">
        <span className="absolute">
          <Person className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
        </span>

        <input
          type="text"
          className="block w-full py-2 text-gray-700 bg-white border  border-blue-300 rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <label
        htmlFor="dropzone-file"
        className="flex items-center px-3 py-2 mx-auto mt-3 text-center border-blue-300 bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
      >
        <DriveFolderUploadIcon className="w-6 h-6 text-gray-300 dark:text-gray-500" />

        <h2 className="mx-3 text-gray-400">Profile Photo</h2>

        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </label>

      <div className="relative flex items-center mt-2">
        <span className="absolute">
          <EmailOutlinedIcon className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
        </span>

        <input
          type="email"
          className="block w-full py-2 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="relative flex items-center mt-2">
        <span className="absolute">
          <HttpsOutlinedIcon className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
        </span>

        <input
          type={show ? "text" : "password"}
          className="block w-full px-10 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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

      <div className="relative flex items-center mt-2">
        <span className="absolute">
          <HttpsOutlinedIcon className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" />
        </span>

        <input
          type={showConfirm ? "text" : "password"}
          className="block w-full px-10 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 "
          onClick={showConfirmHandler}
        >
          {showConfirm ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </div>
      </div>
      <button
        type="submit"
        className="w-full px-6 py-3 text-sm font-medium mt-6 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
      >
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
