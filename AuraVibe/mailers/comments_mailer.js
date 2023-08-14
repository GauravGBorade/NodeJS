// Import the nodemailer configuration module
const nodemailer = require("../config/nodemailer");

// Define and export a method for sending a new comment notification email
exports.newCommment = (comment) => {
  let htmlString = nodemailer.renderTemplate(
    { comment: comment },
    "/comments/new_comment.ejs" // relative path to the ejs file for comment. this will be sent to the nodemailer to render the file.
  );

  // Send an email using the configured transporter from nodemailer
  nodemailer.transporter.sendMail(
    {
      from: "no-reply@AuraVibe.in", // Sender's email address
      to: comment.post.user.email, // Recipient's email address (user's email)
      subject: "You've received a New Comment on your post!", // Email subject
      html: htmlString, // HTML content of the email body
    },
    (err, info) => {
      if (err) {
        console.log("error in sending the mail", err); // Log an error if email sending fails
        return;
      }
      console.log("mail delivered", info); // Log the successful delivery of the email
      return;
    }
  );
};
