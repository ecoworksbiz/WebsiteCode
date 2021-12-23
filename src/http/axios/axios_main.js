import axios from "axios";

const axiosMain = axios.create({
  baseURL: "https://ecoworksbiz.com/api/",
  
  headers: {
    'Authorization': `Bearer ${sessionStorage.token}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
  },
  
});
export default axiosMain;
