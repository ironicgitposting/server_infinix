// DB Object
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const db = require("../models");

// Les Entités qu'on importe
const { Vehicule, Site, Status, User, Booking } = db.sequelize.models;

// Get all users
exports.getVehicules = async (req, res) => {
  try {
    const vehicules = await Vehicule.findAll({
      include: [
        {
          model: Site,
          as: Vehicule.site,
        },
      ],
    });
    res.status(200).json({
      vehicules,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};

exports.createVehicule = async (req, res) => {
  const {
    type,
    libelle,
    site,
    model,
    flagService,
    status,
    immatriculation,
    state,
  } = req.body;

  const siteId = site.id;

  try {
    const vehicule = new Vehicule({
      type,
      libelle,
      site: siteId,
      model,
      flagService,
      status,
      immatriculation,
      state,
    });

    await vehicule.save();

    res.status(200).json({
      message: "Vehicule created",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateVehicule = async (req, res) => {
  const lastImmatriculation = req.params.immatriculation;

  const {
    type,
    libelle,
    site,
    model,
    flagService,
    status,
    immatriculation,
    state,
  } = req.body;
  const siteId = site.id;

  await Vehicule.update(
    {
      type,
      libelle,
      site: siteId,
      model,
      flagService,
      status,
      immatriculation,
      state,
    },
    {
      where: {
        immatriculation: lastImmatriculation,
      },
    }
  )
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Vehicule updated successfully",
        });
      } else {
        res.send({
          message:
            "Something went wrong when trying to update vehicule with immatriculation= " +
            lastImmatriculation +
            ", maybe it was not found",
        });
      }
    })
    .catch((err) => {
      console.log("erreur " + err);
      res.status(500).send({
        message:
          "Error updating vehicule with immatriculation = " +
          lastImmatriculation,
      });
    });
};

exports.deleteVehicule = async (req, res) => {
  const immatriculation = req.params.immatriculation;

  Vehicule.destroy({
    where: { immatriculation: immatriculation },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Vehicule was deleted successfully",
        });
      } else {
        res.send({
          message:
            "Cannot delete vehicule with id= " +
            immatriculation +
            ", maybe it wasn't found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete vehicule with id : " + immatriculation,
      });
    });
};

// Get one vehicule
exports.getVehiculeById = async (req, res) => {
  //console.log("reponse :", req);
  try {
    return Vehicule.findOne({ where: { id: req } });
  } catch (error) {
    throw "impossible de trouver le vehicule avec la clé " + req.id;
  }
};
