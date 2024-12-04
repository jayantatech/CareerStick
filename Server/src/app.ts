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
import XssProtection from "./middlewares/xssProtection";
import passport from "passport";
import session from "express-session";
import connectDB from "./config/connectDB";
import blogRoutes from "./routes/blogRoutes";
import newsletterRoutes from "./routes/newsletterRoutes";

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
    ],
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
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//
app.use("/api/v1/auth", userAuthRoutes);
// app.use("/api/v1/resumes", resumeRoutes);
app.use("/api/v1/ai", aiFeaturesRoutes);
app.use("/api/v1/resume", resumeRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/newsletter", newsletterRoutes);

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
