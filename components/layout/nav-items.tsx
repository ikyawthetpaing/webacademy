import { HTMLAttributes } from "react";
import Link from "next/link";
import { NavItem } from "@/types";

import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLUListElement> {
  items: NavItem[];
}

export function NavItems({ items, className, ...props }: Props) {
  return (
    <nav>
      <ul className={cn("flex gap-4", className)} {...props}>
        {items.map(({ label, url }, index) => (
          <li key={index}>
            <Link href={url} className="underline-offset-4 hover:underline">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
