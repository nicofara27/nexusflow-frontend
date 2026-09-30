import type { ServiceResponse } from "@/types/business.types";

interface ServiceCardProps {
  service: ServiceResponse;
  onReserve?: (serviceId: string) => void;
}

export default function ServiceCard({
  service,
  onReserve,
}: ServiceCardProps) {
  return (
    <article className="rounded-xl border border-neutral-200 bg-white p-5 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h4 className="text-base font-semibold text-neutral-950">
            {service.name}
          </h4>

          {service.description && (
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              {service.description}
            </p>
          )}

          <div className="mt-4 flex items-center gap-3 text-sm">
            <span className="font-medium text-neutral-950">
              ${service.price}
            </span>
            <span className="text-neutral-300">•</span>
            <span className="text-neutral-500">
              {service.duration} min
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onReserve?.(service.id)}
          className="self-center shrink-0 cursor-pointer rounded-lg border border-primary/40 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-primary/10 hover:text-neutral-950"
        >
          Reservar
        </button>
      </div>
    </article>
  );
}   