import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://sdgp-gamesphere-deploy-backend-production.up.railway.app/api/v1", 
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});