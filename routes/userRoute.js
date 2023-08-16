const express = require("express");
const {
  getMe,
  login,
  logout,
  post,
  register,
} = require("../controllers/userController");

const multer = require("multer");

const uploadMiddleware = multer({ dest: "./uploads/" });

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/getMe", getMe);

router.post("/logout", logout);

router.post("/post", uploadMiddleware.single("file"), (req, res) => {
  res.json({ files: req.file });
});

module.exports = router;
