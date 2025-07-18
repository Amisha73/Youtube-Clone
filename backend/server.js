const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

const configureCloudinary = require('./config/cloudinary');

const db = require('./config/db');
db();

const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/videoRoutes');
const channelRoutes = require('./routes/channelRoutes');

app.use('/auth', authRoutes);
app.use('/videos', videoRoutes);
app.use('/channels', channelRoutes);

// Call the async function to configure Cloudinary
configureCloudinary()
  .then(() => {
    // Start the server only after Cloudinary is configured
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to configure Cloudinary:', error);
  });
