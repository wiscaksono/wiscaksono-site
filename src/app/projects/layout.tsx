import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AsideLink from "@/components/ui/aside-link";

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
        title: "React Native",
        href: "/projects/react-native",
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
      <aside className="md:col-span-3 lg:col-span-2 border-r border-lines hidden md:block">
        <Accordion type="single" collapsible defaultValue="item-0">
          {data.map((item, i) => (
            <AccordionItem value={`item-${i}`} key={i}>
              <AccordionTrigger
                className="border-b border-lines px-5 py-2.5"
                event="Projects accordion"
              >
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="mt-5">
                <ul className="space-y-1">
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
      <section className="md:col-span-9 lg:col-span-10 col-span-12 overflow-y-auto relative">
        {children}
      </section>
    </section>
  );
}
