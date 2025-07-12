const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { asyncRouteHandler } = require("../utils/route.utils");

router.post("/login", asyncRouteHandler(authController.login));
router.post("/logout", asyncRouteHandler(authController.logout));

module.exports = router;