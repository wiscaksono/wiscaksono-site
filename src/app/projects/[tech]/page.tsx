import Card from "@/components/Card";
import projectData from "../../../data/projectData.json";
import capitalizeWords from "@/lib/capitalizeWords";

type ParamsProps = {
  params: {
    tech: string;
  };
};

export async function generateMetadata({ params }: ParamsProps, parent?: any) {
  const site = (await parent)?.title?.absolute;

  return {
    title: `${site} - ${capitalizeWords(params.tech.replace(/-/g, " "))}`,
  };
}

export default function ProjectTech({ params }: ParamsProps) {
  let filteredData = projectData;

  if (params.tech !== "all-projects") {
    const param = params.tech.toLowerCase();
    filteredData = projectData.filter((obj) =>
      obj.technology.some((tech) => tech.toLowerCase() === param)
    );
  }

  return (
    <div className="grid md:grid-cols-3 2xl:grid-cols-4 gap-5 p-5 cursor-pointer">
      {filteredData.map((data, i) => (
        <Card data={data} key={i} />
      ))}
    </div>
  );
}
