import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AsideLink from "@/components/ui/aside-link";
import { Skeleton } from "@/components/ui/skeleton";

import { RiReactjsLine, RiHtml5Fill } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import { HiTerminal } from "react-icons/hi";

const data = [
  {
    title: "Projects",
    list: [
      {
        title: "All Projects",
        href: "/projects/all-projects",
        icon: <HiTerminal className="w-4 h-4" />,
      },
      {
        title: "React",
        href: "/projects/react",
        icon: <RiReactjsLine className="w-4 h-4" />,
      },
      {
        title: "Next",
        href: "/projects/next",
        icon: <TbBrandNextjs className="w-4 h-4" />,
      },
      {
        title: "HTML",
        href: "/projects/html",
        icon: <RiHtml5Fill className="w-4 h-4" />,
      },
    ],
  },
];

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-12 overflow-hidden">
      <aside className="col-span-2 border-r border-lines">
        <Accordion type="single" collapsible defaultValue="item-0">
          {data.map((item, i) => (
            <AccordionItem value={`item-${i}`} key={i}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {item.list.map((listItem, j) => (
                    <AsideLink
                      href={listItem.href}
                      key={j}
                      startWith="/projects"
                    >
                      {listItem.icon}
                      {listItem.title}
                    </AsideLink>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </aside>
      <section className="col-span-10 overflow-y-auto">{children}</section>
    </section>
  );
}
