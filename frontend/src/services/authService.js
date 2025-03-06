import api from "./api";

export const authService = {
  register: (userData) => {
    return api.post("/auth/register", userData);
  },
  login: (email, password) => {
    return api.post("/auth/login", { email, password });
  },
  logout: () => {
    return api.post("/auth/logout");
  },
  getUserProfile: () => {
    return api.get("/auth/user");
  },
};
