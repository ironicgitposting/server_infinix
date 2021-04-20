const express = require('express');

const BookingController = require('../controllers/booking.controller');

const router = express.Router();

// Get booking
router.get('', BookingController.getBookings);

// Create booking
router.post('/create', BookingController.createBooking);


module.exports = router;
