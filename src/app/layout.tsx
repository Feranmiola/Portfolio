import { Metadata } from "next";
import type { Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DefaultSeo } from "next-seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feranmi Ola | Frontend & Blockchain Developer",
  description:
    "Frontend and Blockchain Developer specializing in React, Next.js, and Solidity. Building high-performance user interfaces and decentralized applications with a focus on elegant design and secure blockchain logic.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  keywords: [
    "Feranmi Ola",
    "Feranmi",
    "Ola",
    "Osunjuyigbe",
    "Oluwaferanmi",
    "Osunjuyigbe Oluwaferanmi",
    "Frontend Developer",
    "Smart Contract Developer",
    "Front-end Developer",
    "Solidity Developer",
    "React Developer",
    "Next.js Developer",
    "Blockchain Developer",
    "Web3 Developer",
    "Full Stack Developer",
    "TypeScript Developer",
    "UI/UX Developer",
    "Ethereum Developer",
    "BSC Developer",
    "Decentralized Applications",
    "DApp Developer",
  ].join(", "),
  authors: [{ name: "Feranmi Ola" }],
  creator: "Feranmi Ola",
  publisher: "Feranmi Ola",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://feranmiola.com",
    title: "Feranmi Ola | Frontend & Blockchain Developer",
    description:
      "Frontend and Blockchain Developer specializing in React, Next.js, and Solidity. Building high-performance user interfaces and decentralized applications with a focus on elegant design and secure blockchain logic.",
    siteName: "Feranmi Ola Portfolio",
    images: [
      {
        url: "https://res.cloudinary.com/debiu7z1b/image/upload/v1749505209/WhatsApp_Image_2025-06-09_at_22.37.46_665e42d5_mgy37d.webp",
        width: 1200,
        height: 630,
        alt: "Feranmi Ola - Frontend & Blockchain Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Feranmi Ola | Frontend & Blockchain Developer",
    description:
      "Frontend and Blockchain Developer specializing in React, Next.js, and Solidity. Building high-performance user interfaces and decentralized applications.",
    creator: "@feroomeeee",
    images: [
      "https://res.cloudinary.com/debiu7z1b/image/upload/v1749505209/WhatsApp_Image_2025-06-09_at_22.37.46_665e42d5_mgy37d.webp",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification", // Add your Google Search Console verification code
  },
  alternates: {
    canonical: "https://feranmiola.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const SEO = {
  title: "Feranmi Ola | Frontend & Blockchain Developer",
  description:
    "Frontend and Blockchain Developer specializing in React, Next.js, and Solidity. Building high-performance user interfaces and decentralized applications with a focus on elegant design and secure blockchain logic.",
  canonical: "https://feranmiola.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://feranmiola.com",
    title: "Feranmi Ola | Frontend & Blockchain Developer",
    description:
      "Frontend and Blockchain Developer specializing in React, Next.js, and Solidity. Building high-performance user interfaces and decentralized applications with a focus on elegant design and secure blockchain logic.",
    siteName: "Feranmi Ola Portfolio",
    images: [
      {
        url: "https://res.cloudinary.com/debiu7z1b/image/upload/v1749505209/WhatsApp_Image_2025-06-09_at_22.37.46_665e42d5_mgy37d.webp",
        width: 1200,
        height: 630,
        alt: "Feranmi Ola - Frontend & Blockchain Developer",
      },
    ],
  },
  twitter: {
    handle: "@feroomeeee",
    site: "@feroomeeee",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content: [
        "Feranmi Ola",
        "Feranmi",
        "Ola",
        "Osunjuyigbe",
        "Oluwaferanmi",
        "Osunjuyigbe Oluwaferanmi",
        "Frontend Developer",
        "Smart Contract Developer",
        "Front-end Developer",
        "Solidity Developer",
        "React Developer",
        "Next.js Developer",
        "Blockchain Developer",
        "Web3 Developer",
        "Full Stack Developer",
        "TypeScript Developer",
        "UI/UX Developer",
        "Ethereum Developer",
        "BSC Developer",
        "Decentralized Applications",
        "DApp Developer",
      ].join(", "),
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "icon",
      href: "/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      rel: "icon",
      href: "/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          sizes="32x32"
          type="image/png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <DefaultSeo {...SEO} />
      </head>
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
