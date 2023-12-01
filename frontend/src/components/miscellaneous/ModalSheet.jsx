import React from "react";

const ModalSheet = ({ setModalStatus, children }) => {
  return (
    <div
      id="myModal"
      className="fixed inset-0 z-10 overflow-hidden backdrop-blur-sm flex items-center justify-center transition-transform duration-300 "
      
    >
      {children}
      <div
        className="modal-container p-6 opacity-10 fixed inset-0  z-20 backdrop-blur-0 bg-white/10 w-full h-full"
        onClick={() => setModalStatus(false)}
      ></div>
          </div>
    
  );
};

export default ModalSheet;
