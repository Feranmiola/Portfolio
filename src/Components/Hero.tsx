import React from "react";
import BeamLight from "./Icons/BeamLight";

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

      <div className="absolute left-0 top-[23rem]">
        <BeamLight />
      </div>
    </div>
  );
};

export default Hero;
