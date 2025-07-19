const cloudinary = require("cloudinary").v2;
const Video = require("../models/Video");
const Channel = require("../models/Channel");

exports.uploadMedia = async (req, res) => {
  try {
    const { title, description, channelId, videoType } = req.body;
    const { thumbnail } = req.files;

    // Upload channel banner to Cloudinary
    const thumbnailUploadResult = await cloudinary.uploader.upload(
      thumbnail[0].path,
      {
        resource_type: "image",
      }
    );
    
    // Create a new video document
    const newVideo = new Video({
      title,
      thumbnail: thumbnailUploadResult.secure_url,
      description,
      videoType,
      channelId,
      user: req.user.id,
    });

    // Save the video to the database
    const savedVideo = await newVideo.save();

    // Add video reference to the channel
    await Channel.findByIdAndUpdate(channelId, {
      $push: { videos: savedVideo._id },
    });
    res.status(201).json(savedVideo);
  } catch (err) {
    console.error("Error uploading media:", err);
    res.status(400).json({ message: "Error uploading media", error: err });
  }
};


// Get Video by ID
exports.getvideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).send("Video not found");

    // Increment views
    video.views += 1;
    await video.save();

    res.json(video);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Get Videos by Channel
exports.getVideoByChannel = async (req, res) => {
  try {
    const videos = await Video.find({
      channelId: req.params.channelId,
    }).populate("user", "username profilePicture");
    res.json(videos);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Add Comment
exports.addComment = async (req, res) => {
  const { text } = req.body;
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).send("Video not found");

    video.comments.push({ text, userId: req.user.id });
    await video.save();
    res.json(video);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Get Comments
exports.getComment = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate(
      "comments.userId",
      "username profilePicture"
    );
    if (!video) return res.status(404).send("Video not found");

    res.json(video.comments);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Update Video
exports.updateVideo = async (req, res) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedVideo) return res.status(404).send("Video not found");

    res.json(updatedVideo);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Delete Video
exports.deleteVideo =  async (req, res) => {
  try {
    const deletedVideo = await Video.findByIdAndDelete(req.params.id);
    if (!deletedVideo) return res.status(404).send("Video not found");

    // Remove the deleted channel ID from the user's channel array
        await User.findByIdAndUpdate(deletedVideo.channelId, { $pull: { video: deletedVideo._id } });

    res.send("Video deleted");
  } catch (err) {
    res.status(400).json(err);
  }
};

// Like Video - Toggle style (removes if already liked)
exports.likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).send("Video not found");

    const userId = req.user.id;

    if (video.likedBy.includes(userId)) {
      // User already liked - remove like
      video.likes -= 1;
      video.likedBy.pull(userId);
    } else {
      // Add new like
      video.likes += 1;
      video.likedBy.push(userId);

      // Remove from dislikes if present
      if (video.dislikedBy.includes(userId)) {
        video.dislikes -= 1;
        video.dislikedBy.pull(userId);
      }
    }

    await video.save();
    res.json(video);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Dislike Video - Toggle style (removes if already disliked)
exports.dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).send("Video not found");

    const userId = req.user.id;

    if (video.dislikedBy.includes(userId)) {
      // User already disliked - remove dislike
      video.dislikes -= 1;
      video.dislikedBy.pull(userId);
    } else {
      // Add new dislike
      video.dislikes += 1;
      video.dislikedBy.push(userId);

      // Remove from likes if present
      if (video.likedBy.includes(userId)) {
        video.likes -= 1;
        video.likedBy.pull(userId);
      }
    }

    await video.save();
    res.json(video);
  } catch (err) {
    res.status(400).json(err);
  }
};
