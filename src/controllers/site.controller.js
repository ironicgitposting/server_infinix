// DB Object
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const db = require("../models");
const MailController = require("./mails.controller");

// Les Entités qu'on importe
const { Site } = db.sequelize.models;

// Get all users
exports.getSites = async (req, res) => {
  try {
    const site = await Site.findAll({
      include: [
        {
          model: Site,
          as: Site.label,
        },
      ],
    });
    res.status(200).json({
      site,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.createSite = async (req, res) => {
  const {
    label,
    status,
  } = req.body;

  try {
    const site = new Site({
      label
      status
    });

    await site.save();

    //Envoie du mail de demande de réservation de véhicule
    //MailController.sendMailUserVehicleRequest(site);

    res.status(200).json({
      message: "site created",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
