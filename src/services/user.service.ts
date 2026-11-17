import api from "@/config/axios";
import type {
  UserProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "@/types/user.types";

export const userService = {
  async getProfile(): Promise<UserProfileResponse> {
    const response = await api.get<UserProfileResponse>("/user/profile");
    return response.data;
  },

  async updateProfile(
    data: UpdateProfileRequest,
  ): Promise<UpdateProfileResponse> {
    const response = await api.put<UpdateProfileResponse>(
      "/user/profile",
      data,
    );

    return response.data;
  },
};
