import type {
  BusinessPublicDetailsResponse,
  ServiceResponse,
} from "@/types/business.types";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

type BookingEmployee =
  BusinessPublicDetailsResponse["employees"][number];

type BookingConfirmationStepProps = {
  service: ServiceResponse;
  employee: BookingEmployee;
  selectedDate: string;
  selectedTime: string;
};

export default function BookingConfirmationStep({
  service,
  employee,
  selectedDate,
  selectedTime,
}: BookingConfirmationStepProps) {
  return (
    <section className="mt-8">
      <h1 className="text-4xl font-semibold tracking-tight text-neutral-950">
        Confirmar reserva
      </h1>

      <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-5">
        <div>
          <p className="text-sm text-neutral-500">Servicio</p>

          <p className="mt-1 font-medium text-neutral-950">
            {service.name}
          </p>
        </div>

        <div className="mt-5">
          <p className="text-sm text-neutral-500">Profesional</p>

          <p className="mt-1 font-medium text-neutral-950">
            {employee.firstName} {employee.lastName}
          </p>
        </div>

        <div className="mt-5">
          <p className="text-sm text-neutral-500">Fecha</p>

          <p className="mt-1 font-medium text-neutral-950">
            {format(
              parseISO(selectedDate),
              "EEEE d 'de' MMMM",
              { locale: es },
            )}
          </p>
        </div>

        <div className="mt-5">
          <p className="text-sm text-neutral-500">Hora</p>

          <p className="mt-1 font-medium text-neutral-950">
            {selectedTime.slice(0, 5)}
          </p>
        </div>

        <div className="mt-5">
          <p className="text-sm text-neutral-500">Precio</p>

          <p className="mt-1 font-medium text-neutral-950">
            ${service.price}
          </p>
        </div>
      </div>
    </section>
  );
}