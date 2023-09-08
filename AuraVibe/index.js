const express = require("express");
const app = express();
const port = 8000;
const env = require("./config/environment");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const db = require("./config/mongoose");
//!commented this to run on windows
const sassMiddleware = require("node-sass-middleware");
/* used for session cookie */
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJwt = require("./config/passport-jwt-strategy");
const flash = require("connect-flash");
const customMiddleware = require("./config/middleware");
const googleStrategy = require("./config/passport-google-oauth2-strategy");
const path = require("path");

//*used for saving cookie-session in mongodb
const MongoStore = require("connect-mongo");

//* setting up chat server to be used with socket.io

const chatServer = require("http").Server(app);
const chatSockets = require("./config/chat_sockets").chatSockets(chatServer);
chatServer.listen(3000);
console.log("Chat server is lisetening on port : 3000");

//!Middlewares ->

//* telling app to concert sass files to css using sassMiddleware
//!commented this to run on windows
if (env.name == "development") {
  console.log("*********Development Environment is running*******");
  app.use(
    sassMiddleware({
      src: path.join(__dirname, env.asset_path, "/scss"),
      dest: path.join(__dirname, env.asset_path, "/css"),
      debug: false,
      // outputStyle: "extended",
      prefix: "/css",
    })
  );
}

//* getting the post data inside Body
// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(bodyParser.json());

//******************************************* */

//* telling app to use cookie parser
app.use(cookieParser());

//* telling app to use static files from assests folder
app.use(express.static(env.asset_path));

//* make the uploads path available to the browser
app.use("/uploads", express.static(__dirname + "/uploads"));

//* telling app to use layout defined in views.
app.use(expressLayouts);

//* telling app to put link for styles of individual pages into layout's head tag

app.set("layout extractStyles", true);
// app.set("layout extractScripts", true);

//*telling app that we are using EJS

app.set("view engine", "ejs");
app.set("views", "./views");

//* telling app to encrypt the session cookie

app.use(
  session({
    name: "AuraVibe",
    //todo -> change the secret before deployment in the production
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    //* setting cookie age
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongoUrl: "mongodb://localhost/Aura-Vibe",
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      (err) => {
        console.log(err);
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setFlash);

//* using express router from index.js from routes folder.
app.use("/", require("./routes/index"));

app.listen(8000, (err) => {
  if (err) {
    console.log(`Server not running, we got the error - ${err}`);
    return;
  }
  console.log(`Server is up and running on ${port} port`);
});

// app.get("/", (req, res) => {
//   res.send("it is up and running!");
// });
