const express = require("express");
const multer = require("multer");

const uploadMiddleware = multer({ dest: "uploads/" });

const { post } = require("../controllers/blogController");

const router = express.Router();

router.post("/post", uploadMiddleware.single("file"), post);

module.exports = router;
