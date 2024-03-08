import { SiteConfig } from "@/types";

import { absoluteUrl } from "@/lib/utils";

export const siteConfig: SiteConfig = {
  name: "Web Academy",
  title: "Web Academy: Learn to Code with Our Free Courses and Articles",
  description:
    "Web Academy is your go-to destination for free courses and articles to help you grasp web development skills and stay ahead in this evolving field.",
  url: absoluteUrl(),
  ogImage: absoluteUrl("/og.png"),
  creator: "@ikyawthetpaing",
  authors: [
    { name: "Kyaw Thet Paing", url: "https://ikyawthetpaing.vercel.app" },
  ],
  keywords: [
    "Web Academy",
    "Tutorials & How-To Guides",
    "Design Inspiration & Trends",
    "Tools & Resources",
    "Case Studies & Portfolio Reviews",
    "Coding Tips & Tricks",
    "Industry News & Updates",
    "UX/UI Design",
    "Freelancing & Career Development",
  ],
};
