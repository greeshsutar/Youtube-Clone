import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    video: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    content: { type: String, required: true, trim: true, minlength: 1, maxlength: 2000 }
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);

