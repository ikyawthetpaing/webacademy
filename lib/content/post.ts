import { allPosts } from "@/.contentlayer/generated";
import { PostTag } from "@/types";

import { getPostViewsCount } from "@/lib/db/action/post-views";
import { slugify } from "@/lib/utils";

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
    let postsMetadata = Object.values(allPosts).map((post) => ({
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
            const views = await getPostViewsCount(metadata.slugAsParams);
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

export function getPost(slug: string) {
  return allPosts.find(({ slugAsParams }) => slugAsParams === slug) || null;
}
