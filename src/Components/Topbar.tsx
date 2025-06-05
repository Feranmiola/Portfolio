import React from "react";
import Icon from "./Icons/Icon";

const Topbar = () => {
  return (
    <div className="flex items-center justify-between flex-row w-full py-10 px-20">
      <Icon />

      <div className="flex flex-row h-[68px] w-[592px] border border-[#4E4E4E] items-center justify-between px-5 rounded-[100px]">
        <p>Home</p>
        <p>Projects</p>
        <p>About</p>
        <p>Expertise</p>
      </div>

      <div className="opacity-0">
        <Icon />
      </div>
    </div>
  );
};

export default Topbar;
