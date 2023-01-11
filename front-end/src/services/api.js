import axios from "axios";

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_API_HOST,
}); 

export default apiRequest;
