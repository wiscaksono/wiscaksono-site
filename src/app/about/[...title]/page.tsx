import { Metadata } from "next";
import { notFound } from "next/navigation";
import { allAbouts } from "contentlayer/generated";

import { Mdx } from "@/components/MdxComponent";

type ParamsProps = {
  params: {
    title: string[];
  };
};

async function getAboutFromParams(params: ParamsProps["params"]) {
  const title = params.title.join("/");
  const post = allAbouts.find((post) => post.title === title);
  if (!post) null;
  return post;
}

export async function generateStaticParams(): Promise<ParamsProps["params"][]> {
  return allAbouts.map((about) => ({
    title: about.title.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const about = await getAboutFromParams(params);

  if (!about) {
    return {};
  }

  const title = about.title;
  const description = about.summary;
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

export default async function AboutDetail({ params }: ParamsProps) {
  const about = await getAboutFromParams(params);
  if (!about) {
    notFound();
  }

  return <Mdx code={about.body.code} />;
}
