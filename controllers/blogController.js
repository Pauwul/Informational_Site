// folowing the MDM naming conventions:
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete
const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = () => {};

const blog_create_get = () => {};

const blog_create_post = () => {};
const blog_delete = () => {};

module.exports = {
  blog_index,
};
