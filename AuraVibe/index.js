const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");

//* telling app to use static files from assests folder
app.use(express.static("./assets"));

//* telling app to use layout defined in views.
app.use(expressLayouts);

//* telling app to put link for styles of individual pages into layout's head tag

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//* using express router from index.js from routes folder.

app.use("/", require("./routes/index"));

//*telling app that we are using EJS

app.set("view engine", "ejs");
app.set("views", "./views");

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
