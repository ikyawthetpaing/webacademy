import { allAuthors } from "@/.contentlayer/generated";

export function getAuthor(slug: string) {
  return allAuthors.find(({ slugAsParams }) => slugAsParams === slug) || null;
}
