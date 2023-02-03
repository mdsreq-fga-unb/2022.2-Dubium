import axios from "axios";

const apiRequest = axios.create({
  baseURL: 'http://localhost:3000/',
}); 

export default apiRequest;
