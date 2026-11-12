
import api from "@/config/axios";

import type {
  ReviewRequest,
  ReviewResponse,
} from "@/types/business.types";

export const reviewService = {
  async createReview(data: ReviewRequest): Promise<ReviewResponse> {
    const response = await api.post<ReviewResponse>("/reviews", data);

    return response.data;
  },
};
