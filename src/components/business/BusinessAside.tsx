import type { BusinessScheduleResponse } from "@/types/business.types";

interface BusinessAsideProps {
  category: string;
  name: string;
  address: string;
  schedule: BusinessScheduleResponse[];
  onChooseService: () => void;
}

interface BusinessStatus {
  isOpen: boolean;
  text: string;
}

const getBusinessStatus = (
  schedule: BusinessScheduleResponse[],
): BusinessStatus => {
  const now = new Date();

  const currentDay = now.getDay();

  const todaySchedule = schedule.find((day) => day.dayOfWeek === currentDay);

  if (!todaySchedule) {
    return {
      isOpen: false,
      text: "Cerrado",
    };
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const [startHour, startMinute] = todaySchedule.startTime
    .split(":")
    .map(Number);

  const [endHour, endMinute] = todaySchedule.endTime.split(":").map(Number);

  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  if (currentMinutes < startMinutes) {
    return {
      isOpen: false,
      text: `Abre a las ${todaySchedule.startTime.slice(0, 5)}`,
    };
  }

  if (currentMinutes >= endMinutes) {
    return {
      isOpen: false,
      text: "Cerrado",
    };
  }

  return {
    isOpen: true,
    text: `hasta las ${todaySchedule.endTime.slice(0, 5)}`,
  };
};

export default function BusinessAside({
  category,
  name,
  address,
  schedule,
  onChooseService,
}: BusinessAsideProps) {
  const status = getBusinessStatus(schedule);

  return (
    <aside className="sticky top-24 hidden self-start lg:block">
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <p className="text-sm font-medium text-primary">{category}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950 xl:text-4xl">
          {name}
        </h1>
        <div className="mt-5 space-y-2 text-sm text-neutral-600">
          <p>{address}</p>
          <p>
            {status.isOpen ? (
              <>
                <span className="font-medium text-primary">Abierto</span>{" "}
                {status.text}
              </>
            ) : (
              <span className="font-medium text-neutral-700">
                {status.text}
              </span>
            )}
          </p>
        </div>
        <div className="my-6 border-t border-neutral-200" />
        <button
          type="button"
          onClick={onChooseService}
          className="w-full cursor-pointer rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Elegir un servicio
        </button>
      </div>
    </aside>
  );
}
