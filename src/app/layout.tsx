import "./globals.css";
import { Fira_Code } from "next/font/google";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { AnalyticsWrapper } from "@/components/Analytics";

import "@code-hike/mdx/dist/index.css";

const firaCode = Fira_Code({ subsets: ["latin"] });

export const metadata = {
  title: "Wiscaksono",
  description:
    "I'm a passionate Front End Developer with a background in Electrical Engineering. With expertise in React.js and Next.js, I transform design masterpieces into flawless code. My skills in TailwindCSS ensure visually stunning and responsive websites. Get ready to witness the magic as I bring high-quality work to make the internet a brighter and funnier place!",
  keywords:
    "Front End Developer, Next.js, React.js, Electrical Engineering, Web Development, UI/UX Design, TailwindCSS, Code Quality, Responsive Websites, Flawless Code, Design to Code Conversion, Wisnu Wicaksono",
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
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
