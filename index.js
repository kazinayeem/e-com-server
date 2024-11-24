import express from "express";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import UserRouter from "./routes/user.router.js";
import productRouter from "./routes/product.router.js";
import categoryRouter from "./routes/category.router.js";
import subcategoryRouter from "./routes/subcategory.router.js";
import addressRouter from "./routes/address.router.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const port = 5000;
app.use(cookieParser());
const PORT = process.env.PORT || port;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
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
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/subcategory", subcategoryRouter);
app.use("/api/v1/address", addressRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});
app.listen(PORT, () => {
  console.log("server is running ", PORT);
  connectDB();
});
