"use server";

import { promises as fs } from "fs";
import path from "path";

interface AuthorData {
  name: string;
  avatar: string;
  role: string;
  website: string;
}

export async function getAuthor(slug: string) {
  try {
    const filePath = path.join(
      process.cwd(),
      ".generated-content",
      "author",
      `${slug}.mdx.json`
    );
    const authorData = await fs.readFile(filePath, "utf-8");
    const authorJson = JSON.parse(authorData) as AuthorData;
    return authorJson;
  } catch (error) {
    console.log(error);
    return null;
  }
}
