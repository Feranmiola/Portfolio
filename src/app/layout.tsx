import type { Metadata, Viewport } from "next";
import { Doto, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import { site, socials } from "@/lib/content";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const doto = Doto({
  subsets: ["latin"],
  variable: "--font-doto",
  axes: ["ROND"],
  display: "swap",
});

const title = `${site.name} | ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "Feranmi Ola",
    "Oluwaferanmi Osunjuyigbe",
    "Frontend Developer",
    "Blockchain Developer",
    "Roblox Developer",
    "Roblox Scripter",
    "Luau",
    "React Native Developer",
    "Web3 Developer",
    "Solidity Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Ethereum Developer",
    "BSC Developer",
    "Telegram Mini Apps",
    "DApp Developer",
    "Nigeria",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    title,
    description: site.description,
    siteName: `${site.name} Portfolio`,
    images: [
      {
        url: site.ogImage,
        width: 1024,
        height: 1024,
        alt: `${site.name}, ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    creator: site.twitterHandle,
    images: [site.ogImage],
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
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080907",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.legalName,
  jobTitle: site.role,
  url: site.url,
  image: site.portrait,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressCountry: "NG" },
  sameAs: socials
    .filter((social) => social.id !== "whatsapp")
    .map((social) => social.href),
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "Solidity",
    "Ethereum",
    "BNB Smart Chain",
    "Web3",
    "Roblox",
    "Luau",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${doto.variable}`}
    >
      <body className="grain min-h-svh">
        <script
          type="application/ld+json"
          // Static, author-controlled data; "<" is escaped so it can never close the tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-lime focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-lime-ink"
        >
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
      </body>
    </html>
  );
}
