import { HTMLAttributes } from "react";
import Link from "next/link";
import { NavItem } from "@/types";

import { courses } from "@/config/course";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { SearchPostForm } from "@/components/form/search-post-form";
import { MobileNavSheet } from "@/components/layout/mobile-nav-sheet";
import { NavItems } from "@/components/layout/nav-items";
import { SearchPostDialog } from "@/components/search-post-dialog";

import { CourseNavItems } from "./course-nav-items";

interface Props extends HTMLAttributes<HTMLDivElement> {
  navItems: NavItem[];
}

export async function SiteHeader({ navItems, className, ...props }: Props) {
  return (
    <header
      className={cn(
        "border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/75 sticky top-0 z-50 flex h-24 w-full flex-col justify-center gap-3 border-b backdrop-blur-lg",
        className
      )}
      {...props}
    >
      <div className="container flex items-center justify-between pt-2">
        <div>
          <NavItems items={navItems} className="hidden md:flex" />
          <div className="flex items-center md:hidden">
            <MobileNavSheet navItems={navItems} />
          </div>
        </div>
        <div className="flex justify-center">
          <Link href="/" className="font-heading text-xl font-bold">
            {siteConfig.name}
          </Link>
        </div>
        <div className="flex justify-end">
          <SearchPostForm className="hidden h-8 md:flex" actionUrl="/blog" />
          <div className="flex items-center md:hidden">
            <SearchPostDialog actionUrl="/blog" />
          </div>
        </div>
      </div>
      <div className="no-scrollbar container grid overflow-x-scroll">
        <CourseNavItems items={courses} className="flex justify-center gap-8" />
      </div>
    </header>
  );
}
