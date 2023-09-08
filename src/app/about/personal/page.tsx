import { Metadata } from "next";
import Personal from "../../content/personal.mdx";

const title = "Personal Info";
const description =
  "Hello, I'm Wisnu Wicaksono, based in Jakarta, Indonesia. I enjoy programming, gaming, eating, and playing basketball. Explore my world of interests!";
const url = `${process.env.WEBSITE_URL}/about/personal`;
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
  return <Personal />;
}
