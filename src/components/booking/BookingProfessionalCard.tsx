import type { EmployeePublicResponse } from "@/types/business.types";

interface BookingProfessionalCardProps {
  employee: EmployeePublicResponse;
  selected: boolean;
  onSelect: (employeeId: string) => void;
}

export default function BookingProfessionalCard({
  employee,
  selected,
  onSelect,
}: BookingProfessionalCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(employee.id)}
      className={`w-full cursor-pointer rounded-xl border bg-white p-5 text-left transition-colors ${
        selected
          ? "border-primary/50 bg-primary/5"
          : "border-neutral-200 hover:bg-neutral-100"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-medium text-neutral-950">
          {employee.firstName} {employee.lastName}
        </p>

        <span
          className={`rounded-lg border px-4 py-2 text-sm font-medium ${
            selected
              ? "border-primary bg-primary/10 text-neutral-950"
              : "border-primary/40 text-neutral-700"
          }`}
        >
          {selected ? "Seleccionado" : "Seleccionar"}
        </span>
      </div>
    </button>
  );
}
