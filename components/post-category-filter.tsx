"use client";

import { HTMLAttributes, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCreateQueryString } from "@/hooks/create-query-string";

import { cn, slugify } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {
  categories: string[];
}
export function Filter({ categories, className, ...props }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { createQueryString } = useCreateQueryString();

  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    const param = searchParams.get("category");
    if (
      param &&
      categories.find((categoryName) => slugify(categoryName) === param)
    ) {
      setCategory(param);
    } else {
      if (category) {
        setCategory(null);
      }
    }
  }, [categories, category, searchParams]);

  return (
    <div
      className={cn("flex max-w-4xl flex-wrap justify-center gap-1", className)}
      {...props}
    >
      {["All", ...categories].map((categoryName, index) => (
        <Link
          key={index}
          href={`${pathname}?${createQueryString({ category: categoryName === "All" ? null : slugify(categoryName), page_index: 0 })}`}
          className={cn(
            "min-w-max rounded-xl border px-3 py-1.5 duration-150 hover:px-4",
            {
              "bg-primary text-primary-foreground px-4":
                slugify(categoryName) === category ||
                (category === null && categoryName === "All"),
            }
          )}
          scroll={false}
        >
          {categoryName}
        </Link>
      ))}
    </div>
  );
}

export function PostCategoryFilter({ ...props }: Props) {
  return (
    <Suspense>
      <Filter {...props} />
    </Suspense>
  );
}
