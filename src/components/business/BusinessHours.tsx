interface BusinessDay {
  dayOfWeek: number;
  day: string;
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
}

interface BusinessHoursProps {
  schedule: BusinessDay[];
}

export default function BusinessHours({ schedule }: BusinessHoursProps) {
  const currentDay = new Date().getDay();

  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
        Horarios
      </h2>

      <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-white">
        {schedule.map((day) => {
          const isToday = day.dayOfWeek === currentDay;

          return (
            <div
              key={day.dayOfWeek}
              className="flex items-center justify-between border-b border-neutral-100 px-5 py-4 last:border-b-0"
            >
              <div className="flex items-center gap-2">
                <span
                  className={
                    isToday ? "font-medium text-primary" : "text-neutral-700"
                  }
                >
                  {day.day}
                </span>

                {isToday && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    Hoy
                  </span>
                )}
              </div>

              <span
                className={
                  day.isOpen
                    ? "text-sm text-neutral-600"
                    : "text-sm text-neutral-400"
                }
              >
                {day.isOpen ? `${day.openTime} - ${day.closeTime}` : "Cerrado"}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}