"use client";
import Footer from "@/Components/Footer";
import Hero from "@/Components/Hero";
import Hero2 from "@/Components/Hero2";
import Projects from "@/Components/Projects";
import Topbar from "@/Components/Topbar";
import SEO from "@/Components/SEO";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BeatLoader, SyncLoader } from "react-spinners";

// Background fades from pure black to this while scrolling.
const BG_START = { r: 0, g: 0, b: 0 }; // #000000
const BG_END = { r: 2, g: 1, b: 38 }; // #020126

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConnecting, setShowConnecting] = useState(false);

  useEffect(() => {
    // Reset scroll position on mount
    window.scrollTo(0, 0);

    // Show connecting animation after 0.7 seconds
    const connectingTimer = setTimeout(() => {
      setShowConnecting(true);
    }, 700);

    // Hide loading after 1 second
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(connectingTimer);
      clearTimeout(loadingTimer);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let scrollTimer: ReturnType<typeof setTimeout>;
    let frame = 0;

    // Written straight to the DOM instead of through React state: this runs on
    // every scroll event, and re-rendering the page here restarted the
    // scroll-in animations of the sections below.
    function paint() {
      frame = 0;

      const docHeight = document.documentElement.scrollHeight;
      const maxScroll = docHeight - window.innerHeight;
      // Complete the transition at 50% of the scrollable distance.
      const progress =
        maxScroll > 0 ? Math.min(window.scrollY / (maxScroll * 0.5), 1) : 0;

      const scrollbarHeight = (window.innerHeight / docHeight) * window.innerHeight;
      const scrollTop = progress * (window.innerHeight - scrollbarHeight);

      document.body.style.setProperty("--scroll-top", `${scrollTop}px`);
      document.body.style.setProperty(
        "--scrollbar-height",
        `${scrollbarHeight}px`
      );

      // Non-linear interpolation for a more pronounced colour shift.
      const eased = Math.pow(progress, 0.7);
      const r = Math.round(BG_START.r + (BG_END.r - BG_START.r) * eased);
      const g = Math.round(BG_START.g + (BG_END.g - BG_START.g) * eased);
      const b = Math.round(BG_START.b + (BG_END.b - BG_START.b) * eased);

      if (pageRef.current) {
        pageRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      }
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(paint);

      document.body.classList.add("is-scrolling");
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        document.body.classList.remove("is-scrolling");
      }, 1000);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    paint();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <>
      <SEO
        title="Feranmi Ola"
        description="Frontend and Blockchain Developer specializing in React, Next.js, and Solidity. Building high-performance user interfaces and decentralized applications with a focus on elegant design and secure blockchain logic."
        canonical="https://feranmiola.com"
        ogImage="https://res.cloudinary.com/debiu7z1b/image/upload/v1749562302/WhatsApp_Image_2025-06-10_at_14.23.01_94fe037e_jhbahe.jpg"
        twitterHandle="@feroomeeee"
      />

      {/* Loading Overlay - Always render first */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {showConnecting ? (
                <SyncLoader
                  color="#ffffff"
                  loading={true}
                  size={20}
                  margin={8}
                  speedMultiplier={1.5}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <BeatLoader
                  color="#ffffff"
                  loading={true}
                  size={20}
                  margin={8}
                  speedMultiplier={1.5}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={pageRef}
        className="flex flex-col w-full min-h-screen"
        style={{ backgroundColor: "#000000" }}
      >
        <Topbar />
        <div id="hero">
          <Hero />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div id="about">
          <Hero2 />
        </div>
        <div id="contact">
          <Footer />
        </div>
      </div>
    </>
  );
}
