import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URL) {
  throw new Error("please provide MONGODB_URLin the .env file");
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("database connected");
    
  } catch (error) {
    console.log("server error ", error);
    process.exit(1);
  }
}


export default connectDB;