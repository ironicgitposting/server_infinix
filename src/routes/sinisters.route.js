const express = require("express");

const SinisterConstroller = require("../controllers/sinisters.controller");

const router = express.Router();


// Get all sinisters disponible
router.get("", SinisterConstroller.getSinisters);

// Create sinister
router.post("/create", SinisterConstroller.createSinister);

// Update sinister
router.put("/update/:label", SinisterConstroller.updateSinister);

// Archive sinister
router.post("/delete/:id", SinisterConstroller.archiveSinister);

module.exports = router;