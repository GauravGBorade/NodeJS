//*importing mongoose
const mongoose = require("mongoose");

//*connecting to the database
mongoose.connect("mongodb://localhost/contacts_list_db");

//*getting that connection
const db = mongoose.connection;

//*if error
db.on("error", console.error.bind(console, "Error connecting to the DB !"));

//*if successfull i.e. if connection is open
db.once("open", () => {
  console.log("Connected to the DB successfully !");
});
