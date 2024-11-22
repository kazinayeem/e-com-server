import express from "express";
import { checkAdmin } from "../middleware/checkAdmin.js";
import { checkLogin } from "../middleware/checkLogin.js";
import { upload } from "../config/fileupload.js";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  getAsingleCategoryController,
} from "../controller/category.controller.js";

const router = express.Router();

router.get("/", getAllCategoryController);
router.get("/:id", getAsingleCategoryController);
router.post(
  "/",
  checkAdmin,
  checkLogin,
  upload.single("files"),
  createCategoryController
);

router.delete("/:id" , checkAdmin, checkLogin , deleteCategoryController)

export default router;
