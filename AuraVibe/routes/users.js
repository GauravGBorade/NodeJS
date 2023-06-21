const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/users_controller");
router.get("/profile", passport.checkAuthentication, usersController.profile);

// const userCreateController = require("../controllers/user_create_controller");
// router.get("/create", userCreateController.create);

router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);
router.post("/sign-out", usersController.signOut);

router.post("/create", usersController.create);

//* use passport as a middleware to authenticate.
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

module.exports = router;
