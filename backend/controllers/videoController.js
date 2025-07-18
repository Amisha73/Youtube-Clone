const cloudinary = require('cloudinary').v2;
const Video = require("../models/Video");
const Channel = require("../models/Channel");

// Upload Image and Video
exports.uploadMedia = async (req, res) => {
  try {
    const { title, description, channelId, videoType } = req.body; // Get other video details from the request

    let videoUrl;
    let imageUrl;

    // Upload video if it exists
    if (req.files.video) {
      const videoFile = req.files.video[0]; // Get the uploaded video file
      const videoUploadResult = await cloudinary.uploader.upload(videoFile.path, {
        resource_type: "video", // Specify that this is a video upload
      });
      videoUrl = videoUploadResult.secure_url; // Store the video URL from Cloudinary
    }

    // Upload image if it exists
    if (req.files.image) {
      const imageFile = req.files.image[0]; // Get the uploaded image file
      const imageUploadResult = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image", // Specify that this is an image upload
      });
      imageUrl = imageUploadResult.secure_url; // Store the image URL from Cloudinary
    }

    // Create a new video document
    const newVideo = new Video({
      title,
      thumbnail: imageUrl, // Use the uploaded image URL as the thumbnail
      description,
      videoType, // Store the video type
      url: videoUrl, // Store the video URL
      channelId,
      user: req.user.id,
    });

    // Save the video to the database
    const savedVideo = await newVideo.save();

    // Add video reference to the channel
    await Channel.findByIdAndUpdate(channelId, { $push: { videos: savedVideo._id } });

    res.status(201).json(savedVideo);
  } catch (err) {
    console.error("Error uploading media:", err);
    res.status(400).json({ message: "Error uploading media", error: err });
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
      "username avatar"
    );
    if (!video) return res.status(404).send("Video not found");

    res.json(video.comments);
  } catch (err) {
    res.status(400).json(err);
  }
};

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
