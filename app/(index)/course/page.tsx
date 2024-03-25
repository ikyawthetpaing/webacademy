import { Metadata } from "next";

import { courses } from "@/config/course";
import { absoluteUrl } from "@/lib/utils";
import { CousresSection } from "@/components/cousres-section";

export function generateMetadata(): Metadata {
  const title = "Learn Web Development with Our Free Courses";
  const description =
    "Master web developement skills with our free, step-by-step courses.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: absoluteUrl("/course"),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CoursesPage() {
  return <CousresSection courses={courses} className="container mt-16" />;
}
