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

export default async function CourseChapteLayout({ params, children }: Props) {
  const [courseSlug, chapterSlug] = params.slug;
  const chapters = await getCourseChapters(courseSlug);
  return (
    <div className="container flex gap-8">
      <aside className="top-24 hidden h-[calc(100vh-96px)] w-[240px] shrink-0 border-r md:sticky md:block">
        <ScrollArea className="h-full pr-6">
          <div className="flex flex-col gap-1 py-16">
            {chapters?.map(({ title, slug }, index) => (
              <Link
                key={index}
                href={
                  slug === "index"
                    ? `/course/${courseSlug}`
                    : `/course/${courseSlug}/${slug}`
                }
                className={cn(
                  "hover:border-border text-muted-foreground rounded-lg border border-transparent px-4 py-1",
                  {
                    "bg-secondary text-secondary-foreground":
                      slug === chapterSlug ||
                      (!chapterSlug && slug === "index"),
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
