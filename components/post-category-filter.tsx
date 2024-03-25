"use client";

import { HTMLAttributes, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCreateQueryString } from "@/hooks/create-query-string";
import { PostCategory } from "@/types";

import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {
  categories: PostCategory[];
}
export function Filter({ categories, className, ...props }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { createQueryString } = useCreateQueryString();

  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    const param = searchParams.get("category");
    if (param && categories.find(({ slug }) => slug === param)) {
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
      {[{ title: "All", slug: null }, ...categories].map(
        ({ title, slug }, index) => (
          <Link
            key={index}
            href={`${pathname}?${createQueryString({ category: slug, page_index: 0 })}`}
            className={cn(
              "min-w-max rounded-xl border px-3 py-1.5 duration-150 hover:px-4",
              {
                "bg-primary text-primary-foreground px-4": slug === category,
              }
            )}
            scroll={false}
          >
            {title}
          </Link>
        )
      )}
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
