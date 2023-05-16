const express = require("express");
const app = express();
const db = require("./config/mongoose");

//! Middleware
app.use(express.urlencoded({ extended: true })); //using middleware to decode the data coming from form which is stored in req.body
app.set("view engine", "ejs"); //setup view engine
app.set("views", "./views"); //setup view engine
app.use(express.static("./assets")); //tell app to use static files inside assets folder
app.use("/", require("./routes/index")); //setup router for all coming requests to pass it to index.js to handle

app.listen(8000, (err) => {
  if (err) {
    console.log(`Server is not Running Error : ${err}`);
    return;
  }
  console.log(`Server is running on port 8000`);
});
