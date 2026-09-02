import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import EstablishmentGallery from "./EstablishmentGallery";
import PortfolioGallery from "./PortfolioGallery";
import type { EmployeePortfolio, GallerySection } from "@/types/gallery.types";
import { useRef } from "react";

interface GalleryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  businessName: string;
  establishmentImages: string[];
  employeePortfolios: EmployeePortfolio[];
  section: GallerySection;
  onSectionChange: (section: GallerySection) => void;
  selectedEmployeeId: string;
  onEmployeeChange: (employeeId: string) => void;
}

export default function GalleryDialog({
  open,
  onOpenChange,
  businessName,
  establishmentImages,
  employeePortfolios,
  section,
  onSectionChange,
  selectedEmployeeId,
  onEmployeeChange,
}: GalleryDialogProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const portfolioContentRef = useRef<HTMLDivElement>(null);

  const selectedEmployee = employeePortfolios.find(
    (employee) => employee.id === selectedEmployeeId,
  );

  const totalPortfolioImages = employeePortfolios.reduce(
    (total, employee) => total + employee.images.length,
    0,
  );

  const handleSectionChange = (nextSection: GallerySection) => {
    onSectionChange(nextSection);

    requestAnimationFrame(() => {
      contentRef.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  const handleEmployeeChange = (employeeId: string) => {
    onEmployeeChange(employeeId);

    requestAnimationFrame(() => {
      portfolioContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        ref={contentRef}
        showCloseButton={false}
        className="h-screen max-h-screen w-screen max-w-none overflow-y-auto rounded-none border-0 p-0 sm:max-w-none"
      >
        <DialogDescription className="sr-only">
          Galería de imágenes de {businessName}
        </DialogDescription>

        <div className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 py-5 lg:px-8">
            <DialogTitle className="text-xl font-semibold tracking-tight text-neutral-950">
              Galería de imágenes
            </DialogTitle>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Cerrar galería"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-red-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mx-auto flex w-full max-w-[1280px] gap-6 px-6 lg:px-8">
            <button
              type="button"
              onClick={() => handleSectionChange("establishment")}
              className={`relative cursor-pointer pb-4 text-sm font-medium transition-colors ${
                section === "establishment"
                  ? "text-primary"
                  : "text-neutral-500 hover:text-neutral-950"
              }`}
            >
              Establecimiento
              <span className="ml-2 text-xs">{establishmentImages.length}</span>
              {section === "establishment" && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleSectionChange("portfolio")}
              className={`relative cursor-pointer pb-4 text-sm font-medium transition-colors ${
                section === "portfolio"
                  ? "text-primary"
                  : "text-neutral-500 hover:text-neutral-950"
              }`}
            >
              Portafolio
              <span className="ml-2 text-xs">{totalPortfolioImages}</span>
              {section === "portfolio" && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>
          {section === "portfolio" && employeePortfolios.length > 0 && (
            <div className="border-t border-neutral-100">
              <div className="mx-auto flex w-full max-w-[1280px] gap-2 overflow-x-auto px-6 py-3 lg:px-8">
                {employeePortfolios.map((employee) => (
                  <button
                    key={employee.id}
                    type="button"
                    onClick={() => handleEmployeeChange(employee.id)}
                    className={`shrink-0 cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      selectedEmployeeId === employee.id
                        ? "bg-neutral-100 text-primary"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    {employee.name}

                    <span className="ml-2 text-xs text-neutral-400">
                      {employee.images.length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mx-auto w-full max-w-[1280px] px-6 py-4 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
              {section === "establishment"
                ? "Nuestro espacio"
                : "Conocé nuestro trabajo"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-neutral-500">
              {section === "establishment"
                ? "Conocé el espacio donde vas a disfrutar tu próxima experiencia."
                : "Explorá el trabajo realizado por los profesionales de nuestro equipo."}
            </p>
          </div>

          {section === "establishment" ? (
            <EstablishmentGallery
              businessName={businessName}
              images={establishmentImages}
            />
          ) : (
            <div ref={portfolioContentRef} className="scroll-mt-48">
              <PortfolioGallery employee={selectedEmployee} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
