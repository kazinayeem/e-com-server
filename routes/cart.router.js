import express from "express";
import { addToCart, removeFromCart } from "../controller/cart.controller.js";
import { checkLogin } from "../middleware/checkLogin.js";


const router = express.Router();

// Add to cart
router.post("/add",checkLogin, addToCart);

// Remove from cart
router.delete("/remove",checkLogin, removeFromCart);

export default router;
