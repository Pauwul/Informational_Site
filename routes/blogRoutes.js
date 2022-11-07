const express = require("express");

const router = express.Router();
const blogController = require("../controllers/blogController");
// routes

// blog routes
router.get("/add-blog", (req, res) => {
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

router.get("/all-blocks", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/single-blog", (req, res) => {
  Blog.findById("6360ec588904c371134008c8")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/blogs", (req, res) => {
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

router.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
});

router.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// get a single id
router.get("/blogs/:id", (req, res) => {
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

module.exports = router;
