import axios from "axios";

const instance = axios.create({
  baseURL: "https://pre-onboarding-selection-task.shop",
});

instance.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  return config;
});

export default instance;
