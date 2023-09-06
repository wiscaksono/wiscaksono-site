"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  startWith: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function AsideLink({
  href,
  children,
  startWith,
  ...props
}: Props) {
  const segment = useSelectedLayoutSegment();
  const regex = new RegExp(`${startWith}/(.*?)$`);
  const isActive = segment === (href.match(regex) || [])[1];

  return (
    <Link
      href={href}
      className={cn(
        isActive && "text-white bg-off-white/10",
        "w-full hover:text-white transition-colors flex items-center gap-x-2.5 hover:bg-off-white/10 px-5 py-1"
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
