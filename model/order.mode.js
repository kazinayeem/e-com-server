import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.String,
      ref: "User", 
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    product_details: {
      type: String,
      required: true,
    },
    payment_id: {
      type: String,
      default: null,
    },
    payment_status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"], 
      default: "Pending",
    },
    delivery_address: {
      type: Object,
      required: true,
    },
    delivery_status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    subTotalAmt: {
      type: Number,
      required: true,
    },
    totalAmt: {
      type: Number,
      required: true,
    },
    invoice_receipt: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);

export default Order;
