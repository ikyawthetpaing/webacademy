import mongoose, { Schema } from "mongoose";

import { env } from "@/env.mjs";

mongoose.connect(env.MONGODB_URI);
mongoose.Promise = global.Promise;

const postViewsSchema = new Schema(
  {
    slug: String,
    count: Number,
  },
  {
    timestamps: true,
  }
);

const PostViews =
  mongoose.models.PostViews ||
  mongoose.model("PostViews", postViewsSchema, "post_views");

export default PostViews;
