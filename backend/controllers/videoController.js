const Video = require("../models/Video");


// Upload Video
exports.uploadVideo = async (req, res) => {
  try {
    const { title, thumbnail, description, channelId } = req.body;
    const newVideo = new Video({
      title,
      thumbnail,
      description,
      channelId,
      user: req.user.id, 
    });

    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Get Video by ID
exports.getvideo =async (req, res) => {
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
exports.getVideoByChannel= async (req, res) => {
  try {
    const videos = await Video.find({
      channelId: req.params.channelId,
    }).populate("user", "username avatar");
    res.json(videos);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Like Video
exports.likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).send("Video not found");

    video.likes += 1;
    await video.save();
    res.json(video);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Dislike Video
exports.dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).send("Video not found");

    video.dislikes += 1;
    await video.save();
    res.json(video);
  } catch (err) {
    res.status(400).json(err);
  }
};

// // Add Comment
// router.post("/:id/comments", auth, async (req, res) => {
//   const { text } = req.body;
//   try {
//     const video = await Video.findById(req.params.id);
//     if (!video) return res.status(404).send("Video not found");

//     video.comments.push({ text, userId: req.user.id });
//     await video.save();
//     res.json(video);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// // Get Comments
// router.get("/:id/comments", async (req, res) => {
//   try {
//     const video = await Video.findById(req.params.id).populate(
//       "comments.userId",
//       "username avatar"
//     );
//     if (!video) return res.status(404).send("Video not found");

//     res.json(video.comments);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// // Update Video
// router.put("/:id", auth, async (req, res) => {
//   try {
//     const updatedVideo = await Video.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedVideo) return res.status(404).send("Video not found");

//     res.json(updatedVideo);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// // Delete Video
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     const deletedVideo = await Video.findByIdAndDelete(req.params.id);
//     if (!deletedVideo) return res.status(404).send("Video not found");

//     res.send("Video deleted");
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });


