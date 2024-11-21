import express from "express";
import morgan from "morgan";
import cors from "cors";

import connectDB from "./config/connectDB.js";
import UserRouter from "./routes/user.router.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 5000;
const PORT = process.env.PORT || port;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "",
  })
);

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "OK",
  });
});

app.use("/api/v1/", UserRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running ", PORT);
    });
  })
  .catch(() => {
    console.log("Database error");
  });
