import { Channel } from "../models/Channel.js";
import { User } from "../models/User.js";

export async function createChannel(req, res) {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const { name, description } = req.body || {};
  if (!name) {
    return res.status(400).json({ success: false, message: "Channel name is required" });
  }

  const existing = await Channel.findOne({ owner: userId });
  if (existing) {
    return res.status(409).json({ success: false, message: "Channel already exists for this user" });
  }

  const channel = await Channel.create({ owner: userId, name: String(name).trim(), description: description || "" });
  await User.updateOne({ _id: userId }, { $set: { channel: channel._id } });

  return res.status(201).json({
    success: true,
    message: "Channel created",
    data: channel
  });
}

export async function getChannelDetails(req, res) {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const channel = await Channel.findOne({ owner: userId });
  if (!channel) {
    return res.status(404).json({ success: false, message: "Channel not found" });
  }

  return res.json({ success: true, data: channel });
}

