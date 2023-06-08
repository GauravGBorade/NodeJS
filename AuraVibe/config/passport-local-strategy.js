const passport = require("passport");
const User = require("../models/user");

const LocalStrategy = require("passport-local").Strategy;

//* authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: email,
    },
    function (email, password, done) {
      //* Find the user and estblish the identity

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

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//* Deserializing the user from the key in the cookie

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

module.exports = passport;
