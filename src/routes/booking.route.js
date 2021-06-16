const express = require("express");
const checkAuth = require("../middleware/checkAuth");

const BookingController = require('../controllers/booking.controller');

const router = express.Router();

// Get booking
router.get("", checkAuth, BookingController.getBookings);

// Create booking
router.post("/create", checkAuth, BookingController.createBooking);

// Update booking
router.post('/update', checkAuth, BookingController.updateBooking);

//Get booking for one vehicle
router.get(
  "/for-vehicle/:immatriculation",
  checkAuth,
  BookingController.getBookingsForVehicle
);

// Get booking with status
router.get("/status/:status&:email", BookingController.getAllBookings);

// Get booking with status
router.get("/status/:status", BookingController.getAllBookingsStatus);

//Get booking with one utilisateur
router.get("/for-utilisateur/:id", BookingController.getBookingsForUtilisateur);

module.exports = router;
