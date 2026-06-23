import { Channel } from "../models/Channel.js";
import { Comment } from "../models/Comment.js";
import { Video } from "../models/Video.js";

function countReactions(reactions = []) {
  let likes = 0;
  let dislikes = 0;
  for (const r of reactions) {
    if (r.value === "like") likes += 1;
    if (r.value === "dislike") dislikes += 1;
  }
  return { likes, dislikes };
}

export async function uploadVideo(req, res) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

  const { videoUrl, thumbnailUrl, title, description } = req.body || {};
  if (!videoUrl || !thumbnailUrl) {
    return res.status(400).json({ success: false, message: "videoUrl and thumbnailUrl are required" });
  }

  const channel = await Channel.findOne({ owner: userId });
  if (!channel) {
    return res.status(404).json({ success: false, message: "Channel not found. Create a channel first." });
  }

  const video = await Video.create({
    channel: channel._id,
    videoUrl: String(videoUrl).trim(),
    thumbnailUrl: String(thumbnailUrl).trim(),
    title: title || "",
    description: description || ""
  });

  return res.status(201).json({ success: true, message: "Video uploaded", data: video });
}

export async function getAllVideos(req, res) {
  const videos = await Video.find()
    .populate({ path: "channel", select: "name owner" })
    .sort({ createdAt: -1 });

  const data = videos.map((v) => {
    const counts = countReactions(v.reactions);
    return {
      _id: v._id,
      channel: v.channel,
      title: v.title,
      description: v.description,
      videoUrl: v.videoUrl,
      thumbnailUrl: v.thumbnailUrl,
      likes: counts.likes,
      dislikes: counts.dislikes,
      createdAt: v.createdAt
    };
  });

  return res.json({ success: true, data });
}

export async function getVideoById(req, res) {
  const { id } = req.params;

  const video = await Video.findById(id).populate({ path: "channel", select: "name owner" });
  if (!video) return res.status(404).json({ success: false, message: "Video not found" });

  const counts = countReactions(video.reactions);

  const comments = await Comment.find({ video: video._id })
    .populate({ path: "author", select: "username email" })
    .sort({ createdAt: -1 })
    .limit(50);

  return res.json({
    success: true,
    data: {
      _id: video._id,
      channel: video.channel,
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl,
      likes: counts.likes,
      dislikes: counts.dislikes,
      comments
    }
  });
}

export async function updateVideo(req, res) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

  const { id } = req.params;
  const { videoUrl, thumbnailUrl, title, description } = req.body || {};

  const channel = await Channel.findOne({ owner: userId });
  if (!channel) return res.status(404).json({ success: false, message: "Channel not found" });

  const video = await Video.findOne({ _id: id, channel: channel._id });
  if (!video) return res.status(404).json({ success: false, message: "Video not found" });

  if (videoUrl !== undefined) video.videoUrl = String(videoUrl).trim();
  if (thumbnailUrl !== undefined) video.thumbnailUrl = String(thumbnailUrl).trim();
  if (title !== undefined) video.title = title || "";
  if (description !== undefined) video.description = description || "";

  await video.save();
  return res.json({ success: true, message: "Video updated", data: video });
}

export async function deleteVideo(req, res) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

  const { id } = req.params;

  const channel = await Channel.findOne({ owner: userId });
  if (!channel) return res.status(404).json({ success: false, message: "Channel not found" });

  const video = await Video.findOne({ _id: id, channel: channel._id });
  if (!video) return res.status(404).json({ success: false, message: "Video not found" });

  // Delete comments first
  await Comment.deleteMany({ video: video._id });
  await Video.deleteOne({ _id: video._id });

  return res.json({ success: true, message: "Video deleted" });
}

