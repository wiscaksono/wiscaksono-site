import { allAbouts } from "contentlayer/generated";
import { SiTypescript } from "react-icons/si";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AsideLink from "@/components/ui/aside-link";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-12 overflow-hidden h-full">
      <aside className="col-span-2 border-r border-lines md:block hidden">
        <Accordion type="single" collapsible defaultValue="about">
          <AccordionItem value={"about"} defaultChecked>
            <AccordionTrigger
              className="border-b border-lines px-5 py-2.5"
              event="About me accordion"
            >
              About Me
            </AccordionTrigger>
            <AccordionContent className="mt-5">
              <ul className="space-y-1">
                {allAbouts.map(({ title }) => (
                  <AsideLink
                    href={title}
                    key={title}
                    startWith="/about"
                    title={title}
                  >
                    <SiTypescript className="w-4 h-4 shrink-0" />
                    {title}
                  </AsideLink>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </aside>
      <section className="md:col-span-10 col-span-12 overflow-y-auto relative h-[80vh] md:h-auto">
        {children}
      </section>
    </section>
  );
}
