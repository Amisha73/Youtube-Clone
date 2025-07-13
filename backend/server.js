const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());

const db = require('./config/db');
db();

const authRoutes = require('./routes/authRoutes');
// const videoRoutes = require('./routes/videoRoutes');
// const channelRoutes = require('./routes/channelRoutes');

app.use('/auth', authRoutes);
// app.use('/videos', videoRoutes);
// app.use('/channels', channelRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
