"use server";

import { promises as fs } from "fs";
import path from "path";

interface PageData {
  slug: string;
  title: string;
  description: string;
  content: string;
}

export async function getPage(slug: string) {
  try {
    const filePath = path.join(
      process.cwd(),
      ".generated-content",
      "page",
      `${slug}.mdx.json`
    );
    const pageData = await fs.readFile(filePath, "utf-8");
    const pageJson = JSON.parse(pageData) as PageData;
    return pageJson;
  } catch (error) {
    console.error("Error reading page data:", error);
    return null;
  }
}
