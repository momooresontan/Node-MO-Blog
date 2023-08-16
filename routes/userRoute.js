const express = require("express");
const {
  getMe,
  login,
  logout,
  register,
} = require("../controllers/userController");

const multer = require("multer");

const uploadMiddleware = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/getMe", getMe);

router.post("/logout", logout);

router.post("/post", uploadMiddleware.single("file"));

module.exports = router;
