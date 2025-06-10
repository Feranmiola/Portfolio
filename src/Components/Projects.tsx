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
    <div className="flex items-center justify-center lg:pt-[30rem] pb-[15rem] md:pt-[20rem] md:pb-[10rem] sm:pt-[15rem] sm:pb-[8rem] px-4 sm:px-6 md:px-8">
      <div className="flex flex-col w-full max-w-[1240px] space-y-10 md:space-y-8 sm:space-y-6">
        <motion.div
          className="flex flex-col lg:flex-row w-full lg:justify-between lg:items-start space-y-4 lg:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-merriweather text-[40px] md:text-[32px] sm:text-[24px] text-white leading-tight">
            Projects I've Worked On
          </p>
          <p className="font-poppins text-sm md:text-xs text-[#CCCCCC] lg:max-w-none max-w-full">
            I build high-performance user interfaces using React, Next.js,
            TypeScript, and Shadcn. My apps are scalable, multilingual, and
            user-focused.
          </p>
        </motion.div>

        <div className="flex w-full flex-col space-y-20 md:space-y-16 sm:space-y-12">
          {/* Nefesol Project */}
          <motion.div
            className="w-full p-5 md:p-4 sm:p-3 items-center bg-[#151431] rounded-[12px] border-[0.5px] border-[#515151] flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="w-full lg:w-[636px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[382px] order-1 lg:order-none">
              <img
                src="https://res.cloudinary.com/debiu7z1b/image/upload/v1749214380/Frame_15_zsz9gs.webp"
                className="w-full h-full object-cover rounded-lg"
                alt="Nefesol"
              />
            </div>

            <div className="flex flex-col w-full lg:w-[484px] lg:h-[423px] justify-between py-3 space-y-6 lg:space-y-0 order-2 lg:order-none">
              <motion.div
                className="flex flex-col space-y-2 lg:space-y-1"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="font-merriweather text-white text-[32px] md:text-[28px] sm:text-[24px]">
                  Nefesol
                </p>
                <p className="font-poppins text-[#CCCCCC] text-base md:text-sm">
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
                <p className="font-merriweather text-white text-[20px] md:text-[18px] sm:text-[16px] px-5 py-2 border border-[#525252] rounded-[100px] w-max">
                  Technologies used
                </p>
                <div className="flex flex-row items-center space-x-4">
                  <Viteicon />
                  <Paypalicon />
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.a
                  href="https://nefesol.com"
                  target="_blank"
                  className="flex flex-row items-center bg-white rounded-[100px] w-full sm:w-[236px] h-[54px] justify-center space-x-2 cursor-pointer"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <p className="font-poppins font-semibold text-[#1E1E1E] text-[16px]">
                    Visit Site
                  </p>
                  <ArrowRight />
                </motion.a>

                <motion.a
                  href="https://github.com/feranmiola/nefesol"
                  target="_blank"
                  className="w-full sm:w-[221px] h-[54px]  items-center justify-center hidden flex-row space-x-2 border border-white rounded-[100px] text-[18px] font-semibold bg-transparent text-white transition-all ease-in-out cursor-pointer"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <p className="font-poppins font-semibold text-white text-[16px]">
                    View Code
                  </p>
                  <ArrowRight color="white" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

          {/* CO₂ Calculator Project */}
          <motion.div
            className="w-full p-5 md:p-4 sm:p-3 items-center bg-[#151431] rounded-[12px] border-[0.5px] border-[#515151] flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex flex-col w-full lg:w-[484px] lg:h-[423px] justify-between py-3 space-y-6 lg:space-y-0 order-2 lg:order-none">
              <motion.div
                className="flex flex-col space-y-2 lg:space-y-1"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="font-merriweather text-white text-[32px] md:text-[28px] sm:text-[24px]">
                  CO₂ Calculator
                </p>
                <p className="font-poppins text-[#CCCCCC] text-base md:text-sm">
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
                <p className="font-merriweather text-white text-[20px] md:text-[18px] sm:text-[16px] px-5 py-2 border border-[#525252] rounded-[100px] w-max">
                  Technologies used
                </p>
                <div className="flex flex-row items-center space-x-4">
                  <NextJsIcon />
                  <Paypalicon />
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.a
                  href="https://co2-calculator.vercel.app/"
                  target="_blank"
                  className="hidden flex-row items-center bg-white rounded-[100px] w-full sm:w-[236px] h-[54px] justify-center space-x-2 cursor-pointer"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <p className="font-poppins font-semibold text-[#1E1E1E] text-[16px]">
                    Visit Site
                  </p>
                  <ArrowRight />
                </motion.a>

                <motion.a
                  href="https://github.com/feranmiola/co2-calculator"
                  target="_blank"
                  className="w-full sm:w-[221px] h-[54px] hidden items-center justify-center flex-row space-x-2 border border-white rounded-[100px] text-[18px] font-semibold bg-transparent text-white transition-all ease-in-out cursor-pointer"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <p className="font-poppins font-semibold text-white text-[16px]">
                    View Code
                  </p>
                  <ArrowRight color="white" />
                </motion.a>
              </motion.div>
            </div>

            <div className="w-full lg:w-[636px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[382px] order-1 lg:order-none">
              <img
                src="https://res.cloudinary.com/debiu7z1b/image/upload/v1749214380/448_1x_shots_so_1_j5bbxu.webp"
                className="w-full h-full object-cover rounded-lg"
                alt="CO2 Calculator"
              />
            </div>
          </motion.div>

          {/* Akeso Health Project */}
          <motion.div
            className="w-full p-5 md:p-4 sm:p-3 items-center bg-[#151431] rounded-[12px] border-[0.5px] border-[#515151] flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="w-full lg:w-[636px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[382px] overflow-hidden order-1 lg:order-none">
              <img
                src="https://res.cloudinary.com/debiu7z1b/image/upload/v1749214380/Frame_15_1_dmxv1c.webp"
                className="w-full h-full object-cover rounded-lg"
                alt="Akeso"
              />
            </div>

            <div className="flex flex-col w-full lg:w-[484px] lg:h-[423px] justify-between py-3 space-y-6 lg:space-y-0 order-2 lg:order-none">
              <motion.div
                className="flex flex-col space-y-2 lg:space-y-1"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="font-merriweather text-white text-[32px] md:text-[28px] sm:text-[24px]">
                  Akeso Health
                </p>
                <p className="font-poppins text-[#CCCCCC] text-base md:text-sm">
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
                <p className="font-merriweather text-white text-[20px] md:text-[18px] sm:text-[16px] px-5 py-2 border border-[#525252] rounded-[100px] w-max">
                  Technologies used
                </p>
                <div className="flex flex-row items-center space-x-4">
                  <Viteicon />
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.a
                  href="https://www.akesohealthnetwork.com/"
                  target="_blank"
                  className="flex flex-row items-center bg-white rounded-[100px] w-full sm:w-[236px] h-[54px] justify-center space-x-2 cursor-pointer"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <p className="font-poppins font-semibold text-[#1E1E1E] text-[16px]">
                    Visit Site
                  </p>
                  <ArrowRight />
                </motion.a>

                <motion.a
                  href="https://github.com/Feranmiola/AkesoHealth"
                  target="_blank"
                  className="w-full sm:w-[221px] h-[54px] flex items-center justify-center flex-row space-x-2 border border-white rounded-[100px] text-[18px] font-semibold bg-transparent text-white transition-all ease-in-out cursor-pointer"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <p className="font-poppins font-semibold text-white text-[16px]">
                    View Code
                  </p>
                  <ArrowRight color="white" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

          {/* Stepverse Project */}
          <motion.div
            className="w-full p-5 md:p-4 sm:p-3 items-center bg-[#151431] rounded-[12px] border-[0.5px] border-[#515151] flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex flex-col w-full lg:w-[484px] lg:h-[423px] justify-between py-3 space-y-6 lg:space-y-0 order-2 lg:order-none">
              <motion.div
                className="flex flex-col space-y-2 lg:space-y-1"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="font-merriweather text-white text-[32px] md:text-[28px] sm:text-[24px]">
                  Stepverse
                </p>
                <p className="font-poppins text-[#CCCCCC] text-base md:text-sm">
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
                <p className="font-merriweather text-white text-[20px] md:text-[18px] sm:text-[16px] px-5 py-2 border border-[#525252] rounded-[100px] w-max">
                  Technologies used
                </p>
                <div className="flex flex-row items-center space-x-4">
                  <NextJsIcon />
                  <Viteicon />
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.a
                  href="https://stepverse.app/"
                  target="_blank"
                  className="flex flex-row items-center bg-white rounded-[100px] w-full sm:w-[236px] h-[54px] justify-center space-x-2 cursor-pointer"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <p className="font-poppins font-semibold text-[#1E1E1E] text-[16px]">
                    Visit Site
                  </p>
                  <ArrowRight />
                </motion.a>

                <motion.a
                  href="https://github.com/Feranmiola/stepVerse"
                  target="_blank"
                  className="w-full sm:w-[221px] h-[54px] flex items-center justify-center flex-row space-x-2 border border-white rounded-[100px] text-[18px] font-semibold bg-transparent text-white transition-all ease-in-out cursor-pointer"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <p className="font-poppins font-semibold text-white text-[16px]">
                    View Code
                  </p>
                  <ArrowRight color="white" />
                </motion.a>
              </motion.div>
            </div>

            <div className="w-full lg:w-[636px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[382px] overflow-hidden order-1 lg:order-none">
              <img
                src="https://res.cloudinary.com/debiu7z1b/image/upload/v1749214379/Frame_15_3_howzqk.webp"
                className="w-full h-full object-cover rounded-lg"
                alt="Stepverse"
              />
            </div>
          </motion.div>

          {/* Webmacht Project */}
          <motion.div
            className="w-full p-5 md:p-4 sm:p-3 items-center bg-[#151431] rounded-[12px] border-[0.5px] border-[#515151] flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="w-full lg:w-[636px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[382px] overflow-hidden order-1 lg:order-none">
              <img
                src="https://res.cloudinary.com/debiu7z1b/image/upload/v1749214380/Frame_16_h4swtl.webp"
                className="w-full h-full object-cover rounded-lg"
                alt="Webmacht"
              />
            </div>
            <div className="flex flex-col w-full lg:w-[484px] lg:h-[423px] justify-between py-3 space-y-6 lg:space-y-0 order-2 lg:order-none">
              <motion.div
                className="flex flex-col space-y-2 lg:space-y-1"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="font-merriweather text-white text-[32px] md:text-[28px] sm:text-[24px]">
                  Webmacht
                </p>
                <p className="font-poppins text-[#CCCCCC] text-base md:text-sm">
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
                <p className="font-merriweather text-white text-[20px] md:text-[18px] sm:text-[16px] px-5 py-2 border border-[#525252] rounded-[100px] w-max">
                  Technologies used
                </p>
                <div className="flex flex-row items-center space-x-4">
                  <NextJsIcon />
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.a
                  href="https://webmacht.de/"
                  target="_blank"
                  className="flex flex-row items-center bg-white rounded-[100px] w-full sm:w-[236px] h-[54px] justify-center space-x-2 cursor-pointer"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <p className="font-poppins font-semibold text-[#1E1E1E] text-[16px]">
                    Visit Site
                  </p>
                  <ArrowRight />
                </motion.a>

                <motion.a
                  href="https://github.com/Feranmiola/Webmacht"
                  target="_blank"
                  className="w-full sm:w-[221px] h-[54px] flex items-center justify-center flex-row space-x-2 border border-white rounded-[100px] text-[18px] font-semibold bg-transparent text-white transition-all ease-in-out cursor-pointer"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <p className="font-poppins font-semibold text-white text-[16px]">
                    View Code
                  </p>
                  <ArrowRight color="white" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
