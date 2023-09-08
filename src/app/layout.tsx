import "./globals.css";
import { Fira_Code } from "next/font/google";
import { Metadata } from "next";
import Script from "next/script";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TailwindIndicator } from "@/components/TailwindIndicator";

import "@code-hike/mdx/dist/index.css";

const firaCode = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Wiscaksono",
    template: "%s | Wiscaksono",
  },
  description:
    "I'm a passionate Front End Developer with a background in Electrical Engineering. With expertise in React.js and Next.js, I transform design masterpieces into flawless code. My skills in TailwindCSS ensure visually stunning and responsive websites. Get ready to witness the magic as I bring high-quality work to make the internet a brighter and funnier place!",
  openGraph: {
    title: "Wiscaksono",
    description:
      "I'm a passionate Front End Developer with a background in Electrical Engineering. With expertise in React.js and Next.js, I transform design masterpieces into flawless code. My skills in TailwindCSS ensure visually stunning and responsive websites. Get ready to witness the magic as I bring high-quality work to make the internet a brighter and funnier place!",
    url: process.env.WEBSITE_URL,
    siteName: "Wiscaksono",
    locale: "en_US",
    type: "website",
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
  twitter: {
    title: "Wisnu Wicaksono",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={firaCode.className}>
        <main>
          <Navbar />
          {children}
          <Footer />
        </main>
        <TailwindIndicator />
      </body>
      {process.env.NODE_ENV === "production" && (
        <Script
          async
          src="https://umami-wiscaksono.vercel.app/script.js"
          data-website-id="1f3b0505-7366-47bd-8757-95ad25395088"
        />
      )}
    </html>
  );
}
