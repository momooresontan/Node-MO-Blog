const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const express = require("express");
const multer = require("multer");

const uploadMiddleware = multer({ dest: "uploads/" });

const connectDB = require("./config/dbConnect");
const userRouter = require("./routes/userRoute");

dotenv.config();

connectDB();
const app = express();

//Middlewares
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

app.post(
  "/post",
  uploadMiddleware.single("file", (req, res) => {
    res.json({ files: req.file });
  })
);
//Mounting router
app.use("/", userRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
