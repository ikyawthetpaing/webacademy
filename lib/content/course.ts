import { allChapters, Chapter } from "@/.contentlayer/generated";

export function getChapter(courseParam: string, chapterParam: string | null) {
  return allChapters.find(
    ({ slugAsParams }) =>
      slugAsParams ===
      (chapterParam ? `${courseParam}/${chapterParam}` : `${courseParam}`)
  );
}

export function getCourseChapters(courseParam: string) {
  return allChapters
    .filter(({ slugAsParams }) => slugAsParams.split("/")[0] === courseParam)
    .sort((a, b) => a.index - b.index);
}
