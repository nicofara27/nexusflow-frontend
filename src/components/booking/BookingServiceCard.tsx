import type { ServiceResponse } from "@/types/business.types";

interface BookingServiceCardProps {
  service: ServiceResponse;
  selected: boolean;
  onSelect: (serviceId: string) => void;
}

export default function BookingServiceCard({
  service,
  selected,
  onSelect,
}: BookingServiceCardProps) {
  return (
    <article
      className={`rounded-xl border bg-white p-5 transition-colors ${
        selected ? "border-primary/50 bg-primary/5" : "border-neutral-200"
      }`}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-neutral-950">
            {service.name}
          </h3>

          <p className="mt-1 text-sm text-neutral-500">
            {service.duration} min
          </p>

          {service.description && (
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              {service.description}
            </p>
          )}

          <p className="mt-4 text-base font-semibold text-neutral-950">
            ${service.price}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSelect(service.id)}
          className={`self-center shrink-0 cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
            selected
              ? "border-primary bg-primary/10 text-neutral-950"
              : "border-primary/40 text-neutral-700 hover:bg-primary/10 hover:text-neutral-950"
          }`}
        >
          {selected ? "Seleccionado" : "Seleccionar"}
        </button>
      </div>
    </article>
  );
}