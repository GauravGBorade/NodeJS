const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "temptemptemp",
  db: "auravibe_development",
  smtp: {
    service: "gmail", // Email service provider (e.g., Gmail)
    host: "smtp.gmail.com", // SMTP server hostname for the service
    port: 587, // Port number for the SMTP server
    secure: false, // Set to 'true' to use a secure connection (TLS); 'false' means plain connection
    auth: {
      user: "gauravborade96@gmail.com", // Your email address from which you'll send emails
      pass: "xczcepkfnqohkpec", // Your email account's password or an app-specific password
    },
  },
  google_client_id:
    "726285059065-47bi612qjio5ho0dmaieuvhh86cd5flk.apps.googleusercontent.com", // Replace with your Google client ID
  google_client_secret: "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", // Replace with your Google client secret
  google_client_url: "http://localhost:8000/users/auth/google/callback", // Callback URL after successful authentication

  jwt_secret: "MacbookAirM1",
};

const production = {
  name: "production",
  asset_path: process.env.AURAVIBE_ASSET_PATH,
  session_cookie_key: process.env.AURAVIBE_SESSION_COOKIE_KEY,
  db: process.env.AURAVIBE_DB,
  smtp: {
    service: "gmail", // Email service provider (e.g., Gmail)
    host: "smtp.gmail.com", // SMTP server hostname for the service
    port: 587, // Port number for the SMTP server
    secure: false, // Set to 'true' to use a secure connection (TLS); 'false' means plain connection
    auth: {
      user: process.env.AURAVIBE_GOOGLE_USERNAME, // Your email address from which you'll send emails
      pass: process.env.AURAVIBE_GOOGLE_PASSWORD, // Your email account's password or an app-specific password
    },
  },
  google_client_id: process.env.AURAVIBE_GOOGLE_CLIENT_ID, // Replace with your Google client ID
  google_client_secret: process.env.AURAVIBE_GOOGLE_CLIENT_SECRET, // Replace with your Google client secret
  google_client_url: process.env.AURAVIBE_GOOGLE_CLIENT_URL, // Callback URL after successful authentication

  jwt_secret: process.env.AURAVIBE_JWT_SECRET,
};
module.exports = eval(process.env.AURAVIBE_ENVIRONMENT == undefined ? development : production);
