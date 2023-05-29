import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:8080",
});

// apiRequest.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

export default apiRequest;
