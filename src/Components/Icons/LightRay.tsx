import React from "react";
import { motion } from "framer-motion";

const LightRay = () => {
  return (
    <div className="relative w-[812px] h-[877px]">
      <motion.div
        className="absolute w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Main beam with gradient and blur */}
        <svg
          width="812"
          height="877"
          viewBox="0 0 812 877"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
        >
          <g filter="url(#filter0_f_10_383)">
            <motion.path
              d="M-303.475 100.451L-165.037 138.298L711.188 731.238L207.329 776.721L-303.475 100.451Z"
              fill="url(#paint0_linear_10_383)"
              fillOpacity="0.3"
              animate={{
                fillOpacity: [0.3, 0.4, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </g>
          <defs>
            <filter
              id="filter0_f_10_383"
              x="-403.475"
              y="0.451233"
              width="1214.66"
              height="876.269"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="50"
                result="effect1_foregroundBlur_10_383"
              />
            </filter>
            <linearGradient
              id="paint0_linear_10_383"
              x1="619.039"
              y1="892.812"
              x2="-271.459"
              y2="281.121"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.225962" stopColor="white" stopOpacity="0.3" />
              <stop
                offset="0.623789"
                stopColor="white"
                stopOpacity="0.613043"
              />
              <stop offset="0.783654" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>

        {/* Water ripple effect overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            mixBlendMode: "overlay",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LightRay;
