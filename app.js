// Express implementation

const express = require("express");

// express app
const app = express();

// this returns an instance of  the server,
// could be useful for web sockets

app.listen(3000);

app.get("/", (req, res) => {
  //the express way

  // this also sets the content type header
  //res.send("<p> home page </p>");

  res.sendFile("./views/index.html", { root: __dirname });

  /* the nodejs way
    res.setHeader('Content-Type', 'text/html')
    res.statusCode // it can do that automaticaly
    res.write()
    res.end()
    */
});

app.get("/about", (req, res) => {
  // res.send("<p>Heloo, this is about page</p>");
  res.sendFile("/views/about.html", { root: __dirname });
});

// redirects

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404

app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});
