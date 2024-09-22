import express from "express";
import userAuthRoutes from "./routes/userRoutes";
const app = express();
const PORT = 4000;

app.use(express.json());
app.use("/api/v1/auth", userAuthRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
