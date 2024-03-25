import { allPages } from "@/.contentlayer/generated";

export async function getPage(slug: string) {
  return allPages.find(({ slugAsParams }) => slugAsParams === slug);
}
