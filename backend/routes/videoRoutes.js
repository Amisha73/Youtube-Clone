const express = require('express');
const { getAllVideos, getVideoById, addComment } = require('../controllers/videoController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllVideos);
router.get('/:id', getVideoById);
router.post('/:id/comments', authenticate, addComment);

module.exports = router;
