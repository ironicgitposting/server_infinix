const express = require("express");

const SiteController = require("../controllers/sites.controller");

const router = express.Router();

// Get all sites
//router.get("", SiteController.getSites);

// Get all sites disponible
router.get("", SiteController.getSitesAvailable);

// Create Site
router.post("/create", SiteController.createSite);

// Update user
router.put("/update/:label", SiteController.updateSite);

// Delete user
router.post("/delete/:id", SiteController.deleteSite);

module.exports = router;
