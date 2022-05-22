const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");

router.post("/login", authController.handleLogin);
router.post("/register", authController.handleRegistration);
router.get("/logout", authController.handleLogout);
router.get("/refresh", authController.handleRefreshToken);

module.exports = router;
