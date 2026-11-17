import { NavLink, Outlet } from "react-router";
import { CalendarDays } from "lucide-react";

import { useAuthStore } from "@/store/auth.store";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
    isActive
      ? "bg-primary/10 text-primary"
      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
  }`;

export default function BusinessLayout() {
  const businessRole = useAuthStore((state) => state.user?.businessRole);

  const isAdmin = businessRole === "Admin";

  return (
    <div className="min-h-[calc(100vh-4.5rem)] bg-neutral-50 lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="border-b border-neutral-200 bg-white lg:border-b-0 lg:border-r">
        <div className="px-4 py-6 lg:sticky lg:top-0">
          <div className="px-4">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Espacio de trabajo
            </p>

            <h2 className="mt-1 text-lg font-semibold text-neutral-950">
              {isAdmin ? "Administración" : "Profesional"}
            </h2>
          </div>

          <nav
            aria-label="Navegación del negocio"
            className="mt-5 flex gap-2 overflow-x-auto lg:flex-col"
          >
            <NavLink to="/appointments/manage" className={linkClass}>
              <CalendarDays className="h-5 w-5 shrink-0" />
              {isAdmin ? "Turnos del negocio" : "Mis turnos de trabajo"}
            </NavLink>
          </nav>
        </div>
      </aside>

      <div className="min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
