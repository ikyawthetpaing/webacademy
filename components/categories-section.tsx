import { HTMLAttributes } from "react";
import Link from "next/link";
import { PostCategory } from "@/types";

import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {
  categories: PostCategory[];
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
        {categories.map(({ title, slug }, index) => (
          <Link key={index} href={`/category/${slug}`}>
            <div className="min-w-max rounded-xl border px-4 py-2 duration-150 hover:px-6">
              {title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
