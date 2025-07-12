// routes/item.route.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');

router.get('/', itemController.getAllItems);

module.exports = router;
