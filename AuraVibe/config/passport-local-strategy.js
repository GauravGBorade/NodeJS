const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
//* authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true, //*because of this field set to true, we can use "req" below.
    },
    function (req, email, password, done) {
      //* Find the user and establish the identity

      User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password != password) {
            req.flash("error", "Invalid Username or Password");
            return done(null, false);
          }

          return done(null, user);
        })
        .catch((err) => {
          req.flash("error", err);
          return done(err);
        });
    }
  )
);

//* serializing the user to decide which key is to be kept in the cookie
//* basically browser will store user.id in cookie as we are telling it to do so below. This also encrypts the id
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//* Deserializing the user from the key in the cookie
//* this is same as we used for profile page showing. Browser will send a req with a encrypted id of user asking for profile page.
//* with deserializeUser we will identify the user from user id and will display profile page.
passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      console.log("Error in finding the user");
      return done(err);
    });
});

/* this completes the cycle. signing in with 1st fucntion, then serializing it and sending user.id to browser and then when
 profile page is loaded user's identity is established with deserializing the user ez. */

//! sending data to ejs/routes with help of PASSPORT-JS

//* creating 2 middlewares for it ->

//check if the user is authenticated, we will use this in route as middleware to check if user is authenticated and then only load profile page

passport.checkAuthentication = function (req, res, next) {
  //if the user is signed in, then pass on the request to the next function (controller's action)

  if (req.isAuthenticated()) {
    return next();
  }
  // if user is not signed in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  return next();
};

module.exports = passport;
