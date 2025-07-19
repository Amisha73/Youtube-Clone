const express = require('express');
const { uploadMedia, getvideo, getVideoByChannel, likeVideo, dislikeVideo, addComment, getComment, updateVideo, deleteVideo } = require('../controllers/videoController');
const { authenticate } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const router = express.Router();

router.post("/upload", authenticate, upload ,uploadMedia);
router.get("/getvideo/:id", authenticate, getvideo);
router.get("/channel/:channelId", authenticate, getVideoByChannel);
router.post("/:id/like", authenticate, likeVideo);
router.post("/:id/dislike", authenticate, dislikeVideo);
router.post("/:id/comments", authenticate, addComment);
router.get("/:id/comments", authenticate, getComment);
router.put("/:id", authenticate,updateVideo)
router.delete("/:id", authenticate, deleteVideo);

module.exports = router;
