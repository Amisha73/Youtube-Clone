const express = require('express');
const { createChannel, updateChannel, deleteChannel, getChannelById, getAllChannels } = require('../controllers/channelController');
const { authenticate } = require('../middleware/authMiddleware');
const upload  = require('../middleware/upload');
const router = express.Router();

router.post('/createchannel', authenticate, upload, createChannel);
router.get('/getchannel', authenticate, getAllChannels);
router.get('/getchannel/:id', authenticate, getChannelById)
router.put('/updatechannel/:id', authenticate, updateChannel);
router.delete('/deletechannel/:id', authenticate, deleteChannel);
// router.delete('/:id/videos/:videoId', authenticate, removeVideo);
// router.post('/:id/videos', authenticate, addVideoToChannel);


module.exports = router;
