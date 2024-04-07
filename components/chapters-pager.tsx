"use client";

import Link from "next/link";
import { useCourseChapters } from "@/context/course-chapters";

import { cn } from "@/lib/utils";

import { Icons } from "./icons";
import { buttonVariants } from "./ui/button";

interface Props {
  currentChapterIndex: number;
}

export function ChaptersPager({ currentChapterIndex }: Props) {
  const { chapters } = useCourseChapters();
  const prevChapterIndex = currentChapterIndex - 1;
  const nextChapterIndex = currentChapterIndex + 1;

  const prevChapter = prevChapterIndex >= 0 ? chapters[prevChapterIndex] : null;
  const nextChapter =
    nextChapterIndex < chapters.length ? chapters[nextChapterIndex] : null;

  return (
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
  );
}
