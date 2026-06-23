import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  uploadVideo
} from "../controllers/videoController.js";

const router = Router();

router.get("/", getAllVideos);
router.get("/:id", getVideoById);

router.post("/", authMiddleware, uploadVideo);
router.put("/:id", authMiddleware, updateVideo);
router.delete("/:id", authMiddleware, deleteVideo);

export default router;

