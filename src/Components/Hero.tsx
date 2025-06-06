import React from "react";
import BeamLight from "./Icons/BeamLight";
import ArrowRight from "./Icons/ArrowRight";

const Hero = () => {
  return (
    <div className="flex items-center justify-center relative min-h-screen w-full">
      <div className="flex w-[538px] h-[538px] border-[6px] border-[#E4E4E4] rounded-[625.58px]"></div>

      <p className="absolute font-poppins text-base text-[#CCCCCC] right-10 top-[40rem]">
        From interactive dashboards and multilingual portals <br /> to
        decentralized platforms on Ethereum and BSC, I <br />
        specialize in building full-stack solutions that combine <br />
        elegant interfaces with secure, efficient blockchain <br />
        logic.
      </p>

      <div className="absolute left-0 top-[16rem]">
        <BeamLight />
      </div>

      <div className="flex flex-col absolute space-y-3 top-[55rem] left-[10rem]">
        <p className="text-2xl font-merriweather">
          Frontend Development / Smart Contract Engineering / End-to-End
          Integration
        </p>
        <p className="text-[#ADAAAA] -skew-x-[5deg] text-[128px] font-merriweather leading-none">
          I’m <span className="font-bold">Feranmi Ola</span>
        </p>
      </div>

      <div className="flex flex-row items-center space-x-5 absolute top-[70rem] ">
        <div className="flex flex-row items-center bg-white rounded-[100px] w-[236px] h-[64px] justify-center space-x-2 cursor-pointer">
          <p className="font-poppins font-semibold text-[#1E1E1E] text-[18px]">
            View Projets
          </p>
          <ArrowRight />
        </div>

        <div className="w-[221px] h-[64px] flex items-center justify-center flex-row space-x-2  border border-white rounded-[100px] text-[18px] font-semibold bg-transparent text-white transition-all ease-in-out cursor-pointer">
          Get in Touch 💻
        </div>
      </div>
    </div>
  );
};

export default Hero;
