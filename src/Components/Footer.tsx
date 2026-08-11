"use client";
import React from "react";
import { motion } from "framer-motion";
import LinkedinIcon from "./Icons/LinkedinIcon";
import Xicon from "./Icons/Xicon";
import WhatsappIcon from "./Icons/WhatsappIcon";
import TelegramIcon from "./Icons/TelegramIcon";
import GithubIcon from "./Icons/GithubIcon";
import Mailicon from "./Icons/Mailicon";
import AnimatedIcon, { IconMotion } from "./Icons/AnimatedIcon";

interface SocialLink {
  label: string;
  icon: React.ReactNode;
  hover: IconMotion;
  url: string;
}

const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    icon: <LinkedinIcon />,
    hover: "float",
    url: "https://linkedin.com/in/oluwaferanmi-osunjuyigbe12",
  },
  {
    label: "X",
    icon: <Xicon />,
    hover: "flip",
    url: "https://x.com/feroomeeee",
  },
  {
    label: "WhatsApp",
    icon: <WhatsappIcon />,
    hover: "wiggle",
    url: "https://wa.me/2348132402823",
  },
  {
    label: "Telegram",
    icon: <TelegramIcon />,
    hover: "fly",
    url: "https://t.me/feroomeeee",
  },
  {
    label: "GitHub",
    icon: <GithubIcon />,
    hover: "spin",
    url: "https://github.com/feranmiola",
  },
];

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
          <p className="text-[48px] md:text-[40px] sm:text-[32px] text-white font-bold">
            Let&apos;s Work Together 👇
          </p>
          <p className="text-[#B1B0B0] text-xl md:text-lg sm:text-base">
            Got a project in mind or need help building your next Web2 or Web3
            app? <br className="hidden sm:block" />
            Let&apos;s connect and build something great.
          </p>
        </motion.div>

        <div className="flex flex-col space-y-3 w-full items-start">
          <motion.a
            href="mailto:osunjuyigbeiyin@gmail.com"
            className="flex sm:flex-row items-start sm:items-center space-x-3 sm:space-y-0 sm:space-x-3"
            variants={{ rest: {}, hover: {} }}
            initial="rest"
            whileHover="hover"
          >
            <AnimatedIcon hover="send" trigger="parent" delay={0.3}>
              <Mailicon />
            </AnimatedIcon>
            <p className="text-[#938F8F] text-[64px] md:text-[48px] max-md:text-[18px] font-bold tracking-tight">
              <AnimatedText text="Email: osunjuyigbeiyin@gmail.com" />
            </p>
          </motion.a>
          <motion.div
            className="flex flex-row flex-wrap items-center gap-6 sm:gap-8 md:gap-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="cursor-pointer"
                variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <AnimatedIcon
                  hover={link.hover}
                  trigger="parent"
                  delay={index * 0.08}
                >
                  {link.icon}
                </AnimatedIcon>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
