import User from "../model/user.mode.js";
import CartProduct from "../model/cart.model.js";


export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const userId = res.user.id;
    const user = await User.findOne({ _id: userId });

    let cartProduct = await CartProduct.findOne({ productId, userId });
    if (cartProduct) {
      cartProduct.quantity += quantity;
      await cartProduct.save();
    } else {
      cartProduct = new CartProduct({
        productId,
        quantity,
        userId,
      });
      await cartProduct.save();

      if (user) {
        user.shopping_card.push(cartProduct._id);
        await user.save();
      }
    }
    return res.status(200).json({
      message: "Product added to cart successfully",
      cartProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error adding product to cart",
      error: error.message,
    });
  }
};
export const removeFromCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = res.user.id;
  try {
    let cartProduct = await CartProduct.findOne({ productId, userId });
    if (cartProduct) {
      cartProduct.quantity -= quantity;
      const p = await cartProduct.save();
      return res.status(200).json({
        message: "Product removed from cart successfully",
        quantity: p.quantity,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error removing product from cart",
      error: error.message,
    });
  }
};
