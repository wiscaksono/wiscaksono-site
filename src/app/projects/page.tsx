import { allProjects } from "contentlayer/generated";
import Card from "@/components/Card";

const projects = allProjects;

type SearchParamsProps = {
  searchParams: {
    tag: string;
  };
};

export default function ProjectPage({ searchParams }: SearchParamsProps) {
  const { tag } = searchParams;
  let filteredProjects = projects;
  if (tag) {
    filteredProjects = projects.filter((project) => project.tag.includes(tag));
  }

  return (
    <div className="grid md:grid-cols-3 2xl:grid-cols-4 gap-5 p-5 ">
      {filteredProjects.map((project) => (
        <Card data={project} key={project.title} />
      ))}
    </div>
  );
}
