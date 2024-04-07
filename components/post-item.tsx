import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/.contentlayer/generated";

import { getPostCategory } from "@/config/post";
import { absoluteUrl, formatDate } from "@/lib/utils";

interface Props {
  post: Post;
}

export function PostItem({ post }: Props) {
  const { title, category: categorySlug, date, slug, thumbnail } = post;
  const parsedUrl = new URL(headers().get("x-url") || absoluteUrl("/blog"));
  const pathAndQuery = parsedUrl.pathname + parsedUrl.search;
  const url = `${slug}?back=${pathAndQuery}`;
  const category = getPostCategory(categorySlug);

  return (
    <div className="grid gap-2">
      <div className="relative aspect-video overflow-hidden rounded-2xl border">
        <Link href={url}>
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
          />
        </Link>
        <Link
          href={`/category/${category?.slug}`}
          className="absolute right-4 top-4 rounded-lg bg-[rgba(255,255,255,0.45)] px-3 py-1 text-sm capitalize backdrop-blur-sm dark:bg-[rgba(0,0,0,0.45)]"
        >
          {category?.title}
        </Link>
      </div>
      <p className="text-sm font-light uppercase">{formatDate(date)}</p>
      <Link href={url}>
        <h3 className="text-xl font-bold">{title}</h3>
      </Link>
    </div>
  );
}
