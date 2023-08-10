const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/users_controller");
router.get(
  "/profile/:id",
  passport.checkAuthentication,
  usersController.profile
);

router.post(
  "/update/:id",
  passport.checkAuthentication,
  usersController.update
);

// const userCreateController = require("../controllers/user_create_controller");
// router.get("/create", userCreateController.create);

router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);
router.get("/sign-out", usersController.signOut);

router.post("/create", usersController.create);

//! use passport as a middleware to authenticate here.

router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

//google oauth routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

module.exports = router;
