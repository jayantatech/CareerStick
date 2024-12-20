import cron from "node-cron";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const setupCronJobs = () => {
  // Cron job to prevent Render free plan sleep
  cron.schedule("*/14 * * * *", async () => {
    try {
      console.log("Pinging server to prevent sleep...");
      await axios.get(`${process.env.BACKEND_URL}/api/v1/health-check`);
      console.log("Ping successful!");
    } catch (error: any) {
      console.error("Ping failed:", error.message);
    }
  });
};

export default setupCronJobs;
