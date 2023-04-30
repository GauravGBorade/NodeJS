const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users_controller");
router.get("/profile", usersController.profile);

// const userCreateController = require("../controllers/user_create_controller");
// router.get("/create", userCreateController.create);

module.exports = router;
