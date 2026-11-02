import { CalendarDays, Clock, UserRound } from "lucide-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

import type {
  AppointmentStatus,
  ManagedAppointmentResponse,
} from "@/types/booking.types";
import { useState } from "react";

type ManagedAppointmentCardProps = {
  appointment: ManagedAppointmentResponse;
  onCancel: (appointmentId: string) => Promise<void>;
  onComplete: (appointmentId: string) => Promise<void>;
};

type PendingAction = "cancel" | "complete" | null;

const statusConfig: Record<
  AppointmentStatus,
  {
    label: string;
    className: string;
  }
> = {
  Pending: {
    label: "Pendiente",
    className: "bg-amber-50 text-amber-700",
  },
  Confirmed: {
    label: "Confirmado",
    className: "bg-primary/10 text-primary",
  },
  Completed: {
    label: "Completado",
    className: "bg-neutral-100 text-neutral-700",
  },
  Cancelled: {
    label: "Cancelado",
    className: "bg-red-50 text-red-700",
  },
};

export default function ManagedAppointmentCard({
  appointment,
  onCancel,
  onComplete,
}: ManagedAppointmentCardProps) {
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");

  const startDate = parseISO(appointment.startDate);
  const status = statusConfig[appointment.status];

  const canCancel =
    appointment.status === "Pending" || appointment.status === "Confirmed";

  const canComplete = appointment.status === "Confirmed";

  const handleConfirmAction = async () => {
    if (!pendingAction) return;

    try {
      setIsSubmitting(true);
      setActionError("");

      if (pendingAction === "cancel") {
        await onCancel(appointment.id);
      } else {
        await onComplete(appointment.id);
      }

      setPendingAction(null);
    } catch {
      setActionError(
        pendingAction === "cancel"
          ? "No se pudo cancelar el turno."
          : "No se pudo completar el turno.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-neutral-950">
            {appointment.serviceName}
          </h2>

          <p className="mt-1 text-sm text-neutral-600">
            Cliente: {appointment.clientName}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      <div className="mt-6 grid gap-4 text-sm text-neutral-600 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-neutral-400" />

          <span>
            {format(startDate, "EEEE d 'de' MMMM", {
              locale: es,
            })}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-neutral-400" />
          <span>{format(startDate, "HH:mm")}</span>
        </div>

        <div className="flex items-center gap-2">
          <UserRound className="h-4 w-4 text-neutral-400" />
          <span>{appointment.employeeName}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-4">
        <div>
          <span className="text-sm text-neutral-500">Total</span>

          <p className="mt-1 font-semibold text-neutral-950">
            ${appointment.price}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {canCancel && (
            <button
              type="button"
              onClick={() => setPendingAction("cancel")}
              className="cursor-pointer text-sm font-medium text-red-700 hover:text-red-800"
            >
              Cancelar
            </button>
          )}

          {canComplete && (
            <button
              type="button"
              onClick={() => setPendingAction("complete")}
              className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Marcar como completado
            </button>
          )}
        </div>
      </div>
        {pendingAction && (
          <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
            <p className="text-sm font-medium text-neutral-950">
              {pendingAction === "cancel"
                ? "¿Querés cancelar este turno?"
                : "¿Querés marcar este turno como completado?"}
            </p>

            <p className="mt-1 text-sm text-neutral-600">
              Esta acción no se puede deshacer.
            </p>

            {actionError && (
              <p className="mt-3 text-sm text-red-700">{actionError}</p>
            )}

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setPendingAction(null);
                  setActionError("");
                }}
                disabled={isSubmitting}
                className="cursor-pointer rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
              >
                Volver
              </button>

              <button
                type="button"
                onClick={handleConfirmAction}
                disabled={isSubmitting}
                className={
                  pendingAction === "cancel"
                    ? "cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
                    : "cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
                }
              >
                {isSubmitting
                  ? "Procesando..."
                  : pendingAction === "cancel"
                    ? "Sí, cancelar"
                    : "Sí, completar"}
              </button>
            </div>
          </div>
        )}
    </article>
  );
}
