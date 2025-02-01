import express from "express";
import { addToCart, removeFromCart, showCart } from "../controller/cart.controller.js";
import { checkLogin } from "../middleware/checkLogin.js";


const router = express.Router();

// Add to cart
router.post("/add",checkLogin, addToCart);

// Remove from cart
router.delete("/remove",checkLogin, removeFromCart);

// Show cart items
router.get("/", checkLogin, showCart);
export default router;
