import type { EmployeePublicResponse } from "@/types/business.types";

interface BusinessTeamProps {
  employees: EmployeePublicResponse[];
  onEmployeeClick: (employeeId: string) => void;
}

export default function BusinessTeam({
  employees,
  onEmployeeClick,
}: BusinessTeamProps) {
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
        Equipo
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {employees.map((employee) => (
          <button
            key={employee.id}
            type="button"
            onClick={() => onEmployeeClick(employee.id)}
            className="cursor-pointer rounded-xl border border-neutral-200 bg-white p-5 text-left transition-colors hover:bg-neutral-100"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-700">
              {employee.firstName.charAt(0)}
              {employee.lastName.charAt(0)}
            </div>

            <p className="mt-4 font-medium text-neutral-950">
              {employee.firstName} {employee.lastName}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}