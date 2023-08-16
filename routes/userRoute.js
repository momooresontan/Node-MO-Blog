const express = require("express");
const multer = require("multer");

const uploadMiddleware = multer({ dest: "uploads/" });

const {
  getMe,
  login,
  logout,
  post,
  register,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/getMe", getMe);

router.post("/logout", logout);

router.post("/post", uploadMiddleware.single("file"), post);

module.exports = router;
