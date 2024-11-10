import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  const MONGODB_URI = `${process.env.MONGODB_URI}${process.env.APP_NAME}`;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      tls: true,
    });

    isConnected = true;
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
