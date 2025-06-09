"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Icon from "./Icons/Icon";

const Topbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Spring animation for smoother transitions
  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };
  const spring = useSpring(scrollY, springConfig);

  // Transform scroll value to control animation
  const fullNameY = useTransform(spring, [200, 400], [0, -50]);
  const fullNameOpacity = useTransform(spring, [200, 400], [1, 0]);
  const initialsY = useTransform(spring, [200, 400], [50, 0]);
  const initialsOpacity = useTransform(spring, [200, 400], [0, 1]);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 500);
    });

    return () => unsubscribe();
  }, [scrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-center justify-between flex-row fixed w-full py-10 px-20 z-[9999] md:px-10 sm:px-5">
      <div className="relative h-[32px] w-[200px] md:w-[150px] sm:w-[100px]">
        <motion.p
          className="absolute left-0 text-white text-2xl -skew-x-[5deg] font-bold font-merriweather whitespace-nowrap md:text-xl sm:text-lg"
          style={{
            y: fullNameY,
            opacity: fullNameOpacity,
            transition: "all 0.3s ease-in-out",
          }}
        >
          Feranmi Ola
        </motion.p>

        <motion.p
          className="absolute left-0 bg-gradient-to-r from-[#B3B1F3] to-[#ADAAAA] bg-clip-text text-transparent text-[34px] font-bold font-merriweather whitespace-nowrap md:text-[28px] sm:text-[24px]"
          style={{
            y: initialsY,
            opacity: initialsOpacity,
            transition: "all 0.3s ease-in-out",
          }}
        >
          FO
        </motion.p>
      </div>

      <div className="flex flex-row h-[68px] bg-black bg-opacity-35 w-[592px] border border-[#4E4E4E] items-center justify-between px-5 rounded-[100px] md:w-[450px] md:h-[54px] sm:w-[300px] sm:h-[44px] sm:px-3">
        <p
          onClick={() => scrollToSection("hero")}
          className="text-white font-poppins font-medium text-base cursor-pointer hover:text-[#B3B1F3] transition-all ease-in-out md:text-sm sm:text-xs"
        >
          Home
        </p>
        <p
          onClick={() => scrollToSection("projects")}
          className="text-white font-poppins font-medium text-base cursor-pointer hover:text-[#B3B1F3] transition-all ease-in-out md:text-sm sm:text-xs"
        >
          Projects
        </p>
        <p
          onClick={() => scrollToSection("about")}
          className="text-white font-poppins font-medium text-base cursor-pointer hover:text-[#B3B1F3] transition-all ease-in-out md:text-sm sm:text-xs"
        >
          About
        </p>
        <div
          onClick={() => setIsContactOpen(true)}
          className="w-[134px] h-[44px] flex items-center justify-center flex-row space-x-2 text-[#1E1E1E] bg-white border border-transparent rounded-[60px] text-base font-semibold hover:bg-transparent hover:border-[#B3B1F3] hover:text-white transition-all ease-in-out cursor-pointer md:w-[110px] md:h-[36px] md:text-sm sm:w-[90px] sm:h-[32px] sm:text-xs"
        >
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
