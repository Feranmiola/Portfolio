"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight as LucideArrowRight } from "lucide-react";
import LightRay from "./Icons/LightRay";
import WhatsappIcon from "./Icons/WhatsappIcon";
import LinkedinIcon from "./Icons/LinkedinIcon";
import Xicon from "./Icons/Xicon";
import Mailicon from "./Icons/Mailicon";

const Hero = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const iconSize = 24; // Consistent size for all icons

  const fullText = `From interactive dashboards and multilingual portals to
decentralized platforms on Ethereum and BSC, I
specialize in building full-stack solutions that combine
elegant interfaces with secure, efficient blockchain
logic.`;

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 30); // Adjust typing speed here

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="flex items-center justify-center relative min-h-screen w-full">
      <div className="flex w-[538px] h-[538px] border-[6px] border-[#E4E4E4] rounded-[625.58px]"></div>

      <motion.p
        className="absolute font-poppins text-base text-[#CCCCCC] right-10 top-[40rem] whitespace-pre-line w-[435px]"
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

      <div className="absolute left-0 top-[16rem]">
        <LightRay />
      </div>

      <div className="flex flex-col absolute space-y-3 top-[55rem] left-[10rem]">
        <p className="text-2xl font-merriweather">
          Frontend Development / Smart Contract Engineering / End-to-End
          Integration
        </p>
        <p className="text-[#ADAAAA] -skew-x-[5deg] text-[128px] font-merriweather leading-none">
          I'm <span className="font-bold">Feranmi Ola</span>
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isContactOpen ? (
          <motion.div
            className="flex flex-row items-center space-x-5 absolute top-[70rem]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="rounded-full cursor-pointer border border-white rotate-180 p-5 hover:bg-white transition-all ease-in-out"
              onClick={() => setIsContactOpen(false)}
              onMouseEnter={() => setHoveredIcon(0)}
              onMouseLeave={() => setHoveredIcon(null)}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LucideArrowRight
                className="rotate-180"
                size={iconSize}
                color={hoveredIcon === 0 ? "black" : "white"}
              />
            </motion.div>
            <motion.div
              className="rounded-full cursor-pointer border border-white p-5 hover:bg-white transition-all ease-in-out"
              onClick={() => setIsContactOpen(false)}
              onMouseEnter={() => setHoveredIcon(1)}
              onMouseLeave={() => setHoveredIcon(null)}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <WhatsappIcon
                width={iconSize}
                height={iconSize}
                color={hoveredIcon === 1 ? "black" : "white"}
              />
            </motion.div>
            <motion.div
              className="rounded-full cursor-pointer border border-white p-5 hover:bg-white transition-all ease-in-out"
              onClick={() => setIsContactOpen(false)}
              onMouseEnter={() => setHoveredIcon(2)}
              onMouseLeave={() => setHoveredIcon(null)}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LinkedinIcon
                width={iconSize}
                height={iconSize}
                color={hoveredIcon === 2 ? "black" : "white"}
              />
            </motion.div>
            <motion.div
              className="rounded-full cursor-pointer border border-white p-5 hover:bg-white transition-all ease-in-out"
              onClick={() => setIsContactOpen(false)}
              onMouseEnter={() => setHoveredIcon(3)}
              onMouseLeave={() => setHoveredIcon(null)}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Xicon
                width={iconSize}
                height={iconSize}
                color={hoveredIcon === 3 ? "black" : "white"}
              />
            </motion.div>
            <motion.div
              className="rounded-full cursor-pointer border border-white p-5 hover:bg-white transition-all ease-in-out"
              onClick={() => setIsContactOpen(false)}
              onMouseEnter={() => setHoveredIcon(4)}
              onMouseLeave={() => setHoveredIcon(null)}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mailicon
                width={iconSize}
                height={iconSize}
                color={hoveredIcon === 4 ? "black" : "white"}
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-row items-center space-x-5 absolute top-[70rem]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="flex flex-row items-center bg-white rounded-[100px] w-[236px] h-[64px] justify-center space-x-2 cursor-pointer"
              variants={buttonVariants}
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
              variants={buttonVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get in Touch 💻
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
