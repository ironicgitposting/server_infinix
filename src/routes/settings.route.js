const express = require('express');

const checkAuth = require('../middleware/checkAuth');
const SettingsController = require('../controllers/settings.controller');

const router = express.Router();

// Get All Settings for user of id :id
router.get('', checkAuth, SettingsController.getSettings);

// Update Setting
router.get('/update/:id', checkAuth, SettingsController.updateSetting);

module.exports = router;
