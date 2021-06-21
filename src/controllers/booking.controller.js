// DB Object
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const db = require("../models");
const MailController = require("./mails.controller");

// Les Entités qu'on importe
const { Booking, Vehicule, Site, User, Status } = db.sequelize.models;

// Get all users
exports.getBookings = async (req, res) => {
  const {
    userId,
    userProfile
  } = req.params;
  let whereClause = {};
  if (userProfile !== '1') {
    whereClause = {
      driver: userId
    }
  }
  try {
    const booking = await Booking.findAll({
      include: [
        {
          model: Vehicule,
          as: Booking.lentVehicule,
        },
        {
          model: Site,
          as: "departureSite",
        },
        {
          model: Site,
          as: "arrivalSite",
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
      where: whereClause
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
    departureSite,
    arrivalSite
  } = req.body;

  const driverId = driver.id;
  const statusId = status.id;
  const departureSiteId = departureSite.id;
  const arrivalSiteId = arrivalSite.id;

  try {
    const booking = new Booking({
      driver: driverId,
      lentVehicule,
      startDate,
      endDate,
      status: statusId,
      departure_site: departureSiteId,
      arrival_site: arrivalSiteId
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
  const idVehicle = req.params.immatriculation;
  try {
    const booking = await Booking.findAll({
      where: {
        lentVehicule: idVehicle,
      },
      include: [
        {
          model: Vehicule,
          as: Booking.lentVehicule,
        },
        {
          model: Site,
          as: "departureSite",
        },
        {
          model: Site,
          as: "arrivalSite",
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

// Get all Bookings status=1
exports.getAllBookingsStatus = async (req, res) => {
  try {
    const status = req.params.status;

    Booking.findAndCountAll({
      where: {
        status: status,
      },
      include: [
        {
          model: Site,
          as: "departureSite",
        },
        {
          model: Site,
          as: "arrivalSite",
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
    }).then((result) => {
      res.status(200).json({
        notificationCount: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

// Get all Bookings status=1
exports.getAllBookings = async (req, res) => {
  try {
    const email = req.params.email;
    const status = req.params.status;

    Booking.findAndCountAll({
      include: [{ model: User, as: Booking.driver, where: { status: status } }],
    }).then((result) => {
      res.status(200).json({
        notificationCount: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

// Get all booking for one utilisateur
exports.getBookingsForUtilisateur = async (req, res) => {
  try {
    const UserId = req.params.id;
    Booking.findAndCountAll({
      where: {
        driver: UserId,
      },
      include: [
        {
          model: Site,
          as: "departureSite",
        },
        {
          model: Site,
          as: "arrivalSite",
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
    }).then((result) => {
      res.status(200).json({
        notificationCountBookingUser: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updateBooking = async (req, res) => {
  const {
    id,
    driver,
    lentVehicule,
    departureSite,
    arrivalSite,
    status,
    startDate,
    endDate
  } = req.body;

  await Booking.update({
    driver: driver.id,
    lentVehicule: lentVehicule.id || null,
    departure_site: departureSite.id,
    arrival_site: arrivalSite.id,
    status: status.id,
    startDate,
    endDate
  }, {
    where: {
      id: id
    }
  }).then((result) => {
    if (result === 1) {

      res.status(200).send({
        message: "Loan updated successfully"
      });

    } else {

      res.send({
        message: "Something went wrong when trying to update loan with id= " + id + ", maybe it was not found"
      });

    }
  }).catch(err => {
    console.log('erreur ' + err);
    res.status(500).send({
      message: "Error updating loan with id = " + id
    });
  });
};
