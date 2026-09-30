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
  status: number;
  price: number;
}

export interface AvailableTimeResponse {
  startTime: string;
  endTime: string;
}
