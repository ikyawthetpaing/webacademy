import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPage } from "@/lib/content/page";
import { absoluteUrl } from "@/lib/utils";
import { Mdx } from "@/components/mdx";

interface PageProps {
  params: {
    slug: string[];
  };
}

async function getPageFromParams(params: PageProps["params"]) {
  const slug = params.slug.join("/");
  const page = await getPage(slug);

  if (!page) {
    null;
  }

  return page;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  const { title, description, slug } = page;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: absoluteUrl(`/${slug}`),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  const {
    body: { raw },
    title,
  } = page;

  return (
    <article className="container flex flex-col gap-8">
      <h1 className="font-heading text-4xl font-bold">{title}</h1>
      <Mdx raw={raw} className="max-w-max" />
    </article>
  );
}
