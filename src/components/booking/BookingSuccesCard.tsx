import type { AppointmentResponse } from "@/types/booking.types";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { MailCheck } from "lucide-react";

type BookingSuccessCardProps = {
  appointment: AppointmentResponse;
  onClose: () => void;
};

export default function BookingSuccessCard({
  appointment,
  onClose,
}: BookingSuccessCardProps) {
  return (
    <div className="page-container pb-12">
      <section className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MailCheck className="h-6 w-6" />
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-neutral-950">
          Reserva realizada
        </h1>

        <p className="mt-2 text-neutral-600">
          Te enviamos un correo para confirmar tu turno.
        </p>

        <p className="mt-1 text-sm text-neutral-500">
          Tenés 1 hora para confirmarlo desde el enlace que recibiste.
        </p>

        <div className="mt-8 divide-y divide-neutral-200 rounded-xl border border-neutral-200">
          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <span className="text-sm text-neutral-500">Servicio</span>

            <span className="text-right font-medium text-neutral-950">
              {appointment.serviceName}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <span className="text-sm text-neutral-500">Profesional</span>

            <span className="text-right font-medium text-neutral-950">
              {appointment.employeeName}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <span className="text-sm text-neutral-500">Fecha</span>

            <span className="text-right font-medium text-neutral-950">
              {format(
                parseISO(appointment.startDate),
                "d 'de' MMMM 'de' yyyy",
                { locale: es },
              )}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <span className="text-sm text-neutral-500">Hora</span>

            <span className="text-right font-medium text-neutral-950">
              {format(parseISO(appointment.startDate), "HH:mm")}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <span className="text-sm text-neutral-500">Total</span>

            <span className="text-right font-semibold text-neutral-950">
              ${appointment.price}
            </span>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
          <p className="text-sm text-neutral-700">
            Tu turno permanecerá pendiente hasta que completes la confirmación
            desde el correo.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-8 cursor-pointer rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Volver al negocio
        </button>
      </section>
    </div>
  );
}