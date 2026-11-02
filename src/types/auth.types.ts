export type BusinessRole = "Admin" | "Employee";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  businessRole: BusinessRole | null;
}

export interface AuthResponse {
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  businessRole: BusinessRole | null;
}

export interface RegisterRequest {
    firstName: string
    lastName: string
    email: string
    password: string
}

export interface LoginRequest {
    email: string;
    password: string;
}