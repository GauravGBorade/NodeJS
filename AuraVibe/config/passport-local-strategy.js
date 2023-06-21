const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

//* authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      //* Find the user and establish the identity

      User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password != password) {
            console.log("invalid username or password");
            return done(null, false);
          }

          return done(null, user);
        })
        .catch((err) => {
          console.log("Error in finding the user");
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

module.exports = passport;
