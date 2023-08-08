//!All API's routes related to posts in v1.
const express = require("express");
const router = express.Router();

//impororting posts_api.js from controllers.
const postApi = require("../../../controllers/api/posts_api");

//getting lists of posts from controller.
router.get("/", postApi.index);

module.exports = router;
