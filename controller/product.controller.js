import Product from "../model/product.model.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
export const getAllProductController = async (req, res) => {
  try {
    const product = await Product.find();
    return res.status(200).json({
      product,
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
      error: true,
      success: false,
    });
  }
};

export const getASingleProductController = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    return res.status(200).json({
      product,
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
      error: true,
      success: false,
    });
  }
};

export const createProductController = async (req, res) => {
  try {
    const {
      name,
      image = [],
      categoryId = [],
      sub_categoryId = [],
      unit,
      stock,
      price,
      discount = 0,
      description = "",
      more_details = {},
      publish,
    } = req.body;

    const photo = req.files;

    const photoName = photo.map((p) => p.filename);

    if (!name || !unit || stock === undefined || price === undefined) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    if (stock < 0 || price < 0 || discount < 0 || discount > 100) {
      return res.status(400).json({ error: "Invalid numeric values." });
    }

    const product = new Product({
      name,
      image: photoName,
      categoryId,
      sub_categoryId,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
      publish,
    });
    const savedProduct = await product.save();
    return res.status(201).json({
      savedProduct,
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
      error: true,
      success: false,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { image } = await Product.findOne({ _id: req.params.id });
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const uploadsPath = path.join(__dirname, "..", "uploads");
    image.map((i) => {
      fs.unlink(`${uploadsPath}/${i}`, (err) => {
        if (err) {
          return res.status(400).json({
            message: "Image not found",
            error: true,
            success: false,
          });
        }
      });
    });

    await Product.deleteOne({ _id: req.params.id });
    return res.status(500).json({
      message: "delete successfull",
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
      error: true,
      success: false,
    });
  }
};



