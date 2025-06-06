import React from "react";
import ArrowRight from "./Icons/ArrowRight";
import Viteicon from "./Icons/Viteicon";
import Paypalicon from "./Icons/Paypalicon";
import NextJsIcon from "./Icons/NextJsIcon";

const Projects = () => {
  return (
    <div className="flex items-center justify-center pt-[30rem]">
      <div className="flex flex-col w-[1240px] space-y-10">
        <div className="flex flex-row w-full justify-between items-start">
          <p className="font-merriweather text-[40px] text-white">
            Projects I've Worked On
          </p>
          <p className="font-poppins text-sm ">
            I build high-performance user interfaces using React, Next.js,
            TypeScript, and
            <br /> Shadcn. My apps are scalable, multilingual, and user-focused.
          </p>
        </div>

        <div className="fles w-full flex-col space-y-20">
          <div className="w-full p-5 items-center bg-[#151431] rounded-[12px] border-[0.5px] border-[#515151] flex flex-row justify-between">
            <div className="w-[636px] h-[382px]">
              <img
                src="https://res.cloudinary.com/debiu7z1b/image/upload/v1749214380/Frame_15_zsz9gs.webp"
                className="w-full h-full"
                alt="Nefesol"
              />
            </div>

            <div className="flex flex-col w-[484px] h-[423px] justify-between py-3">
              <div className="flex flex-col space-y-1">
                <p className="font-merriweather text-white text-[32px]">
                  Nefesol
                </p>
                <p className="font-poppins text-[#CCCCCC] text-base">
                  A carbon offset platform enabling users to plant trees and
                  receive certificates for their climate contributions. Features
                  multi-location support, PayPal integration, and automated
                  email flows.
                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <p className="font-merriweather text-white text-[20px] px-5 py-2 border border-[#525252] rounded-[100px] w-max">
                  Technologies used
                </p>
                <div className="flex flex-row items-center space-x-4">
                  <Viteicon />
                  <Paypalicon />
                </div>
              </div>

              <div className="flex flex-row items-center space-x-5  ">
                <div className="flex flex-row items-center bg-white rounded-[100px] w-[236px] h-[54px] justify-center space-x-2 cursor-pointer">
                  <p className="font-poppins font-semibold text-[#1E1E1E] text-[16px]">
                    View Projets
                  </p>
                  <ArrowRight />
                </div>

                <div className="w-[221px] h-[54px] flex items-center justify-center flex-row space-x-2  border border-white rounded-[100px] text-[18px] font-semibold bg-transparent text-white transition-all ease-in-out cursor-pointer">
                  <p className="font-poppins font-semibold text-white text-[16px]">
                    View Projets
                  </p>{" "}
                  <ArrowRight color="white" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full p-5 items-center bg-[#151431] rounded-[12px] border-[0.5px] border-[#515151] flex flex-row justify-between">
            <div className="flex flex-col w-[484px] h-[423px] justify-between py-3">
              <div className="flex flex-col space-y-1">
                <p className="font-merriweather text-white text-[32px]">
                  CO₂ Calculator
                </p>
                <p className="font-poppins text-[#CCCCCC] text-base">
                  Enterprise-grade emission tracking tool with multi-user roles
                  and multilingual dashboards. Integrates with Nefesol for
                  tree-based carbon offsetting.
                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <p className="font-merriweather text-white text-[20px] px-5 py-2 border border-[#525252] rounded-[100px] w-max">
                  Technologies used
                </p>
                <div className="flex flex-row items-center space-x-4">
                  <NextJsIcon />
                  <Paypalicon />
                </div>
              </div>

              <div className="flex flex-row items-center space-x-5  ">
                <div className="flex flex-row items-center bg-white rounded-[100px] w-[236px] h-[54px] justify-center space-x-2 cursor-pointer">
                  <p className="font-poppins font-semibold text-[#1E1E1E] text-[16px]">
                    View Projets
                  </p>
                  <ArrowRight />
                </div>

                <div className="w-[221px] h-[54px] flex items-center justify-center flex-row space-x-2  border border-white rounded-[100px] text-[18px] font-semibold bg-transparent text-white transition-all ease-in-out cursor-pointer">
                  <p className="font-poppins font-semibold text-white text-[16px]">
                    View Projets
                  </p>{" "}
                  <ArrowRight color="white" />
                </div>
              </div>
            </div>

            <div className="w-[636px] h-[382px]">
              <img
                src="https://res.cloudinary.com/debiu7z1b/image/upload/v1749214380/448_1x_shots_so_1_j5bbxu.webp"
                className="w-full h-full"
                alt="CO2 Calculator"
              />
            </div>
          </div>

          <div className="w-full p-5 items-center bg-[#151431] rounded-[12px] border-[0.5px] border-[#515151] flex flex-row justify-between">
            <div className="w-[636px] h-[382px]">
              <img
                src="https://res.cloudinary.com/debiu7z1b/image/upload/v1749214380/Frame_15_1_dmxv1c.webp"
                className="w-full h-full"
                alt="Akeso"
              />
            </div>

            <div className="flex flex-col w-[484px] h-[423px] justify-between py-3">
              <div className="flex flex-col space-y-1">
                <p className="font-merriweather text-white text-[32px]">
                  Akeso Health
                </p>
                <p className="font-poppins text-[#CCCCCC] text-base">
                  A responsive web platform for connected patient care, designed
                  to streamline communication and reduce overhead for healthcare
                  providers.
                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <p className="font-merriweather text-white text-[20px] px-5 py-2 border border-[#525252] rounded-[100px] w-max">
                  Technologies used
                </p>
                <div className="flex flex-row items-center space-x-4">
                  <Viteicon />
                </div>
              </div>

              <div className="flex flex-row items-center space-x-5  ">
                <div className="flex flex-row items-center bg-white rounded-[100px] w-[236px] h-[54px] justify-center space-x-2 cursor-pointer">
                  <p className="font-poppins font-semibold text-[#1E1E1E] text-[16px]">
                    View Projets
                  </p>
                  <ArrowRight />
                </div>

                <div className="w-[221px] h-[54px] flex items-center justify-center flex-row space-x-2  border border-white rounded-[100px] text-[18px] font-semibold bg-transparent text-white transition-all ease-in-out cursor-pointer">
                  <p className="font-poppins font-semibold text-white text-[16px]">
                    View Projets
                  </p>{" "}
                  <ArrowRight color="white" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full p-5 items-center bg-[#151431] rounded-[12px] border-[0.5px] border-[#515151] flex flex-row justify-between">
            <div className="flex flex-col w-[484px] h-[423px] justify-between py-3">
              <div className="flex flex-col space-y-1">
                <p className="font-merriweather text-white text-[32px]">
                  Stepverse
                </p>
                <p className="font-poppins text-[#CCCCCC] text-base">
                  Web3 fitness game using Telegram Mini Apps. Features include
                  leaderboards, rewards, and community tracking.
                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <p className="font-merriweather text-white text-[20px] px-5 py-2 border border-[#525252] rounded-[100px] w-max">
                  Technologies used
                </p>
                <div className="flex flex-row items-center space-x-4">
                  <NextJsIcon />
                  <Viteicon />
                </div>
              </div>

              <div className="flex flex-row items-center space-x-5  ">
                <div className="flex flex-row items-center bg-white rounded-[100px] w-[236px] h-[54px] justify-center space-x-2 cursor-pointer">
                  <p className="font-poppins font-semibold text-[#1E1E1E] text-[16px]">
                    View Projets
                  </p>
                  <ArrowRight />
                </div>

                <div className="w-[221px] h-[54px] flex items-center justify-center flex-row space-x-2  border border-white rounded-[100px] text-[18px] font-semibold bg-transparent text-white transition-all ease-in-out cursor-pointer">
                  <p className="font-poppins font-semibold text-white text-[16px]">
                    View Projets
                  </p>{" "}
                  <ArrowRight color="white" />
                </div>
              </div>
            </div>

            <div className="w-[636px] h-[382px]">
              <img
                src="https://res.cloudinary.com/debiu7z1b/image/upload/v1749214379/Frame_15_3_howzqk.webp"
                className="w-full h-full"
                alt="Stepverse"
              />
            </div>
          </div>

          <div className="w-full p-5 items-center bg-[#151431] rounded-[12px] border-[0.5px] border-[#515151] flex flex-row justify-between">
            <div className="w-[636px] h-[382px]">
              <img
                src="https://res.cloudinary.com/debiu7z1b/image/upload/v1749214380/Frame_16_h4swtl.webp"
                className="w-full h-full"
                alt="Webmacht"
              />
            </div>
            <div className="flex flex-col w-[484px] h-[423px] justify-between py-3">
              <div className="flex flex-col space-y-1">
                <p className="font-merriweather text-white text-[32px]">
                  Webmacht
                </p>
                <p className="font-poppins text-[#CCCCCC] text-base">
                  Worked across sectors to deliver tailored platforms — from
                  HIPAA-compliant portals to virtual real estate tools.
                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <p className="font-merriweather text-white text-[20px] px-5 py-2 border border-[#525252] rounded-[100px] w-max">
                  Technologies used
                </p>
                <div className="flex flex-row items-center space-x-4">
                  <NextJsIcon />
                </div>
              </div>

              <div className="flex flex-row items-center space-x-5  ">
                <div className="flex flex-row items-center bg-white rounded-[100px] w-[236px] h-[54px] justify-center space-x-2 cursor-pointer">
                  <p className="font-poppins font-semibold text-[#1E1E1E] text-[16px]">
                    View Projets
                  </p>
                  <ArrowRight />
                </div>

                <div className="w-[221px] h-[54px] flex items-center justify-center flex-row space-x-2  border border-white rounded-[100px] text-[18px] font-semibold bg-transparent text-white transition-all ease-in-out cursor-pointer">
                  <p className="font-poppins font-semibold text-white text-[16px]">
                    View Projets
                  </p>{" "}
                  <ArrowRight color="white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
