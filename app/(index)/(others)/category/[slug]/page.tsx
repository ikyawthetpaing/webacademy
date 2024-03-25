import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPostCategory, postConfig } from "@/config/post";
import { absoluteUrl } from "@/lib/utils";
import { SearchPostForm } from "@/components/form/search-post-form";
import { PostList } from "@/components/post-list";
import { PostTagsFilter } from "@/components/post-tags-filter";

interface Props {
  params: {
    slug: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

export function generateMetadata({ params }: Props): Metadata {
  const category = getPostCategory(params.slug);

  if (!category) {
    return {};
  }

  const title = category.title;
  const description = `Level up web development skills through ${category.title}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: absoluteUrl(`/category/${params.slug}`),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function CategoryPostsPage({ params, searchParams }: Props) {
  const category = getPostCategory(params.slug);

  if (!category) notFound();

  return (
    <div className="grid gap-8">
      <div className="container flex flex-col items-center gap-8">
        <h1 className="font-heading text-center text-3xl font-bold">
          {category.title}
        </h1>
        <p className="text-muted-foreground max-w-xl text-center">
          {category.description}
        </p>
      </div>
      <div className="no-scrollbar container overflow-x-scroll">
        <PostTagsFilter tags={postConfig.tags} className="mx-auto" />
      </div>
      <div className="container flex justify-center">
        <SearchPostForm className="max-w-96" placeholder="Search posts" />
      </div>
      <PostList
        fixedCategory={params.slug}
        searchParams={searchParams}
        className="container"
      />
    </div>
  );
}
