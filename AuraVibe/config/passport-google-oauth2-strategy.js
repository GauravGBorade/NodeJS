// Import required modules
const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

// Configure Passport to use Google OAuth 2.0 strategy
passport.use(
  new googleStrategy(
    {
      clientID:
        "726285059065-47bi612qjio5ho0dmaieuvhh86cd5flk.apps.googleusercontent.com", // Replace with your Google client ID
      clientSecret: "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", // Replace with your Google client secret
      callbackURL: "http://localhost:8000/users/auth/google/callback", // Callback URL after successful authentication
    },
    async function authenticateWithGoogle(
      accessToken,
      refreshToken,
      profile,
      done
    ) {
      try {
        // Find user in the database based on Google profile email
        const user = await User.findOne({
          email: profile.emails[0].value,
        }).exec();

        if (user) {
          // If user exists, return user details
          return done(null, user);
        } else {
          // If user doesn't exist, create a new user with Google profile details
          const newUser = await User.create({
            name: profile.displayName, // Use Google profile's display name
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"), // Generate a random password
          });

          // Return the newly created user
          return done(null, newUser);
        }
      } catch (err) {
        console.log("Error in Google OAuth:", err);
        return done(err);
      }
    }
  )
);

// Export the configured Passport instance
module.exports = passport;
