const express = require('express');

const SiteController = require('../controllers/site.controller');

const router = express.Router();

// Get site
router.get('', SiteController.getSites);

// Create Site
router.post('/create', SiteController.createSite);


module.exports = router;
