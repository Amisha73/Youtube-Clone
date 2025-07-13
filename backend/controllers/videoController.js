const Video = require('../models/Video');

exports.getAllVideos = async (req, res) => {
  const videos = await Video.find().populate('uploader', 'username');
  res.json(videos);
};

exports.getVideoById = async (req, res) => {
  const video = await Video.findById(req.params.id).populate('uploader', 'username');
  res.json(video);
};

exports.addComment = async (req, res) => {
  const video = await Video.findById(req.params.id);
  video.comments.push({ text: req.body.text, userId: req.user.id });
  await video.save();
  res.json(video.comments);
};
