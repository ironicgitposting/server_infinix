// DB Object
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const db = require('../models');

// Les Entités qu'on importe
const { Booking, Vehicule, Site, User } = db.sequelize.models;

// Get all users
exports.getBookings = async (req, res) => {
  try {
    const booking = await Booking.findAll({
      include: [
          {
            model: Vehicule,
            as: Booking.lentVehicule,
          },
          {
            model: Site,
            as: Booking.departureSite,
          },
          {
            model: User,
            as: Booking.driver,
          },
        ]
    });
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
    driver,
    lentVehicule,
    startDate,
    endDate,
    status,
    departureSite
  } = req.body;

  try {
    const booking = new Booking({
      driver,
      lentVehicule,
      startDate,
      endDate,
      status,
      departureSite
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
