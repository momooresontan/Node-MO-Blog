const express = require("express");
const multer = require("multer");

const uploadMiddleware = multer({ dest: "uploads/" });

const {
  getAllBlogs,
  getBlogById,
  post,
  updatePost,
} = require("../controllers/blogController");

const router = express.Router();

router.post("/post", uploadMiddleware.single("file"), post);

router.get("/post", getAllBlogs);

router.get("/post/:id", getBlogById);

router.put("/post/", uploadMiddleware.single("file"), updatePost);

module.exports = router;
