const express = require("express");

const VehiculeController = require("../controllers/vehicules.controller");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();

// Get all users
router.get("", VehiculeController.getVehicules);

// Get available vehicules
router.get("/available/:startDate&:endDate", checkAuth, VehiculeController.getAvailableVehicules);

// Create vehicule
router.post("/add", checkAuth, VehiculeController.createVehicule);

// Update user
router.put("/update/:immatriculation", VehiculeController.updateVehicule);

// Delete user
router.post(
  "/delete/:immatriculation",
  checkAuth,
  VehiculeController.deleteVehicule
);

module.exports = router;
