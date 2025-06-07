"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideArrowLeft, ArrowRight as LucideArrowRight } from "lucide-react";
import LightRay from "./Icons/LightRay";
import WhatsappIcon from "./Icons/WhatsappIcon";
import LinkedinIcon from "./Icons/LinkedinIcon";
import Xicon from "./Icons/Xicon";
import Mailicon from "./Icons/Mailicon";

const TypingText = React.memo(() => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const fullText = `From interactive dashboards and multilingual portals to
decentralized platforms on Ethereum and BSC, I
specialize in building full-stack solutions that combine
elegant interfaces with secure, efficient blockchain
logic.`;

  const updateText = useCallback(() => {
    if (currentIndex < fullText.length) {
      setDisplayText((prev) => prev + fullText[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, fullText]);

  useEffect(() => {
    const timeout = setTimeout(updateText, 30);
    return () => clearTimeout(timeout);
  }, [updateText]);

  return (
    <motion.p
      className="absolute font-poppins text-base text-[#CCCCCC] right-10 top-[40rem] whitespace-pre-line w-[435px] z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-[2px] h-[1em] bg-[#CCCCCC] ml-[2px] align-middle"
      />
    </motion.p>
  );
});

const Hero = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const iconSize = 24;

  return (
    <div className="flex items-center justify-center relative min-h-screen w-full">
      <div className="flex w-[538px] h-[538px] border-[6px] border-[#E4E4E4] rounded-[625.58px]"></div>

      <div className="absolute left-0 top-[16rem] z-20">
        <LightRay />
      </div>

      <TypingText />

      <motion.div
        className="flex flex-col absolute space-y-3 top-[55rem] left-[10rem] z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <p className="text-2xl font-merriweather">
          Frontend Development / Smart Contract Engineering / End-to-End
          Integration
        </p>
        <p className="-skew-x-[5deg] text-[128px] font-merriweather leading-none bg-gradient-to-r from-[#B3B1F3] to-[#ADAAAA] bg-clip-text text-transparent">
          I'm <span className="font-bold">Feranmi Ola</span>
        </p>
      </motion.div>

      {isContactOpen ? (
        <motion.div
          className="flex flex-row items-center space-x-5 absolute top-[70rem] h-[64px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key="contact-open"
        >
          {[
            { icon: LucideArrowLeft, onClick: () => setIsContactOpen(false) },
            { icon: WhatsappIcon, onClick: () => setIsContactOpen(false) },
            { icon: LinkedinIcon, onClick: () => setIsContactOpen(false) },
            { icon: Xicon, onClick: () => setIsContactOpen(false) },
            { icon: Mailicon, onClick: () => setIsContactOpen(false) },
          ].map((item, index) => (
            <motion.div
              key={`contact-icon-${index}`}
              className="rounded-full cursor-pointer border border-white p-5 hover:bg-white transition-all ease-in-out group"
              onClick={item.onClick}
              initial={{ y: 3, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                  mass: 0.5,
                  delay: index * 0.1,
                },
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.15 },
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
            >
              <div className="text-white group-hover:text-black transition-colors duration-200">
                {index === 0 ? (
                  <LucideArrowLeft size={iconSize} color="currentColor" />
                ) : index === 1 ? (
                  <WhatsappIcon
                    width={iconSize}
                    height={iconSize}
                    color="currentColor"
                  />
                ) : index === 2 ? (
                  <LinkedinIcon
                    width={iconSize}
                    height={iconSize}
                    color="currentColor"
                  />
                ) : index === 3 ? (
                  <Xicon
                    width={iconSize}
                    height={iconSize}
                    color="currentColor"
                  />
                ) : (
                  <Mailicon
                    width={iconSize}
                    height={iconSize}
                    color="currentColor"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-row items-center space-x-5 absolute top-[70rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="flex flex-row items-center bg-white rounded-[100px] w-[236px] h-[64px] justify-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <p className="font-poppins font-semibold text-[#1E1E1E] text-[18px]">
              View Projets
            </p>
            <LucideArrowRight size={iconSize} color="#1E1E1E" />
          </motion.div>

          <motion.div
            onClick={() => setIsContactOpen(true)}
            className="w-[221px] h-[64px] flex items-center justify-center flex-row space-x-2 border border-white rounded-[100px] text-[18px] font-semibold bg-transparent text-white transition-all ease-in-out cursor-pointer hover:bg-white hover:text-black"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get in Touch 💻
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Hero;
