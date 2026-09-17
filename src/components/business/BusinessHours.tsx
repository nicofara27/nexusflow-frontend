import type { BusinessScheduleResponse } from "@/types/business.types";

interface BusinessHoursProps {
  schedule: BusinessScheduleResponse[];
}

const days = [
  { dayOfWeek: 1, name: "Lunes" },
  { dayOfWeek: 2, name: "Martes" },
  { dayOfWeek: 3, name: "Miércoles" },
  { dayOfWeek: 4, name: "Jueves" },
  { dayOfWeek: 5, name: "Viernes" },
  { dayOfWeek: 6, name: "Sábado" },
  { dayOfWeek: 0, name: "Domingo" },
];

export default function BusinessHours({
  schedule,
}: BusinessHoursProps) {
  const formattedSchedule = days.map((day) => {
    const currentSchedule = schedule.find(
      (item) => item.dayOfWeek === day.dayOfWeek,
    );

    if (!currentSchedule) {
      return {
        dayOfWeek: day.dayOfWeek,
        day: day.name,
        isOpen: false,
        openTime: null,
        closeTime: null,
      };
    }

    return {
      dayOfWeek: day.dayOfWeek,
      day: day.name,
      isOpen: true,
      openTime: currentSchedule.startTime.slice(0, 5),
      closeTime: currentSchedule.endTime.slice(0, 5),
    };
  });

  return (
    <section>
      <h2 className="text-xl font-semibold text-neutral-950">
        Horarios
      </h2>

      <div className="mt-7 space-y-3">
        {formattedSchedule.map((day) => (
          <div
            key={day.dayOfWeek}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <span className="text-neutral-700">
              {day.day}
            </span>

            {day.isOpen ? (
              <span className="font-medium text-neutral-950">
                {day.openTime} - {day.closeTime}
              </span>
            ) : (
              <span className="text-neutral-500">
                Cerrado
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}