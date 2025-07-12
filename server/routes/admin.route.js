const express = require('express');
const router = express.Router();
const { getUnverifiedItems, approveItem, rejectItem } = require('../controllers/admin.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { asyncRouteHandler } = require('../utils/route.utils');

router.use(authMiddleware('admin'));
router.get('/unverified-list', asyncRouteHandler(getUnverifiedItems));
router.post('/:id/approve', asyncRouteHandler(approveItem));
router.post('/:id/reject', asyncRouteHandler(rejectItem));

module.exports = router;