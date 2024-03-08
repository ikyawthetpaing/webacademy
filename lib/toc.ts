import { slugify } from "./utils";

export interface TableOfContentsItem {
  title: string;
  slug: string;
  depth: number;
}

export function generateTableOfContents(mdxRaw: string): TableOfContentsItem[] {
  const lines = mdxRaw.split("\n");
  const tocItems: TableOfContentsItem[] = [];
  let hasH1 = false;

  for (const line of lines) {
    const match = line.match(/^#+\s+(.+)/);
    if (match) {
      const title = match[1];
      const depth = match[0].split("#").length - 1;
      const slug = slugify(title);

      tocItems.push({ title, slug, depth });
      if (depth === 1) {
        hasH1 = true;
      }
    }
  }

  // If there are no H1 headings, remove the margin for all items
  if (!hasH1) {
    for (const item of tocItems) {
      item.depth = 0;
    }
  }

  return tocItems;
}
