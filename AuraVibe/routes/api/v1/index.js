//! This is index file for all v1 API's routes. All apis related to v1 will be routed from here.
const express = require("express");
const router = express.Router();

router.use("/posts", require("./posts"));
router.use("/users", require("./users"));

module.exports = router;