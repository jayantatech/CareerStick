// import mongoose from "mongoose";

// let isConnected = false;

// export const connectDB = async () => {
//   if (isConnected) {
//     console.log("Using existing database connection");
//     return;
//   }

//   const MONGODB_URI = `${process.env.MONGODB_URI}${process.env.APP_NAME}`;

//   if (!MONGODB_URI) {
//     throw new Error("MONGODB_URI is not defined in the environment variables");
//   }

//   try {
//     await mongoose.connect(MONGODB_URI, {
//       serverSelectionTimeoutMS: 30000,
//       socketTimeoutMS: 45000,
//       connectTimeoutMS: 30000,
//       tls: true,
//     });

//     isConnected = true;
//     console.log(`MongoDB Connected: ${mongoose.connection.host}`);
//   } catch (error: any) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// export default connectDB;
import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  const { MONGODB_URI, APP_NAME } = process.env;
  const databaseURI = `${MONGODB_URI}${APP_NAME}`;

  if (!MONGODB_URI || !APP_NAME) {
    throw new Error(
      "MONGODB_URI or APP_NAME is not defined in the environment variables"
    );
  }

  try {
    await mongoose.connect(databaseURI, {
      serverSelectionTimeoutMS: 30000, // Time to wait for server selection
      socketTimeoutMS: 45000, // Time to wait for socket operations
      connectTimeoutMS: 30000, // Time to wait for initial connection
      tls: true, // Use TLS for secure connection
    });

    isConnected = true;
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process on failure
  }
};

export default connectDB;
