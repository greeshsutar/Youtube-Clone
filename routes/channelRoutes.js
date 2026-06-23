import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createChannel, getChannelDetails } from "../controllers/channelController.js";

const router = Router();

router.post("/", authMiddleware, createChannel);
router.get("/", authMiddleware, getChannelDetails);

export default router;

