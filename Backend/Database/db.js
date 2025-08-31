import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // sabse upar

const Url = process.env.MONGODB_URL;

// CONNECT DB
const connectDB = async () => {
  try {
    await mongoose.connect(Url);
    console.log("Database connected successfully");
  } catch (error) {
    console.error(" Database connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
