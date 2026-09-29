/**
 * Every piece of copy and data on the site lives here, so updating the
 * portfolio never means digging through layout code.
 */

export const site = {
  name: "Feranmi Ola",
  legalName: "Oluwaferanmi Osunjuyigbe",
  initials: "FO",
  role: "Frontend, Blockchain & Roblox Developer",
  url: "https://feranmiola.com",
  email: "osunjuyigbeiyin@gmail.com",
  location: "Nigeria",
  timeZone: "Africa/Lagos",
  timeZoneLabel: "WAT",
  twitterHandle: "@feroomeeee",
  description:
    "Frontend, blockchain and Roblox developer. I build high-performance web apps in React, Next.js and TypeScript, decentralised apps on Ethereum and BSC, React Native mobile apps and Roblox experiences scripted in Luau.",
  ogImage:
    "https://res.cloudinary.com/debiu7z1b/image/upload/v1749562302/WhatsApp_Image_2025-06-10_at_14.23.01_94fe037e_jhbahe.jpg",
  portrait:
    "https://res.cloudinary.com/debiu7z1b/image/upload/v1749505209/WhatsApp_Image_2025-06-09_at_22.37.46_665e42d5_mgy37d.webp",
} as const;

export type SocialIcon = "github" | "linkedin" | "x" | "telegram" | "whatsapp";

export interface Social {
  id: SocialIcon;
  label: string;
  handle: string;
  href: string;
}

export const socials: Social[] = [
  {
    id: "github",
    label: "GitHub",
    handle: "@feranmiola",
    href: "https://github.com/feranmiola",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "in/oluwaferanmi-osunjuyigbe12",
    href: "https://www.linkedin.com/in/oluwaferanmi-osunjuyigbe12/",
  },
  {
    id: "x",
    label: "X",
    handle: "@feroomeeee",
    href: "https://x.com/feroomeeee",
  },
  {
    id: "telegram",
    label: "Telegram",
    handle: "@feroomeeee",
    href: "https://t.me/feroomeeee",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    handle: "+234 813 240 2823",
    href: "https://wa.me/2348132402823",
  },
];

export const nav = [
  { id: "work", label: "Work", index: "01" },
  { id: "services", label: "Services", index: "02" },
  { id: "contact", label: "Contact", index: "03" },
] as const;

/** The four things I build, as the hero's code-comment eyebrow. */
export const heroAreas = ["Frontend", "Blockchain", "Roblox", "Mobile"];

/** Rotating endings for the hero line "I build …". */
export const heroRoles = [
  "dApps on Ethereum & BSC.",
  "dashboards that scale.",
  "Roblox experiences in Luau.",
  "React Native apps.",
  "Telegram mini apps.",
];

export const heroIntro =
  "From interactive dashboards and decentralised platforms to Roblox experiences and mobile apps, I build products that pair elegant interfaces with secure, efficient logic.";

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  url?: string;
}

export const projects: Project[] = [
  {
    slug: "nefesol",
    title: "Nefesol",
    category: "Climate · Payments",
    description:
      "A carbon-offset platform where people plant trees and receive certificates for their climate contributions. Multi-location support, PayPal checkout and automated email flows.",
    image:
      "https://res.cloudinary.com/debiu7z1b/image/upload/v1749214380/Frame_15_zsz9gs.webp",
    tags: ["Vite", "PayPal", "Email automation"],
    url: "https://nefesol.com",
  },
  {
    slug: "co2-calculator",
    title: "CO₂ Calculator",
    category: "Enterprise · Dashboards",
    description:
      "Enterprise-grade emission tracking with multi-user roles and multilingual dashboards. Integrates with Nefesol so companies can offset through tree planting.",
    image:
      "https://res.cloudinary.com/debiu7z1b/image/upload/v1749214380/448_1x_shots_so_1_j5bbxu.webp",
    tags: ["Next.js", "PayPal", "i18n", "Role-based access"],
  },
  {
    slug: "akeso-health",
    title: "Akeso Health",
    category: "Healthcare · Platform",
    description:
      "A responsive platform for connected patient care, built to streamline communication and cut overhead for healthcare providers.",
    image:
      "https://res.cloudinary.com/debiu7z1b/image/upload/v1749214380/Frame_15_1_dmxv1c.webp",
    tags: ["Vite", "Responsive UI"],
    url: "https://www.akesohealthnetwork.com/",
  },
  {
    slug: "stepverse",
    title: "Stepverse",
    category: "Web3 · Telegram Mini App",
    description:
      "A Web3 fitness game that lives inside Telegram. Leaderboards, rewards and community tracking that keep people moving.",
    image:
      "https://res.cloudinary.com/debiu7z1b/image/upload/v1749214379/Frame_15_3_howzqk.webp",
    tags: ["Next.js", "Vite", "Telegram Mini Apps", "Web3"],
    url: "https://stepverse.app/",
  },
  {
    slug: "webmacht",
    title: "Webmacht",
    category: "Agency · Multi-sector",
    description:
      "Tailored platforms across sectors, from HIPAA-compliant patient portals to virtual real-estate tools.",
    image:
      "https://res.cloudinary.com/debiu7z1b/image/upload/v1749214380/Frame_16_h4swtl.webp",
    tags: ["Next.js", "HIPAA", "Portals"],
    url: "https://webmacht.de/",
  },
];

export interface Service {
  title: string;
  icon: "code" | "chain" | "blocks" | "phone";
  summary: string;
  points: string[];
}

export const services: Service[] = [
  {
    title: "Frontend engineering",
    icon: "code",
    summary:
      "High-performance interfaces in React, Next.js and TypeScript: fast, responsive and pleasant to use.",
    points: [
      "Interactive dashboards and admin tools",
      "Multi-language, multi-user workflows",
      "Accessible, responsive design systems",
    ],
  },
  {
    title: "Blockchain & dApps",
    icon: "chain",
    summary:
      "Web3 products that earn trust through transparency, with smart contracts and wallet flows done right.",
    points: [
      "Solidity smart contracts",
      "Shipped on Ethereum and BSC",
      "Wallet connections and on-chain integrations",
    ],
  },
  {
    title: "Roblox scripting",
    icon: "blocks",
    summary:
      "Gameplay systems for Roblox experiences, scripted in Luau with the server in charge and exploiters kept out.",
    points: [
      "Gameplay mechanics, rounds and progression",
      "DataStores, RemoteEvents and anti-exploit checks",
      "Monetisation with game passes and developer products",
    ],
  },
  {
    title: "Mobile apps",
    icon: "phone",
    summary:
      "iOS and Android apps in React Native that share logic with the web and still feel native.",
    points: [
      "One codebase for both platforms",
      "Gestures, offline states and push notifications",
      "Wallets and Web3 flows on mobile",
    ],
  },
];

export const stack = [
  {
    group: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Motion"],
  },
  {
    group: "Web3",
    items: ["Solidity", "Ethereum", "BSC", "Wallet integrations"],
  },
  {
    group: "Roblox",
    items: ["Luau", "Roblox Studio", "DataStores", "RemoteEvents"],
  },
  {
    group: "Mobile",
    items: ["React Native", "Expo"],
  },
  {
    group: "Product",
    items: ["PayPal", "Email automation", "i18n", "Telegram Mini Apps"],
  },
  {
    group: "Tooling",
    items: ["Vite", "Git", "Figma"],
  },
];

export const about = {
  /** Rendered with the middle part highlighted. */
  leadParts: [
    "I'm Feranmi, a developer who cares about ",
    "how a product feels",
    " as much as how it works.",
  ] as const,
  get lead() {
    return this.leadParts.join("");
  },
  paragraphs: [
    "From interactive dashboards and multilingual portals to decentralised platforms on Ethereum and BSC, I build full-stack solutions that combine elegant interfaces with secure, efficient logic.",
    "On the game side, I script Roblox experiences in Luau: gameplay systems, data persistence and anti-exploit logic. On mobile, React Native apps that bring the same care to iOS and Android.",
    "Whether it's a Web2 app that needs polish, a Web3 product that demands trust or an experience that has to hold a steady frame rate, I bring design awareness, clean code and seamless integration across every layer.",
  ],
};

export const contact = {
  pitch:
    "Got a project in mind, or need help building your next Web2, Web3, mobile or Roblox project? Let's connect and build something great.",
};

/** Options for the "Start a project" form; the server validates against these. */
export const inquiry = {
  types: [
    "Web app",
    "dApp / smart contracts",
    "Roblox experience",
    "Mobile app",
    "Something else",
  ] as readonly string[],
};
