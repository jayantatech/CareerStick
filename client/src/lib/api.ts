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

console.log(
  "process.env.NEXT_PUBLIC_SERVER_URL",
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : "http://localhost:4000"
);
export default api;
