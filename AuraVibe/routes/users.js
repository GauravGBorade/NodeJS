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

// Route to initiate Google OAuth authentication
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Route to handle Google OAuth callback after successful authentication
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

//to verify the email and send the email
router.post("/createResetToken", usersController.createResetToken);

router.get("/password-reset-form", usersController.passwordResetEmailSend);

//to render the send link to user via email and actually reset the password
router.get("/reset-password/:token", usersController.resetPasswordPage);
router.post("/reset-password-submit/:token", usersController.resetPassword);

module.exports = router;
