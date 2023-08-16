const express = require("express");

const {
  getMe,
  login,
  logout,
  register,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/getMe", getMe);

router.post("/logout", logout);

module.exports = router;
