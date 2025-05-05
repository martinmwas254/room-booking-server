const express = require('express');
const router = express.Router();
const { 
  createBooking, 
  getUserBookings, 
  getAllBookings,
  cancelBooking, 
  approveBooking,
  rejectBooking,
  deleteBooking,
  calculateBookingCost
} = require('../controllers/bookingController');
const { protect, isAdmin } = require('../middleware/authMiddleware');


// All routes should be protected with authentication
router.use(protect);
router.post('/calculate', calculateBookingCost); // Calculate booking cost without creating a booking

// Regular user routes
router.post('/', createBooking);  // Create a new booking
router.get('/user', getUserBookings);  // Get all bookings for the authenticated user
router.delete('/delete/:bookingId', deleteBooking);  // delete a booking
router.put('/cancel/:bookingId', cancelBooking);  // Cancel a booking

// Admin routes
router.get('/all', isAdmin, getAllBookings);  // Admin gets all bookings
router.put('/approve/:bookingId', isAdmin, approveBooking);  // Admin approves the booking
router.put('/reject/:bookingId', isAdmin, rejectBooking);  // Admin reject the booking

module.exports = router;