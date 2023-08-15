const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/dbConnect");
const userRouter = require("./routes/userRoute");

dotenv.config();

connectDB();
const app = express();

//Middlewares
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Content-Type", "application/json");
//   res.header("Access-Control-Allow-Methods", "OPTIONS,POST,GET,PATCH");
// });

app.use(express.json());
app.use(cookieParser());

//Mounting router
app.use("/", userRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
