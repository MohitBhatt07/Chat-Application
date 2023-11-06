import React from "react";

const Tooltips = ({message,children }) => {
  return (
    <div className="group relative flex">
        {children}
        <span className="absolute top-10 scale-0 transition-all rounded bg-gray-500 p-2 text-xs text-white group-hover:delay-1000 group-hover:scale-100 delay-100">{message}</span>
    </div>
  );
};

export default Tooltips;
