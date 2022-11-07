// Express implementation

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const { render } = require("express/lib/response");
require("dotenv").config();
// express app
const app = express();

const blogRoutes = require("./routes/blogRoutes");
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

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  // res.send("<p>Heloo, this is about page</p>");

  // res.sendFile("/views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

// blog routes

app.use(blogRoutes);

// 404

app.use((req, res) => {
  // res.sendFile("./views/404.html", { root: __dirname });
  res.status(404);
  res.render("404", { title: "404" });
});
