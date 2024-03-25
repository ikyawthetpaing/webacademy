import { CourseMetadata } from "@/types";

export const courses: CourseMetadata[] = [
  { title: "HTML", icon: "html", slugAsParams: "html" },
  { title: "CSS", icon: "css", slugAsParams: "css" },
  {
    title: "JavaScript",
    icon: "javascript",
    slugAsParams: "javascript",
  },
  { title: "React", icon: "react", slugAsParams: "react" },
  { title: "NodeJS", icon: "nodejs", slugAsParams: "nodejs" },
  { title: "MongoDB", icon: "mongodb", slugAsParams: "mongodb" },
  {
    title: "Typescript",
    icon: "typescript",
    slugAsParams: "typescript",
  },
  { title: "MySQL", icon: "mysql", slugAsParams: "mysql" },
  { title: "Python", icon: "python", slugAsParams: "python" },
  { title: "Django", icon: "django", slugAsParams: "django" },
];

export function getCourseTitle(courseParam: string) {
  return (
    courses.find(({ slugAsParams }) => slugAsParams === courseParam)?.title ||
    null
  );
}
