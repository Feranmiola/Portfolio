import React from "react";
import { motion } from "framer-motion";

const Hero2 = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const paragraphVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
      },
    },
  };

  return (
    <div className="w-full h-[1032px] bg-[#151431] flex items-center justify-center">
      <motion.div
        className="w-[1240px] h-[1032px] flex justify-evenly flex-col"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.p
          className="font-merriweather text-[40px] text-white font-bold leading-[3.5rem]"
          variants={textVariants}
        >
          Building fast, Responsive, User-centered <br />
          Web apps 🤞
        </motion.p>
        <div className="flex flex-row justify-between items-center w-full">
          <motion.div
            className="text-xl text-[#B1B0B0] font-poppins w-[558px]"
            variants={containerVariants}
          >
            <motion.p variants={paragraphVariants}>
              From interactive dashboards and multilingual portals to
              decentralized platforms on Ethereum and BSC, I specialize in
              building full-stack solutions that combine elegant interfaces with
              secure, efficient blockchain logic.
            </motion.p>{" "}
            <br />
            <motion.p variants={paragraphVariants}>
              Whether it's a Web2 app that needs performance and polish or a
              Web3 product that demands trust and transparency, I bring design
              awareness, clean code, and seamless integration across every
              layer.
            </motion.p>{" "}
            <br />
            <motion.p variants={paragraphVariants}>
              I build high-performance user interfaces using React, Next.js,
              TypeScript, and modern UI libraries like Shadcn. My applications
              support multi-language, multi-user workflows with sleek,
              accessible design.
            </motion.p>
          </motion.div>

          <motion.img
            src="https://res.cloudinary.com/debiu7z1b/image/upload/v1749221635/image_1_1_fthwdu.webp"
            className="w-[456px] h-[481px]"
            alt="Image 2"
            variants={textVariants}
            whileHover={{
              scale: 1.02,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
              },
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero2;
