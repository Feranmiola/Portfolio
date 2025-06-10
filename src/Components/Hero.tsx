"use client";
import React, { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideArrowLeft, ArrowRight as LucideArrowRight } from "lucide-react";
import LightRay from "./Icons/LightRay";
import WhatsappIcon from "./Icons/WhatsappIcon";
import LinkedinIcon from "./Icons/LinkedinIcon";
import Xicon from "./Icons/Xicon";
import Mailicon from "./Icons/Mailicon";

const MemoizedLightRay = memo(({ isMobile }: { isMobile: boolean }) => (
  <div
    className={`absolute ${
      isMobile ? "top-0 left-0" : "top-[16rem] left-0"
    } z-10`}
  >
    <LightRay />
  </div>
));

MemoizedLightRay.displayName = "MemoizedLightRay";

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

const MobileHero = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iconSize = 24;

  const handleContactClick = (type: string) => {
    switch (type) {
      case "whatsapp":
        window.open("https://wa.me/2348132402823", "_blank");
        break;
      case "linkedin":
        window.open(
          "https://www.linkedin.com/in/oluwaferanmi-osunjuyigbe12/",
          "_blank"
        );
        break;
      case "x":
        window.open("https://x.com/feroomeeee", "_blank");
        break;
      case "mail":
        window.open("mailto:osunjuyigbeiyin@gmail.com", "_blank");
        break;
      default:
        break;
    }
    setIsContactOpen(false);
  };

  useEffect(() => {
    // Reset scroll position on mount
    window.scrollTo(0, 0);
  }, []);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    // Add a delay before hiding the loading animation
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second delay
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Light rays with no padding - hugging the screen wall */}
      <MemoizedLightRay isMobile={true} />

      {/* Profile Image */}
      <motion.div
        className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] border-[6px] border-[#E4E4E4] rounded-full mt-40 mb-8 overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: isImageLoaded ? 1 : 0 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <motion.img
          src="https://res.cloudinary.com/debiu7z1b/image/upload/v1749505209/WhatsApp_Image_2025-06-09_at_22.37.46_665e42d5_mgy37d.webp"
          className="w-full h-full rounded-full"
          alt="Feranmi Ola"
          loading="eager"
          sizes="220px, 280px"
          width={280}
          height={280}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          onLoad={handleImageLoad}
        />
      </motion.div>

      {/* Text Content */}
      <motion.div
        className="flex flex-col items-center text-center px-4 z-30 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: isImageLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <p className="text-xs sm:text-sm text-center font-merriweather mb-4">
          Frontend || Blockchain Developer
        </p>
        <p className="text-[32px] sm:text-[40px] md:text-[48px] font-merriweather leading-tight bg-gradient-to-r from-[#B3B1F3] to-[#ADAAAA] bg-clip-text text-transparent mb-6">
          I'm <span className="font-bold">Feranmi Ola</span>
        </p>
      </motion.div>

      {/* Description Text */}
      <motion.p
        className="font-poppins text-sm sm:text-base text-[#CCCCCC] text-center px-4 max-w-[90%] sm:max-w-[500px] z-40 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: isImageLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        From interactive dashboards and multilingual portals to decentralized
        platforms on Ethereum and BSC, I specialize in building full-stack
        solutions that combine elegant interfaces with secure, efficient
        blockchain logic.
      </motion.p>

      {/* Contact Section */}
      <AnimatePresence mode="wait">
        {isContactOpen ? (
          <motion.div
            className="flex flex-row items-center space-x-4 h-[64px] z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isImageLoaded ? 1 : 0, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            key="contact-open"
          >
            {[
              { icon: LucideArrowLeft, onClick: () => setIsContactOpen(false) },
              {
                icon: WhatsappIcon,
                onClick: () => handleContactClick("whatsapp"),
              },
              {
                icon: LinkedinIcon,
                onClick: () => handleContactClick("linkedin"),
              },
              { icon: Xicon, onClick: () => handleContactClick("x") },
              { icon: Mailicon, onClick: () => handleContactClick("mail") },
            ].map((item, index) => (
              <motion.div
                key={`contact-icon-${index}`}
                className="rounded-full cursor-pointer border border-white p-3 sm:p-4 hover:bg-white transition-all ease-in-out group"
                onClick={item.onClick}
                initial={{ y: 20, opacity: 0 }}
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
                    <LucideArrowLeft size={20} color="currentColor" />
                  ) : index === 1 ? (
                    <WhatsappIcon width={20} height={20} color="currentColor" />
                  ) : index === 2 ? (
                    <LinkedinIcon width={20} height={20} color="currentColor" />
                  ) : index === 3 ? (
                    <Xicon width={20} height={20} color="currentColor" />
                  ) : (
                    <Mailicon width={20} height={20} color="currentColor" />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 px-4 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isImageLoaded ? 1 : 0, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            key="contact-closed"
          >
            <motion.a
              href="#projects"
              className="flex flex-row items-center bg-white rounded-[100px] w-full sm:w-[200px] h-[56px] justify-center space-x-2 cursor-pointer px-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <p className="font-poppins font-semibold text-[#1E1E1E] text-[16px]">
                View Projects
              </p>
              <LucideArrowRight size={20} color="#1E1E1E" />
            </motion.a>

            <motion.div
              onClick={() => setIsContactOpen(true)}
              className="w-full sm:w-[200px] h-[56px] flex items-center justify-center flex-row space-x-2 border border-white rounded-[100px] text-[16px] font-semibold bg-transparent text-white transition-all ease-in-out cursor-pointer hover:bg-white hover:text-black px-6"
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

const DesktopHero = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const iconSize = 24;

  const handleContactClick = (type: string) => {
    switch (type) {
      case "whatsapp":
        window.open("https://wa.me/2348132402823", "_blank");
        break;
      case "linkedin":
        window.open(
          "https://www.linkedin.com/in/oluwaferanmi-osunjuyigbe12/",
          "_blank"
        );
        break;
      case "x":
        window.open("https://x.com/feroomeeee", "_blank");
        break;
      case "mail":
        window.open("mailto:osunjuyigbeiyin@gmail.com", "_blank");
        break;
      default:
        break;
    }
    setIsContactOpen(false);
  };

  return (
    <div className="flex items-center justify-center relative min-h-screen w-full">
      <motion.div
        className="flex w-[538px] h-[538px] border-[6px] border-[#E4E4E4] rounded-[625.58px] overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <motion.img
          src="https://res.cloudinary.com/debiu7z1b/image/upload/v1749505209/WhatsApp_Image_2025-06-09_at_22.37.46_665e42d5_mgy37d.webp"
          className="w-full h-full object-cover rounded-[625.58px]"
          alt="Feranmi Ola"
          loading="eager"
          sizes="538px"
          width={538}
          height={538}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        />
      </motion.div>

      <MemoizedLightRay isMobile={false} />
      <TypingText />

      <motion.div
        className="flex flex-col absolute space-y-3 top-[55rem] left-[10rem] z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <p className="text-2xl font-merriweather">
          Frontend || Blockchain Developer
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
            {
              icon: WhatsappIcon,
              onClick: () => handleContactClick("whatsapp"),
            },
            {
              icon: LinkedinIcon,
              onClick: () => handleContactClick("linkedin"),
            },
            { icon: Xicon, onClick: () => handleContactClick("x") },
            { icon: Mailicon, onClick: () => handleContactClick("mail") },
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
          <motion.a
            href="#projects"
            className="flex flex-row items-center bg-white rounded-[100px] w-[236px] h-[64px] justify-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <p className="font-poppins font-semibold text-[#1E1E1E] text-[18px]">
              View Projects
            </p>
            <LucideArrowRight size={iconSize} color="#1E1E1E" />
          </motion.a>

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

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MobileHero /> : <DesktopHero />;
};

export default Hero;
