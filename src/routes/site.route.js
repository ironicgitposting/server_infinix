const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const SiteController = require('../controllers/site.controller');

const router = express.Router();

// Get site
router.get('', checkAuth, SiteController.getSites);

// Create Site
router.post('/create', checkAuth, SiteController.createSite);


module.exports = router;
