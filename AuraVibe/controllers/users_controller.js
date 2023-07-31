const User = require("../models/user");
const fs = require("fs");
const path = require("path");

module.exports.profile = async function (req, res) {
  //! as we used passport js "user" in local is set in passport-local-strategy
  //! we dont have to explicitelty assign and pass user to ejs file now like we did before we can simply just load the profile page and use "user" variable there to access user data.
  // console.log(res.locals);

  try {
    let user = await User.findById(req.params.id);

    return res.render("user_profile", {
      title: "Profile",
      profile_user: user,
    });
  } catch (error) {
    console.log(error);
    return;
  }

  //! manual(old) way of showing profile page.

  // if (req.cookies.user_id) {
  //   User.findById(req.cookies.user_id)
  //     .then((user) => {
  //       return res.render("user_profile", {
  //         title: "Profile",
  //         user: user,
  //       });
  //     })
  //     .catch((err) => {
  //       "error in profile setting", err;
  //     });
  // } else {
  //   console.log("sent to sing-in as user is not signed in");
  //   return res.redirect("/users/sign-in");
  // }
};

//!updating user's info
module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      //find user
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log(err);
        }

        //if there's no error
        user.name = req.body.name;
        user.email = req.body.email;
        //we can put just req.body instead of above 2 fields as it is exactly those 2 fields. Nothing more or less.
        if (req.file) {
          if (
            user.avatar &&
            fs.existsSync(path.join(__dirname, "..", user.avatar))
          ) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          } else {
            user.avatar = null;
          }

          //this is saving path of uploaded file into avatar field in the User's Model.
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        res.redirect("back");
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    req.flash("err", err);
    return res.redirect("back");
  }
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "AuraVibe | Sign Up",
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "AuraVibe | Sign In",
  });
};

//Sign Up
module.exports.create = async function (req, res) {
  // console.log("body : ", req.body);
  try {
    // Checking if password and confirm password fields match or not.
    if (req.body.password != req.body.confirm_password) {
      return res.redirect("back");
    }
    // checking if email already exist in the database, if it does then dont create the user else create the user
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      // if user email DOESN't exist in database create one and redirect to sign in page.
      await User.create(req.body);
      res.redirect("/users/sign-in");
    } else {
      // if user email DOES exist in database then just send him back for now.
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error Finding the User in DB:", err);
    return;
  }
};

//Sign In user and create the user session
//!creating session with PASSPORT - JS; not much to do here as middleware(route's middleware) and passport will take care of it.
module.exports.createSession = function (req, res) {
  req.flash("success", "Signed In Successfully");
  console.log("flasshed for sign in");
  return res.redirect("/");
};

//!manual way of creating a user session and sign in
/* // finding the user first
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
}; */

module.exports.signOut = function (req, res, next) {
  //!Passport JS way of signing Out

  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged Out!");
    res.redirect("/");
  });

  //!manual way of clearing a cookie i.e. signout
  /* res.clearCookie("user_id");
  res.redirect("/users/sign-in"); */
};
