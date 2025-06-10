"use client";
import Footer from "@/Components/Footer";
import Hero from "@/Components/Hero";
import Hero2 from "@/Components/Hero2";
import Projects from "@/Components/Projects";
import Topbar from "@/Components/Topbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [bgColor, setBgColor] = useState("#000000");

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
  );
}
