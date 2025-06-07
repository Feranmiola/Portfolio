"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Icon from "./Icons/Icon";

const Topbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

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
      setIsScrolled(latest > 200);
    });

    return () => unsubscribe();
  }, [scrollY]);

  return (
    <div className="flex items-center justify-between flex-row fixed w-full py-10 px-20 z-[9999]">
      <div className="relative h-[32px] w-[200px]">
        <motion.p
          className="absolute left-0 text-white text-2xl -skew-x-[5deg] font-bold font-merriweather whitespace-nowrap"
          style={{
            y: fullNameY,
            opacity: fullNameOpacity,
            transition: "all 0.3s ease-in-out",
          }}
        >
          Feranmi Ola
        </motion.p>

        <motion.p
          className="absolute left-0 text-white text-[34px] font-bold font-merriweather whitespace-nowrap"
          style={{
            y: initialsY,
            opacity: initialsOpacity,
            transition: "all 0.3s ease-in-out",
          }}
        >
          FO
        </motion.p>
      </div>

      <div className="flex flex-row h-[68px] bg-[#020126] bg-opacity-65 w-[592px] border border-[#4E4E4E] items-center justify-between px-5 rounded-[100px]">
        <p className="text-white font-poppins font-medium text-base cursor-pointer hover:text-[#B3B1F3] transition-all ease-in-out">
          Home
        </p>
        <p className="text-white font-poppins font-medium text-base cursor-pointer hover:text-[#B3B1F3] transition-all ease-in-out">
          Projects
        </p>
        <p className="text-white font-poppins font-medium text-base cursor-pointer hover:text-[#B3B1F3] transition-all ease-in-out">
          About
        </p>
        <p className="text-white font-poppins font-medium text-base cursor-pointer hover:text-[#B3B1F3] transition-all ease-in-out">
          Expertise
        </p>
        <div className="w-[134px] h-[44px] flex items-center justify-center flex-row space-x-2 text-[#1E1E1E] bg-white border border-transparent rounded-[60px] text-base font-semibold hover:bg-transparent hover:border-[#B3B1F3] hover:text-white transition-all ease-in-out cursor-pointer">
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
