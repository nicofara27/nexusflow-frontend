import { Link, useNavigate } from "react-router";
import { Menu } from "@base-ui/react/menu";
import {
  CalendarDays,
  ChevronDown,
  LogOut,
  BriefcaseBusiness,
  UserRound,
} from "lucide-react";

import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export default function PublicNavbar() {
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();

  const hasWorkAccess =
    user?.businessRole === "Admin" || user?.businessRole === "Employee";

  const handleLogout = async () => {
    try {
      await authService.logout();
    } finally {
      clearAuth();
      navigate("/", { replace: true });
    }
  };

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-xl font-semibold tracking-tight text-neutral-950"
        >
          NexusFlow
        </Link>

        <nav className="flex items-center gap-3">
          {user ? (
            <Menu.Root>
              <Menu.Trigger className="flex cursor-pointer items-center gap-2 rounded-full border border-neutral-200 px-2 py-1.5 hover:bg-neutral-50">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  {user.firstName.charAt(0).toUpperCase()}
                </span>

                <span className="hidden text-sm font-medium sm:block">
                  {user.firstName}
                </span>

                <ChevronDown className="h-4 w-4" />
              </Menu.Trigger>

              <Menu.Portal>
                <Menu.Positioner sideOffset={8} align="end" className="z-50">
                  <Menu.Popup className="w-64 rounded-xl border border-neutral-200 bg-white p-2 shadow-lg outline-none">
                    <div className="border-b border-neutral-100 px-3 py-3">
                      <p className="font-semibold text-neutral-950">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="mt-1 truncate text-xs text-neutral-500">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-2">
                      <Menu.Item
                        onClick={() => navigate("/profile")}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm outline-none data-[highlighted]:bg-neutral-100"
                      >
                        <UserRound className="h-4 w-4" />
                        Mi cuenta
                      </Menu.Item>

                      {hasWorkAccess && (
                        <Menu.Item
                          onClick={() => navigate("/appointments/manage")}
                          className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm outline-none data-[highlighted]:bg-neutral-100"
                        >
                          <BriefcaseBusiness className="h-4 w-4" />
                          Panel de trabajo
                        </Menu.Item>
                      )}

                      <Menu.Item
                        onClick={() => navigate("/appointments")}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm outline-none data-[highlighted]:bg-neutral-100"
                      >
                        <CalendarDays className="h-4 w-4" />
                        Mis turnos
                      </Menu.Item>
                    </div>

                    <Menu.Separator className="h-px bg-neutral-200" />

                    <Menu.Item
                      onClick={handleLogout}
                      className="mt-2 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 outline-none data-[highlighted]:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Cerrar sesión
                    </Menu.Item>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu.Root>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
              >
                Iniciar sesión
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
              >
                Registrarse
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
