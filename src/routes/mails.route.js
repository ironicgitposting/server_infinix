const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const MailController = require('../controllers/mails.controller');

const router = express.Router();

// Mail user
router.get('/mail/:mail', checkAuth, MailController.mailUser);

module.exports = router;
