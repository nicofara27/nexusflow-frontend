import { useEffect, useState } from "react";

import { appointmentService } from "@/services/appointment.service";
import { employeeService } from "@/services/employee.service";
import { useAuthStore } from "@/store/auth.store";
import type { ManagedAppointmentResponse } from "@/types/booking.types";
import type { EmployeePublicResponse } from "@/types/business.types";

export function useManagedAppointments() {
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.businessRole === "Admin";

  const [appointments, setAppointments] = useState<
    ManagedAppointmentResponse[]
  >([]);

  const [employees, setEmployees] = useState<EmployeePublicResponse[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [appointmentsError, setAppointmentsError] = useState("");
  const [employeesError, setEmployeesError] = useState("");

  useEffect(() => {
    if (!isAdmin) return;

    const loadEmployees = async () => {
      try {
        setEmployeesError("");

        const data = await employeeService.getBusinessEmployees();

        setEmployees(data);
      } catch {
        setEmployeesError(
          "No se pudieron cargar los profesionales del negocio.",
        );
      }
    };

    loadEmployees();
  }, [isAdmin]);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setIsLoading(true);
        setAppointmentsError("");

        const data = await appointmentService.getManagedAppointments(
          selectedEmployeeId || undefined,
        );

        setAppointments(data);
      } catch {
        setAppointmentsError("No se pudieron cargar los turnos.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAppointments();
  }, [selectedEmployeeId]);

  const updateAppointmentStatus = (
    appointmentId: string,
    status: ManagedAppointmentResponse["status"],
  ) => {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status }
          : appointment,
      ),
    );
  };

  const handleCancel = async (appointmentId: string) => {
    const result = await appointmentService.cancelAppointment(appointmentId);

    updateAppointmentStatus(appointmentId, result.status);
  };

  const handleComplete = async (appointmentId: string) => {
    const result = await appointmentService.completeAppointment(appointmentId);

    updateAppointmentStatus(appointmentId, result.status);
  };

  return {
    appointments,
    employees,
    selectedEmployeeId,
    setSelectedEmployeeId,
    isAdmin,
    isLoading,
    appointmentsError,
    employeesError,
    handleCancel,
    handleComplete,
  };
}