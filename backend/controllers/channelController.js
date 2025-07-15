const Channel = require("../models/Channel");

// Create Channel
exports.createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner } = req.body;
    console.log(req.user);
    const newChannel = new Channel({
      user: req.user.id,
      channelName,
      description,
      channelBanner,
    });

    const savedChannel = await newChannel.save();
    res.status(201).json(savedChannel);
  } catch (err) {
    console.error(err); 
    res.status(400).json(err);
  }
};

// Get User Channels
exports.getUserChannels = async (req, res) => {
  try {
    const channels = await Channel.find({ user: req.user._id })
      .populate('videos', 'title thumbnail views')
      .populate('user', 'username avatar')
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
    const channel = await Channel.findById(req.params.id).populate('videos');
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
