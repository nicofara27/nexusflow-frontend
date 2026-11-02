import { useState } from "react";
import { CalendarDays, Loader2 } from "lucide-react";

import ManagedAppointmentCard from "@/components/appointment/ManagedAppointmentCard";
import { useManagedAppointments } from "@/hooks/useManagedAppointments";

type AppointmentView = "upcoming" | "history";

export default function ManageAppointmentsPage() {
  const [view, setView] = useState<AppointmentView>("upcoming");

  const {
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
  } = useManagedAppointments();

  const upcomingAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "Pending" || appointment.status === "Confirmed",
  );

  const historyAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "Completed" || appointment.status === "Cancelled",
  );

  const visibleAppointments =
    view === "upcoming" ? upcomingAppointments : historyAppointments;

  const emptyTitle =
    view === "upcoming"
      ? "No hay turnos próximos"
      : "Todavía no hay turnos en el historial";

  const emptyDescription =
    view === "upcoming"
      ? selectedEmployeeId
        ? "Este profesional no tiene turnos próximos."
        : isAdmin
          ? "No hay turnos próximos para el negocio."
          : "No tenés turnos próximos."
      : selectedEmployeeId
        ? "Este profesional todavía no tiene turnos completados o cancelados."
        : isAdmin
          ? "Los turnos completados y cancelados del negocio aparecerán acá."
          : "Tus turnos completados y cancelados aparecerán acá.";

  if (isLoading) {
    return (
      <main className="min-h-screen bg-neutral-50">
        <div className="page-container flex min-h-[70vh] items-center justify-center">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="page-container py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">
            Gestión de turnos
          </h1>

          <p className="mt-2 text-neutral-600">
            Consultá y administrá los turnos del negocio.
          </p>

          {isAdmin && (
            <div className="mt-8 max-w-xs">
              <label
                htmlFor="employee"
                className="text-sm font-medium text-neutral-700"
              >
                Profesional
              </label>

              <select
                id="employee"
                value={selectedEmployeeId}
                onChange={(event) => setSelectedEmployeeId(event.target.value)}
                className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-700 outline-none transition focus:border-primary"
              >
                <option value="">Todos los profesionales</option>

                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
              </select>

              {employeesError && (
                <p className="mt-2 text-sm text-red-700">{employeesError}</p>
              )}
            </div>
          )}

          <div className="mt-8 flex gap-2 border-b border-neutral-200">
            <button
              type="button"
              onClick={() => setView("upcoming")}
              className={`cursor-pointer border-b-2 px-4 py-3 text-sm font-medium ${
                view === "upcoming"
                  ? "border-primary text-primary"
                  : "border-transparent text-neutral-500"
              }`}
            >
              Próximos
            </button>

            <button
              type="button"
              onClick={() => setView("history")}
              className={`cursor-pointer border-b-2 px-4 py-3 text-sm font-medium ${
                view === "history"
                  ? "border-primary text-primary"
                  : "border-transparent text-neutral-500"
              }`}
            >
              Historial
            </button>
          </div>

          {appointmentsError ? (
            <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5">
              <p className="text-sm text-red-700">{appointmentsError}</p>
            </div>
          ) : visibleAppointments.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <CalendarDays className="h-6 w-6 text-primary" />
              </div>

              <h2 className="mt-4 font-semibold text-neutral-950">
                {emptyTitle}
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                {emptyDescription}
              </p>
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {visibleAppointments.map((appointment) => (
                <ManagedAppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onCancel={handleCancel}
                  onComplete={handleComplete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}