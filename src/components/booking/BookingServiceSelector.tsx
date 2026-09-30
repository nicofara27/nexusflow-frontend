import type {
  ServiceCategoryPublicResponse,
  ServiceResponse,
} from "@/types/business.types";
import BookingCategoryNav from "./BookingCategoryNav";
import BookingServiceCard from "./BookingServiceCard";

interface BookingServiceSelectorProps {
  services: ServiceResponse[];
  serviceCategories: ServiceCategoryPublicResponse[];
  selectedServiceId: string;
  selectedCategoryId: string;
  onServiceSelect: (serviceId: string) => void;
  onCategoryChange: (categoryId: string) => void;
}

export default function BookingServiceSelector({
  services,
  serviceCategories,
  selectedServiceId,
  selectedCategoryId,
  onServiceSelect,
  onCategoryChange,
}: BookingServiceSelectorProps) {
  const sortedCategories = [...serviceCategories].sort(
    (a, b) => a.order - b.order,
  );

  const selectedCategory = sortedCategories.find(
    (category) => category.id === selectedCategoryId,
  );

  const visibleServices = selectedCategory
    ? selectedCategory.services
    : services;

  return (
    <section className="mt-8">
      <h1 className="text-4xl font-semibold tracking-tight text-neutral-950">
        Seleccionar servicio
      </h1>

      {sortedCategories.length > 0 && (
        <div className="mt-8">
          <BookingCategoryNav
            categories={sortedCategories}
            selectedCategoryId={selectedCategoryId}
            onCategoryChange={onCategoryChange}
          />
        </div>
      )}

      {selectedCategory && (
        <h2 className="mt-8 text-xl font-semibold text-neutral-950">
          {selectedCategory.name}
        </h2>
      )}

      <div className="mt-5 space-y-4">
        {visibleServices.map((service) => (
          <BookingServiceCard
            key={service.id}
            service={service}
            selected={service.id === selectedServiceId}
            onSelect={onServiceSelect}
          />
        ))}
      </div>
    </section>
  );
}
