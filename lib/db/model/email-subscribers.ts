import mongoose, { Schema } from "mongoose";

import { env } from "@/env.mjs";

mongoose.connect(env.MONGODB_URI);
mongoose.Promise = global.Promise;

const emailSubscribersSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email address"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const EmailSubscribers =
  mongoose.models.EmailSubscribers ||
  mongoose.model(
    "EmailSubscribers",
    emailSubscribersSchema,
    "email_subscribers"
  );

export default EmailSubscribers;
