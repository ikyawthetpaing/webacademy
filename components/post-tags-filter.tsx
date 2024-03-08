"use client";

import { HTMLAttributes, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCreateQueryString } from "@/hooks/create-query-string";
import { PostTag } from "@/types";

import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {
  tags: PostTag[];
}
function Filter({ tags, className, ...props }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { createQueryString } = useCreateQueryString();

  const [tag, setTag] = useState<string | null>(null);

  useEffect(() => {
    const param = searchParams.get("tag");
    if (param && tags.find(({ value }) => value === param)) {
      setTag(param);
    } else {
      if (tag) {
        setTag(null);
      }
    }
  }, [searchParams, tag, tags]);

  return (
    <div className={cn("flex w-max rounded-lg border", className)} {...props}>
      {[{ label: "Latest", value: null }, ...tags].map(({ label, value }) => {
        const isActive = value === tag;
        return (
          <Link
            key={value}
            href={`${pathname}?${createQueryString({ tag: value, page_index: 0 })}`}
            className={cn("text-muted-foreground rounded-lg px-4 py-1", {
              "bg-primary text-primary-foreground": isActive,
            })}
            scroll={false}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}

export function PostTagsFilter({ ...props }: Props) {
  return (
    <Suspense>
      <Filter {...props} />
    </Suspense>
  );
}
