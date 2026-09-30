import type { ServiceCategoryPublicResponse } from "@/types/business.types";

interface ServiceCategoryNavProps {
  categories: ServiceCategoryPublicResponse[];
  selectedCategoryId: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function ServiceCategoryNav({
  categories,
  selectedCategoryId,
  onCategoryChange,
}: ServiceCategoryNavProps) {
  return (
    <nav className="flex gap-2 overflow-x-auto border-b border-neutral-200">
      {categories.map((category) => {
        const isSelected = category.id === selectedCategoryId;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category.id)}
            className={`shrink-0 cursor-pointer border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              isSelected
                ? "border-neutral-950 text-neutral-950"
                : "border-transparent text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
            }`}
          >
            {category.name}
          </button>
        );
      })}
    </nav>
  );
}