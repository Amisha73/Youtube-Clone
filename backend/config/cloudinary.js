const cloudinary = require('cloudinary').v2;

const configureCloudinary = async () => {
  return new Promise((resolve, reject) => {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      console.log('Cloudinary configured successfully');
      resolve();
    } catch (error) {
      console.error('Error configuring Cloudinary:', error);
      reject(error);
    }
  });
};

module.exports = configureCloudinary;
