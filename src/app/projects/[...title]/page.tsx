import { Metadata } from "next";
import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";

import { Mdx } from "@/components/MdxComponent";

type ParamsProps = {
  params: {
    title: string[];
  };
};

async function getProjectFromParams(params: ParamsProps["params"]) {
  const title = params.title.join("/");
  const post = allProjects.find((post) => post.title.toLowerCase() === title);
  if (!post) null;
  return post;
}

export async function generateStaticParams(): Promise<ParamsProps["params"][]> {
  return allProjects.map((project) => ({
    title: project.title.split("/").map((title) => title.toLowerCase()),
  }));
}

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const project = await getProjectFromParams(params);

  if (!project) {
    return {};
  }

  const title = project.title;
  const description = project.summary;
  const ogImage = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/projects/${title}`,
      images: {
        url: ogImage,
      },
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectDetail({ params }: ParamsProps) {
  const about = await getProjectFromParams(params);
  if (!about) {
    notFound();
  }

  return <Mdx code={about.body.code} />;
}
