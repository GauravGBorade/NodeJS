const User = require("../models/user");

module.exports.profile = function (res, res) {
  res.send("Profile page loaded!");
};

module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "AuraVibe | Sign Up",
  });
};

module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "AuraVibe | Sign In",
  });
};

//Sign Up
module.exports.create = function (req, res) {
  console.log("body : ", req.body);
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  //checking if email already exist in the database, if it does then dont create the user else create the user
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        //*if user email DOESN't exist in database
        User.create(req.body)
          .then(() => res.redirect("/users/sign-in")) // Wrap res.redirect in a function
          .catch((err) => {
            console.log("Error Creating the User in DB:", err);
            // Handle the error appropriately
          });
      } else {
        //*if user email DOES exist in database
        return res.redirect("back");
      }
    })
    .catch((err) => {
      console.log("Error Finding the User in DB:", err);
      // Handle the error appropriately
    });
};

//Sign In user and create the user session
module.exports.createSession = function (req, res) {
  //TODO add route
};
