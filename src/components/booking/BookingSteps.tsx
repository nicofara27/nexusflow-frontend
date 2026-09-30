type BookingStep = "services" | "professional" | "hour" | "confirm";

interface BookingStepsProps {
  currentStep: BookingStep;
  onStepChange: (step: BookingStep) => void;
}

const steps: { id: BookingStep; label: string }[] = [
  { id: "services", label: "Servicios" },
  { id: "professional", label: "Profesional" },
  { id: "hour", label: "Hora" },
  { id: "confirm", label: "Confirmar" },
];

export default function BookingSteps({
  currentStep,
  onStepChange,
}: BookingStepsProps) {
  const currentIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <nav className="flex items-center gap-3 text-sm">
      {steps.map((step, index) => {
        const isCurrent = index === currentIndex;
        const isPrevious = index < currentIndex;
        const isNext = index > currentIndex;

        return (
          <div key={step.id} className="flex items-center gap-3">
            <button
              type="button"
              disabled={isNext || isCurrent}
              onClick={() => {
                if (isPrevious) {
                  onStepChange(step.id);
                }
              }}
              className={
                isCurrent
                  ? "font-medium text-neutral-950"
                  : isPrevious
                    ? "cursor-pointer font-medium text-neutral-700 transition-colors hover:text-neutral-950"
                    : "cursor-not-allowed text-neutral-400"
              }
            >
              {step.label}
            </button>

            {index < steps.length - 1 && (
              <span className="text-neutral-300">›</span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
