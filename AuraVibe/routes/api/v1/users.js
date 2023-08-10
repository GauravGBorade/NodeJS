//! This is index file for all v1 API's routes. All apis related to v1 will be routed from here.
const express = require("express");
const router = express.Router();

const usersApi = require("../../../controllers/api/v1/user_api");

router.post("/create-session", usersApi.createSession);

module.exports = router;
