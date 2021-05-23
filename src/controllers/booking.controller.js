// DB Object
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const db = require("../models");
const MailController = require("./mails.controller");

// Les Entités qu'on importe
const { Booking, Vehicule, Site, User, Status } = db.sequelize.models;

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
        {
          model: Status,
          as: Booking.status,
        },
      ],
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
    site,
  } = req.body;

  const driverId = driver.id;
  const statusId = status.id;
  const siteId = site.id;

  try {
    const booking = new Booking({
      driver: driverId,
      lentVehicule,
      startDate,
      endDate,
      status: statusId,
      departureSite: siteId,
    });

    await booking.save();

    //Envoie du mail de demande de réservation de véhicule
    MailController.sendMailUserVehicleRequest(booking);

    res.status(200).json({
      message: "booking created",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get all users
exports.getBookingsForVehicle = async (req, res) => {
  const immatriculation = req.params.immatriculation;
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
        {
          model: Status,
          as: Booking.status,
        },
      ],
    }, {
      where: { 
        lentVehicule: immatriculation
        }
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
