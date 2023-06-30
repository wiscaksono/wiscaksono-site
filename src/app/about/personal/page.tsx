import { Metadata } from "next";
import Personal from "../../content/personal.mdx";

export const metadata: Metadata = {
  title: "Wiscaksono - Personal",
};

export default function AboutWork() {
  return <Personal />;
}
