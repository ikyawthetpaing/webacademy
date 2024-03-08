"use server";

import EmailSubscribers from "@/lib/db/model/email-subscribers";

export async function subscribeNewsletters({
  name,
  email,
}: {
  name?: string;
  email: string;
}) {
  try {
    const existingSubscriber = await EmailSubscribers.findOne({ email });

    if (existingSubscriber) {
      return { success: false, message: "Email is already subscribed." };
    }

    const newSubscriber = new EmailSubscribers({
      name: name || "",
      email,
    });

    await newSubscriber.save();

    return { success: true, message: "Subscription successful!" };
  } catch (error) {
    // @ts-ignore
    if (error.name === "ValidationError") {
      // @ts-ignore
      return { success: false, message: error.errors["email"].message };
    }
    throw error;
  }
}
