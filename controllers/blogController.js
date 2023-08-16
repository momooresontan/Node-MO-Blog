const fs = require("fs");
const Blog = require("../models/blogModel");

exports.post = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];

  const newPath = `${path}.${ext}`;
  fs.renameSync(path, newPath);

  const { title, summary, content } = req.body;
  const blog = await Blog.create({
    title,
    summary,
    content,
    imageCover: newPath,
  });

  res.json(blog);
};

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
};
