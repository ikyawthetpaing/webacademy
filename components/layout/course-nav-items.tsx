"use client";

import { HTMLAttributes } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CourseMetadata } from "@/types";

import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLUListElement> {
  items: CourseMetadata[];
}

export function CourseNavItems({ items, ...props }: Props) {
  const pathname = usePathname();
  const [, , courseParam] = pathname.split("/");
  return (
    <ul {...props}>
      {items.map(({ title, slugAsParams }, index) => (
        <li key={index}>
          <Link
            href={`/course/${slugAsParams}`}
            className={cn(
              "text-muted-foreground underline-offset-4 hover:underline",
              { "underline text-foreground": slugAsParams === courseParam }
            )}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
