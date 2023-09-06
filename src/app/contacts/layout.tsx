import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AsideLink from "@/components/ui/aside-link";
import { FaRegEnvelope } from "react-icons/fa";
import { BsWhatsapp, BsInstagram, BsLinkedin } from "react-icons/bs";
import { TbBrandUpwork } from "react-icons/tb";

const data = [
  {
    title: "Contact",
    list: [
      {
        title: "Email",
        href: "mailto:wwicaksono96@gmail.com",
        icon: <FaRegEnvelope className="w-4 h-4" />,
      },
      {
        title: "Upwork",
        href: "https://www.upwork.com/freelancers/~01df34d78e05fa69bf",
        icon: <TbBrandUpwork className="w-4 h-4" />,
      },
      {
        title: "WhatsApp",
        href: "https://wa.me/+6287885002327",
        icon: <BsWhatsapp className="w-4 h-4" />,
      },
      {
        title: "LinkedIn",
        href: "https://www.linkedin.com/in/wiscaksono/",
        icon: <BsLinkedin className="w-4 h-4" />,
      },
      {
        title: "Instagram",
        href: "https://www.instagram.com/amachoker/",
        icon: <BsInstagram className="w-4 h-4" />,
      },
    ],
  },
];

export const metadata: Metadata = {
  title: "Wiscaksono - Contacts",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-12 overflow-hidden">
      <aside className="col-span-2 border-r border-lines hidden md:block">
        <Accordion type="single" collapsible defaultValue="item-0">
          {data.map((item, i) => (
            <AccordionItem value={`item-${i}`} key={i}>
              <AccordionTrigger
                className="border-b border-lines px-5 py-2.5"
                event="Contact accordion"
              >
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="mt-5">
                <ul className="space-y-1">
                  {item.list.map((listItem, j) => (
                    <AsideLink
                      href={listItem.href}
                      key={j}
                      startWith="/about"
                      event={listItem.title + "link"}
                    >
                      <span className="shrink-0">{listItem.icon}</span>
                      {listItem.title}
                    </AsideLink>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </aside>
      <section className="md:col-span-10 col-span-12 overflow-y-auto relative">
        {children}
      </section>
    </section>
  );
}
