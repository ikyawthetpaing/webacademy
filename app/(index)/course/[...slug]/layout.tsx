import { ScrollArea } from "@/components/ui/scroll-area";
import { ChaptersSidebar } from "@/components/chapters-sidebar";

interface Props {
  children: React.ReactNode;
  params: {
    slug: string[];
  };
}

export default function CourseChapterLayout({ params, children }: Props) {
  const [courseParam, chapterParam] = params.slug;
  return (
    <div className="container flex gap-8">
      <aside className="top-24 hidden h-[calc(100vh-96px)] w-[240px] shrink-0 border-r md:sticky md:block">
        <ScrollArea className="h-full pr-6">
          <ChaptersSidebar
            courseParam={courseParam}
            chapterParam={chapterParam}
          />
        </ScrollArea>
      </aside>
      <div className="w-full min-w-0 pt-16">{children}</div>
    </div>
  );
}
