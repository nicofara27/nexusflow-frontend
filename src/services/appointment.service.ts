import api from "@/config/axios";
import type {
  AppointmentRequest,
  AppointmentResponse,
  AvailableTimeResponse,
  ClientAppointmentResponse,
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

  async confirmAppointment(token: string) : Promise<AppointmentResponse>  {
    const response = await api.post("appointment/confirm", { token });

    return response.data;
  },

  async cancelAppointment(appointmentId: string) : Promise<AppointmentResponse> {
    const response = await api.post(`appointment/${appointmentId}/cancel`, { appointmentId });
    
    return response.data;
  },

  async getClientAppointments() : Promise<ClientAppointmentResponse[]> {
    const response = await api.get<ClientAppointmentResponse[]>("/appointment/my");

    return response.data;
  }
};
