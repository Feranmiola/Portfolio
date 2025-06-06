import React from "react";
import LinkedinIcon from "./Icons/LinkedinIcon";
import Xicon from "./Icons/Xicon";
import WhatsappIcon from "./Icons/WhatsappIcon";
import TelegramIcon from "./Icons/TelegramIcon";
import GithubIcon from "./Icons/GithubIcon";
import Mailicon from "./Icons/Mailicon";

const Footer = () => {
  return (
    <div className="py-[10rem] flex items-center justify-center">
      <div className="w-[1233px] flex space-y-20 flex-col">
        <div className="flex flex-col space-y-3">
          <p className="text-[48px] text-white font-bold font-merriweather">
            Let’s Work Together 👇
          </p>
          <p className="text-[#B1B0B0] font-poppins text-xl">
            Got a project in mind or need help building your next Web2 or Web3
            app? <br />
            Let’s connect and build something great.
          </p>
        </div>

        <div className="flex flex-col space-y-3 w-full items-start">
          <div className="flex flex-row items-center space-x-3">
            <Mailicon />
            <p className="text-[#938F8F] text-[64px] font-bold font-merriweather tracking-tight">
              Email: osunjuyigbeiyin@gmail.com
            </p>
          </div>
          <div className="flex flex-row items-center space-x-10">
            <div className="cursor-pointer">
              <LinkedinIcon />
            </div>
            <div className="cursor-pointer">
              <Xicon />
            </div>
            <div className="cursor-pointer">
              <WhatsappIcon />
            </div>
            <div className="cursor-pointer">
              <TelegramIcon />
            </div>
            <div className="cursor-pointer">
              <GithubIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
