import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";

const components = {
  Image,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <article className="prose p-2.5 prose-pre:my-0 prose-pre:!bg-transparent prose-pre:p-0 prose-pre:focus-visible:!ring-0 prose-pre:!outline-0 prose-img:aspect-video prose-img:object-cover prose-img:object-center">
      <Component components={components} />
    </article>
  );
}
