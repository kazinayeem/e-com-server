import express from "express";
import {
  createProductController,
  getAllProductController,
  getASingleProductController,
  deleteProductController,
} from "../controller/product.controller.js";
import { checkAdmin } from "../middleware/checkAdmin.js";
import { checkLogin } from "../middleware/checkLogin.js";
import { upload } from "../config/fileupload.js";

const router = express.Router();

router.get("/", getAllProductController);
router.get("/:id", getASingleProductController);
router.post(
  "/",
  checkAdmin,
  checkLogin,
  upload.array("image",10),
  createProductController
);
router.delete(
  "/:id",
  checkAdmin,
  checkLogin,
  deleteProductController
);

export default router;
