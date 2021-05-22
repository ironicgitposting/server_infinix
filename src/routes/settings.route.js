const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const SettingsController = require('../controllers/settings.controller');

const router = express.Router();

// Mail user
router.get('/settings/user/:id', checkAuth, SettingsController.getSettings);

module.exports = router;
