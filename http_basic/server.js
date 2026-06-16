// Create a basic HTTP server using nodejs
const http = require("http");

// create the server
const server = http.createServer((req, res) => {
  // set status and header
  // send response based on route
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/plain" });

    res.end("Welcome to the Home Page!");
  } else if (req.url === "/about") {
    res.end("This is the About Page.");
  } else {
    res.writeHead(404);
    res.end("Page Not Found");
  }
});

// start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`http://192.168.12.28:${PORT}`);
});
