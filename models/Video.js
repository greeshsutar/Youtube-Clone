import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    value: { type: String, enum: ["like", "dislike"], required: true }
  },
  { _id: false }
);

const videoSchema = new mongoose.Schema(
  {
    channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channel", required: true },

    videoUrl: { type: String, required: true, trim: true },
    thumbnailUrl: { type: String, required: true, trim: true },

    // Optional metadata
    title: { type: String, default: "" },
    description: { type: String, default: "" },

    // like/dislike handled by reactions array
    reactions: [reactionSchema]
  },
  { timestamps: true }
);

export const Video = mongoose.model("Video", videoSchema);

