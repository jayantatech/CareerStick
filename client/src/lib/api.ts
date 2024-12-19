import axios from "axios";

// Create an axios instance

const api = axios.create({
  baseURL: `${
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : "http://localhost:4000"
  }/api/v1`,
  withCredentials: true, // Important for sending cookies
});

export default api;
