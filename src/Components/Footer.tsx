import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LinkedinIcon from "./Icons/LinkedinIcon";
import Xicon from "./Icons/Xicon";
import WhatsappIcon from "./Icons/WhatsappIcon";
import TelegramIcon from "./Icons/TelegramIcon";
import GithubIcon from "./Icons/GithubIcon";
import Mailicon from "./Icons/Mailicon";

interface SocialLink {
  icon: React.ReactNode;
  url: string;
}

const AnimatedText = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-wrap">
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
  // Social media links - you can update these with your actual links
  const socialLinks: SocialLink[] = [
    {
      icon: <LinkedinIcon />,
      url: "https://linkedin.com/in/oluwaferanmi-osunjuyigbe12",
    },
    { icon: <Xicon />, url: "https://x.com/feroomeeee" },
    { icon: <WhatsappIcon />, url: "https://wa.me/2348132402823" },
    { icon: <TelegramIcon />, url: "https://t.me/feroomeeee" },
    { icon: <GithubIcon />, url: "https://github.com/feranmiola" },
  ];

  return (
    <motion.div
      className="py-[10rem] md:py-[8rem] sm:py-[6rem] flex items-center justify-center px-4 sm:px-6 md:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-[1233px] flex space-y-20 md:space-y-16 sm:space-y-12 flex-col">
        <motion.div
          className="flex flex-col space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-[48px] md:text-[40px] sm:text-[32px] text-white font-bold font-merriweather">
            Let's Work Together 👇
          </p>
          <p className="text-[#B1B0B0] font-poppins text-xl md:text-lg sm:text-base">
            Got a project in mind or need help building your next Web2 or Web3
            app? <br className="hidden sm:block" />
            Let's connect and build something great.
          </p>
        </motion.div>

        <div className="flex flex-col space-y-3 w-full items-start">
          <a
            href="mailto:osunjuyigbeiyin@gmail.com"
            className="flex sm:flex-row items-start sm:items-center space-x-3 sm:space-y-0 sm:space-x-3"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Mailicon />
            </motion.div>
            <p className="text-[#938F8F] text-[64px] md:text-[48px] max-md:text-[18px] font-bold font-merriweather tracking-tight">
              <AnimatedText text="Email: osunjuyigbeiyin@gmail.com" />
            </p>
          </a>
          <motion.div
            className="flex flex-row flex-wrap items-center gap-6 sm:gap-8 md:gap-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
