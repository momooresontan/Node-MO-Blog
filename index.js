const express = require("express");

const app = express();

app.get("/register", (req, res) => {
  res.json("Test okay2");
});

app.listen(4000);
