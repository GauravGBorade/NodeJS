//!All API's routes related to posts in v1.
const express = require("express");
const router = express.Router();
const passport = require("passport");

//impororting posts_api.js from controllers.
const postApi = require("../../../controllers/api/v1/posts_api");

//getting lists of posts from controller.
router.get("/", postApi.index);

//*deleting the post with authentication from JWT.
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postApi.destroy
);
// router.get("/users", postApi.users);

module.exports = router;
