import api from "@/config/axios";
import type { UserProfileResponse } from "@/types/user.types";

export const userService = {
  async getProfile(): Promise<UserProfileResponse> {
    const response = await api.get<UserProfileResponse>("/user/profile");
    return response.data;
  },
};