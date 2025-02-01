import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
   
    userId: {
      type: mongoose.Schema.Types.String,
      ref: "User",
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    oderItem: [orderItemSchema],
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
      type: mongoose.Schema.Types.String,
      ref: "Address",
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

const orderItemSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderItem = mongoose.model("OrderItem", orderItemSchema);
const Order = mongoose.model("Order", orderSchema);

export default Order;
