import { create } from "zustand";
import type { AuthResponse, User } from "@/types/auth.types";

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (data: AuthResponse) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,

  setAuth: (data) =>
    set({
      token: data.token,
      user: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
      },
    }),

  clearAuth: () =>
    set({
      token: null,
      user: null,
    }),
}));
