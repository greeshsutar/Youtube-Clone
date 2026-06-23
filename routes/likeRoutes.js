import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { dislikeVideo, likeVideo } from "../controllers/likeController.js";

const router = Router();

router.post("/like", authMiddleware, likeVideo);
router.post("/dislike", authMiddleware, dislikeVideo);

export default router;

