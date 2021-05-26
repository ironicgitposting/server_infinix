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
    const sites = await Site.findAll();
    res.status(200).json({
      sites,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.createSite = async (req, res) => {
  const { label, adress, postalCode, city, phone, mail, pays } = req.body;

  try {
    const site = new Site({
      label,
      adress,
      postalCode,
      city,
      phone,
      mail,
      pays,
    });
    console.log("site", site);
    await site.save();

    res.status(200).json({
      message: "site created",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateSite = async (req, res) => {
  const { label } = req.params;
  const propsToUpdate = { ...req.body };
  const site = await Site.findOne({ where: { label } });
  if (!site) {
    throw Error(`Site not updated. label: ${label}`);
  }

  try {
    const propsUpdated = site.changed();
    const siteUpdated = await site.save();

    res.status(200).json({
      message: "Site updated",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteSite = async (req, res) => {
  const { label } = req.params;

  Site.destroy({
    where: {
      label,
    },
  })
    .then((result) => {
      if (result === 1) {
        res.send({
          message: "Site was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete user with email= ${label}, maybe it wasn'nt found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete user with email : ${label}`,
      });
    });
};
