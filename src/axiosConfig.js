import axios from "axios";
const axiosBase = axios.create({
  baseURL: "http://forumevangadi.natesirak.com",
});
export default axiosBase;

