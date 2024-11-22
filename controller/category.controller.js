import Category from "../model/category.mode.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
export const getAllCategoryController = async (req, res) => {
  try {
    const category = await Category.find();
    return res.status(200).json({
      category,
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "server error",
      error: true,
      success: false,
    });
  }
};

export const getAsingleCategoryController = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    return res.status(200).json({
      category,
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "server error",
      error: true,
      success: false,
    });
  }
};

export const createCategoryController = async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      image: req.file.filename,
    });
    await category.save();
    return res.status(200).json({
      category,
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "server error",
      error: true,
      success: false,
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const findcategory = await Category.findOne({ _id: req.params.id });

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const uploadsPath = path.join(__dirname, "..", "uploads");

    fs.unlink(`${uploadsPath}/${findcategory.image}`, (err) => {
      if (err) {
        return res.status(400).json({
          message: "Image not found",
          error: true,
          success: false,
        });
      }
    });

    await Category.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      message: "Category delete Successfull",
      error: true,
      success: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "server error",
      error: true,
      success: false,
    });
  }
};
