const cloudinary = require('cloudinary').v2; // Ensure Cloudinary is imported
const Channel = require("../models/Channel");
const User = require("../models/User");

// Create Channel
exports.createChannel = async (req, res) => {
  try {
    const { channelName, description } = req.body;
    const { channelBanner, profilePicture } = req.files;

    // Upload channel banner to Cloudinary
    const bannerUploadResult = await cloudinary.uploader.upload(channelBanner[0].path, {
      resource_type: "image",
    });

    // Upload profile picture to Cloudinary
    const profileUploadResult = await cloudinary.uploader.upload(profilePicture[0].path, {
      resource_type: "image",
    });

    const newChannel = new Channel({
      user: req.user.id,
      channelName,
      description,
      channelBanner: bannerUploadResult.secure_url,
      profilePicture: profileUploadResult.secure_url,
    });

    const savedChannel = await newChannel.save();
    await User.findByIdAndUpdate(req.user.id, { $push: { channel: savedChannel._id } });
    res.status(201).json(savedChannel);
  } catch (err) {
    console.error('Error creating channel:', err); // Log the error
    res.status(400).json({ message: 'Error creating channel', error: err });
  }
};

// Get User Channels
exports.getAllChannels = async (req, res) => {
  try {
    const channels = await Channel.find({ user: req.user._id })
      .populate('user', 'username profilePicture')
      .lean();

    if (!channels || channels.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No channels found for this user",
        channels: []
      });
    }

    res.status(200).json({
      success: true,
      count: channels.length,
      channels
    });
  } catch (error) {
    console.error('Error fetching channels:', error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching channels"
    });
  }
};


// Get Channel by ID
exports.getChannelById = async(req, res) => {
  try {
    const channel = await Channel.findById(req.params.id).populate('user', 'username profilePicture').lean();
    if (!channel) return res.status(404).send('Channel not found');
    res.json(channel);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Update Channel
exports.updateChannel = async (req, res) => {
  try {
    const updatedChannel = await Channel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedChannel) return res.status(404).send('Channel not found');
    res.json(updatedChannel);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Delete Channel
exports.deleteChannel = async (req, res) => {
  try {
    const deletedChannel = await Channel.findByIdAndDelete(req.params.id);
    if (!deletedChannel) return res.status(404).send('Channel not found');
    res.send('Channel deleted');
  } catch (err) {
    res.status(400).json(err);
  }
};

// // Add Video to Channel
// exports.addVideoToChannel =async (req, res) => {
//   const { videoId } = req.body;
//   try {
//     const channel = await Channel.findById(req.params.id);
//     if (!channel) return res.status(404).send('Channel not found');

//     channel.videos.push(videoId);
//     await channel.save();
//     res.json(channel);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };

// // Remove Video from Channel
// exports.removeVideo= async (req, res) => {
//   try {
//     const channel = await Channel.findById(req.params.id);
//     if (!channel) return res.status(404).send('Channel not found');

//     channel.videos.pull(req.params.videoId);
//     await channel.save();
//     res.json(channel);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };
