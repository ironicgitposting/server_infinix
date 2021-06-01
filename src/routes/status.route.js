const express = require('express');
const checkAuth = require('../middleware/checkAuth');


const statusController = require('../controllers/status.controller');

const router = express.Router();

// Get Status
router.get('', checkAuth, statusController.getStatus);

module.exports = router;
