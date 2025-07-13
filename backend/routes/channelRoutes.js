const express = require('express');
const { createChannel, getChannelById } = require('../controllers/channelController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/createchannel', authenticate, createChannel);
router.get('/:id', getChannelById);

module.exports = router;
