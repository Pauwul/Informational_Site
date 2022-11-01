// Express implementation

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const path = require("path");

// express app
const app = express();
// Conect to db
const dbURI =
  "mongodb+srv://paulica:1918@nodedb.7mv4gsb.mongodb.net/Informational_Site?retryWrites=true&w=majority";
// this is async
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs"); // defaults to views folder
// alternatively, for custome view folder:
// app.set('views', 'myviews');

// this returns an instance of  the server,
// could be useful for web sockets

// // middlewware

// app.use((req, res, next) => {
//   console.log("new request made:");
//   console.log("host:", req.hostname);
//   console.log("path:", req.path);
//   console.log("method:", req.method);
//   // if you don't put next(), it hangs, not knowing what to do NEXT
//   next();
// });

// app.use((req, res, next) => {
//   console.log("move to the next middleware:");
//   // if you don't put next(), it hangs, not knowing what to do NEXT
//   next();
// });

app.use(morgan("dev"));
app.use(morgan("tiny"));

// run static files,like css or js

app.use(express.static("public"));
app.use("/blogs", express.static(path.join(__dirname, "public")));

// mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog",
    snippet: " about his blog",
    body: "more about my blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blocks", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-blog", (req, res) => {
  Blog.findById("6360ec588904c371134008c8")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// routes
app.get("/", (req, res) => {
  //the express way

  // this also sets the content type header
  //res.send("<p> home page </p>");

  //res.sendFile("./views/index.html", { root: __dirname });

  // for ejs
  const blogs = [
    {
      title: "Mario runs over Yoshi with his Toyota ",
      snippet: "gfdgfdg sffdsfasd gsdag ",
    },
    {
      title: "Yoda's Ketamine Addiction",
      snippet:
        "Yoda is high on Ketamine and needs your donations to fund his addiction",
    },
    {
      title: "Terry the Fat Shark is back",
      snippet:
        "This week, Terryhas brought everyone a very plush thermal pillow!  This pillow is not only durable, but also always stays cold on both sides! Terry knows some people can't sleep very easily, or just hate turning pillows over to keep cool, so Terry hopes everyone can use this gift from now on to sleep comfortably whenver they want. Terry will be back wuth another gift next Wednesday",
    },
  ];
  res.render("index", { title: "Home", blogs });

  /* the nodejs way
    res.setHeader('Content-Type', 'text/html')
    res.statusCode // express can do that automaticaly
    res.write()
    res.end()
    */
});

app.get("/about", (req, res) => {
  // res.send("<p>Heloo, this is about page</p>");

  // res.sendFile("/views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// 404

app.use((req, res) => {
  // res.sendFile("./views/404.html", { root: __dirname });
  res.status(404);
  res.render("404", { title: "404" });
});
