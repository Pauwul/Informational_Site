// const http = require("http");
// const fs = require("fs");

// const server = http.createServer((req, res) => {
//   // set header content type
//   res.setHeader("Content-Type", "text/html");

//   let path = "./views/";
//   switch (req.url) {
//     case "/":
//       path += "index.html";
//       res.statusCode = 200;
//       break;
//     case "/about-me":
//       path += "about.html";
//       res.statusCode = 200;
//       break;
//     default:
//       path += "404.html";
//       res.statusCode = 404;
//       break;
//   }
//   fs.readFile(path, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.end(data);
//     }
//   });
// });

// server.listen(8080, "localhost", () => {
//   console.log("Listening to port 8080 for requests :D");
// });

const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
  // lodash

  const num = _.random(0, 20);
  console.log(num);

  const greet = _.once(() => {
    console.log("hello");
  });
  greet();
  greet();

  // set header content type
  res.setHeader("Content-Type", "text/html");

  // send an html file

  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      // redirect
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // for sending multiple things, you use res.write(data)
      //res.write(data);
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listnening to port 3000");
});
