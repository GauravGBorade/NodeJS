// Import the required modules
const nodemailer = require("nodemailer"); // Module for sending emails
const ejs = require("ejs"); // Module for rendering HTML templates
const path = require("path"); // Module for handling file paths

const env = require("./environment");

// Create a transporter to send emails
let transporter = nodemailer.createTransport(env.smtp);

// Function to render an EJS template and return the HTML content
//* we will get these attributes from comments_mailer.js from mailer folder.
let renderTemplate = (data, relativePath) => {
  let mailHTML;

  // Render the EJS template using the provided data
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath), // Construct the path to the EJS template file
    data, // Data to be injected into the template
    function (err, template) {
      if (err) {
        console.log("error in rendering the mail template", err); // Log an error if rendering fails
        return;
      }
      mailHTML = template; // Store the rendered template in the mailHTML variable
    }
  );

  return mailHTML; // Return the rendered HTML content
};

// Export the transporter and renderTemplate function for use in other modules
module.exports = {
  transporter: transporter, // Export the configured transporter
  renderTemplate: renderTemplate, // Export the function to render EJS templates
};
