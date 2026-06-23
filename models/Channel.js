import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },

    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

export const Channel = mongoose.model("Channel", channelSchema);

