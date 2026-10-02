import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("database conncted");
  } catch (error) {
    console.log("failed to connect DB", error.message);
    process.exit(1);
  }
};

export default connectDB;
