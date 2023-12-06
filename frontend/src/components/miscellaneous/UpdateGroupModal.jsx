import React from "react";
import ModalSheet from "./modalsheet";

const UpdateGroupModal = ({ fetchAgain, setFetchAgain ,setModalStatus ,groupInfo}) => {
  return (
    <ModalSheet setModalStatus={setModalStatus}>
    <div className="max-w-md z-30 mx-auto p-6  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] animate-slide-in-elliptic-top-fwd from-amber-300 via-orange-300 to-rose-300 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">{groupInfo.chatName}</h2>



      <div className="mb-4">
        <label className="text-gray-600">Group Members:</label>
        <ul id="groupMembers" className="list-none">
          {groupInfo.users.map(curr =>(
            <li className="mb-2">{curr.name}</li>
          ))}
          
        </ul>
      </div>

      <button
        onclick="editGroup()"
        className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
      >
        Edit Group Name
      </button>
      <button
        onclick="addMembers()"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Members
      </button>
    </div>
    </ModalSheet>
  );
};

export default UpdateGroupModal;
