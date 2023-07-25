import { Metadata } from "next";

import WorkMDX from "../../content/work.mdx";

export const metadata: Metadata = {
  title: "Wiscaksono - Work",
};

export default function AboutWork() {
  return <WorkMDX />;
}
