const express = require("express");

const router = express.Router();
const blogController = require("../controllers/blogController");
// routes

// blog routes

router.get("/blogs", blogController.blog_index);

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

router.post("/blogs", blogController.blog_create_post);

router.delete("/blogs/:id", blogController.blog_delete);

router.get("/blogs/create", blogController.blog_create_get);

// get a single id
router.get("/blogs/:id", blogController.blog_details);

module.exports = router;
