import React from "react";
import ModalSheet from "./modalsheet";
import MailIcon from '@mui/icons-material/Mail';
import { ChatState } from "../../Context/ChatProvider";

const ProfileModal = ({ setModalStatus ,currUser}) => {

  const {user} =ChatState();
  return (
    <ModalSheet setModalStatus={setModalStatus}>
      <div className=" max-w-4xl  flex items-center h-[85%]  flex-wrap mx-auto my-32 lg:my-0">
        <div
          id="profile"
          className=" lg:h-2/3 w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] animate-slide-in-elliptic-top-fwd from-amber-300 via-orange-300 to-rose-300  z-30 lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div className="p-4 md:p-12 text-center  lg:text-left">
            <div
              className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
              
            >
              <img className="max-[1023px]:rounded-full h-48 w-48" src={currUser.pic} />
            </div>

            <h1 className="text-3xl font-bold pt-8 lg:pt-0">{currUser.name}</h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <p className="pt-4 text-base font-bold flex items-center justify-center gap-2 lg:justify-start">
              <MailIcon  className="h-4  text-green-700 pr-1"/>
              <span>{currUser.email }</span>
            </p>
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
              <svg
                className="h-4 fill-current text-green-700 pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
              </svg>{" "}
              Your Location - 25.0000° N, 71.0000° W
            </p>
            <p className="pt-8 text-sm">
              Totally optional short description about yourself, what you do and
              so on.
            </p>
            

            {(user.data !== currUser) && 
            <div className="pt-12 pb-8">
              <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
                Message
              </button>
            </div>
           } 

            
          </div>
        </div>

        <div className="border  border-gray-400 shadow-lg rounded-xl w-full h-[80%] object-cover lg:w-2/5 z-30 animate-slide">
          <img
            src={currUser.pic}
            className="rounded-none h-full object-cover lg:rounded-lg shadow-2xl hidden lg:block"
          />
        </div>

      </div>
    </ModalSheet>
  );
};

export default ProfileModal;
