import Link from "next/link";

import { getCourseChapters } from "@/lib/content/course";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  children: React.ReactNode;
  params: {
    slug: string[];
  };
}

export default function CourseChapterLayout({ params, children }: Props) {
  const [courseParam, chapterParam] = params.slug;
  const chapters = getCourseChapters(courseParam);
  return (
    <div className="container flex gap-8">
      <aside className="top-24 hidden h-[calc(100vh-96px)] w-[240px] shrink-0 border-r md:sticky md:block">
        <ScrollArea className="h-full pr-6">
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
        </ScrollArea>
      </aside>
      <div className="w-full min-w-0 pt-16">{children}</div>
    </div>
  );
}
