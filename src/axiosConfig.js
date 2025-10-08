import axios from "axios";
const axiosBase = axios.create({
  // baseURL: "http://localhost:2025/api",
  baseURL: "http://localhost:2025/",
});
export default axiosBase;

