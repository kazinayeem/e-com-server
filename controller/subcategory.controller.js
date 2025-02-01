import SubCategory from "../model/subcategory.mode.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

export const getAllSubCategoryController = async (req, res) => {
  try {
    const subcategory = await SubCategory.find().populate("categoryId");
    return res.status(200).json({
      subcategory,
      error: false,
      success: true,
    });
  } catch (error) {
    
    return res.status(400).json({
      message: "server error",
      error: true,
      success: false,
    });
  }
};

export const getSubAsingleCategoryController = async (req, res) => {
  try {
    const subcategory = await SubCategory.findOne({
      _id: req.params.id,
    }).populate("categoryId");
    return res.status(200).json({
      subcategory,
      error: false,
      success: true,
    });
  } catch (error) {
    
    return res.status(400).json({
      message: "server error",
      error: true,
      success: false,
    });
  }
};

export const createSubCategoryController = async (req, res) => {
  try {
    const subcategory = new SubCategory({
      name: req.body.name,
      image: req.file.filename,
      categoryId: req.body.categoryId,
    });
    await subcategory.save();
    return res.status(200).json({
      subcategory,
      error: false,
      success: true,
    });
  } catch (error) {
    
    return res.status(400).json({
      message: "server error",
      error: true,
      success: false,
    });
  }
};

export const deleteSubCategoryController = async (req, res) => {
  try {
    const findcategory = await SubCategory.findOne({ _id: req.params.id });
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
    await SubCategory.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      message: "SubCategory delete Successfull",
      error: true,
      success: false,
    });
  } catch (error) {
    
    return res.status(400).json({
      message: "server error",
      error: true,
      success: false,
    });
  }
};
