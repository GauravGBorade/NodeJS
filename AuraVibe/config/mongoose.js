const mongoose = require("mongoose");
const env = require("./environment");

mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Error connecting to the DB:", err);
});
db.once("open", () => {
  console.log("connected to DB successfully");
});

module.exports = db;
