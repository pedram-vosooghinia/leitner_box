import { api } from "../api";
const loginServices = <T>(data: T) => api.post("auth/login", data);
const signInServices = <T>(data: T) => api.post("auth/signIn", data);
const logoutServices = () => api.get("/auth/logout");
export { loginServices, signInServices, logoutServices };
