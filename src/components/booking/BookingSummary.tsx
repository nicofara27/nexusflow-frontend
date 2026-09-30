import type {
  BusinessPublicDetailsResponse,
  EmployeePublicResponse,
  ServiceResponse,
} from "@/types/business.types";
import { Star } from "lucide-react";

interface BookingSummaryProps {
  business: BusinessPublicDetailsResponse;
  selectedService: ServiceResponse | null;
  selectedEmployee: EmployeePublicResponse | null;
  step: string;
  canContinue: boolean;
  isSubmitting: boolean;
  submitError: string;
  onContinue: () => void;
}

export default function BookingSummary({
  business,
  selectedService,
  selectedEmployee,
  step,
  canContinue,
  isSubmitting,
  submitError,
  onContinue,
}: BookingSummaryProps) {
  const mainImage = business.images[0]?.url;

  const buttonLabel =
    step === "confirm"
      ? isSubmitting
        ? "Confirmando..."
        : "Confirmar reserva"
      : "Continuar";

  return (
    <aside>
      <div className="sticky top-24 rounded-xl border border-neutral-200 bg-white p-6">
        <div className="flex gap-4">
          {mainImage && (
            <img
              src={mainImage}
              alt={business.name}
              className="aspect-square w-1/5 max-w-20 shrink-0 rounded-lg object-cover"
            />
          )}

          <div>
            <h2 className="text-lg font-semibold text-neutral-950">
              {business.name}
            </h2>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-3 w-3 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <span className="text-sm font-medium text-neutral-700">
                {business.averageRating.toFixed(1)}
              </span>

              <span className="text-sm text-neutral-500">
                ({business.totalReviews})
              </span>
            </div>

            <p className="text-sm text-neutral-500">{business.address}</p>
          </div>
        </div>

        <div className="my-6 border-t border-neutral-200" />

        {selectedService ? (
          <div>
            <p className="text-sm text-neutral-500">Servicio seleccionado</p>

            <h3 className="mt-1 font-semibold text-neutral-950">
              {selectedService.name}
            </h3>

            <div className="mt-2 flex gap-3 text-sm text-neutral-600">
              <span>{selectedService.duration} min</span>
              <span>•</span>
              <span>${selectedService.price}</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-neutral-500">
            No hay servicios seleccionados
          </p>
        )}

        {selectedEmployee && (
          <div className="mt-5">
            <p className="text-sm text-neutral-500">Profesional</p>

            <p className="mt-1 font-medium text-neutral-950">
              {selectedEmployee.firstName} {selectedEmployee.lastName}
            </p>
          </div>
        )}

        <div className="my-6 border-t border-neutral-200" />

        <div className="flex items-center justify-between">
          <span className="font-semibold text-neutral-950">Total</span>

          <span className="font-semibold text-neutral-950">
            {selectedService ? `$${selectedService.price}` : "$0"}
          </span>
        </div>

        <button
          type="button"
          onClick={onContinue}
          disabled={!canContinue || isSubmitting}
          className="mt-8 w-full cursor-pointer rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {buttonLabel}
        </button>

        {submitError && (
          <p className="mt-3 text-sm text-red-600">{submitError}</p>
        )}
      </div>
    </aside>
  );
}
