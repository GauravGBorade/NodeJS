const User = require("../models/user");

module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id)
      .then((user) => {
        return res.render("user_profile", {
          title: "Profile",
          user: user,
        });
      })
      .catch((err) => {
        "error in profile setting", err;
      });
  } else {
    console.log("sent to sing-in as user is not signed in");
    return res.redirect("/users/sign-in");
  }

  // res.redirect("user_profile", {
  //   title: "Profile",
  //   user: user,
  // });
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
  // console.log("body : ", req.body);
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

//* finding the user first
module.exports.createSession = function (req, res) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      //if user is found with given email id
      if (user) {
        //check for password
        if (user.password != req.body.password) {
          return res.redirect("back");
        }

        //if passwords match then send cookie and redirect to profile page
        res.cookie("user_id", user.id);
        return res.redirect("/users/profile");
      } else {
        // if user is not found with given email id
        return res.redirect("back");
      }
    })
    .catch((err) => {
      console.log("error while finding user!", err);
    });
};

module.exports.signOut = function (req, res) {
  res.clearCookie("user_id");
  res.redirect("/users/sign-in");
};
