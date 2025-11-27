import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Viteicon from "./Icons/Viteicon";
import Paypalicon from "./Icons/Paypalicon";
import NextJsIcon from "./Icons/NextJsIcon";

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
  githubUrl?: string;
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
    githubUrl: "https://github.com/feranmiola/nefesol",
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
    githubUrl: "https://github.com/feranmiola/co2-calculator",
  },
  {
    title: "Akeso Health",
    description:
      "A responsive web platform for connected patient care, designed to streamline communication and reduce overhead for healthcare providers.",
    image:
      "https://res.cloudinary.com/debiu7z1b/image/upload/v1749214380/Frame_15_1_dmxv1c.webp",
    technologies: [{ name: "Vite", icon: <Viteicon /> }],
    liveUrl: "https://www.akesohealthnetwork.com/",
    githubUrl: "https://github.com/Feranmiola/AkesoHealth",
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
    githubUrl: "https://github.com/Feranmiola/stepVerse",
  },
  {
    title: "Webmacht",
    description:
      "Worked across sectors to deliver tailored platforms — from HIPAA-compliant portals to virtual real estate tools.",
    image:
      "https://res.cloudinary.com/debiu7z1b/image/upload/v1749214380/Frame_16_h4swtl.webp",
    technologies: [{ name: "Next.js", icon: <NextJsIcon /> }],
    liveUrl: "https://webmacht.de/",
    githubUrl: "https://github.com/Feranmiola/Webmacht",
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
            <motion.div
              key={project.title}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#8B0000]/50 transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#DC143C] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10"
                    >
                      {tech.icon}
                    </div>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-[#DC143C] hover:text-white transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>View Live</span>
                      <ExternalLink size={18} />
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-full font-semibold hover:bg-white/10 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={18} />
                      <span>Code</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
