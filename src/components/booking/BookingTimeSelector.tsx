import type { AvailableTimeResponse } from "@/types/booking.types";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

interface BookingTimeSelectorProps {
  availableTimes: AvailableTimeResponse[];
  selectedDate: string;
  selectedTime: string;
  loading: boolean;
  error: string;
  onTimeSelect: (time: string) => void;
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function BookingTimeSelector({
  availableTimes,
  selectedDate,
  selectedTime,
  loading,
  error,
  onTimeSelect,
}: BookingTimeSelectorProps) {
  if (!selectedDate) {
    return (
      <div className="mt-10 border-t border-neutral-200 pt-8">
        <h2 className="text-lg font-semibold text-neutral-950">
          Horarios disponibles
        </h2>

        <p className="mt-2 text-sm text-neutral-500">
          Selecciona una fecha para consultar los horarios.
        </p>
      </div>
    );
  }

  const formattedDate = capitalize(
    format(parseISO(selectedDate), "EEEE d 'de' MMMM", {
      locale: es,
    }),
  );

  return (
    <div className="mt-10 border-t border-neutral-200 pt-8">
      <div>
        <h2 className="text-lg font-semibold text-neutral-950">
          Horarios disponibles
        </h2>

        <p className="mt-1 text-sm text-neutral-500">{formattedDate}</p>
      </div>

      {loading && (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-12 animate-pulse rounded-xl bg-neutral-200"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {!loading && !error && availableTimes.length === 0 && (
        <div className="mt-5 rounded-2xl border border-dashed border-neutral-200 bg-white px-6 py-10 text-center">
          <p className="font-medium text-neutral-950">
            No hay horarios disponibles para esta fecha
          </p>

          <p className="mt-2 text-sm text-neutral-500">
            Probá seleccionando otro día para continuar.
          </p>
        </div>
      )}

      {!loading && !error && availableTimes.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {availableTimes.map((time) => {
            const isSelected = time.startTime === selectedTime;

            return (
              <button
                key={time.startTime}
                type="button"
                onClick={() => onTimeSelect(time.startTime)}
                aria-pressed={isSelected}
                className={`cursor-pointer rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-primary/40 hover:bg-primary/5 hover:text-neutral-950"
                }`}
              >
                {time.startTime.slice(0, 5)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}