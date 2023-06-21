import Link from "next/link";
import { SiTypescript } from "react-icons/si";
import { FaMarkdown } from "react-icons/fa";
import { RiReactjsLine, RiHtml5Fill } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import { HiTerminal } from "react-icons/hi";
import { FaRegEnvelope } from "react-icons/fa";
import { BsWhatsapp, BsInstagram, BsLinkedin } from "react-icons/bs";
import { TbBrandUpwork } from "react-icons/tb";

import { Menu } from "lucide-react";
import NavLink from "@/components/ui/nav-link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const navMenu = [
  {
    name: "_hello",
    path: "/",
  },
  {
    name: "_about-me",
    path: "/about",
    child: [
      {
        name: "personal.ts",
        path: "/about/personal",
        icon: <SiTypescript className="w-4 h-4 shrink-0" />,
      },
      {
        name: "work.ts",
        path: "/about/work",
        icon: <SiTypescript className="w-4 h-4 shrink-0" />,
      },
      {
        name: "gear.md",
        path: "/about/gear",
        icon: <FaMarkdown className="w-4 h-4 shrink-0" />,
      },
    ],
  },
  {
    name: "_projects",
    path: "/projects",
    child: [
      {
        name: "All Projects",
        path: "/projects/all-projects",
        icon: <HiTerminal className="w-4 h-4" />,
      },
      {
        name: "React",
        path: "/projects/react",
        icon: <RiReactjsLine className="w-4 h-4" />,
      },
      {
        name: "Next",
        path: "/projects/next",
        icon: <TbBrandNextjs className="w-4 h-4" />,
      },
      {
        name: "HTML",
        path: "/projects/html",
        icon: <RiHtml5Fill className="w-4 h-4" />,
      },
    ],
  },
  {
    name: "_contacts",
    path: "/contacts",
    child: [
      {
        name: "Email",
        path: "mailto:wwicaksono96@gmail.com",
        icon: <FaRegEnvelope className="w-4 h-4" />,
      },
      {
        name: "Upwork",
        path: "https://www.upwork.com/freelancers/~01df34d78e05fa69bf",
        icon: <TbBrandUpwork className="w-4 h-4" />,
      },
      {
        name: "WhatsApp",
        path: "https://wa.me/+6287885002327",
        icon: <BsWhatsapp className="w-4 h-4" />,
      },
      {
        name: "LinkedIn",
        path: "https://www.linkedin.com/in/wiscaksono/",
        icon: <BsLinkedin className="w-4 h-4" />,
      },
      {
        name: "Instagram",
        path: "https://www.instagram.com/amachoker/",
        icon: <BsInstagram className="w-4 h-4" />,
      },
    ],
  },
];

export default function Navbar() {
  return (
    <nav className="md:grid grid-cols-12 border-b border-lines flex items-center justify-between">
      <Link
        href="/"
        className="md:border-r border-lines md:px-5 px-2.5 py-4 text-off-white md:col-span-3 lg:col-span-2 shrink-0 hover:text-white transition-colors"
      >
        Wiscaksono
      </Link>
      <ul className="md:flex items-center divide-x divide-lines md:col-span-9 lg:col-span-10 w-max border-r border-lines hidden shrink-0">
        {navMenu.map((menu, i) => (
          <NavLink key={i} href={menu.path}>
            {menu.name}
          </NavLink>
        ))}
      </ul>
      <MobileSheets />
    </nav>
  );
}

const MobileSheets = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="text-off-white ml-auto px-2.5 block md:hidden">
          <Menu />
        </button>
      </SheetTrigger>
      <SheetContent size="lg">
        <SheetHeader>
          <SheetTitle className="mb-10">Wiscaksono</SheetTitle>
          <Accordion type="multiple" className="space-y-4">
            {navMenu.map((menu, i) => (
              <AccordionItem value={menu.name} key={i}>
                <AccordionTrigger
                  withIcon={menu.name === "_hello" ? false : true}
                  className="py-0"
                >
                  {menu.name}
                </AccordionTrigger>
                {menu.child && (
                  <AccordionContent className="text-left ml-2.5">
                    {menu.child.map((child, i) => (
                      <>
                        <Link
                          className="flex gap-x-2.5 items-center mb-2 last:mb-0"
                          href={child.path}
                          key={i}
                          target={
                            menu.name === "_contacts" ? "_blank" : "_self"
                          }
                        >
                          {child.icon}
                          {child.name}
                        </Link>
                      </>
                    ))}
                  </AccordionContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
