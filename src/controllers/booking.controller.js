// DB Object
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const db = require('../models');

// Les Entités qu'on importe
const { Booking } = db.sequelize.models;

// Get all users
exports.getBookings = async (req, res) => {
  try {
    const booking = await Booking.findAll();
    res.status(200).json({
      booking,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.createBooking = async (req, res) => {
  const {
    vehicule,
    startDate,
    endDate,
    status,
    departure
  } = req.body;

  try {
    const booking = new Booking({
      vehicule,
      startDate,
      endDate,
      status,
      departure
    });

    await booking.save();

    res.status(200).json({
      message: 'booking created',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
