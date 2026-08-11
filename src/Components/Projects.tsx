"use client";
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Viteicon from "./Icons/Viteicon";
import Paypalicon from "./Icons/Paypalicon";
import NextJsIcon from "./Icons/NextJsIcon";
import AnimatedIcon from "./Icons/AnimatedIcon";

interface Technology {
  name: string;
  icon: React.ReactNode;
}

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: Technology[];
  liveUrl?: string;
}

const projects: Project[] = [
  {
    title: "Nefesol",
    description:
      "A carbon offset platform enabling users to plant trees and receive certificates for their climate contributions. Features multi-location support, PayPal integration, and automated email flows.",
    image:
      "https://res.cloudinary.com/debiu7z1b/image/upload/v1749214380/Frame_15_zsz9gs.webp",
    technologies: [
      { name: "Vite", icon: <Viteicon /> },
      { name: "PayPal", icon: <Paypalicon /> },
    ],
    liveUrl: "https://nefesol.com",
  },
  {
    title: "CO₂ Calculator",
    description:
      "Enterprise-grade emission tracking tool with multi-user roles and multilingual dashboards. Integrates with Nefesol for tree-based carbon offsetting.",
    image:
      "https://res.cloudinary.com/debiu7z1b/image/upload/v1749214380/448_1x_shots_so_1_j5bbxu.webp",
    technologies: [
      { name: "Next.js", icon: <NextJsIcon /> },
      { name: "PayPal", icon: <Paypalicon /> },
    ],
  },
  {
    title: "Akeso Health",
    description:
      "A responsive web platform for connected patient care, designed to streamline communication and reduce overhead for healthcare providers.",
    image:
      "https://res.cloudinary.com/debiu7z1b/image/upload/v1749214380/Frame_15_1_dmxv1c.webp",
    technologies: [{ name: "Vite", icon: <Viteicon /> }],
    liveUrl: "https://www.akesohealthnetwork.com/",
  },
  {
    title: "Stepverse",
    description:
      "Web3 fitness game using Telegram Mini Apps. Features include leaderboards, rewards, and community tracking.",
    image:
      "https://res.cloudinary.com/debiu7z1b/image/upload/v1749214379/Frame_15_3_howzqk.webp",
    technologies: [
      { name: "Next.js", icon: <NextJsIcon /> },
      { name: "Vite", icon: <Viteicon /> },
    ],
    liveUrl: "https://stepverse.app/",
  },
  {
    title: "Webmacht",
    description:
      "Worked across sectors to deliver tailored platforms — from HIPAA-compliant portals to virtual real estate tools.",
    image:
      "https://res.cloudinary.com/debiu7z1b/image/upload/v1749214380/Frame_16_h4swtl.webp",
    technologies: [{ name: "Next.js", icon: <NextJsIcon /> }],
    liveUrl: "https://webmacht.de/",
  },
];

const Projects = () => {
  return (
    <div className="flex items-center justify-center pt-[5rem] lg:pt-[20rem] pb-[10rem] px-4 sm:px-6 md:px-8">
      <div className="flex flex-col w-full max-w-[1400px] space-y-16">
        {/* Header */}
        <motion.div
          className="flex flex-col space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            Featured Work
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl">
            A selection of projects showcasing my expertise in building
            high-performance web applications and decentralized platforms.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            /**
             * Two layers on purpose: the outer element owns the scroll-in
             * animation, the inner one owns the hover state. Sharing `y`
             * between the two made the entry animation replay on hover-out.
             */
            <motion.div
              key={project.title}
              className="h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: (index % 2) * 0.12,
                ease: "easeOut",
              }}
            >
              <motion.article
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors duration-500 hover:border-[#B3B1F3]/60"
                variants={{ rest: { y: 0 }, hover: { y: -8 } }}
                initial="rest"
                whileHover="hover"
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                {/* Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-bold text-white transition-colors duration-300 group-hover:text-[#B3B1F3]">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, techIndex) => (
                      <div
                        key={tech.name}
                        title={tech.name}
                        aria-label={tech.name}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 transition-colors duration-300 group-hover:border-[#B3B1F3]/40 group-hover:bg-white/10"
                      >
                        <AnimatedIcon
                          hover="float"
                          trigger="parent"
                          delay={0.15 + techIndex * 0.08}
                        >
                          {tech.icon}
                        </AnimatedIcon>
                      </div>
                    ))}
                  </div>

                  {/* Link */}
                  {project.liveUrl && (
                    <div className="mt-auto flex gap-4 pt-2">
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold transition-colors duration-300 hover:bg-[#B3B1F3] hover:text-[#1E1E1E]"
                        whileTap={{ scale: 0.96 }}
                      >
                        <span>View Live</span>
                        <AnimatedIcon hover="slide" trigger="parent" entry={false}>
                          <ExternalLink size={18} />
                        </AnimatedIcon>
                      </motion.a>
                    </div>
                  )}
                </div>
              </motion.article>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
