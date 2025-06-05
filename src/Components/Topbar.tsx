import React from "react";
import Icon from "./Icons/Icon";

const Topbar = () => {
  return (
    <div className="flex items-center justify-between flex-row w-full py-10 px-20">
      <Icon />

      <div className="flex flex-row h-[68px] w-[592px] border border-[#4E4E4E] items-center justify-between px-5 rounded-[100px]">
        <p className="text-white font-poppins font-medium text-base cursor-pointer hover:text-[#B3B1F3] transition-all ease-in-out">
          Home
        </p>
        <p className="text-white font-poppins font-medium text-base cursor-pointer hover:text-[#B3B1F3] transition-all ease-in-out">
          Projects
        </p>
        <p className="text-white font-poppins font-medium text-base cursor-pointer hover:text-[#B3B1F3] transition-all ease-in-out">
          About
        </p>
        <p className="text-white font-poppins font-medium text-base cursor-pointer hover:text-[#B3B1F3] transition-all ease-in-out">
          Expertise
        </p>
        <div className="w-[134px] h-[44px] flex items-center justify-center flex-row space-x-2 text-[#1E1E1E] bg-white border border-transparent rounded-[60px] text-base font-semibold hover:bg-transparent hover:border-[#B3B1F3] hover:text-white transition-all ease-in-out cursor-pointer">
          Contact 💻
        </div>
      </div>

      <div className="opacity-0">
        <Icon />
      </div>
    </div>
  );
};

export default Topbar;
