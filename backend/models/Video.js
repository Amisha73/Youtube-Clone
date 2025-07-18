const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  videoType: { type: String, required: true }, 
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  uploadDate: { type: Date, default: Date.now },
  comments: [{ text: String, userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // New field for users who liked the video
  dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // New field for users who disliked the video
});

module.exports = mongoose.model('Video ', videoSchema);


// videolink 