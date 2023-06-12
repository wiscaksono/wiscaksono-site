import { SiTypescript } from "react-icons/si";
import { FaMarkdown } from "react-icons/fa";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AsideLink from "@/components/ui/aside-link";

const data = [
  {
    title: "About me",
    list: [
      {
        title: "personal.ts",
        href: "/about/personal",
        icon: <SiTypescript className="w-4 h-4" />,
      },
      {
        title: "work.ts",
        href: "/about/work",
        icon: <SiTypescript className="w-4 h-4" />,
      },
      {
        title: "gear.md",
        href: "/about/gear",
        icon: <FaMarkdown className="w-4 h-4" />,
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
                    <AsideLink href={listItem.href} key={j} startWith="/about">
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
