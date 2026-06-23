import { Comment } from "../models/Comment.js";
import { Video } from "../models/Video.js";

export async function addComment(req, res) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

  const { videoId, content } = req.body || {};
  if (!videoId || !content) {
    return res.status(400).json({ success: false, message: "videoId and content are required" });
  }

  const video = await Video.findById(videoId);
  if (!video) return res.status(404).json({ success: false, message: "Video not found" });

  const comment = await Comment.create({ video: video._id, author: userId, content: String(content).trim() });

  const populated = await Comment.findById(comment._id).populate({ path: "author", select: "username email" });

  return res.status(201).json({ success: true, message: "Comment added", data: populated });
}

export async function getCommentsByVideo(req, res) {
  const { videoId } = req.params;

  const comments = await Comment.find({ video: videoId })
    .populate({ path: "author", select: "username email" })
    .sort({ createdAt: -1 });

  return res.json({ success: true, data: comments });
}

export async function deleteComment(req, res) {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });

  if (String(comment.author) !== String(userId)) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }

  await Comment.deleteOne({ _id: commentId });
  return res.json({ success: true, message: "Comment deleted" });
}

