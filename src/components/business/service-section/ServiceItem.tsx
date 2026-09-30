import type { ServiceResponse } from "@/types/business.types";

interface ServiceItemProps {
  service: ServiceResponse;
}

export default function ServiceItem({ service }: ServiceItemProps) {
  return (
    <div className="flex items-center justify-between gap-6 rounded-xl border border-neutral-200 bg-white p-6 my-2">
      <div>
        <h3 className="font-medium text-neutral-950">{service.name}</h3>
        <p className="mt-1 text-sm text-neutral-500">{service.duration} min</p>
        <p className="mt-4 font-semibold text-neutral-950">
          ${service.price.toLocaleString("es-AR")}
        </p>
      </div>
      <button
        type="button"
        className="shrink-0 cursor-pointer rounded-full border border-primary/30 bg-white px-5 py-2.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-primary/20"
      >
        Reservar
      </button>
    </div>
  );
}