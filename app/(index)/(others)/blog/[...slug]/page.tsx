import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAuthor } from "@/lib/content/author";
import { getPost } from "@/lib/content/post";
import { generateTableOfContents } from "@/lib/toc";
import { absoluteUrl, formatDate, slugify } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Mdx } from "@/components/mdx";
import { PostList } from "@/components/post-list";
import { PostViewCounter } from "@/components/post-view-counter";
import { SharePost } from "@/components/share-post";
import { TableOfContents } from "@/components/table-of-contents";

interface PostProps {
  params: {
    slug: string[];
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

function getPostFromParams(params: PostProps["params"]) {
  const slug = params.slug.join("/");
  const post = getPost(slug);

  if (!post) {
    null;
  }

  return post;
}

export function generateMetadata({ params }: PostProps): Metadata {
  const post = getPostFromParams(params);

  if (!post) {
    return {};
  }

  const { title, description, thumbnail, slug } = post;

  const ogUrl = new URL(thumbnail);
  ogUrl.searchParams.set("title", title);
  ogUrl.searchParams.set("type", description);
  ogUrl.searchParams.set("mode", "light");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: absoluteUrl(slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1920,
          height: 1080,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl.toString()],
    },
  };
}

export default function Post({ params, searchParams }: PostProps) {
  const post = getPostFromParams(params);

  if (!post) {
    notFound();
  }

  const {
    slug,
    title,
    description,
    date,
    thumbnail,
    category,
    author: authorSlug,
    body: { raw },
  } = post;
  const author = getAuthor(authorSlug);
  const tocItems = generateTableOfContents(raw);
  const backurl =
    typeof searchParams?.back === "string" ? searchParams.back : null;

  return (
    <div className="container flex flex-col gap-12">
      <article className="flex flex-col gap-8">
        <Link
          href={backurl ? backurl : "/blog"}
          className="flex w-max items-center gap-2 transition-all duration-150 hover:gap-4"
          scroll={false}
        >
          <Icons.arrowLeft className="size-4" />
          Back
        </Link>
        <div className="flex flex-col items-center gap-4">
          <Link
            href={`/category/${slugify(category)}`}
            className="rounded-lg border px-3 py-1 text-sm transition-all duration-150 hover:px-4"
            title="Category"
          >
            {category}
          </Link>
          <h1 className="font-heading max-w-[720px] text-center text-4xl font-bold">
            {title}
          </h1>
          <p className="text-muted-foreground text-center">
            {formatDate(date)} &#8226; <PostViewCounter slug={slug} />
          </p>
          <div className="aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={thumbnail}
              alt={title}
              width={1400}
              height={(1400 * 9) / 16}
              className="size-full object-cover"
            />
          </div>
        </div>
        <div className="flex gap-8 max-md:flex-col md:gap-14">
          <div className="flex flex-col gap-8 pt-0 md:w-60 md:pt-4 lg:w-80">
            <div className="flex flex-col gap-4">
              <h2 className="font-heading font-bold">Written by</h2>
              <Link
                href={author?.website_url!}
                target="_blank"
                className="flex w-max items-center gap-3"
              >
                <div className="bg-muted size-14 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={author?.avatar_image_url!}
                    alt={author?.name!}
                    width={56}
                    height={56}
                  />
                </div>
                <div>
                  <h3 className="flex items-center gap-2 font-semibold">
                    {author?.name} <Icons.check className="size-5 fill-none" />
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {author?.role}
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="font-heading font-bold">Share This Post</h2>
              <SharePost
                title={title}
                description={description}
                url={absoluteUrl(slug)}
              />
            </div>
            <TableOfContents tocItems={tocItems} />
          </div>
          <Mdx raw={raw} className="min-w-0 max-w-max flex-1" />
        </div>
      </article>
      <div className="flex flex-col gap-8">
        <h2 className="font-heading text-3xl font-bold">Related Posts</h2>
        <PostList
          fixedCategory={category}
          showPagination={false}
          excludes={[slug]}
        />
      </div>
    </div>
  );
}
