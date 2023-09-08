import { Metadata } from "next";

import WorkMDX from "../../content/work.mdx";

const title = "Work Experience";
const description =
  "I'm Wisnu Wicaksono, a Front End Developer at Selego in Jakarta, Indonesia. I specialize in CSS, HTML, JavaScript, and TypeScript, and I have experience with frameworks like React, Next, and Tailwind CSS. Join me in exploring the world of web development!";
const url = `${process.env.WEBSITE_URL}/about/work`;
const image = `${process.env.WEBSITE_URL}/og?title=${title}`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    images: {
      url,
    },
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    images: [image],
  },
};

export default function AboutWork() {
  return <WorkMDX />;
}
