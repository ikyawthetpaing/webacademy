import { Metadata } from "next";

import { postCategories, postConfig } from "@/config/post";
import { absoluteUrl } from "@/lib/utils";
import { SearchPostForm } from "@/components/form/search-post-form";
import { PostCategoryFilter } from "@/components/post-category-filter";
import { PostList } from "@/components/post-list";
import { PostTagsFilter } from "@/components/post-tags-filter";

interface Props {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

export function generateMetadata(): Metadata {
  const title = "Learn to Web Development with Our Blog Posts";
  const description =
    "Learn web development skills through our tutorials, articles, and blog posts";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: absoluteUrl("/blog"),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function BlogPage({ searchParams }: Props) {
  return (
    <section className="container grid gap-8">
      <h1 className="font-heading text-center text-3xl font-bold">
        Learn to Code with Our Tutorials & Articles
      </h1>
      <PostCategoryFilter categories={postCategories} className="mx-auto" />
      <PostTagsFilter tags={postConfig.tags} className="mx-auto" />
      <SearchPostForm className="mx-auto h-10 max-w-96" />
      <PostList searchParams={searchParams} />
    </section>
  );
}
