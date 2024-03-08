"use server";

import { promises as fs } from "fs";
import path from "path";
import { PostTag } from "@/types";

import { getPostViewsCount } from "@/lib/db/action/post-views";
import { slugify } from "@/lib/utils";

const postsIndexFilePath = path.join(
  process.cwd(),
  ".generated-content",
  "post",
  "index.json"
);
const postCategoriesFilePath = path.join(
  process.cwd(),
  ".generated-content",
  "post",
  "categories.json"
);
const postDataFilePath = (slug: string) =>
  path.join(process.cwd(), ".generated-content", "post", `${slug}.mdx.json`);

export interface Post {
  slug: string;
  title: string;
  thumbnail: string;
  description: string;
  category: string;
  date: string;
  featured: boolean;
  author: string;
}

interface PostWithContent extends Post {
  content: string;
}

export async function getPostsMetadata({
  excludes = [],
  pageIndex = 0,
  perPage = 6,
  tag,
  category = null,
  query = null,
}: {
  excludes?: string[];
  pageIndex?: number;
  perPage?: number;
  tag?: PostTag["value"] | null;
  category?: string | null;
  query?: string | null;
}) {
  try {
    const postsData = await fs.readFile(postsIndexFilePath, "utf-8");
    const postsJson: Record<string, Post> = JSON.parse(postsData);
    let postsMetadata = Object.values(postsJson).map((post) => ({
      ...post,
      views: 0,
    }));

    if (excludes.length > 0) {
      postsMetadata = postsMetadata.filter(
        ({ slug }) => !excludes.includes(slug)
      );
    }

    if (category) {
      postsMetadata = postsMetadata.filter(
        ({ category: _category }) => slugify(_category) === category
      );
    }

    if (query) {
      postsMetadata = postsMetadata.filter(({ title }) =>
        title.toLowerCase().includes(query.toLowerCase())
      );
    }

    switch (tag) {
      case "featured":
        postsMetadata = postsMetadata.filter(({ featured }) => featured);
        break;
      case "popular":
        postsMetadata = await Promise.all(
          postsMetadata.map(async (metadata) => {
            const views = await getPostViewsCount(metadata.slug);
            return { ...metadata, views };
          })
        );
        postsMetadata.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      default:
        break;
    }

    const paginatedItems = getPageItems(postsMetadata, pageIndex, perPage);
    const pageCount = Math.ceil(postsMetadata.length / perPage);

    return { items: paginatedItems, pageCount };
  } catch (error) {
    console.error("Error getting posts metadata:", error);
    return { items: [], pageCount: 0 };
  }
}

function getPageItems<T>(
  inputArray: T[],
  pageIndex: number,
  pageSize: number
): T[] {
  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  return inputArray.slice(startIndex, endIndex);
}

export async function getPost(slug: string) {
  try {
    const postData = await fs.readFile(postDataFilePath(slug), "utf-8");
    return JSON.parse(postData) as PostWithContent;
  } catch (error) {
    console.error("Error getting post:", error);
    return null;
  }
}

export async function getPostCategories() {
  try {
    const categoriesData = await fs.readFile(postCategoriesFilePath, "utf-8");
    const categoriesJson = JSON.parse(categoriesData);
    return Object.values(categoriesJson) as string[];
  } catch (error) {
    console.error("Error getting post categories:", error);
    return [];
  }
}

export async function getPostCategory(slug: string) {
  try {
    const categoriesData = await fs.readFile(postCategoriesFilePath, "utf-8");
    const categoriesJson: Record<string, string> = JSON.parse(categoriesData);
    return categoriesJson[slug] || null;
  } catch (error) {
    console.error("Error getting post category:", error);
    return null;
  }
}
