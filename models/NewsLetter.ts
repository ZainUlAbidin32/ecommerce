import mongoose, { Schema, model, models } from "mongoose";

const newsletterSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const Newsletter =
  models.Newsletter || model("Newsletter", newsletterSchema);

export default Newsletter;