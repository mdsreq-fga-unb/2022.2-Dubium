import axios from "axios";

const apiRequest = axios.create({
  baseURL: process.env.VITE_APP_API_HOST,
});

apiRequest.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

export default apiRequest;
