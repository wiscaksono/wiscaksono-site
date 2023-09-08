import { Metadata } from "next";
import Gear from "../../content/gear.mdx";

const title = "Equipment";
const description =
  "Explore Wisnu Wicaksono's hardware and software setup. From a powerful computer with an i5-10400F, 16GB of RAM, RTX 3060, and more, to a Macbook Air M2 for work on the go. His favorite tools include NeoVIM, Tmux, iTerm, and Oh my zsh. He hosts his website and projects on Vercel. Discover his tech world!";
const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/about/work`;
const image = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/og?title=${title}`;

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

export default function AboutGear() {
  return <Gear />;
}
