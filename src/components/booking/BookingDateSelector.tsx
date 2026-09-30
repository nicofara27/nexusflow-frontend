import { addDays, format, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useState } from "react";

interface BookingDateSelectorProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const DAYS_TO_SHOW = 30;

export default function BookingDateSelector({
  selectedDate,
  onDateChange,
}: BookingDateSelectorProps) {
  const dates = useMemo(() => {
    const today = startOfDay(new Date());

    return Array.from({ length: DAYS_TO_SHOW }, (_, index) =>
      addDays(today, index),
    );
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateNavigation = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    updateNavigation();

    emblaApi.on("select", updateNavigation);
    emblaApi.on("reInit", updateNavigation);

    return () => {
      emblaApi.off("select", updateNavigation);
      emblaApi.off("reInit", updateNavigation);
    };
  }, [emblaApi, updateNavigation]);

  useEffect(() => {
    if (!emblaApi || !selectedDate) {
      return;
    }

    const selectedIndex = dates.findIndex(
      (date) => format(date, "yyyy-MM-dd") === selectedDate,
    );

    if (selectedIndex >= 0) {
      emblaApi.scrollTo(selectedIndex);
    }
  }, [dates, emblaApi, selectedDate]);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-neutral-950">
          Selecciona una fecha
        </h2>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Ver fechas anteriores"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Ver fechas siguientes"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div ref={emblaRef} className="mt-4 overflow-hidden">
        <div className="-ml-3 flex">
          {dates.map((date) => {
            const dateValue = format(date, "yyyy-MM-dd");
            const isSelected = selectedDate === dateValue;

            const weekday = format(date, "EEE", { locale: es }).replace(
              ".",
              "",
            );

            const month = format(date, "MMM", { locale: es }).replace(".", "");

            return (
              <div
                key={dateValue}
                className="min-w-0 flex-[0_0_86px] pl-3 sm:flex-[0_0_94px]"
              >
                <button
                  type="button"
                  onClick={() => onDateChange(dateValue)}
                  aria-pressed={isSelected}
                  className={`flex min-h-28 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border px-2 py-3 transition-colors ${
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-primary/40 hover:bg-primary/5 hover:text-neutral-950"
                  }`}
                >
                  <span
                    className={`text-sm ${
                      isSelected
                        ? "text-primary-foreground/80"
                        : "text-neutral-500"
                    }`}
                  >
                    {weekday}
                  </span>

                  <span className="mt-1 text-2xl font-semibold">
                    {format(date, "d")}
                  </span>

                  <span
                    className={`mt-1 text-sm ${
                      isSelected
                        ? "text-primary-foreground/80"
                        : "text-neutral-500"
                    }`}
                  >
                    {month}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
