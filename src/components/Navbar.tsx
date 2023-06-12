import Link from "next/link";

import NavLink from "@/components/ui/nav-link";

export default function Navbar() {
  const navMenu = [
    {
      name: "_hello",
      path: "/",
    },
    {
      name: "_about-me",
      path: "/about",
    },
    {
      name: "_projects",
      path: "/projects",
    },
    {
      name: "_contacts",
      path: "/contacts",
    },
  ];

  return (
    <nav className="grid grid-cols-12 border-b border-lines">
      <Link
        href="/"
        className="border-r border-lines px-5 py-4 text-off-white md:col-span-2 col-span-4"
      >
        Wiscaksono
      </Link>
      <ul className="md:flex items-center divide-x divide-lines col-span-10 w-max border-r border-lines hidden">
        {navMenu.map((menu, i) => (
          <NavLink key={i} href={menu.path}>
            {menu.name}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}
