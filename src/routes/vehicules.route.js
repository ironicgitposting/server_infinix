const express = require('express');

const VehiculeController = require('../controllers/vehicules.controller');

const router = express.Router();

// Get all users
router.get('', VehiculeController.getVehicules);



module.exports = router;
