import React from "react";
import { motion } from "framer-motion";
import ArrowRight from "./Icons/ArrowRight";
import Viteicon from "./Icons/Viteicon";
import Paypalicon from "./Icons/Paypalicon";
import NextJsIcon from "./Icons/NextJsIcon";

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <div className="flex items-center justify-center pt-[30rem] pb-[15rem]">
      <div className="flex flex-col w-[1240px] space-y-10">
        <motion.div
          className="flex flex-row w-full justify-between items-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-merriweather text-[40px] text-white">
            Projects I've Worked On
          </p>
          <p className="font-poppins text-sm">
            I build high-performance user interfaces using React, Next.js,
            TypeScript, and
            <br /> Shadcn. My apps are scalable, multilingual, and user-focused.
          </p>
        </motion.div>

        <div className="flex w-full flex-col space-y-20">
          <motion.div
            className="w-full p-5 items-center bg-[#151431] rounded-[12px] border-[0.5px] border-[#515151] flex flex-row justify-between"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="w-[636px] h-[382px] overflow-hidden">
              <motion.div className="w-full h-full">
                <img
                  src="https://res.cloudinary.com/debiu7z1b/image/upload/v1749214380/Frame_15_zsz9gs.webp"
                  className="w-full h-full object-cover"
                  alt="Nefesol"
                />
              </motion.div>
            </div>

            <div className="flex flex-col w-[484px] h-[423px] justify-between py-3">
              <motion.div
                className="flex flex-col space-y-1"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="font-merriweather text-white text-[32px]">
                  Nefesol
                </p>
                <p className="font-poppins text-[#CCCCCC] text-base">
                  A carbon offset platform enabling users to plant trees and
                  receive certificates for their climate contributions. Features
                  multi-location support, PayPal integration, and automated
                  email flows.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col space-y-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="font-merriweather text-white text-[20px] px-5 py-2 border border-[#525252] rounded-[100px] w-max">
                  Technologies used
                </p>
                <div className="flex flex-row items-center space-x-4">
                  <Viteicon />
                  <Paypalicon />
                </div>
              </motion.div>

              <motion.div
                className="flex flex-row items-center space-x-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div
                  className="flex flex-row items-center bg-white rounded-[100px] w-[236px] h-[54px] justify-center space-x-2 cursor-pointer"
                  variants={buttonVariants}
                >
                  <p className="font-poppins font-semibold text-[#1E1E1E] text-[16px]">
                    Visit Site
                  </p>
                  <ArrowRight />
                </motion.div>

                <motion.div
                  className="w-[221px] h-[54px] flex items-center justify-center flex-row space-x-2 border border-white rounded-[100px] text-[18px] font-semibold bg-transparent text-white transition-all ease-in-out cursor-pointer"
                  variants={buttonVariants}
                >
                  <p className="font-poppins font-semibold text-white text-[16px]">
                    View Code
                  </p>
                  <ArrowRight color="white" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="w-full p-5 items-center bg-[#151431] rounded-[12px] border-[0.5px] border-[#515151] flex flex-row justify-between"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex flex-col w-[484px] h-[423px] justify-between py-3">
              <motion.div
                className="flex flex-col space-y-1"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="font-merriweather text-white text-[32px]">
                  CO₂ Calculator
                </p>
                <p className="font-poppins text-[#CCCCCC] text-base">
                  Enterprise-grade emission tracking tool with multi-user roles
                  and multilingual dashboards. Integrates with Nefesol for
                  tree-based carbon offsetting.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col space-y-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="font-merriweather text-white text-[20px] px-5 py-2 border border-[#525252] rounded-[100px] w-max">
                  Technologies used
                </p>
                <div className="flex flex-row items-center space-x-4">
                  <NextJsIcon />
                  <Paypalicon />
                </div>
              </motion.div>

              <motion.div
                className="flex flex-row items-center space-x-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div
                  className="flex flex-row items-center bg-white rounded-[100px] w-[236px] h-[54px] justify-center space-x-2 cursor-pointer"
                  variants={buttonVariants}
                >
                  <p className="font-poppins font-semibold text-[#1E1E1E] text-[16px]">
                    Visit Site
                  </p>
                  <ArrowRight />
                </motion.div>

                <motion.div
                  className="w-[221px] h-[54px] flex items-center justify-center flex-row space-x-2 border border-white rounded-[100px] text-[18px] font-semibold bg-transparent text-white transition-all ease-in-out cursor-pointer"
                  variants={buttonVariants}
                >
                  <p className="font-poppins font-semibold text-white text-[16px]">
                    View Code
                  </p>
                  <ArrowRight color="white" />
                </motion.div>
              </motion.div>
            </div>

            <div className="w-[636px] h-[382px] overflow-hidden relative">
              <div className="absolute inset-0">
                <img
                  src="https://res.cloudinary.com/debiu7z1b/image/upload/v1749214380/448_1x_shots_so_1_j5bbxu.webp"
                  className="w-full h-full object-cover"
                  alt="CO2 Calculator"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="w-full p-5 items-center bg-[#151431] rounded-[12px] border-[0.5px] border-[#515151] flex flex-row justify-between"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="w-[636px] h-[382px] overflow-hidden">
              <motion.div className="w-full h-full">
                <img
                  src="https://res.cloudinary.com/debiu7z1b/image/upload/v1749214380/Frame_15_1_dmxv1c.webp"
                  className="w-full h-full object-cover"
                  alt="Akeso"
                />
              </motion.div>
            </div>

            <div className="flex flex-col w-[484px] h-[423px] justify-between py-3">
              <motion.div
                className="flex flex-col space-y-1"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="font-merriweather text-white text-[32px]">
                  Akeso Health
                </p>
                <p className="font-poppins text-[#CCCCCC] text-base">
                  A responsive web platform for connected patient care, designed
                  to streamline communication and reduce overhead for healthcare
                  providers.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col space-y-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="font-merriweather text-white text-[20px] px-5 py-2 border border-[#525252] rounded-[100px] w-max">
                  Technologies used
                </p>
                <div className="flex flex-row items-center space-x-4">
                  <Viteicon />
                </div>
              </motion.div>

              <motion.div
                className="flex flex-row items-center space-x-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div
                  className="flex flex-row items-center bg-white rounded-[100px] w-[236px] h-[54px] justify-center space-x-2 cursor-pointer"
                  variants={buttonVariants}
                >
                  <p className="font-poppins font-semibold text-[#1E1E1E] text-[16px]">
                    Visit Site
                  </p>
                  <ArrowRight />
                </motion.div>

                <motion.div
                  className="w-[221px] h-[54px] flex items-center justify-center flex-row space-x-2 border border-white rounded-[100px] text-[18px] font-semibold bg-transparent text-white transition-all ease-in-out cursor-pointer"
                  variants={buttonVariants}
                >
                  <p className="font-poppins font-semibold text-white text-[16px]">
                    View Code
                  </p>
                  <ArrowRight color="white" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="w-full p-5 items-center bg-[#151431] rounded-[12px] border-[0.5px] border-[#515151] flex flex-row justify-between"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex flex-col w-[484px] h-[423px] justify-between py-3">
              <motion.div
                className="flex flex-col space-y-1"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="font-merriweather text-white text-[32px]">
                  Stepverse
                </p>
                <p className="font-poppins text-[#CCCCCC] text-base">
                  Web3 fitness game using Telegram Mini Apps. Features include
                  leaderboards, rewards, and community tracking.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col space-y-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="font-merriweather text-white text-[20px] px-5 py-2 border border-[#525252] rounded-[100px] w-max">
                  Technologies used
                </p>
                <div className="flex flex-row items-center space-x-4">
                  <NextJsIcon />
                  <Viteicon />
                </div>
              </motion.div>

              <motion.div
                className="flex flex-row items-center space-x-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div
                  className="flex flex-row items-center bg-white rounded-[100px] w-[236px] h-[54px] justify-center space-x-2 cursor-pointer"
                  variants={buttonVariants}
                >
                  <p className="font-poppins font-semibold text-[#1E1E1E] text-[16px]">
                    Visit Site
                  </p>
                  <ArrowRight />
                </motion.div>

                <motion.div
                  className="w-[221px] h-[54px] flex items-center justify-center flex-row space-x-2 border border-white rounded-[100px] text-[18px] font-semibold bg-transparent text-white transition-all ease-in-out cursor-pointer"
                  variants={buttonVariants}
                >
                  <p className="font-poppins font-semibold text-white text-[16px]">
                    View Code
                  </p>
                  <ArrowRight color="white" />
                </motion.div>
              </motion.div>
            </div>

            <div className="w-[636px] h-[382px] overflow-hidden">
              <motion.div className="w-full h-full">
                <img
                  src="https://res.cloudinary.com/debiu7z1b/image/upload/v1749214379/Frame_15_3_howzqk.webp"
                  className="w-full h-full object-cover"
                  alt="Stepverse"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="w-full p-5 items-center bg-[#151431] rounded-[12px] border-[0.5px] border-[#515151] flex flex-row justify-between"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="w-[636px] h-[382px] overflow-hidden">
              <motion.div className="w-full h-full">
                <img
                  src="https://res.cloudinary.com/debiu7z1b/image/upload/v1749214380/Frame_16_h4swtl.webp"
                  className="w-full h-full object-cover"
                  alt="Webmacht"
                />
              </motion.div>
            </div>
            <div className="flex flex-col w-[484px] h-[423px] justify-between py-3">
              <motion.div
                className="flex flex-col space-y-1"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="font-merriweather text-white text-[32px]">
                  Webmacht
                </p>
                <p className="font-poppins text-[#CCCCCC] text-base">
                  Worked across sectors to deliver tailored platforms — from
                  HIPAA-compliant portals to virtual real estate tools.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col space-y-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="font-merriweather text-white text-[20px] px-5 py-2 border border-[#525252] rounded-[100px] w-max">
                  Technologies used
                </p>
                <div className="flex flex-row items-center space-x-4">
                  <NextJsIcon />
                </div>
              </motion.div>

              <motion.div
                className="flex flex-row items-center space-x-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div
                  className="flex flex-row items-center bg-white rounded-[100px] w-[236px] h-[54px] justify-center space-x-2 cursor-pointer"
                  variants={buttonVariants}
                >
                  <p className="font-poppins font-semibold text-[#1E1E1E] text-[16px]">
                    Visit Site
                  </p>
                  <ArrowRight />
                </motion.div>

                <motion.div
                  className="w-[221px] h-[54px] flex items-center justify-center flex-row space-x-2 border border-white rounded-[100px] text-[18px] font-semibold bg-transparent text-white transition-all ease-in-out cursor-pointer"
                  variants={buttonVariants}
                >
                  <p className="font-poppins font-semibold text-white text-[16px]">
                    View Code
                  </p>
                  <ArrowRight color="white" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
