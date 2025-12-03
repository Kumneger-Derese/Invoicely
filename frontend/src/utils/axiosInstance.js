import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const userString = localStorage.getItem("userInfo");
    const userObj = JSON.parse(userString);

    const token = userObj && userObj.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  async (error) => {
    await Promise.reject(error);
  }
);

export default axiosInstance;
