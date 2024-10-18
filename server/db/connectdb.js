import mongoose from "mongoose";
import dotenv from 'dotenv';
const connectDB = async () => {
  dotenv.config();
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with a failure code
  }
};
export default connectDB;