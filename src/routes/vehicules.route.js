const express = require('express');

const VehiculeController = require('../controllers/vehicules.controller');

const router = express.Router();

// Get all users
router.get('', VehiculeController.getVehicules);

// Create vehicule
router.post('/add', VehiculeController.createVehicule);

// Update user
router.get('/update/:id', VehiculeController.updateVehicule);

// Delete user
router.get('/delete/:id', VehiculeController.deleteVehicule);

module.exports = router;
