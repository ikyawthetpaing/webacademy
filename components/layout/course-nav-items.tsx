"use client";

import { HTMLAttributes } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CourseMetadata } from "@/lib/content/course";
import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLUListElement> {
  items: CourseMetadata[];
}

export function CourseNavItems({ items, ...props }: Props) {
  const pathname = usePathname();
  const [, , courseSlug] = pathname.split("/");
  return (
    <ul {...props}>
      {items.map(({ title, slug }, index) => (
        <li key={index}>
          <Link
            href={`/course/${slug}`}
            className={cn(
              "text-muted-foreground underline-offset-4 hover:underline",
              { "underline text-foreground": slug === courseSlug }
            )}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
