const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { asyncRouteHandler } = require('../utils/route.utils');
const { upload } = require('../utils/multer.utils');
const { authMiddleware } = require('../middlewares/auth.middleware');

router.use(authMiddleware('user'));
router.post(
	'/add-product',
	upload.array('images', 5),
	asyncRouteHandler(userController.createProduct)
);
router.get('/fetch-product', asyncRouteHandler(userController.getAllProducts));

module.exports = router;
