const express = require('express');

const SettingsController = require('../controllers/settings.controller');

const router = express.Router();

// Mail user
router.get('/settings/user/:id', SettingsController.getSettings);

module.exports = router;
