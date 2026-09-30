import api from "@/config/axios";
import type {
  AppointmentRequest,
  AppointmentResponse,
  AvailableTimeResponse,
} from "@/types/booking.types";

export const appointmentService = {
  async getEmployeeAvailability(
    userBusinessId: string,
    serviceId: string,
    date: string,
  ): Promise<AvailableTimeResponse[]> {
    const response = await api.get<AvailableTimeResponse[]>(
      `/appointment/${userBusinessId}/availability`,
      {
        params: {
          serviceId,
          date,
        },
      },
    );
    return response.data;
  },

  async createAppointment(data: AppointmentRequest,): Promise<AppointmentResponse> {
    const response = await api.post<AppointmentResponse>("/appointment", data);
    return response.data;
  },
};
