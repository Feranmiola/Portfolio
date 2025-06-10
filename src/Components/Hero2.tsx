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
    <div className="w-full min-h-screen bg-[#151431] flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 md:py-16 lg:py-0">
      <motion.div
        className="w-full max-w-[1240px] flex flex-col justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-0 lg:justify-evenly lg:h-[1032px]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.p
          className="font-trytype text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-white font-bold leading-tight sm:leading-relaxed md:leading-[3rem] lg:leading-[3.5rem] text-center lg:text-left"
          variants={textVariants}
        >
          Building fast, Responsive, User-centered{" "}
          <br className="hidden sm:block" />
          Web apps 🤞
        </motion.p>

        <div className="flex flex-col md:flex-col lg:flex-row justify-between items-center w-full gap-8 md:gap-12 lg:gap-0">
          <motion.div
            className="text-base sm:text-lg md:text-xl text-[#B1B0B0] font-trytype w-full lg:w-[558px] text-center lg:text-left"
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

          <div className="rotate-[15deg] flex-shrink-0">
            <motion.img
              src="https://res.cloudinary.com/debiu7z1b/image/upload/v1749505208/WhatsApp_Image_2025-06-09_at_22.37.41_6a9c5a28_kojwuq.webp"
              className="w-[280px] h-[295px] sm:w-[320px] sm:h-[338px] md:w-[380px] md:h-[400px] lg:w-[456px] lg:h-[481px] border-[4px] rounded-[12px] shadow-lg object-cover"
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
        </div>
      </motion.div>
    </div>
  );
};

export default Hero2;
