import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getChapterContent, getCourseChapters } from "@/lib/content/course";
import { absoluteUrl, cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Mdx } from "@/components/mdx";

interface Props {
  params: {
    slug: string[];
  };
}

async function getChapterFromParams(params: Props["params"]) {
  const [courseSlug, chapterSlug] = params.slug;
  const chapter = await getChapterContent(
    courseSlug,
    chapterSlug ? chapterSlug : "index"
  );

  return chapter;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [courseSlug] = params.slug;
  const chapter = await getChapterFromParams(params);

  if (!chapter) {
    return {};
  }

  const {
    metadata: { title },
    slug,
  } = chapter;

  return {
    title,
    openGraph: {
      title: title,
      type: "article",
      url: absoluteUrl(
        slug === "index"
          ? `/course/${courseSlug}`
          : `/course/${courseSlug}/${slug}`
      ),
    },
    twitter: {
      card: "summary_large_image",
      title: title,
    },
  };
}

export default async function CoursePage({ params }: Props) {
  const chapter = await getChapterFromParams(params);

  if (!chapter) {
    notFound();
  }

  const {
    content,
    metadata: { title },
  } = chapter;

  const [courseSlug] = params.slug;
  const chapters = await getCourseChapters(courseSlug);
  const prevChapterIndex = parseInt(chapter.metadata.index.toString()) - 1;
  const nextChapterIndex = parseInt(chapter.metadata.index.toString()) + 1;

  const prevChapter = prevChapterIndex >= 0 ? chapters[prevChapterIndex] : null;
  const nextChapter =
    nextChapterIndex < chapters.length ? chapters[nextChapterIndex] : null;

  return (
    <article>
      <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
      <Mdx content={content} className="max-w-max" />
      <hr className="mt-6" />
      <div className="mt-6 flex flex-wrap justify-between gap-4">
        {prevChapter && (
          <Link
            href={`/course/${courseSlug}/${prevChapter.slug}`}
            className={cn(buttonVariants({ variant: "outline" }), "flex gap-2")}
          >
            <Icons.chevronLeft className="size-4" />
            Previous
          </Link>
        )}
        <div />
        {nextChapter && (
          <Link
            href={`/course/${courseSlug}/${nextChapter.slug}`}
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
