import Card from "@/components/Card";

import projectData from "./projectData.json";
import capitalizeWords from "@/lib/capitalizeWords";

type ParamsProps = {
  params: {
    tech: string;
  };
};

export async function generateMetadata({ params }: ParamsProps) {
  const title = `${capitalizeWords(params.tech.replace(/-/g, " "))}`;
  const ogImage = `${process.env.WEBSITE_URL}/og?title=${title}`;
  const description = `Projects using ${title} technologies`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${process.env.WEBSITE_URL}/projects/${params.tech}`,
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

export default function ProjectTech({ params }: ParamsProps) {
  let filteredData = projectData;

  if (params.tech !== "all-projects") {
    const param = params.tech.toLowerCase();
    filteredData = projectData.filter((obj) =>
      obj.technology.some(
        (tech) => tech.toLowerCase().replace(" ", "-") === param
      )
    );
  }

  return (
    <div className="grid md:grid-cols-3 2xl:grid-cols-4 gap-5 p-5 ">
      {filteredData.map((data, i) => (
        <Card data={data} key={i} />
      ))}
    </div>
  );
}
