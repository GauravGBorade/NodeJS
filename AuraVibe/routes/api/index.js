//! This is index file for all API's routes. v1, v2, v3 ...., all versions will be handled here.
const express = require("express");
const router = express.Router();

router.use("/v1", require("./v1"));

module.exports = router;
