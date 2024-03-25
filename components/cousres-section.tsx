import { HTMLAttributes } from "react";
import Link from "next/link";
import { CourseMetadata } from "@/types";

// import { CourseMetadata } from "@/lib/content/course";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons";

interface Props extends HTMLAttributes<HTMLDivElement> {
  courses: CourseMetadata[];
}

export function CousresSection({ courses, className, ...props }: Props) {
  return (
    <section className={cn("flex flex-col gap-8", className)} {...props}>
      <h2 className="font-heading text-center text-2xl font-bold sm:text-3xl">
        Learn Web Developement with Our Free Courses
      </h2>
      <div className="flex flex-wrap gap-4">
        {courses.map(({ title, icon, slugAsParams }, index) => (
          <Link
            key={index}
            href={`/course/${slugAsParams}`}
            className="bg-muted-foreground group relative aspect-square max-h-36 min-w-36 flex-1 overflow-hidden rounded-2xl sm:max-h-44 sm:min-w-44"
          >
            <Icon
              name={icon}
              className="fill-muted size-full duration-150 group-hover:scale-110"
            />
            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[rgba(255,255,255,0.45)] px-6 py-3 backdrop-blur-sm dark:bg-[rgba(0,0,0,0.45)]">
              {title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
