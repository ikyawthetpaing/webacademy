"use client";

import Link from "next/link";
import { useCourseChapters } from "@/context/course-chapters";

import { cn } from "@/lib/utils";

interface Props {
  courseParam: string;
  chapterParam: string;
}

export function ChaptersSidebar({ chapterParam, courseParam }: Props) {
  const { chapters } = useCourseChapters();
  return (
    <div className="flex flex-col gap-1 py-16">
      {chapters?.map(({ title, slugAsParams }, index) => (
        <Link
          key={index}
          href={`/course/${slugAsParams}`}
          className={cn(
            "hover:border-border text-muted-foreground rounded-lg border border-transparent px-4 py-1",
            {
              "bg-secondary text-secondary-foreground":
                slugAsParams ===
                (chapterParam
                  ? `${courseParam}/${chapterParam}`
                  : `${courseParam}`),
            }
          )}
        >
          {title}
        </Link>
      ))}
    </div>
  );
}
