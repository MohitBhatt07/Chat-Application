import React from "react";

const ModalSheet = ({ setModalStatus, title, children }) => {
  return (
    <div
      id="myModal"
      className="fixed inset-0 z-10 overflow-hidden backdrop-blur-lg flex items-center justify-center transition-transform duration-300 "
      
    >
      <div
        className="z-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500 via-orange-300 to-rose-500 shadow-2xl shadow-slate-500 opacity-80 p-10 rounded-2xl"
       
      >
        <h2 className="text-2xl font-semibold mb-6">Create New Project</h2>
        <label
          htmlFor="projectName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Project Name
        </label>
        <input
          type="text"
          id="projectName"
          className="w-full p-2 mb-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-violet-300 transition-colors duration-300"
        />

        {/* {children}   */}
        <div className="lg:flex">
          <div className="lg:w-1/2 lg:pr-4">
            <label
              htmlFor="projectDescription"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <input
              id="projectDescription"
              className="w-full p-2 mb-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-violet-300 transition-colors duration-300"
            />
          </div>
          <div className="lg:w-1/2">
            <label
              htmlFor="inviteFriend"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Invite Friend
            </label>
            <input
              type="text"
              id="inviteFriend"
              className="w-full p-2 mb-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-violet-300 transition-colors duration-300"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-gradient-to-r from-violet-300 to-indigo-300  border border-fuchsia-00 hover:border-violet-100 text-white font-semibold py-2 px-4 rounded-md mr-2">
            Create
          </button>
          <button
            className="bg-gradient-to-r from-gray-100 to-slate-200  border border-fuchsia-00 hover:border-violet-100 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors duration-300"
            onClick={() => setModalStatus(false)}
          >
            Cancel
          </button>
        </div>
      </div>
      <div
        className="modal-container p-6 opacity-10 fixed inset-0  z-20 backdrop-blur-0 bg-white/10 w-full h-full"
        onClick={() => setModalStatus(false)}
      ></div>
          </div>
    // <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-10 outline-none focus:outline-none">
    //   <div className="relative w-auto my-6 mx-auto max-w-sm z-40">
    //   <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
    //   <h3 className="text-3xl font-semibold">{title}</h3>
    //   {children}
    //   </div>
    //   </div>
    //   <div
    //     onClick={() => setModalStatus(false)}
    //     className="opacity-25 fixed inset-0 z-20 bg-black"
    //   ></div>
    // </div>
  );
};

export default ModalSheet;
