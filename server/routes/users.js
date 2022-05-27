const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

router.get("/", userController.getUser);
router.put("/", userController.updateUser);
router.delete("/", userController.deleteUser);

module.exports = router;
