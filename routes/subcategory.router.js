import express from "express";
import { checkAdmin } from "../middleware/checkAdmin.js";
import { checkLogin } from "../middleware/checkLogin.js";
import { upload } from "../config/fileupload.js";
import {
  getAllSubCategoryController,
  getSubAsingleCategoryController,
  createSubCategoryController,
  deleteSubCategoryController,
} from "../controller/subcategory.controller.js";

const router = express.Router();

router.get("/", getAllSubCategoryController);
router.get("/:id", getSubAsingleCategoryController);
router.post(
  "/",
  checkAdmin,
  checkLogin,
  upload.single("files"),
  createSubCategoryController
);

router.delete("/:id", checkAdmin,checkLogin,deleteSubCategoryController)

export default router;
