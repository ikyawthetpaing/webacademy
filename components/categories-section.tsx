import { HTMLAttributes } from "react";
import Link from "next/link";

import { cn, slugify } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {
  categories: string[];
}

export function CategoriesSection({ categories, className, ...props }: Props) {
  return (
    <section
      className={cn("flex max-w-4xl flex-col gap-8", className)}
      {...props}
    >
      <h2 className="font-heading text-center text-2xl font-bold sm:text-3xl">
        Blog Categories
      </h2>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category, index) => (
          <Link key={index} href={`/category/${slugify(category)}`}>
            <div className="min-w-max rounded-xl border px-4 py-2 duration-150 hover:px-6">
              {category}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
