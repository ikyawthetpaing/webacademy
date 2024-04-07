"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Chapter } from "@/.contentlayer/generated";

import { ContentMetadata, getCourseChapters } from "@/lib/content/course";

type CourseChaptersContextType = {
  chapters: ContentMetadata<Chapter>[];
};

const CourseChaptersContext = createContext<CourseChaptersContextType>({
  chapters: [],
});

export const useCourseChapters = () => {
  const context = useContext(CourseChaptersContext);
  if (!context) {
    throw new Error(
      "useCourseChapters must be used within a CourseChaptersProvider"
    );
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

export function CourseChaptersProvider({ children }: Props) {
  const pathname = usePathname();
  const [, , courseParam] = pathname.split("/");
  const [chapters, setChapters] = useState<
    CourseChaptersContextType["chapters"]
  >([]);
  useEffect(() => {
    if (courseParam) {
      setChapters(getCourseChapters(courseParam));
    } else {
      setChapters([]);
    }
    console.log(courseParam);
  }, [courseParam]);
  const courseChaptersContextValue: CourseChaptersContextType = {
    chapters,
  };
  return (
    <CourseChaptersContext.Provider value={courseChaptersContextValue}>
      {children}
    </CourseChaptersContext.Provider>
  );
}
