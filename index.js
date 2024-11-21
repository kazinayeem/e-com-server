import express from "express";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import UserRouter from "./routes/user.router.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const port = 5000;
app.use(cookieParser());
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

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/product", UserRouter);

app.use(function (req, res, next) {
  res.status(404);
  res.format({
    html: function () {
      res.render("404", { url: req.url });
    },
    json: function () {
      res.json({ error: "Not found" });
    },
    default: function () {
      res.type("txt").send("Not found");
    },
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running ", PORT);
    });
  })
  .catch(() => {
    console.log("Database error");
  });
