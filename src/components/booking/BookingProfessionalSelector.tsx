import type { EmployeePublicResponse } from "@/types/business.types";
import BookingProfessionalCard from "./BookingProfessionalCard";

interface BookingProfessionalSelectorProps {
  employees: EmployeePublicResponse[];
  selectedEmployeeId: string;
  onEmployeeSelect: (employeeId: string) => void;
}

export default function BookingProfessionalSelector({
  employees,
  selectedEmployeeId,
  onEmployeeSelect,
}: BookingProfessionalSelectorProps) {
  return (
    <section className="mt-8">
      <h1 className="text-4xl font-semibold tracking-tight text-neutral-950">
        Seleccionar profesional
      </h1>

      <div className="mt-6 space-y-3">
        {employees.map((employee) => (
          <BookingProfessionalCard
            key={employee.id}
            employee={employee}
            selected={employee.id === selectedEmployeeId}
            onSelect={onEmployeeSelect}
          />
        ))}
      </div>
    </section>
  );
}
