import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getChapter } from "@/lib/content/course";
import { absoluteUrl } from "@/lib/utils";
import { ChaptersPager } from "@/components/chapters-pager";
import { Mdx } from "@/components/mdx";

interface Props {
  params: {
    slug: string[];
  };
}

function getChapterFromParams(params: Props["params"]) {
  const [courseParam, chapterParam] = params.slug;
  const chapter = getChapter(courseParam, chapterParam);

  return chapter;
}

export function generateMetadata({ params }: Props): Metadata {
  const chapter = getChapterFromParams(params);

  if (!chapter) {
    return {};
  }

  const { title, slug } = chapter;

  return {
    title,
    openGraph: {
      title: title,
      type: "article",
      url: absoluteUrl(slug),
    },
    twitter: {
      card: "summary_large_image",
      title: title,
    },
  };
}

export default function CoursePage({ params }: Props) {
  const chapter = getChapterFromParams(params);

  if (!chapter) {
    notFound();
  }

  const { title, body, index } = chapter;

  return (
    <article>
      <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
      <Mdx raw={body.raw} className="max-w-max" />
      <hr className="mt-6" />
      <ChaptersPager currentChapterIndex={index} />
    </article>
  );
}
