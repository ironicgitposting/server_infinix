// DB Object
const db = require("../models");
const sequelize = require('sequelize');
const Op = require('sequelize').Op;
const moment = require("moment");

// Les Entités qu'on importe
const { Vehicule, Site, Status, Booking } = db.sequelize.models;

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

// Get available vehicules
exports.getAvailableVehicules = async (req, res) => {
  let {
    startDate,
    endDate
  } = req.params;
  let whereClause;
  if (endDate === 'null') {
    whereClause = {
      $and: sequelize.where(sequelize.fn('date', sequelize.col('startDate')), '<', moment(startDate).format('YYYY-MM-DD')),
      status: {
        [Op.or]: [2, 4, 5]
      },
      lentVehicule: {
        [Op.ne]: null
      }
    };
  } else {
    whereClause = {
      [Op.or]: {
        startDate: {
          [Op.between]: [moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD')]
        },
        endDate: {
          [Op.between]: [moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD')]
        },
        [Op.and]: [
            sequelize.where(sequelize.fn('date', sequelize.col('startDate')), '<', moment(startDate).format('YYYY-MM-DD')),
            sequelize.where(sequelize.fn('date', sequelize.col('endDate')), '>', moment(endDate).format('YYYY-MM-DD'))
        ]
      },
      status: {
        [Op.or]: [2, 4, 5]
      },
      lentVehicule: {
        [Op.ne]: null
      }
    };
  }
  try {
    const busyVehiculesFromBookings = await Booking.findAll({
      attributes: [
        [sequelize.fn('DISTINCT', sequelize.col('lentVehicule')) ,'lentVehicule'],
      ],
      where: whereClause
    });
    const andClause = [];
    for (let busyVehiculesId in busyVehiculesFromBookings) {
      if (busyVehiculesFromBookings.hasOwnProperty(busyVehiculesId)) {
        andClause.push({id: { [Op.ne]: busyVehiculesFromBookings[busyVehiculesId].get('lentVehicule')}});
      }
    }
    const vehicules = await Vehicule.findAll({
      include: [
        {
          model: Site,
          as: Vehicule.site,
        },
        {
          model: Status,
          as: Vehicule.status,
        },
      ],
      where: {
          [Op.and]: andClause
      }
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
