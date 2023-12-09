import React, { useEffect, useRef } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { isFirstMessage, isLastMessage, isSameSender, isSameUser } from "../config/ChatLogic";

const ScrollableChats = ({ messages }) => {
  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const { user } = ChatState();
  return (
    <div ref={messagesRef} className="flex-1 overflow-y-auto px-8">
      {messages.map((currMessage, index) => (
        <div
          key={index}
          className={`mb-1 ${
            currMessage.sender._id === user.data._id
              ? "text-right"
              : "text-left"
          }`}
        >
          <div
            className={`inline-block ${
              !(
                isLastMessage(messages, index, user.data._id) ||
                isSameSender(messages, currMessage, index, user.data._id)
              )
                ? "w-8"
                : "w-0"
            }`}
          ></div>
          {(isSameSender(messages, currMessage, index, user.data._id) ||
            isLastMessage(messages, index, user.data._id)) && (
            <img
              src={currMessage.sender.pic}
              alt="profile"
              className={`inline-block mr-2 w-6 h-6 rounded-full order-1`}
            />
          )}
          <span
            className={`${
          (isFirstMessage(messages,index,currMessage) ? (currMessage.sender._id === user.data._id ? "sb13" : "sb14") : ""
          )
            } box3 inline-block  text-black ${
              currMessage.sender._id === user.data._id
                ? "bg-orange-300"
                : "bg-gray-200"
            }`}
          >
            {currMessage.content}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ScrollableChats;
