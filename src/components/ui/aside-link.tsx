"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  startWith: string;
  event?: string;
  title?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function AsideLink({
  href,
  children,
  startWith,
  event,
  title,
  ...props
}: Props) {
  const segment = useSelectedLayoutSegment();
  const tag = useSearchParams().get("tag");
  const isActive = tag === title || segment === title;

  return (
    <Link
      href={href}
      data-umami-event={event}
      className={cn(
        isActive && "text-white bg-off-white/10",
        "w-full hover:text-white transition-colors flex items-center gap-x-2.5 hover:bg-off-white/10 px-5 py-1",
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
