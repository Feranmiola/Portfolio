import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LinkedinIcon from "./Icons/LinkedinIcon";
import Xicon from "./Icons/Xicon";
import WhatsappIcon from "./Icons/WhatsappIcon";
import TelegramIcon from "./Icons/TelegramIcon";
import GithubIcon from "./Icons/GithubIcon";
import Mailicon from "./Icons/Mailicon";

const AnimatedText = ({ text }: { text: string }) => {
  return (
    <div className="flex">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.03,
            ease: "easeOut",
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <motion.div
      className="py-[10rem] flex items-center justify-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-[1233px] flex space-y-20 flex-col">
        <motion.div
          className="flex flex-col space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-[48px] text-white font-bold font-merriweather">
            Let's Work Together 👇
          </p>
          <p className="text-[#B1B0B0] font-poppins text-xl">
            Got a project in mind or need help building your next Web2 or Web3
            app? <br />
            Let's connect and build something great.
          </p>
        </motion.div>

        <div className="flex flex-col space-y-3 w-full items-start">
          <div className="flex flex-row items-center space-x-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Mailicon />
            </motion.div>
            <p className="text-[#938F8F] text-[64px] font-bold font-merriweather tracking-tight">
              <AnimatedText text="Email: osunjuyigbeiyin@gmail.com" />
            </p>
          </div>
          <motion.div
            className="flex flex-row items-center space-x-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              className="cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <LinkedinIcon />
            </motion.div>
            <motion.div
              className="cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Xicon />
            </motion.div>
            <motion.div
              className="cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <WhatsappIcon />
            </motion.div>
            <motion.div
              className="cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <TelegramIcon />
            </motion.div>
            <motion.div
              className="cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <GithubIcon />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
