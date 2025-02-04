import axios, { AxiosError } from "axios";
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://leitner-box.vercel.app/api/"
    : "http://localhost:3000/api/";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

  



const errorInterceptor = async (axiosError: AxiosError) => {
  return Promise.reject(axiosError);
};

api.interceptors.response.use((response) => response, errorInterceptor);

