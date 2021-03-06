// DB Object
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const db = require('../models');

// Les Entités qu'on importe
const { Vehicule } = db.sequelize.models;

// Get all users
exports.getVehicules = async (req, res) => {
  try {
    const vehicules = await Vehicule.findAll();
    res.status(200).json({
      vehicules,
    });
  } catch (error) {
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
    state
  } = req.body;

  try {
    const vehicule = new Vehicule({
      type,
      libelle,
      site,
      model,
      flagService,
      status,
      immatriculation,
      state
    });

    await vehicule.save();

    res.status(200).json({
      message: 'Vehicule created',
    });
  } catch (error) {
    
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateVehicule = async (req, res) => {
  const id = req.params.id;
  const { 
    type,
    libelle,
    site,
    model,
    flagService,
    status,
    immatriculation,
    state
        } = req.body;

  await Vehicule.update({ 
    type,
    libelle,
    site,
    model,
    flagService,
    status,
    immatriculation,
    state}, {
         where: { 
           id:id 
          }
    }).then( (result) => {

    if (result == 1){

      res.send({
        message: "Vehicule updated successfully"
      });

    } else {

      res.send({
        message: "Something went wrong when trying to update vehicule with id= "+id+", maybe it was not found"
      });

    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating vehicule with id = " + id
    });
  });
};

exports.deleteVehicule = async (req, res) => {
  const id = req.params.id;

  Vehicule.destroy({
    where: {id: id}
  }).then( (result) => {
    if(result == 1){

      res.send({ 
        message : "Vehicule was deleted successfully"
      });

    } else {
      
      res.send({ 
        message: "Cannot delete vehicule with id= "+id+", maybe it wasn'nt found"
      });

    }
  }).catch(err => {
    res.status(500).send({
      ùessage: "Could not delete vehicule with id : "+id
    });
  });
};