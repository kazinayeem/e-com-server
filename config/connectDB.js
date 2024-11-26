import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

// if (!process.env.MONGODB_URL) {
//   throw new Error("please provide MONGODB_URLin the .env file");
// }

async function connectDB() {
  try {
    const url =
      "mongodb+srv://kazinayeem55085:zkdpuzYARJaZ5s0x@e-com.anq1k.mongodb.net/?retryWrites=true&w=majority&appName=e-com";

    await mongoose.connect(process.env.MONGODB_URL, {
      writeConcern: { w: "majority" },
    });
    console.log("database connected");
  } catch (error) {
    console.log("server error :", error);
  }
}

export default connectDB;
