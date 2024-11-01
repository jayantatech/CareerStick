import express from "express";
import userAuthRoutes from "./routes/userRoutes";
import aiFeaturesRoutes from "./routes/aiFeaturesRoutes";
import dotenv from "dotenv";
import cookie from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import XssProtection from "./middlewares/xssProtection";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      "http://localhost:3000" ||
      "http://localhost:4000",
    credentials: true,
  })
);

app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 150, // 100 requests per 15 minutes
  })
);
app.use(mongoSanitize()); // Against NoSQL injection
// app.use(XssProtection.middleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

//
app.use("/api/v1/auth", userAuthRoutes);
// app.use("/api/v1/resumes", resumeRoutes);
app.use("/api/v1/ai", aiFeaturesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
