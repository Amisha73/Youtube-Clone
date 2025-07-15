const express = require('express');
const { uploadVideo, getvideo, getVideoByChannel, likeVideo, dislikeVideo } = require('../controllers/videoController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post("/uploadvideo", authenticate, uploadVideo);
router.get("/getvideo/:id", authenticate, getvideo);
router.get("/channel/:channelId", authenticate, getVideoByChannel);
router.post("/:id/like", authenticate, likeVideo);
router.post("/:id/dislike", authenticate, dislikeVideo)

module.exports = router;
