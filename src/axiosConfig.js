import axios from "axios";
const axiosBase = axios.create({
  // baseURL: "http://localhost:2025/api",
  baseURL: "http://forumevangadi.natesirak.com/",
});
export default axiosBase;

