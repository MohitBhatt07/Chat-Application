import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="absolute right-5 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
      <div className="p-2 bg-gradient-to-tr animate-spin from-orange-500 to-red-500 via-yellow-500 rounded-full">
        <div className="bg-white w-2 h-2 rounded-full">
          <div className="w-6 h-6 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
