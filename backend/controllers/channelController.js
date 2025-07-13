const Channel = require('../models/Channel');

exports.createChannel = async (req, res) => {
  const { channelName, description } = req.body;
  const channel = new Channel({ channelName, owner: req.user.id, description });
  await channel.save();
  res.status(201).json(channel);
};

exports.getChannelById = async (req, res) => {
  const channel = await Channel.findById(req.params.id).populate('videos');
  res.json(channel);
};
