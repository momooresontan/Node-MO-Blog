const fs = require("fs");
const jwt = require("jsonwebtoken");
const Blog = require("../models/blogModel");

exports.post = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];

  const newPath = `${path}.${ext}`;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const blog = await Blog.create({
      title,
      summary,
      content,
      imageCover: newPath,
      author: info.user.id,
    });

    res.json(blog);
  });
};

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(blogs);
};
