import { HTMLAttributes } from "react";
import { PostTag } from "@/types";

import { getPostsMetadata } from "@/lib/content/post";
import { cn, isString } from "@/lib/utils";
import { PostItem } from "@/components/post-item";

import { Empty } from "./empty";
import { PaginationButton } from "./pagination-button";

interface Props extends HTMLAttributes<HTMLDivElement> {
  excludes?: string[];
  showPagination?: boolean;
  amount?: number;
  fixedCategory?: string;
  fixedTag?: PostTag["value"];
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

export async function PostList({
  excludes,
  showPagination = true,
  amount,
  fixedCategory,
  fixedTag,
  searchParams,
  className,
  ...props
}: Props) {
  const page_index = isString(searchParams?.page_index)
    ? parseInt(searchParams.page_index)
    : 0;
  const query = isString(searchParams?.query) ? searchParams.query : null;
  const tag = fixedTag
    ? fixedTag
    : isString(searchParams?.tag)
      ? (searchParams.tag as PostTag["value"])
      : null;
  const category = fixedCategory
    ? fixedCategory
    : isString(searchParams?.category)
      ? searchParams.category
      : null;
  const { items, pageCount } = await getPostsMetadata({
    excludes,
    pageIndex: page_index,
    perPage: amount,
    category,
    tag,
    query,
  });

  return (
    <>
      {pageCount > 0 ? (
        <div className="grid gap-8">
          <div
            className={cn(
              "xs:grid-cols-2 grid grid-cols-1 gap-8 md:grid-cols-3",
              className
            )}
            {...props}
          >
            {items.map((post, index) => (
              <PostItem key={index} post={post} />
            ))}
          </div>
          {showPagination && pageCount ? (
            <PaginationButton page_index={page_index} pageCount={pageCount} />
          ) : null}
        </div>
      ) : (
        <Empty iconName="newspaper" message="No posts found" />
      )}
    </>
  );
}
