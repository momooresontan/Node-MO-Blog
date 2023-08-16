const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const express = require("express");

const connectDB = require("./config/dbConnect");
const userRouter = require("./routes/userRoute");

dotenv.config();

connectDB();
const app = express();

//Middlewares
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

//Mounting router
app.use("/", userRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
