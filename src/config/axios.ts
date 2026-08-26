import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/services/auth.service";
import axios from "axios";

let refreshPromise: Promise<string> | null = null;

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
});

const redirectToLogin = () => {
  useAuthStore.getState().clearAuth();

  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = authService
          .refresh()
          .then((response) => {
            useAuthStore.getState().setAuth(response);
            return response.token;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }
      const newToken = await refreshPromise;

      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return api(originalRequest);
    } catch (error) {
      redirectToLogin();
      
      return Promise.reject(error);
    }
  },
);

export default api;
