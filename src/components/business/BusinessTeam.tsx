interface BusinessEmployee {
  id: string;
  firstName: string;
  role?: string;
  avatarUrl?: string;
  portfolioCount?: number;
}

interface BusinessTeamProps {
  employees: BusinessEmployee[];
  onEmployeeClick: (employeeId: string) => void;
}

export default function BusinessTeam({
  employees,
  onEmployeeClick,
}: BusinessTeamProps) {
  return (
    <section>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
          Nuestro equipo
        </h2>

        <p className="mt-2 text-sm text-neutral-500">
          Conocé a los profesionales y descubrí sus trabajos.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {employees.map((employee) => (
          <button
            key={employee.id}
            type="button"
            onClick={() => onEmployeeClick(employee.id)}
            className="group cursor-pointer rounded-xl border border-neutral-200 bg-white p-4 text-left transition-colors hover:bg-neutral-100"
          >
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-neutral-100">
                {employee.avatarUrl ? (
                  <img
                    src={employee.avatarUrl}
                    alt={employee.firstName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-neutral-500">
                    {employee.firstName.charAt(0)}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <h3 className="font-semibold text-neutral-950">
                  {employee.firstName}
                </h3>

                {employee.role && (
                  <p className="mt-0.5 text-sm text-neutral-500">
                    {employee.role}
                  </p>
                )}

                {employee.portfolioCount !== undefined &&
                  employee.portfolioCount > 0 && (
                    <p className="mt-2 text-xs font-medium text-primary">
                      {employee.portfolioCount} trabajos
                    </p>
                  )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
