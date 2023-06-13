import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://dubium2.herokuapp.com",
});

// apiRequest.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

export default apiRequest;
