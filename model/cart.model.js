import mongoose from "mongoose";
const cartProductSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.String,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    userId: {
      type: mongoose.Schema.Types.String,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const CartProduct = mongoose.model("CartProduct", cartProductSchema);
export default CartProduct;
