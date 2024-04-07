import { PostCategory, PostConfig } from "@/types";

export const postConfig: PostConfig = {
  tags: [
    { label: "Popular", value: "popular" },
    { label: "Featured", value: "featured" },
  ],
};

export const postCategories: PostCategory[] = [
  {
    title: "Coding Tips & Tricks",
    description:
      "Discover expert tips and clever coding techniques to enhance your development skills and efficiency.",
    slug: "coding-tips-tricks",
  },
  {
    title: "Tutorials & How-To Guides",
    description:
      "Step-by-step tutorials and guides to help you master various aspects of web development and programming.",
    slug: "tutorials-how-to-guides",
  },
  {
    title: "Design Inspiration & Trends",
    description:
      "Explore the latest design trends and get inspired by innovative designs from around the web.",
    slug: "design-inspiration-trends",
  },
  {
    title: "Tools & Resources",
    description:
      "Discover essential tools, resources, and software to streamline your development workflow and boost productivity.",
    slug: "tools-resources",
  },
  {
    title: "Industry News & Updates",
    description:
      "Stay informed with the latest news, trends, and updates from the ever-evolving world of web development.",
    slug: "industry-news-updates",
  },
  {
    title: "Freelancing & Career Development",
    description:
      "Learn valuable insights and strategies to advance your freelance career and thrive in the tech industry.",
    slug: "freelancing-career-development",
  },
];

export function getPostCategory(slug: string) {
  return postCategories.find((category) => category.slug === slug) || null;
}
