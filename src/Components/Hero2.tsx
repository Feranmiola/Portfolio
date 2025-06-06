import React from "react";

const Hero2 = () => {
  return (
    <div className="w-full h-[1032px] bg-[#151431] flex items-center justify-center">
      <div className="w-[1240px] h-[1032px] flex justify-evenly flex-col">
        <p className="font-merriweather text-[40px] text-white font-bold leading-[3.5rem]">
          Building fast, Responsive, User-centered <br />
          Web apps 🤞
        </p>
        <div className="flex flex-row justify-between items-center w-full">
          <p className="text-xl text-[#B1B0B0] font-poppins w-[558px]">
            From interactive dashboards and multilingual portals to
            decentralized platforms on Ethereum and BSC, I specialize in
            building full-stack solutions that combine elegant interfaces with
            secure, efficient blockchain logic. <br />
            <br />
            Whether it's a Web2 app that needs performance and polish or a Web3
            product that demands trust and transparency, I bring design
            awareness, clean code, and seamless integration across every layer.{" "}
            <br />
            <br />I build high-performance user interfaces using React, Next.js,
            TypeScript, and modern UI libraries like Shadcn. My applications
            support multi-language, multi-user workflows with sleek, accessible
            design.
          </p>

          <img
            src="https://res.cloudinary.com/debiu7z1b/image/upload/v1749221635/image_1_1_fthwdu.webp"
            className="w-[456px] h-[481px]"
            alt="Image 2
            "
          />
        </div>
      </div>
    </div>
  );
};

export default Hero2;
