const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const upload = require('../middleware/multerMiddleware'); // Create this middleware for file upload

// Get user profile
router.get('/profile', protect, userController.getUserProfile);

// Update profile picture
router.post('/profile-picture', 
  protect, 
  upload.single('profilePicture'), 
  userController.updateProfilePicture
);

// Delete profile picture
router.delete('/profile-picture', protect, userController.deleteProfilePicture);

// Delete account
router.delete('/account', protect, userController.deleteAccount);

module.exports = router;