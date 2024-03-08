"use client";

import {
  FormEvent,
  HTMLAttributes,
  Suspense,
  useEffect,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCreateQueryString } from "@/hooks/create-query-string";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";

interface Props extends HTMLAttributes<HTMLDivElement> {
  actionUrl?: string;
  onSubmit?: () => void;
  placeholder?: string;
}

function Form({
  actionUrl,
  onSubmit: onSubmitProp,
  placeholder,
  className,
  ...props
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString } = useCreateQueryString();

  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const param = searchParams.get("query");
    setQuery(param || "");
  }, [searchParams]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(
      `${actionUrl || pathname}?${createQueryString({ query: query || null, page_index: 0 })}`,
      {
        scroll: false,
      }
    );
    if (onSubmitProp) onSubmitProp();
  };

  return (
    <div className={cn("w-full max-w-56", className)} {...props}>
      <form
        onSubmit={onSubmit}
        className="flex h-full overflow-hidden rounded-lg border"
      >
        <Button size="icon" variant="ghost" className="h-full rounded-lg">
          <Icons.search className="size-4" />
        </Button>
        <Input
          placeholder={placeholder ? placeholder : "Search posts"}
          className="h-full border-none bg-transparent pl-0 outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus={props.autoFocus}
        />
      </form>
    </div>
  );
}

export function SearchPostForm({ ...props }: Props) {
  return (
    <Suspense>
      <Form {...props} />
    </Suspense>
  );
}
