// DB Object
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const db = require('../models');

// Les Entités qu'on importe
const { Sinister, Vehicule, Status } = db.sequelize.models;

// Get all sinisters
exports.getSinisters = async (req, res) => {
    const {
        idVehicle,
        idStatus
    } = req.params;
    let whereClause = {};

    if (idStatus) {
        whereClause = {
            idVehicle: idVehicle,
            status: idStatus
        }
    } else {
        whereClause = {
            idVehicle: idVehicle,
        }
    }
    try {
        const sinisters = await Sinister.findAll({
            include: [
                {
                    model: Vehicule, 
                    as: Sinister.idVehicle,
                },
                {
                    model: Status,
                    as: Sinister.status,
                }
            ],
            where: whereClause,
        });
        res.status(200).json({
            sinisters,
        });
    } catch (error) {
        res.status(500).json({
            error,
        });
    }
};

exports.createSinister = async (req, res) => {
    const {
        libelle,
        idVehicle,
        status
    } = req.body;
    const statusId = status.id

    try {
        const sinister = new Sinister({
            libelle,
            status: statusId,
            idVehicle
        });
        await sinister.save();

        //TODO: Changer le status du vehicle 
        //TODO: creer les seeds pour les status vehicle et family status pour vehicle et sinister
        res.status(200).json({
            message: "sinister created",
        });
    } catch (error) {
      
        return res.status(500).json({
            message: error.message,
        });
    }
};

exports.updateSinister = async (req, res) => {
    const idSinister = req.params.id;
    const {
        libelle,
        status,
        idVehicle
    } = req.body;

    await Sinister.update({
        libelle: libelle,
        status: status.id,
        idVehicle: idVehicle,
    }, {
        where: {
            id: idSinister
        }
    }).then((result) => {
        if (result === 1) {
            res.status(200).send({
                message: "Sinister updated successfully"
            });
        } else {
            res.send({
                message: "Something went wrong when trying to update sinister with id= " + idSinister + " , maybe it was not found"
            });
        }
    }).catch(error => {
        res.status(500).send({
            message: "Error updating sinister with id = " + idSinister
        });
    });
};

exports.deleteSinister = async (req, res) => {
    const idSinister = req.params.id;

    Sinister.destroy({
        where: {id: idSinister}
    }).then(result => {
        if (result == 1) {
            res.send({
                message: "Sinister was deleted successfully"
            });
        } else {
            res.send({ 
                message: "Cannot delete sinister with id= "+id+", maybe it wasn't found"
            });
        }
    }).catch(error => {
        res.status(500).send({
            message: "Could not delete sinister with id : "+id
          });
    });
};