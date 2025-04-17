import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String },
    summary: { type: String },
    content: { type: String },
    cover: { type: String },
  },
  { timestamps: true }
);

export { PostSchema };
