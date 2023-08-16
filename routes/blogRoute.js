const express = require("express");
const multer = require("multer");

const uploadMiddleware = multer({ dest: "uploads/" });

const { getAllBlogs, post } = require("../controllers/blogController");

const router = express.Router();

router.post("/post", uploadMiddleware.single("file"), post);

router.get("/post", getAllBlogs);

module.exports = router;
