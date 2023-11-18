import React from "react";

const ChatLoading = () => {
  return (
    <div className="w-[85%] h-16 border-2 rounded-md mx-3 mt-20">
      <div className="flex animate-pulse items-center h-full justify-evenly space-x-5">
        <div className="w-12 bg-gray-300 h-12 rounded-full "></div>

        <div className="w-36 bg-gray-300 h-6 rounded-md "></div>
      </div>
    </div>
  );
};
const ChatLoadingMultiple =()=> Array.from({ length: 5 }, (_, index) => (
  <ChatLoading key={index} />
));

export default ChatLoadingMultiple;
