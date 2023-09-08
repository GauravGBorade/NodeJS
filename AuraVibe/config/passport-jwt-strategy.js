const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt; // Import ExtractJwt for token extraction
const User = require("../models/user");
const env = require("./environment");

// Options for JWT Strategy
let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT token from Authorization header
  secretOrKey: env.jwt_secret, // Secret key to verify the JWT signature
};

// Create and use a new JWT Strategy
passport.use(
  new JWTStrategy(opts, async (jwtPayload, done) => {
    try {
      // Find the user in the database based on the ID extracted from the token payload
      const user = await User.findById(jwtPayload._id);

      if (user) {
        // If user is found, pass user object to passport middleware & set the req.user in the request.
        return done(null, user);
      } else {
        // If user is not found, pass false to passport middleware
        return done(null, false);
      }
    } catch (err) {
      console.log("error in jwt authentication", err);
      // Pass the error to the passport middleware
      return done(err, false);
    }
  })
);

module.exports = passport;
