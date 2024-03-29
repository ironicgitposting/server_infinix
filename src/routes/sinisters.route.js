const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const SinisterConstroller = require("../controllers/sinisters.controller");
const router = express.Router();

// Get list of sinisters or just one sinister
router.get("/:idVehicle&:idStatus", checkAuth, SinisterConstroller.getSinisters);

// Create sinister
router.post("/create", checkAuth, SinisterConstroller.createSinister);

// Update sinister
router.post("/update/:id", checkAuth, SinisterConstroller.updateSinister);

// Archive sinister
router.get("/delete/:id", checkAuth, SinisterConstroller.deleteSinister);

module.exports = router;
