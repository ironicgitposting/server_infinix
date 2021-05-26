const express = require("express");

const SiteController = require("../controllers/sites.controller");

const router = express.Router();

// Get all sites
router.get("", SiteController.getSites);

// Create Site
router.post("/create", SiteController.createSite);

// Update user
router.put("/update/:label", SiteController.updateSite);

// Delete user
//router.post("/delete/:label", SiteController.deleteSite);

module.exports = router;
