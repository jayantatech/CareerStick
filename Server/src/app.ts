import express from "express";
import userAuthRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import cookie from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use("/api/v1/auth", userAuthRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
