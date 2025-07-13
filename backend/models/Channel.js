const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
  channelName: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
  description: { type: String },
  channelBanner: { type: String },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
});

module.exports = mongoose.model('Channel', channelSchema);
