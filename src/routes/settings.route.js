const express = require('express');

const SettingsController = require('../controllers/settings.controller');

const router = express.Router();

// Get All Settings for user of id :id
router.get('/settings/user/:id', SettingsController.getSettingsByUserId);

// Create Setting
router.get('/settings/create', SettingsController.createSetting);

// Update Setting
router.get('/settings/update/:id', SettingsController.updateSetting);

// Delete Setting
router.get('/settings/delete/:id', SettingsController.deleteSetting);

module.exports = router;
