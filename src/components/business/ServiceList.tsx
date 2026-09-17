import type {
  ServiceCategoryPublicResponse,
  ServiceResponse,
} from "@/types/business.types";

interface ServiceListProps {
  services: ServiceResponse[];
  categories: ServiceCategoryPublicResponse[];
}

interface ServiceItemProps {
  service: ServiceResponse;
}

function ServiceItem({ service }: ServiceItemProps) {
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

export default function ServiceList({
  services,
  categories,
}: ServiceListProps) {
  const usesCategories = categories.length > 0;

  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
        Servicios
      </h2>

      {usesCategories ? (
        <div className="mt-6 space-y-10">
          {categories.map((category) => (
            <div key={category.id}>
              <h3 className="text-lg font-semibold text-neutral-950">
                {category.name}
              </h3>

              <div className="mt-2">
                {category.services.map((service) => (
                  <ServiceItem key={service.id} service={service} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6">
          {services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      )}
    </section>
  );
}
