import { Author as MetadataAuthor } from "next/dist/lib/metadata/types/metadata-types";

import { Icons } from "@/components/icons";

export type IconName = keyof typeof Icons;

export type NavLink = {
  label: string;
  url: string;
};

export type SelectOption = {
  label: string;
  value: string;
};

export type NavItem = NavLink;

export type BaseConfig = {
  navItems: NavItem[];
  footerLinkGroups: { title: string; links: NavLink[] }[];
  legalLinks: NavLink[];
};

export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  url: string;
  creator: string;
  ogImage: string;
  authors: MetadataAuthor[];
  keywords: string[];
};

export type PostTag = {
  label: string;
  value: "popular" | "featured";
};

export type PostConfig = {
  tags: PostTag[];
};

export interface CourseMetadata {
  title: string;
  icon: IconName;
  slugAsParams: string;
}

export type PostCategory = { title: string; description: string; slug: string };
