const User = require("../../../models/user");
// Importing the 'jsonwebtoken' library for handling JSON Web Tokens
const jwt = require("jsonwebtoken");
const env = require("../../../config/environment");

// Defining and exporting a function named 'createSession' that handles creating a user session
module.exports.createSession = async function (req, res) {
  try {
    // Finding a user in the database based on the provided email and matching it with the one in database
    let user = await User.findOne({ email: req.body.email });

    // Checking if the user was not found or the provided password is incorrect
    if (!user || user.password != req.body.password) {
      // Returning a JSON response with a 422 Unprocessable Entity status code
      return res.status(422).json({
        message: "Invalid Username or Password",
      });
    }

    // If user authentication is successful, generate a JSON Web Token (JWT)
    return res
      .status(200) // Setting the HTTP response status code to 200 OK
      .json({
        // Sending a JSON response to the client
        message: "Sign in successful, Token is created!",
        data: {
          // Creating a JWT by signing the user object (converted to JSON) with a secret key and setting an expiration time
          token: jwt.sign(user.toJSON(), env.jwt_secret, {
            expiresIn: "100000", // Token will expire in 10000 seconds (approximately 2 hours and 46 minutes)
          }),
        },
      });
  } catch (err) {
    // Handling any errors that occur during the process
    console.log(err); // Logging the error to the console for debugging purposes
    return res.json(500, {
      message: "Internal Server Error!", // Returning a JSON response with a 500 Internal Server Error status code
    });
  }
};
