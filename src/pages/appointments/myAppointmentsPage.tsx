import { useEffect, useState } from "react";
import { CalendarDays, Loader2 } from "lucide-react";
import { appointmentService } from "@/services/appointment.service";
import AppointmentCard from "@/components/appointment/AppointmentCard";
import type { ClientAppointmentResponse } from "@/types/booking.types";

type AppointmentView = "upcoming" | "history";

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState<ClientAppointmentResponse[]>(
    [],
  );
  const [view, setView] = useState<AppointmentView>("upcoming");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await appointmentService.getClientAppointments();

        setAppointments(data);
      } catch {
        setError("No se pudieron cargar tus turnos. Intentá nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAppointments();
  }, []);

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

  const handleCancelAppointment = async (appointmentId: string) => {
    const updatedAppointment =
      await appointmentService.cancelAppointment(appointmentId);

    setAppointments((currentAppointments) =>
      currentAppointments.map((appointment) =>
        appointment.id === appointmentId
          ? {
              ...appointment,
              status: updatedAppointment.status,
            }
          : appointment,
      ),
    );
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-neutral-50">
        <div className="page-container flex min-h-[70vh] items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-7 w-7 animate-spin text-primary" />

            <p className="mt-4 text-sm text-neutral-500">
              Cargando tus turnos...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="page-container py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">
            Mis turnos
          </h1>

          <p className="mt-2 text-neutral-600">
            Consultá tus próximas reservas y el historial de turnos.
          </p>

          <div className="mt-8 flex gap-2 border-b border-neutral-200">
            <button
              type="button"
              onClick={() => setView("upcoming")}
              className={`cursor-pointer border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                view === "upcoming"
                  ? "border-primary text-primary"
                  : "border-transparent text-neutral-500 hover:text-neutral-800"
              }`}
            >
              Próximos
            </button>

            <button
              type="button"
              onClick={() => setView("history")}
              className={`cursor-pointer border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                view === "history"
                  ? "border-primary text-primary"
                  : "border-transparent text-neutral-500 hover:text-neutral-800"
              }`}
            >
              Historial
            </button>
          </div>

          {error ? (
            <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          ) : visibleAppointments.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <CalendarDays className="h-6 w-6 text-primary" />
              </div>

              <h2 className="mt-4 font-semibold text-neutral-950">
                {view === "upcoming"
                  ? "No tenés próximos turnos"
                  : "Todavía no tenés historial"}
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                {view === "upcoming"
                  ? "Cuando reserves un turno, lo vas a encontrar acá."
                  : "Tus turnos completados y cancelados aparecerán acá."}
              </p>
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {visibleAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onCancel={handleCancelAppointment}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
