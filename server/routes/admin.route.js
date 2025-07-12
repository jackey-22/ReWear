const express = require('express');
const router = express.Router();
const { getUnverifiedItems, approveItem, rejectItem, getDashboardStats,getAdminProfile } = require('../controllers/admin.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { asyncRouteHandler } = require('../utils/route.utils');

router.use(authMiddleware('admin'));
router.get('/', asyncRouteHandler(getDashboardStats));
router.get('/unverified-list', asyncRouteHandler(getUnverifiedItems));
router.post('/:id/approve', asyncRouteHandler(approveItem));
router.post('/:id/reject', asyncRouteHandler(rejectItem));
router.get('/profile', asyncRouteHandler(getAdminProfile));

module.exports = router;