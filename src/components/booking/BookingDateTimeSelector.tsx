import { useEffect, useState } from "react";
import { appointmentService } from "@/services/appointment.service";
import type { AvailableTimeResponse } from "@/types/booking.types";
import BookingDateSelector from "@/components/booking/BookingDateSelector";
import BookingTimeSelector from "@/components/booking/BookingTimeSelector";

interface BookingDateTimeSelectorProps {
  userBusinessId: string;
  serviceId: string;
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeSelect: (time: string) => void;
}

export default function BookingDateTimeSelector({
  userBusinessId,
  serviceId,
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeSelect,
}: BookingDateTimeSelectorProps) {
  const [availableTimes, setAvailableTimes] = useState<AvailableTimeResponse[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedDate) {
      setAvailableTimes([]);
      setError("");
      return;
    }

    let ignore = false;

    const loadAvailability = async () => {
      try {
        setLoading(true);
        setError("");
        setAvailableTimes([]);

        const times = await appointmentService.getEmployeeAvailability(
          userBusinessId,
          serviceId,
          selectedDate,
        );

        if (!ignore) {
          setAvailableTimes(times);
        }
      } catch {
        if (!ignore) {
          setError("No se pudieron obtener los horarios disponibles.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadAvailability();

    return () => {
      ignore = true;
    };
  }, [userBusinessId, serviceId, selectedDate]);

  return (
    <section className="mt-8">
      <h1 className="text-4xl font-semibold tracking-tight text-neutral-950">
        Seleccionar fecha y hora
      </h1>

      <div className="mt-8">
        <BookingDateSelector
          selectedDate={selectedDate}
          onDateChange={onDateChange}
        />

        <BookingTimeSelector
          availableTimes={availableTimes}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          loading={loading}
          error={error}
          onTimeSelect={onTimeSelect}
        />
      </div>
    </section>
  );
}
