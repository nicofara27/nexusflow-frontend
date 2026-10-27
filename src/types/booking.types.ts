export type AppointmentStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

export interface ClientAppointmentResponse {
  id: string;
  businessId: string;
  businessName: string;
  businessAddress: string;
  serviceName: string;
  employeeName: string;
  startDate: string;
  endDate: string;
  status: AppointmentStatus;
  price: number;
}

export interface AppointmentRequest {
  employeeId: string;
  serviceId: string;
  startDate: string;
}

export interface AppointmentResponse {
  id: string;
  serviceName: string;
  employeeName: string;
  startDate: string;
  endDate: string;
  status: AppointmentStatus;
  price: number;
}

export interface AvailableTimeResponse {
  startTime: string;
  endTime: string;
}
