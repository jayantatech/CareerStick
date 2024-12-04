import axios from "axios";

// Create an axios instance

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`,
  withCredentials: true, // Important for sending cookies
});

console.log(
  "process.env.NEXT_PUBLIC_SERVER_URL",
  process.env.NEXT_PUBLIC_SERVER_URL
);
export default api;
