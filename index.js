const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/dbConnect");
const userRouter = require("./routes/userRoute");

dotenv.config();

connectDB();
const app = express();

//Middlewares
app.use(cors({ credentials: true, origin: "localhost:3000" }));
app.use(express.json());

//Mounting router
app.use("/", userRouter);

const PORT = process.env.PORT || 4000;

app.listen(4000);
