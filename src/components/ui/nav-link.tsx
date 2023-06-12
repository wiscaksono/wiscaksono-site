"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
};

export default function NavLink({ href, children }: Props) {
  const segment = useSelectedLayoutSegment();
  const isActive = segment === href.slice(1);

  return (
    <li className="relative group">
      <Link
        href={href}
        className={cn(
          "w-full h-full block py-4 px-5 text-off-white transition-colors",
          "group-hover:text-white",
          isActive ? "text-white" : ""
        )}
      >
        {children}
      </Link>
      <div
        className={cn(
          "absolute bottom-0 h-0.5 bg-orange opacity-0 transition-all duration-500",
          "group-hover:opacity-100 group-hover:w-full",
          isActive ? "opacity-100 w-full" : "w-0"
        )}
      />
    </li>
  );
}
