import express from "express";
import userAuthRoutes from "./routes/userRoutes";
import aiFeaturesRoutes from "./routes/aiFeaturesRoutes";
import resumeRoutes from "./routes/resumeRoutes";
import dotenv from "dotenv";
import cookie from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
// import XssProtection from "./middlewares/xssProtection";
import passport from "passport";
import session from "express-session";
import connectDB from "./config/connectDB";
import blogRoutes from "./routes/blogRoutes";
import newsletterRoutes from "./routes/newsletterRoutes";
import feedbackRoutes from "./routes/feedbackRoutes";
import settingsRoutes from "./routes/settingsRoutes";
import cron from "node-cron";
import axios from "axios";
import setupCronJobs from "./utils/cronJobs";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000",
      "http://localhost:3000",
      "http://localhost:4000",
      "https://career-stick.vercel.app",
      "https://careerstick.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
    credentials: true,
  })
);

app.use(
  "/api",
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 2000, // 2000 requests per 10 minutes
  })
);
app.use(mongoSanitize()); // Against NoSQL injection
// app.use(XssProtection.middleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "career-stick ",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure in production
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//
app.get("/api/v1/health-check", (req, res) => {
  res.status(200).send("Server is alive!");
});
app.use("/api/v1/auth", userAuthRoutes);
app.use("/api/v1/resumes", resumeRoutes);
app.use("/api/v1/ai", aiFeaturesRoutes);
app.use("/api/v1/resume", resumeRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/newsletter", newsletterRoutes);
app.use("/api/v1/feedback", feedbackRoutes);
app.use("/api/v1/settings", settingsRoutes);

setupCronJobs(); // Initialize cron jobs
const startServer = async () => {
  try {
    await connectDB(); // Connect to database first
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
// handler.ts;

// import { Handler, Context } from "aws-lambda";
// import serverless from "serverless-http";
// import express from "express";
// import mongoose from "mongoose";
// import userAuthRoutes from "./routes/userRoutes";
// import aiFeaturesRoutes from "./routes/aiFeaturesRoutes";
// import resumeRoutes from "./routes/resumeRoutes";
// import blogRoutes from "./routes/blogRoutes";
// // import newsletterRoutes from "./routes/newsletterRoutes";
// import feedbackRoutes from "./routes/feedbackRoutes";
// import settingsRoutes from "./routes/settingsRoutes";
// import dotenv from "dotenv";
// import cookie from "cookie-parser";
// import helmet from "helmet";
// import cors from "cors";
// import rateLimit from "express-rate-limit";
// import mongoSanitize from "express-mongo-sanitize";
// import passport from "passport";
// import session from "express-session";
// import connectDB from "./config/connectDB";

// dotenv.config();

// const app = express();

// // Database connection
// let cachedDb: typeof mongoose | null = null;

// // async function connectToDatabase() {
// //   if (cachedDb) {
// //     return cachedDb;
// //   }

// //   const connection = await mongoose.connect(process.env.MONGODB_URI as string);
// //   cachedDb = connection;
// //   return connection;
// // }

// // Middleware
// app.use(helmet());
// app.use(
//   cors({
//     origin: [
//       process.env.FRONTEND_URL || "http://localhost:3000",
//       "https://career-stick.vercel.app",
//       "https://careerstick.onrender.com",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// app.use(
//   "/api",
//   rateLimit({
//     windowMs: 10 * 60 * 1000,
//     max: 2000,
//   })
// );

// app.use(mongoSanitize());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookie());

// // Session configuration optimized for Lambda
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "career-stick",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 24 * 60 * 60 * 1000,
//     },
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// // Routes
// app.use("/api/v1/ai", aiFeaturesRoutes);
// app.use("/api/v1/resume", resumeRoutes);
// app.use("/api/v1/blog", blogRoutes);
// // app.use("/api/v1/newsletter", newsletterRoutes);
// app.use("/api/v1/feedback", feedbackRoutes);
// app.use("/api/v1/settings", settingsRoutes);

// // Lambda handler
// export const handler: Handler = async (event: any, context: Context) => {
//   context.callbackWaitsForEmptyEventLoop = false;

//   await connectDB();
//   // await connectToDatabase();

//   const serverlessHandler = serverless(app);
//   return serverlessHandler(event, context);
// };
