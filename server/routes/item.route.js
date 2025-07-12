// routes/item.route.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');

router.get('/', itemController.getAllItems);
router.get('/:id', itemController.getItemById); // ✅ new route to get item details

module.exports = router;