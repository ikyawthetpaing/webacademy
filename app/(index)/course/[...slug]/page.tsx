import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getChapter, getCourseChapters } from "@/lib/content/course";
import { absoluteUrl, cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
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

  const [courseSlug] = params.slug;
  const chapters = getCourseChapters(courseSlug);
  const prevChapterIndex = index - 1;
  const nextChapterIndex = index + 1;

  const prevChapter = prevChapterIndex >= 0 ? chapters[prevChapterIndex] : null;
  const nextChapter =
    nextChapterIndex < chapters.length ? chapters[nextChapterIndex] : null;

  return (
    <article>
      <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
      <Mdx raw={body.raw} className="max-w-max" />
      <hr className="mt-6" />
      <div className="mt-6 flex flex-wrap justify-between gap-4">
        {prevChapter && (
          <Link
            href={prevChapter.slug}
            className={cn(buttonVariants({ variant: "outline" }), "flex gap-2")}
          >
            <Icons.chevronLeft className="size-4" />
            Previous
          </Link>
        )}
        <div />
        {nextChapter && (
          <Link
            href={nextChapter.slug}
            className={cn(buttonVariants({ variant: "outline" }), "flex gap-2")}
          >
            Next
            <Icons.chevronRight className="size-4" />
          </Link>
        )}
      </div>
    </article>
  );
}
