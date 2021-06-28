const express = require("express");

const SinisterConstroller = require("../controllers/sinisters.controller");

const router = express.Router();


// Get list of sinisters or just one sinister 
router.get("/:idVehicle", SinisterConstroller.getSinisters);

// Create sinister
router.post("/create", SinisterConstroller.createSinister);

// Update sinister
router.post("/update/:id", SinisterConstroller.updateSinister);

// Archive sinister
router.get("/delete/:id", SinisterConstroller.deleteSinister);

module.exports = router;