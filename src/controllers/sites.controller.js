// DB Object
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const db = require("../models");
const MailController = require("./mails.controller");

// Les Entités qu'on importe
const { Site } = db.sequelize.models;

// Get all users
exports.getSites = async (req, res) => {
  const status = req.params.status;
  try {
    const sites = await Site.findAll({
      where: {
        status: 1000,
      },
    });
    res.status(200).json({
      sites,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

// Get all users
exports.getSitesAvailable = async (req, res) => {
  try {
    const sites = await Site.findAll({
      where: {
        status: 1000,
      },
    });
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
  const status = 1000;
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
      status,
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
  const lastlabel = req.params.label;
  const { label, adress, postalCode, city, phone, mail, pays } = req.body;
  console.log(req.body);
  await Site.update(
    {
      label,
      adress,
      postalCode,
      city,
      phone,
      mail,
      pays,
    },
    {
      where: {
        label: lastlabel,
      },
    }
  )
    .then((result) => {
      if (result) {
        res.send({
          message: "Site updated successfully",
        });
      } else {
        res.send({
          message:
            "Something went wrong when trying to update site with id= " +
            req.params.id +
            ", maybe it was not found",
        });
      }
    })
    .catch((err) => {
      console.log("erreur " + err);
      res.status(500).send({
        message: "Error updating site with id = " + req.params.id,
      });
    });
};

exports.deleteSite = async (req, res) => {
  const id = req.params.id;
  const { label, adress, postalCode, city, phone, mail, pays } = req.body;
  const status = 2000;
  console.log(req.body);
  await Site.update(
    {
      status,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then((result) => {
      if (result) {
        res.send({
          message: "Site updated successfully",
        });
      } else {
        res.send({
          message:
            "Something went wrong when trying to update site with id= " +
            req.params.id +
            ", maybe it was not found",
        });
      }
    })
    .catch((err) => {
      console.log("erreur " + err);
      res.status(500).send({
        message: "Error updating site with id = " + req.params.id,
      });
    });
};

// Get one site
exports.getSiteById = async (req, res) => {
  //console.log("reponse :", req);
  try {
    return Site.findOne({ where: { id: req } });
  } catch (error) {
    throw "impossible de trouver le site avec la clé " + req.id;
  }
};
