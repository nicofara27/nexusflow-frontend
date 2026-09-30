import type { ServiceCategoryPublicResponse } from "@/types/business.types";

interface BookingCategoryNavProps {
  categories: ServiceCategoryPublicResponse[];
  selectedCategoryId: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function BookingCategoryNav({
  categories,
  selectedCategoryId,
  onCategoryChange,
}: BookingCategoryNavProps) {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-1">
      {categories.map((category) => {
        const isSelected = category.id === selectedCategoryId;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category.id)}
            className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              isSelected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-neutral-200 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
            }`}
          >
            {category.name}
          </button>
        );
      })}
    </nav>
  );
}
