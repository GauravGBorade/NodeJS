/* Rendering html, css and Javascrit files from calculator project we created in JS part of the project on the server
fist import everything required
then we need check which url is presses and if css file is reqruied then provide with changed content-type as css or javascript or html.
then as usual just read the file using fs module with the help of fs.readfile and send the data received from reading the file to server using res.end(data);
 */

const http = require("http");
const fs = require("fs");

const port = 8000;

function requestHandler(req, res) {
  let filePath;

  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      filePath =
        "../../HtmlCssJs-CodingNinjas/JavaScript/Calculator/index.html";
      break;
    case "/style.css":
      res.writeHead(200, { "Content-Type": "text/css" });
      filePath = "../../HtmlCssJs-CodingNinjas/JavaScript/Calculator/style.css";
      break;
    case "/script.js":
      res.writeHead(200, { "Content-Type": "text/javascript" });
      filePath = "../../HtmlCssJs-CodingNinjas/JavaScript/Calculator/script.js";
      break;
    default:
      break;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.end(data);
    }
  });
}

const server = http.createServer(requestHandler);
server.listen(port, () => console.log("server is running on port : ", port));
