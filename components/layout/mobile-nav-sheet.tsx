"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Chapter } from "@/.contentlayer/generated";
import { NavItem } from "@/types";

import { getCourseTitle } from "@/config/course";
import { siteConfig } from "@/config/site";
import { getCourseChapters } from "@/lib/content/course";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Icons } from "@/components/icons";
import { NavItems } from "@/components/layout/nav-items";

interface Props {
  navItems: NavItem[];
}

export function MobileNavSheet({ navItems }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [courseTitle, setCourseTitle] = useState<string | null>(null);
  const [, path, courseParam, chapterParam] = pathname.split("/");

  useEffect(() => {
    if (path === "course" && courseParam) {
      setChapters(getCourseChapters(courseParam));
      setCourseTitle(getCourseTitle(courseParam));
      console.log("update state");
    } else {
      if (chapters.length) {
        setChapters([]);
      }
      if (courseTitle) {
        setCourseTitle(null);
      }
    }
  }, [chapters.length, courseParam, courseTitle, path]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden">
          <Icons.menu className="size-7" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="no-scrollbar flex flex-col gap-8 overflow-scroll px-8"
      >
        <div>
          <Link href="/" className="font-heading text-2xl font-bold">
            {siteConfig.name}
          </Link>
        </div>
        <NavItems items={navItems} className="flex-col gap-3 text-base" />
        {courseTitle && chapters.length > 0 && (
          <div className="grid gap-3">
            <h3 className="text-lg font-medium">{courseTitle} Chapters</h3>
            <ul className="flex flex-col gap-3">
              {chapters.map(({ title, slug }, index) => (
                <li key={index}>
                  <Link
                    href={`/course/${courseParam}/${slug}`}
                    className={cn(
                      "text-muted-foreground underline-offset-4 hover:underline",
                      {
                        "underline text-foreground":
                          slug === chapterParam ||
                          (!chapterParam && slug === "index"),
                      }
                    )}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
