import React from "react";

const ModalSheet = ({setModalStatus,title,children}) => {
  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-10 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-sm z-40">
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
      <h3 className="text-3xl font-semibold">{title}</h3>
      {children}
      </div>
      </div>
      <div
        onClick={() => setModalStatus(false)}
        className="opacity-25 fixed inset-0 z-20 bg-black"
      ></div>
    </div>
  );
};

export default ModalSheet;  
