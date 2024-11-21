import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "must a valid username"],
    },
    email: {
      type: String,
      required: [true, "must a valid email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "must a valid password"],
    },
    avatar: {
      type: String,
      default: "",
    },
    mobile: {
      type: Number,
      required: [false],
    },
    refresh_token: {
      type: String,
      default: "",
    },
    varify_email: {
      type: Boolean,
      default: false,
    },
    last_login_Date: {
      type: Date,
      default: "",
    },
    status: {
      type: String,
      enum: ["Active", "InActive", "Block"],
      default: "Active",
    },
    address_details: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
      },
    ],

    shopping_card: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
      },
    ],
    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
      },
    ],
    forgot_password_otp: {
      type: String,
      default: "",
    },
    forgot_password_expiry: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    isvalidator: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;