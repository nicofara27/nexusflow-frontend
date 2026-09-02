import type { EmployeePortfolio } from "@/types/gallery.types";

interface PortfolioGalleryProps {
  employee?: EmployeePortfolio;
}

export default function PortfolioGallery({ employee }: PortfolioGalleryProps) {
  if (!employee) {
    return (
      <p className="py-16 text-center text-sm text-neutral-500">
        No hay trabajos para mostrar.
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {employee.images.map((image, index) => (
        <div
          key={`${image}-${index}`}
          className="aspect-square overflow-hidden rounded-xl bg-neutral-100"
        >
          <img
            src={image}
            alt={`Trabajo de ${employee.name} ${index + 1}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}