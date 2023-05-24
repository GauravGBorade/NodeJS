const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/Aura-Vibe");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to the DB!"));

db.once("open", () => {
  console.log("connected to DB successfully");
});
