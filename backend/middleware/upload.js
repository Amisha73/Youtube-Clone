const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination based on the file type
    let dest = '';
    if (file.mimetype.startsWith('image/')) {
      dest = './uploads/images';
    } else if (file.mimetype.startsWith('video/')) {
      dest = './uploads/videos';
    } else {
      return cb(new Error('Invalid file type'), false);
    }
    // Ensure directory exists
    fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Create a unique filename
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Limit file size to 100MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|mp4|mkv|avi|mov/; // Allowed formats
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Images and Videos only!'));
    }
  }
}).fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }, { name: 'channelBanner', maxCount: 1 }, { name: 'profilePicture', maxCount: 1 }]); // Expecting fields for image, video, channelBanner, and profilePicture

module.exports = upload;
