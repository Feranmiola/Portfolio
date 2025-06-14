"use client";
import Footer from "@/Components/Footer";
import Hero from "@/Components/Hero";
import Hero2 from "@/Components/Hero2";
import Projects from "@/Components/Projects";
import Topbar from "@/Components/Topbar";
import SEO from "@/Components/SEO";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipLoader, BeatLoader, SyncLoader } from "react-spinners";

export default function Home() {
  const [bgColor, setBgColor] = useState("#000000");
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

    let scrollTimer = 0;

    function updateScrollbar() {
      // Calculate scroll percentage with increased sensitivity
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.min(window.scrollY / (maxScroll * 0.5), 1); // Complete transition at 50% of scroll

      const scrollbarHeight =
        (window.innerHeight / document.documentElement.scrollHeight) *
        window.innerHeight;
      const scrollTop =
        scrollPercentage * (window.innerHeight - scrollbarHeight);

      document.body.style.setProperty("--scroll-top", `${scrollTop}px`);
      document.body.style.setProperty(
        "--scrollbar-height",
        `${scrollbarHeight}px`
      );

      // Calculate background color based on scroll with more pronounced colors
      const startColor = "#000000"; // Pure black
      const endColor = "#020126"; // Target blue

      // Convert hex to RGB
      const startRGB = hexToRgb(startColor);
      const endRGB = hexToRgb(endColor);

      if (startRGB && endRGB) {
        // Use a non-linear interpolation for more dramatic effect
        const easedPercentage = Math.pow(scrollPercentage, 0.7); // Adjust power for different curves

        const r = Math.round(
          startRGB.r + (endRGB.r - startRGB.r) * easedPercentage
        );
        const g = Math.round(
          startRGB.g + (endRGB.g - startRGB.g) * easedPercentage
        );
        const b = Math.round(
          startRGB.b + (endRGB.b - startRGB.b) * easedPercentage
        );

        const newColor = `#${r.toString(16).padStart(2, "0")}${g
          .toString(16)
          .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
        setBgColor(newColor);
      }

      document.body.classList.add("is-scrolling");

      clearTimeout(scrollTimer);
      // @ts-ignore
      scrollTimer = setTimeout(() => {
        document.body.classList.remove("is-scrolling");
      }, 1000);
    }

    // Helper function to convert hex to RGB
    function hexToRgb(hex: string) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    }

    window.addEventListener("scroll", updateScrollbar);
    window.addEventListener("resize", updateScrollbar);
    updateScrollbar();

    return () => {
      window.removeEventListener("scroll", updateScrollbar);
      window.removeEventListener("resize", updateScrollbar);
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
        className="flex flex-col w-full min-h-screen transition-colors duration-500"
        style={{ backgroundColor: bgColor }}
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
