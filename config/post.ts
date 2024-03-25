import { PostCategory, PostConfig } from "@/types";

export const postConfig: PostConfig = {
  tags: [
    { label: "Popular", value: "popular" },
    { label: "Featured", value: "featured" },
  ],
};

export const postCategories: PostCategory[] = [
  {
    title: "HTML",
    description:
      "Everything about Hypertext Markup Language (HTML) for building web pages.",
    slug: "html",
  },
  {
    title: "CSS",
    description:
      "Cascading Style Sheets (CSS) for styling HTML elements and making them visually appealing.",
    slug: "css",
  },
  {
    title: "JavaScript",
    description:
      "Client-side scripting language used for adding interactivity and dynamic behavior to web pages.",
    slug: "javascript",
  },
  {
    title: "Frontend Frameworks",
    description:
      "Popular frontend frameworks like React, Angular, and Vue.js for building dynamic web applications.",
    slug: "frontend-frameworks",
  },
  {
    title: "Backend Development",
    description:
      "Server-side development using technologies like Node.js, Express.js, and databases.",
    slug: "backend-development",
  },
  {
    title: "Full-Stack Development",
    description:
      "Master both frontend and backend technologies to become a full-stack developer.",
    slug: "full-stack-development",
  },
  {
    title: "Web Design Principles",
    description:
      "Fundamental principles of web design including layout, typography, and color theory.",
    slug: "web-design-principles",
  },
  {
    title: "Responsive Web Design",
    description:
      "Techniques for creating websites that adapt to various screen sizes and devices.",
    slug: "responsive-web-design",
  },
  {
    title: "Version Control",
    description:
      "Learn version control systems like Git for managing code changes and collaboration.",
    slug: "version-control",
  },
  {
    title: "Web Accessibility",
    description:
      "Ensure that websites are usable by people with disabilities, following accessibility standards.",
    slug: "web-accessibility",
  },
  {
    title: "Search Engine Optimization (SEO)",
    description:
      "Strategies for optimizing websites to improve visibility and ranking in search engine results.",
    slug: "seo",
  },
];

export function getPostCategory(slug: string) {
  return postCategories.find((category) => category.slug === slug) || null;
}
