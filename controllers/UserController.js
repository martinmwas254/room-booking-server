const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary (make sure to install cloudinary package)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update Profile Picture
exports.updateProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'profile-pictures',
      transformation: [
        { width: 500, height: 500, crop: 'fill' }
      ]
    });

    // Update user's profile picture
    const user = await User.findByIdAndUpdate(
      req.user.id, 
      { profilePicture: result.secure_url }, 
      { new: true }
    );

    // Remove temp file
    fs.unlinkSync(req.file.path);

    res.status(200).json({ 
      message: 'Profile picture updated', 
      profilePictureUrl: result.secure_url 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile picture', error: error.message });
  }
};

// Delete Profile Picture
exports.deleteProfilePicture = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id, 
      { profilePicture: null }, 
      { new: true }
    );

    res.status(200).json({ message: 'Profile picture removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting profile picture', error: error.message });
  }
};

// Delete Account
exports.deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting account', error: error.message });
  }
};