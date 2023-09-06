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
        icon: <SiTypescript className="w-4 h-4 shrink-0" />,
      },
      {
        title: "work.ts",
        href: "/about/work",
        icon: <SiTypescript className="w-4 h-4 shrink-0" />,
      },
      {
        title: "gear.md",
        href: "/about/gear",
        icon: <FaMarkdown className="w-4 h-4 shrink-0" />,
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
      <aside className="col-span-2 border-r border-lines md:block hidden">
        <Accordion type="single" collapsible defaultValue="item-0">
          {data.map((item, i) => (
            <AccordionItem value={`item-${i}`} key={i}>
              <AccordionTrigger
                className="border-b border-lines px-5 py-2.5"
                event="About me accordion"
              >
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="mt-5">
                <ul className="space-y-1">
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
      <section className="md:col-span-10 col-span-12 overflow-y-auto relative h-[80vh] md:h-auto">
        {children}
      </section>
    </section>
  );
}
