"use server";

import PostViews from "@/lib/db/model/post-views";

export async function updateAndGetPostViewsCount(
  slug: string
): Promise<number> {
  const postViews = await PostViews.findOneAndUpdate(
    { slug },
    { $inc: { count: 1 } },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      returnDocument: "after",
    }
  );

  return postViews.count;
}

export async function getPostViewsCount(slug: string): Promise<number> {
  const postViews = await PostViews.findOne({ slug });
  return postViews ? postViews.count : 0;
}
