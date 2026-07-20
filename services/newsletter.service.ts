import { connectDB } from "@/lib/db";
import Newsletter from "@/models/NewsLetter"

export const subscribeNewsletter = async (email: string) => {
  await connectDB();

  const existingEmail = await Newsletter.findOne({
    email: email.toLowerCase(),
  });

  if (existingEmail) {
    throw new Error("Email is already subscribed.");
  }

  const subscriber = await Newsletter.create({
    email: email.toLowerCase(),
  });

  return subscriber;
};