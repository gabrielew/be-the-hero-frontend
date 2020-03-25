import axios from "axios";

const ongId = localStorage.getItem("ongName");

const api = axios.create({
  baseURL: "http://localhost:3333"
});

export default api;
