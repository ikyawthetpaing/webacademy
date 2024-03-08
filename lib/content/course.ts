"use server";

import { promises as fs } from "fs";
import path from "path";
import { IconName } from "@/types";

export interface Chapter {
  index: number;
  title: string;
  slug: string;
}

export interface CourseMetadata {
  index: number;
  title: string;
  icon: IconName;
  slug: string;
}

interface CourseData {
  metadata: CourseMetadata;
  chapters: Record<string, Chapter>;
}

interface ChapterContent {
  metadata: {
    index: number;
    title: string;
  };
  slug: string;
  content: string;
}

export async function getChapterContent(
  course: string,
  chapter: string
): Promise<ChapterContent | null> {
  try {
    const filePath = getChapterFilePath(course, chapter);
    const chapterData = await fs.readFile(filePath, "utf-8");
    const chapterJson: ChapterContent = JSON.parse(chapterData);
    return chapterJson;
  } catch (error) {
    console.error(
      `Error fetching chapter ${chapter} for course ${course}:`,
      error
    );
    return null;
  }
}

export async function getCourseChapters(course: string) {
  try {
    const filePath = getCourseIndexPath(course);
    const courseData = await fs.readFile(filePath, "utf-8");
    const data: CourseData = JSON.parse(courseData);

    const chapters = Object.values(data.chapters || {});
    return chapters;
  } catch (error) {
    console.error(`Error fetching chapters for course ${course}:`, error);
    return [];
  }
}

export async function getCoursesMetadata() {
  try {
    const filePath = path.join(
      process.cwd(),
      ".generated-content",
      "course",
      "index.json"
    );
    const coursesData = await fs.readFile(filePath, "utf-8");
    const data: CourseMetadata[] = JSON.parse(coursesData);
    return data;
  } catch (error) {
    console.error(`Error fetching for courses:`, error);
    return [];
  }
}

export async function getCourseTitle(courseSlug: string) {
  try {
    const coursesMetadata = await getCoursesMetadata();
    return (
      coursesMetadata.find(({ slug }) => slug === courseSlug)?.title || null
    );
  } catch (error) {
    console.error(`Error fetching for course title:`, error);
    return null;
  }
}

const getChapterFilePath = (course: string, chapter: string) =>
  path.join(
    process.cwd(),
    ".generated-content",
    "course",
    course,
    "chapter",
    `${chapter}.mdx.json`
  );

const getCourseIndexPath = (slug: string) =>
  path.join(process.cwd(), ".generated-content", "course", slug, "index.json");
