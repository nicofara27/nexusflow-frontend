import { NavLink, Outlet } from "react-router";
import { CalendarDays, ShieldCheck, UserRound } from "lucide-react";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
    isActive
      ? "bg-primary/10 text-primary"
      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
  }`;

export default function AccountLayout() {
  return (
    <div className="min-h-[calc(100vh-4.5rem)] bg-neutral-50 lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="border-b border-neutral-200 bg-white lg:border-b-0 lg:border-r">
        <div className="px-4 py-6 lg:sticky lg:top-0">
          <h2 className="px-4 text-lg font-semibold text-neutral-950">
            Mi cuenta
          </h2>

          <nav
            aria-label="Navegación de cuenta"
            className="mt-5 flex gap-2 overflow-x-auto lg:flex-col"
          >
            <NavLink to="/profile" className={linkClass}>
              <UserRound className="h-5 w-5 shrink-0" />
              Perfil
            </NavLink>

            <NavLink to="/appointments" className={linkClass}>
              <CalendarDays className="h-5 w-5 shrink-0" />
              Mis turnos
            </NavLink>

            <NavLink to="/security" className={linkClass}>
              <ShieldCheck className="h-5 w-5 shrink-0" />
              Seguridad
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
