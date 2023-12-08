import React from "react";

const LoadingChatSpinner = () => {
  return (
    <div className="flex space-x-2 justify-center items-center h-[84%] bg-white">
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 bg-orange-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-orange-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-orange-300 rounded-full animate-bounce"></div>
    </div>
  );
};

export default LoadingChatSpinner;
