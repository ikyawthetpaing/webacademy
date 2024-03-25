import { Metadata } from "next";

import { postCategories } from "@/config/post";
import { absoluteUrl } from "@/lib/utils";
import { CategoriesSection } from "@/components/categories-section";

export function generateMetadata(): Metadata {
  const title = "Browse Web Development Blog Categories";
  const description =
    "Discover a wealth of information, tutorials, and free web development blog posts.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: absoluteUrl("/category"),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CategoryPage() {
  return (
    <CategoriesSection categories={postCategories} className="container" />
  );
}
