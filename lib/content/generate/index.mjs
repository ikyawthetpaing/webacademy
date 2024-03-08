import fs from "fs";
import path from "path";

import {
  getMDXData,
  listDirectoriesSync,
  readMDXFile,
  slugify,
} from "./utils.mjs";

const generatedPath = path.join(process.cwd(), ".generated-content");
const generateCoursePath = path.join(generatedPath, "course");
const generatePostPath = path.join(generatedPath, "post");
const generatePagePath = path.join(generatedPath, "page");
const generateAuthorPath = path.join(generatedPath, "author");

async function generateContent() {
  if (!fs.existsSync(generatedPath)) {
    fs.mkdirSync(generatedPath);
  }
  generatePages();
  generatePosts();
  generateAuthors();
  generateCourses();
}

generateContent();

function generateCourses() {
  if (!fs.existsSync(generateCoursePath)) {
    fs.mkdirSync(generateCoursePath);
  }

  const courseDirectories = listDirectoriesSync(
    path.join(process.cwd(), "content", "course")
  );

  const courses = [];

  courseDirectories?.forEach((courseDir) => {
    const specificCoursePath = path.join(generateCoursePath, courseDir);
    const courseChapterPath = path.join(specificCoursePath, "chapter");
    const courseIndexPath = path.join(
      process.cwd(),
      "content",
      "course",
      courseDir,
      "index.mdx"
    );
    const chaptersPath = path.join(
      process.cwd(),
      "content",
      "course",
      courseDir,
      "chapter"
    );

    if (!fs.existsSync(specificCoursePath)) {
      fs.mkdirSync(specificCoursePath);
    }
    if (!fs.existsSync(courseChapterPath)) {
      fs.mkdirSync(courseChapterPath);
    }
    const courseMetadata = readMDXFile(courseIndexPath).metadata;
    const course = {
      metadata: courseMetadata,
      chapters: {},
    };
    courses.push({
      ...courseMetadata,
      slug: courseDir,
    });

    const chapters = getMDXData(chaptersPath);
    chapters
      .sort((a, b) => a.metadata.index - b.metadata.index)
      .forEach((chapter) => {
        const filename = `${chapter.filename}.json`;
        const filePath = path.join(courseChapterPath, filename);
        fs.writeFileSync(filePath, JSON.stringify(chapter), "utf-8");
        course.chapters[chapter.slug] = {
          ...chapter.metadata,
          slug: chapter.slug,
        };
      });

    fs.writeFileSync(
      path.join(generateCoursePath, courseDir, "index.json"),
      JSON.stringify(course),
      "utf-8"
    );
  });

  fs.writeFileSync(
    path.join(generateCoursePath, "index.json"),
    JSON.stringify(courses.sort((a, b) => a.index - b.index)),
    "utf-8"
  );
}

function generatePosts() {
  if (!fs.existsSync(generatePostPath)) {
    fs.mkdirSync(generatePostPath);
  }

  const postsData = {};
  const postCategories = {};
  const posts = getMDXData(path.join(process.cwd(), "content", "post"));

  posts
    .sort(
      (a, b) =>
        new Date(b.metadata.date).getTime() -
        new Date(a.metadata.date).getTime()
    )
    .map((post) => {
      const { slug, metadata, filename, content } = post;
      const filePath = path.join(generatePostPath, `${post.filename}.json`);
      fs.writeFileSync(
        filePath,
        JSON.stringify({
          slug,
          ...metadata,
          content,
        }),
        "utf-8"
      );
      postsData[post.slug] = {
        slug,
        ...metadata,
      };
      if (!postCategories[slugify(post.metadata.category)]) {
        postCategories[slugify(post.metadata.category)] =
          post.metadata.category;
      }
    });

  fs.writeFileSync(
    path.join(generatePostPath, "index.json"),
    JSON.stringify(postsData),
    "utf-8"
  );

  fs.writeFileSync(
    path.join(generatePostPath, "categories.json"),
    JSON.stringify(postCategories),
    "utf-8"
  );
}

function generatePages() {
  if (!fs.existsSync(generatePagePath)) {
    fs.mkdirSync(generatePagePath);
  }

  const pages = getMDXData(path.join(process.cwd(), "content", "page"));

  pages.map((page) => {
    const { content, metadata, slug, filename } = page;
    const filePath = path.join(generatePagePath, `${filename}.json`);
    fs.writeFileSync(
      filePath,
      JSON.stringify({ slug, ...metadata, content }),
      "utf-8"
    );
  });
}

function generateAuthors() {
  if (!fs.existsSync(generateAuthorPath)) {
    fs.mkdirSync(generateAuthorPath);
  }

  const authors = getMDXData(path.join(process.cwd(), "content", "author"));

  authors.map((author) => {
    const { filename, metadata } = author;
    const filePath = path.join(generateAuthorPath, `${filename}.json`);
    fs.writeFileSync(
      filePath,
      JSON.stringify({
        ...metadata,
      }),
      "utf-8"
    );
  });
}
