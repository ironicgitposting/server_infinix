// DB Object
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const MailController = require("./mails.controller");
// Les Entités qu'on importe
const { Booking, Vehicule, Site, User, Status, Setting } = db.sequelize.models;
// Get all users
exports.getBookings = async (req, res) => {
  const { userId, userProfile } = req.params;
  let whereClause = {};
  if (userProfile !== "1") {
    whereClause = {
      driver: userId,
    };
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
      where: whereClause,
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
    arrivalSite,
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
      arrival_site: arrivalSiteId,
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
exports.getBookingsForUtilisateurStatusValide = async (req, res) => {
  try {
    const UserId = req.params.id;
    const status = req.params.status;
    Booking.findAndCountAll({
      where: {
        driver: UserId,
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
  /*Récupération du flag pour le paramètre "Modification Reservation Utilisateur"*/
  const mailSetting = await Setting.findOne({
    where: { label: "Modification Reservation Utilisateur" },
  });

  const {
    id,
    driver,
    lentVehicule,
    departureSite,
    arrivalSite,
    status,
    startDate,
    endDate,
  } = req.body;

  await Booking.update(
    {
      driver: driver.id,
      lentVehicule: lentVehicule?.id || null,
      departure_site: departureSite.id,
      arrival_site: arrivalSite.id,
      status: status.id,
      startDate,
      endDate,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then(async (result) => {
      if (result[0] === 1) {
        // status id = 4 Validé
        if (status.id == "4") {
          // Déclenchement du mail de validation de la réservation
          const bookingValide = await this.getBookingById(id);
          MailController.sendMailLoanValidation(bookingValide);
        }
        // status id = 6 Annulé
        else if (status.id == "6") {
          const bookingAnnnule = await this.getBookingById(id);
          MailController.sendMailLoanAnnulation(bookingAnnnule);
        }
        // status id = 3 Clôturé
        else if (status.id == "3") {
          const bookingCloture = await this.getBookingById(id);
          MailController.sendMailLoanCloture(bookingCloture);
        } else if (mailSetting && Boolean(mailSetting.flag)) {
          const bookingModification = await this.getBookingById(id);
          MailController.sendMailLoanModification(bookingModification);
        }

        res.status(200).send({
          message: "Loan updated successfully",
        });
      } else {
        res.send({
          message:
            "Something went wrong when trying to update loan with id= " +
            id +
            ", maybe it was not found",
        });
      }
    })
    .catch((err) => {
      console.log("erreur " + err);
      res.status(500).send({
        message: "Error updating loan with id = " + id,
      });
    });
};

// Get one site
exports.getBookingById = async (req, res) => {
  try {
    return Booking.findOne({ where: { id: req } });
  } catch (error) {
    throw "impossible de trouver le booking avec la clé " + req.id;
  }
};


exports.updateBookingForClose = async (req, res) => {
  /*Récupération du flag pour le paramètre "Modification Reservation Utilisateur"*/
  const mailSetting = await Setting.findOne({
    where: { label: "Modification Reservation Utilisateur" },
  });

  const {
    idloan,
    idVehicle,
    status,
    killometrage,
    essence,
    comment,
  } = req.body;

  await Booking.update(
    {
      status: status.id,
      killometrage: killometrage.id,
      essence: essence.id,
      comment: comment.id,
    },
    {
      where: {
        id: idloan,
      },
    }
  )
  await Vehicule.update(
    {
      killometrageVehicule: killometrage.id,
      essenceVehicule: essence.id,
    },
    {
      where:{
        id: idVehicle,
      },
    }
  )
  .then(async (result) => {
    // status id = 3 Clôturé
    if (status.id == "3") {
      const bookingCloture = await this.getBookingById(id);
      MailController.sendMailLoanCloture(bookingCloture);
    } 

    res.status(200).send({
      message: "Loan updated successfully",
    });
  })
  .catch((err) => {
    console.log("erreur " + err);
    res.status(500).send({
      message: "Error updating loan with id = " + id,
    });
  });
};