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

exports.getBlogById = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id).populate("author", ["username"]);
  res.json(blog);
};

exports.updatePost = async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];

    newPath = `${path}.${ext}`;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      {},
      async (err, info) => {
        if (err) throw err;
        const { title, summary, content, id } = req.body;
        const blog = await Blog.findById(id);
        const isAuthor =
          JSON.stringify(blog.author) === JSON.stringify(info.user.id);
        if (!isAuthor) {
          return res.status(400).json("You are not the author!");
        }

        await blog.updateOne({
          title,
          summary,
          content,
          imageCover: newPath ? newPath : blog.imageCover,
        });

        res.json(blog);
      }
    );
  }
};
