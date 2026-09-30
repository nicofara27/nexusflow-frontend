import { useState } from "react";
import type { ServiceCategoryPublicResponse } from "@/types/business.types";
import ServiceCard from "./ServiceCard";

interface ServiceCategoryContentProps {
  category: ServiceCategoryPublicResponse;
  onReserve: (serviceId: string) => void;
}

export default function ServiceCategoryContent({
  category,
  onReserve
}: ServiceCategoryContentProps) {
  const [showAll, setShowAll] = useState(false);

  const hasMoreServices = category.services.length > 4;
  const visibleServices = showAll
    ? category.services
    : category.services.slice(0, 4);

  return (
    <div className="mt-6">
      {category.name && (
        <h3 className="text-lg font-semibold text-neutral-950">
          {category.name}
        </h3>
      )}

      <div className="mt-4 space-y-4">
        {visibleServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onReserve={onReserve}
          />
        ))}
      </div>

      {hasMoreServices && (
        <button
          type="button"
          onClick={() => setShowAll((current) => !current)}
          className="mt-5 cursor-pointer text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-950"
        >
          {showAll ? "Ver menos" : "Ver todos"}
        </button>
      )}
    </div>
  );
}
