import api from "@/config/axios";
import type {
  LoginRequest,
  AuthResponse,
  RegisterRequest,
} from "@/types/auth.types";

let refreshPromise: Promise<AuthResponse> | null = null;

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  async refresh(): Promise<AuthResponse> {
    if (!refreshPromise) {
      refreshPromise = api
        .post<AuthResponse>("/auth/refresh")
        .then((response) => response.data)
        .finally(() => {
          refreshPromise = null;
        });
    }

    return refreshPromise;
  },

  async logout() : Promise<void> {
    await api.post("/auth/logout")
  }
};
