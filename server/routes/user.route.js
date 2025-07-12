const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth.middleware');
const { asyncRouteHandler } = require('../utils/route.utils');
const userController = require('../controllers/user.controller');
const { upload } = require('../utils/multer.utils');

router.use(authMiddleware('user'));
// router.get('/profile', asyncRouteHandler(userController.getUserProfile));
// router.post('/profile', asyncRouteHandler(userController.updateUserProfile));
router.post('/:id/request-swap', asyncRouteHandler(userController.requestSwap));
router.post('/:id/redeem-points', asyncRouteHandler(userController.redeemWithPoints));

router.post(
	'/add-product',
	upload.array('images', 5),
	asyncRouteHandler(userController.createProduct)
);
router.get('/fetch-product', asyncRouteHandler(userController.getAllProducts));

module.exports = router;
