const express = require("express");
const app = express();
const port = 8000;

app.listen(8000, (err) => {
  if (err) {
    console.log(`Server not running, we got the error - ${err}`);
    return;
  }
  console.log(`Server is up and running on ${port} port`);
});

app.get("/", (req, res) => {
  res.send("it is up and running!");
});
