import { Video } from "../models/Video.js";

function upsertReaction(reactions, userId, value) {
  // XOR: only like or dislike; switching replaces
  const idx = reactions.findIndex((r) => String(r.user) === String(userId));

  if (idx === -1) {
    return [...reactions, { user: userId, value }];
  }

  const existing = reactions[idx];
  if (existing.value === value) {
    // Clicking same reaction again removes it (toggle off)
    return reactions.filter((_, i) => i !== idx);
  }

  // switching: replace value
  const next = [...reactions];
  next[idx] = { ...next[idx], value };
  return next;
}

export async function likeVideo(req, res) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

  const { videoId } = req.body || {};
  if (!videoId) return res.status(400).json({ success: false, message: "videoId is required" });

  const video = await Video.findById(videoId);
  if (!video) return res.status(404).json({ success: false, message: "Video not found" });

  video.reactions = upsertReaction(video.reactions, userId, "like");
  await video.save();

  return res.json({ success: true, message: "Reaction updated", data: { reactions: video.reactions } });
}

export async function dislikeVideo(req, res) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

  const { videoId } = req.body || {};
  if (!videoId) return res.status(400).json({ success: false, message: "videoId is required" });

  const video = await Video.findById(videoId);
  if (!video) return res.status(404).json({ success: false, message: "Video not found" });

  video.reactions = upsertReaction(video.reactions, userId, "dislike");
  await video.save();

  return res.json({ success: true, message: "Reaction updated", data: { reactions: video.reactions } });
}

