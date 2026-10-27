import type {
  AppointmentStatus,
  ClientAppointmentResponse,
} from "@/types/booking.types";
import { Link } from "react-router";
import { CalendarDays, Clock, MapPin, UserRound } from "lucide-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";

type AppointmentCardProps = {
  appointment: ClientAppointmentResponse;
  onCancel: (appointmentId: string) => void;
};

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

export default function AppointmentCard({
  appointment,
  onCancel,
}: AppointmentCardProps) {
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState("");

  const status = statusConfig[appointment.status];
  const startDate = parseISO(appointment.startDate);

  const canCancel =
    appointment.status === "Pending" || appointment.status === "Confirmed";

  const handleCancel = () => {
    try {
      setIsCancelling(true);
      setCancelError("");
      onCancel(appointment.id);
    } catch (error) {
      setCancelError("No se pudo cancelar el turno. Intentá nuevamente.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h2 className="text-lg font-semibold text-neutral-950">
            {appointment.serviceName}
          </h2>

          <Link
            to={`/businesses/${appointment.businessId}`}
            className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline"
          >
            {appointment.businessName}
          </Link>
        </div>

        <span
          className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
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

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0 text-neutral-400" />
          <span>{appointment.businessAddress}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-4">
        <div>
          <span className="text-sm text-neutral-500">Total</span>

          <p className="mt-1 font-semibold text-neutral-950">
            ${appointment.price}
          </p>
        </div>

        {canCancel && !showCancelConfirmation && (
          <button
            type="button"
            onClick={() => setShowCancelConfirmation(true)}
            className="cursor-pointer text-sm font-medium text-red-700 transition-colors hover:text-red-800"
          >
            Cancelar turno
          </button>
        )}
      </div>
      {canCancel && showCancelConfirmation && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-900">
            ¿Querés cancelar este turno?
          </p>

          <p className="mt-1 text-sm text-red-700">
            Esta acción no se puede deshacer.
          </p>

          {cancelError && (
            <p className="mt-3 text-sm text-red-700">{cancelError}</p>
          )}

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isCancelling}
              className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCancelling ? "Cancelando..." : "Sí, cancelar"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowCancelConfirmation(false);
                setCancelError("");
              }}
              disabled={isCancelling}
              className="cursor-pointer rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
            >
              Volver
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
