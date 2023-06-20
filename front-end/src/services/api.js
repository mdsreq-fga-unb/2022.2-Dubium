import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://dubium2-b7d77365ace7.herokuapp.com",
});

// apiRequest.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

export default apiRequest;
