const http = require("http");
const fs = require("fs");
const port = 8000;

function requestHandler(req, res) {
  console.log(req.url);
  res.writeHead(200, { "content-type": "text/html" });

  let filePath;

  switch (req.url) {
    case "/":
      filePath =
        "../../HtmlCssJs-CodingNinjas/JavaScript/Calculator/index.html";
      break;
    case "/style.css":
      res.writeHead(200, { "content-type": "text/css" });
      filePath = "../../HtmlCssJs-CodingNinjas/JavaScript/Calculator/style.css";
      break;
    case "/script.js":
      res.writeHead(200, { "content-type": "text/javascript" });
      filePath = "../../HtmlCssJs-CodingNinjas/JavaScript/Calculator/script.js";
      break;
    case "/profile":
      filePath = "./profile.html";
      break;

    default:
      filePath = "./404.html";
      break;
  }

  fs.readFile(filePath, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    res.end(data);
  });
}
const server = http.createServer(requestHandler);
server.listen(port, function () {
  console.log("server is up and running on port : ", port);
});
