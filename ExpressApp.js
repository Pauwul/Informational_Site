// Express implementation

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const path = require("path");
const { render } = require("express/lib/response");
require("dotenv").config();
// express app
const app = express();
// Conect to db
console.log(process.env.MONGO_URI);

// this is async
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs"); // defaults to views folder

// middleware and static files,like css or js

app.use(express.static("public"));
app.use("/blogs", express.static(path.join(__dirname, "public")));
// middleware bit necessary for the req.body to work
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(morgan("tiny"));
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
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  // res.send("<p>Heloo, this is about page</p>");

  // res.sendFile("/views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

// blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// get a single id
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  // Yes, it's a valid ObjectId, proceed with `findById` call.

  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// 404

app.use((req, res) => {
  // res.sendFile("./views/404.html", { root: __dirname });
  res.status(404);
  res.render("404", { title: "404" });
});
