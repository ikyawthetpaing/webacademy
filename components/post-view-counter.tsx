import { Suspense } from "react";

import { updateAndGetPostViewsCount } from "@/lib/db/action/post-views";

async function ViewCount({ slug }: { slug: string }) {
  const viewsCount = await updateAndGetPostViewsCount(slug);
  return `${viewsCount} ${viewsCount > 1 ? "views" : "view"}`;
}

export function PostViewCounter({ slug }: { slug: string }) {
  return (
    <Suspense fallback="... views">
      <ViewCount slug={slug} />
    </Suspense>
  );
}
