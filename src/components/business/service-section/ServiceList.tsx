import { useState } from "react";
import type {
  ServiceCategoryPublicResponse,
  ServiceResponse,
} from "@/types/business.types";
import ServiceCategoryNav from "./ServiceCategoryNav";
import ServiceCategoryContent from "./ServiceCategoryContent";

interface ServiceListProps {
  services: ServiceResponse[];
  serviceCategories: ServiceCategoryPublicResponse[];
  onReserve: (serviceId: string) => void;
}

export default function ServiceList({
  services,
  serviceCategories,
  onReserve
}: ServiceListProps) {
  const hasCategories = serviceCategories.length > 0;

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    serviceCategories[0]?.id ?? "",
  );

  const selectedCategory =
    serviceCategories.find((category) => category.id === selectedCategoryId) ??
    serviceCategories[0];

  const sortedCategories = [...serviceCategories].sort(
    (a, b) => a.order - b.order,
  );

  return (
    <section>
      <h2 className="text-2xl font-semibold text-neutral-950">Servicios</h2>

      {hasCategories ? (
        <div className="mt-6">
          <ServiceCategoryNav
            categories={sortedCategories}
            selectedCategoryId={selectedCategory?.id ?? ""}
            onCategoryChange={setSelectedCategoryId}
          />

          {selectedCategory && (
            <ServiceCategoryContent
              key={selectedCategory.id}
              category={selectedCategory}
              onReserve={onReserve}
            />
          )}
        </div>
      ) : (
        <div className="mt-6">
          <ServiceCategoryContent
            category={{
              id: "",
              name: "",
              order: 0,
              services,
            }}
            onReserve={onReserve}
          />
        </div>
      )}
    </section>
  );
}
