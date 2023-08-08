//!All API's routes related to posts in v1.
const express = require("express");
const router = express.Router();

//impororting posts_api.js from controllers.
const postApi = require("../../../controllers/api/v1/posts_api");

//getting lists of posts from controller.
router.get("/", postApi.index);
router.delete("/:id", postApi.destroy);
router.get("/users", postApi.users);

module.exports = router;
