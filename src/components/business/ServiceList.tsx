import { useEffect, useMemo, useState } from "react";

interface ServiceCategory {
  id: string;
  name: string;
}

interface BusinessService {
  id: string;
  name: string;
  duration: number;
  price: number;
  categoryId?: string | null;
}

interface ServiceListProps {
  services: BusinessService[];
  categories?: ServiceCategory[];
  showCategories?: boolean;
  maxVisible?: number;
}

export default function ServiceList({
  services,
  categories = [],
  showCategories = false,
  maxVisible = 5,
}: ServiceListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filteredServices = useMemo(() => {
    if (!selectedCategory) {
      return services;
    }

    return services.filter(
      (service) => service.categoryId === selectedCategory,
    );
  }, [services, selectedCategory]);

  const visibleServices = showAll
    ? filteredServices
    : filteredServices.slice(0, maxVisible);

  useEffect(() => {
    setShowAll(false);
  }, [selectedCategory]);

  return (
    <section>
      <div>
        <h2 className="text-xl font-semibold text-neutral-950">Servicios</h2>

        <p className="mt-1 text-sm text-neutral-500">
          Elegí el servicio que querés reservar.
        </p>
      </div>

      {showCategories && categories.length > 0 && (
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors  ${
              selectedCategory === null
                ? "bg-primary text-primary-foreground"
                : "bg-primary/10 text-primary hover:bg-primary/15"
            }`}
          >
            Todos
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/10 text-primary hover:bg-primary/15"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      <div className="mt-5 space-y-3">
        {visibleServices.map((service) => (
          <article
            key={service.id}
            className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          >
            <div>
              <h3 className="font-medium text-neutral-950">{service.name}</h3>

              <p className="mt-1 text-sm text-neutral-500">
                {service.duration} min
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
              <p className="font-medium text-neutral-950">
                ${service.price.toLocaleString("es-AR")}
              </p>

              <button
                type="button"
                className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Reservar
              </button>
            </div>
          </article>
        ))}
      </div>

      {filteredServices.length > maxVisible && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="rounded-lg border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-50"
          >
            {showAll ? "Ver menos" : "Ver todos"}
          </button>
        </div>
      )}
    </section>
  );
}
