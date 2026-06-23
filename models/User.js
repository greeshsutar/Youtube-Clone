import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, minlength: 3 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },

    // Link to channel (optional; we can create later)
    channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channel" }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

