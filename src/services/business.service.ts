import api from "@/config/axios";

import type {
  BusinessPublicResponse,
  BusinessPublicDetailsResponse 
} from "@/types/business.types";

export const businessService = {
  async getAllPublic(): Promise<BusinessPublicResponse[]> {
    const response = await api.get<BusinessPublicResponse[]>("/businesses");

    return response.data;
  },

  async getPublicById(id: string): Promise<BusinessPublicDetailsResponse> {
    const response = await api.get<BusinessPublicDetailsResponse>(`/businesses/${id}`);
    return response.data;
  },
};
