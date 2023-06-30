import { Metadata } from "next";
import HelloWorld from "../../content/hello.mdx";

export const metadata: Metadata = {
  title: "Wiscaksono - Work",
};

export default function AboutWork() {
  return <HelloWorld />;
}
