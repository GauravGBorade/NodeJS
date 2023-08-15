// Import the nodemailer configuration module
const nodemailer = require("../config/nodemailer");

// Define and export a method for sending a new comment notification email
exports.sendNewPasswordLink = (user, accessToken) => {
  let htmlString = nodemailer.renderTemplate(
    { user: user, accessToken: accessToken },
    "/passwords/password_reset.ejs" // relative path to the ejs file for comment. this will be sent to the nodemailer to render the file.
  );

  // Send an email using the configured transporter from nodemailer
  nodemailer.transporter.sendMail(
    {
      from: "no-reply@AuraVibe.in", // Sender's email address
      to: user.email, // Recipient's email address (user's email)
      subject: "Reset Password Link", // Email subject
      html: htmlString, // HTML content of the email body
    },
    (err, info) => {
      if (err) {
        console.log("error in sending the mail", err); // Log an error if email sending fails
        return;
      }
      console.log("Mail Delivered!");
      // console.log("mail delivered", info); // Log the successful delivery of the email
      return;
    }
  );
};
