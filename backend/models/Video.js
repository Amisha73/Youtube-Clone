const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  description: { type: String },
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  uploadDate: { type: Date, default: Date.now },
  comments: [{ text: String, userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' } }],
});

module.exports = mongoose.model('Video', videoSchema);
