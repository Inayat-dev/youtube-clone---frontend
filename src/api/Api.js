import axios from "axios"

export const Api = axios.create({
  // baseURL: "http://localhost:4500",
  baseURL: "https://youtube-clone-4efh.onrender.com/",
  timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
})