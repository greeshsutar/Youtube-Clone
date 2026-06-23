import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addComment, deleteComment, getCommentsByVideo } from "../controllers/commentController.js";

const router = Router();

router.get("/video/:videoId", getCommentsByVideo);
router.post("/", authMiddleware, addComment);
router.delete("/:commentId", authMiddleware, deleteComment);

export default router;

