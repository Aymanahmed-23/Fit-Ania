import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const DB_URI = process.env.DB_URI;
const NODE_ENV = process.env.NODE_ENV;

if (!DB_URI) {
  throw new Error("Database URI is not defined in environment variables");
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to MongoDB in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;