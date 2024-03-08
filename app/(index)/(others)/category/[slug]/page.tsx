import { Metadata } from "next";
import { notFound } from "next/navigation";

import { postConfig } from "@/config/post";
import { getPostCategory } from "@/lib/content/post";
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getPostCategory(params.slug);

  if (!category) {
    return {};
  }

  const title = category;
  const description = `Level up web development skills through ${category.toLowerCase()}.`;

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

export default async function CategoryPostsPage({
  params,
  searchParams,
}: Props) {
  const category = await getPostCategory(params.slug);

  if (!category) notFound();

  return (
    <div className="grid gap-8">
      <div className="container flex flex-col items-center gap-8">
        <h1 className="font-heading text-center text-3xl font-bold">
          {category}
        </h1>
        {/* <p className="max-w-xl text-center">{category.description}</p> */}
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
