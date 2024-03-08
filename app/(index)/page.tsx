import Link from "next/link";

import { siteConfig } from "@/config/site";
import { getCoursesMetadata } from "@/lib/content/course";
import { getPostCategories } from "@/lib/content/post";
import { CategoriesSection } from "@/components/categories-section";
import { CousresSection } from "@/components/cousres-section";
import { EmailSubscribeForm } from "@/components/form/email-subscribe-form";
import { Icons } from "@/components/icons";
import { PostCategoryFilter } from "@/components/post-category-filter";
import { PostList } from "@/components/post-list";

interface Props {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function Home({ searchParams }: Props) {
  const categories = await getPostCategories();
  const courses = await getCoursesMetadata();
  return (
    <div className="container mt-16 flex flex-col gap-24">
      <HeroSection />
      <CousresSection courses={courses} />
      <CategoriesSection categories={categories} className="mx-auto" />
      <LatestPosts searchParams={searchParams} categories={categories} />
      <FeaturedPostsSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="flex flex-col items-center gap-8 text-center">
      <h1 className="font-heading max-w-6xl text-4xl font-bold sm:text-5xl md:text-6xl">
        See our free web development courses, tutorials, and insights.
      </h1>
      <p className="text-muted-foreground leading-normal sm:text-xl sm:leading-8">
        {`${siteConfig.name} offers a vast collection of free web development
        courses and articles.`}
      </p>
      <EmailSubscribeForm />
    </section>
  );
}

function FeaturedPostsSection() {
  return (
    <section className="grid gap-8">
      <h2 className="font-heading text-center text-2xl font-bold sm:text-3xl">
        Featured Posts
      </h2>
      <PostList fixedTag="featured" showPagination={false} />
      <div className="flex justify-center">
        <Link
          href={"/blog?tag=featured"}
          className="flex items-center gap-2 rounded-xl border px-4 py-2 text-base duration-150 hover:gap-4"
        >
          View all <Icons.moveRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}

function LatestPosts({
  searchParams,
  categories,
}: Props & {
  categories: string[];
}) {
  return (
    <section className="grid gap-8">
      <h2 className="font-heading text-center text-2xl font-bold sm:text-3xl">
        Our Latest Posts
      </h2>
      <PostCategoryFilter categories={categories} className="mx-auto" />
      <PostList searchParams={searchParams} />
    </section>
  );
}
