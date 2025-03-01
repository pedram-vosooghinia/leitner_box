import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
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
  if (axiosError.response) {
    toast.error("خطای سمت سرور:");
  } else if (axiosError.request) {
    toast.error("مشکل در ارتباط با سرور");
  } else {
    toast.error("خطای نامشخص:");
  }

  return Promise.reject(axiosError);
};


api.interceptors.response.use((response) => response, errorInterceptor);

